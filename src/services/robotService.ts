import { MovementDirection, RobotConfig, RobotTelemetry } from '../types';

export class RobotService {
  private config: RobotConfig = {
    espIp: '192.168.4.1', // Default ESP32 AP IP address
    httpPort: 80,
    wsPort: 81,
    protocol: 'websocket',
    cameraStreamUrl: '', // Configured via Admin
    cameraSnapshotUrl: '',
    commandIntervalMs: 150,
    safetyTimeoutMs: 400,
    autoReconnect: false,
  };

  private socket: WebSocket | null = null;
  private heartbeatTimer: any = null;
  private isConnecting: boolean = false;
  private telemetry: RobotTelemetry = {
    isConnected: false,
    ipAddress: '192.168.4.1',
    port: 81,
    batteryLevel: null, // Honest null until actual hardware sensor reports
    batteryVoltage: null,
    ultrasonicDistanceCm: null,
    irObstacleLeft: null,
    irObstacleRight: null,
    wifiRssi: null,
    currentMode: 'manual',
    currentSpeed: 50,
    lastCommand: 'STOP',
    lastMessage: 'Robot Disconnected',
    lastHeartbeatTime: null,
    motorState: {
      leftSpeed: 0,
      rightSpeed: 0,
      direction: 'stop',
    },
  };

  private listeners: ((telemetry: RobotTelemetry) => void)[] = [];
  private activeDirection: MovementDirection = 'stop';
  private activeIntervalId: any = null;

  constructor() {
    // Load config from localStorage if present
    const saved = localStorage.getItem('nexora_robot_config');
    if (saved) {
      try {
        this.config = { ...this.config, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse saved config', e);
      }
    }
  }

  public getConfig(): RobotConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<RobotConfig>) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem('nexora_robot_config', JSON.stringify(this.config));
    if (this.telemetry.isConnected) {
      this.disconnect();
    }
  }

  public getTelemetry(): RobotTelemetry {
    return { ...this.telemetry };
  }

  public subscribe(listener: (telemetry: RobotTelemetry) => void): () => void {
    this.listeners.push(listener);
    listener(this.telemetry);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const copy = { ...this.telemetry };
    this.listeners.forEach((l) => l(copy));
  }

  public connect(customIp?: string) {
    if (customIp) {
      this.config.espIp = customIp;
    }

    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.isConnecting = true;
    this.telemetry.lastMessage = `Connecting to ws://${this.config.espIp}:${this.config.wsPort}...`;
    this.notify();

    try {
      const wsUrl = `ws://${this.config.espIp}:${this.config.wsPort}/ws`;
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        this.isConnecting = false;
        this.telemetry.isConnected = true;
        this.telemetry.ipAddress = this.config.espIp;
        this.telemetry.port = this.config.wsPort;
        this.telemetry.lastMessage = 'Connected to ESP32 Hardware';
        this.startHeartbeatWatcher();
        this.notify();
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Telemetry packet format from ESP32:
          // { "dist": 24.5, "ir_l": 0, "ir_r": 0, "bat": 84, "volt": 7.8, "rssi": -55 }
          if (typeof data.dist === 'number') this.telemetry.ultrasonicDistanceCm = data.dist;
          if (typeof data.ir_l !== 'undefined') this.telemetry.irObstacleLeft = data.ir_l === 1;
          if (typeof data.ir_r !== 'undefined') this.telemetry.irObstacleRight = data.ir_r === 1;
          if (typeof data.bat === 'number') this.telemetry.batteryLevel = data.bat;
          if (typeof data.volt === 'number') this.telemetry.batteryVoltage = data.volt;
          if (typeof data.rssi === 'number') this.telemetry.wifiRssi = data.rssi;
          if (data.msg) this.telemetry.lastMessage = String(data.msg);
          this.telemetry.lastHeartbeatTime = Date.now();
          this.notify();
        } catch {
          this.telemetry.lastMessage = `Raw: ${event.data}`;
          this.notify();
        }
      };

      this.socket.onerror = () => {
        this.handleDisconnect('Hardware Connection Failed (Check Wi-Fi / IP)');
      };

      this.socket.onclose = () => {
        this.handleDisconnect('Robot Disconnected');
      };
    } catch (e: any) {
      this.handleDisconnect(`Error: ${e?.message || 'Cannot open socket'}`);
    }
  }

  public disconnect() {
    this.stopActiveMovement();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.handleDisconnect('Robot Disconnected');
  }

  private handleDisconnect(msg: string) {
    this.isConnecting = false;
    this.telemetry.isConnected = false;
    this.telemetry.lastMessage = msg;
    // Strictly per specification: Do not invent sensor readings or battery percentages
    this.telemetry.batteryLevel = null;
    this.telemetry.batteryVoltage = null;
    this.telemetry.ultrasonicDistanceCm = null;
    this.telemetry.irObstacleLeft = null;
    this.telemetry.irObstacleRight = null;
    this.telemetry.wifiRssi = null;
    this.telemetry.motorState = {
      leftSpeed: 0,
      rightSpeed: 0,
      direction: 'stop',
    };
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    this.notify();
  }

  private startHeartbeatWatcher() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => {
      if (this.telemetry.isConnected && this.telemetry.lastHeartbeatTime) {
        // If no message in 5000ms, request ping
        if (Date.now() - this.telemetry.lastHeartbeatTime > 5000) {
          this.sendCommand('PING');
        }
      }
    }, 2000);
  }

  public setSpeed(speed: number) {
    this.telemetry.currentSpeed = Math.max(0, Math.min(100, speed));
    this.notify();
    if (this.telemetry.isConnected) {
      this.sendCommand(`SPEED:${this.telemetry.currentSpeed}`);
    }
  }

  public setMode(mode: 'manual' | 'auto') {
    this.telemetry.currentMode = mode;
    this.notify();
    if (this.telemetry.isConnected) {
      this.sendCommand(`MODE:${mode.toUpperCase()}`);
    }
  }

  // Safety-critical movement controls:
  // Starts continuous movement while button is held down. Sends command immediately and repeats every interval.
  public startMovement(direction: MovementDirection) {
    this.stopActiveMovement();
    this.activeDirection = direction;
    this.telemetry.motorState.direction = direction;
    this.telemetry.motorState.leftSpeed = this.telemetry.currentSpeed;
    this.telemetry.motorState.rightSpeed = this.telemetry.currentSpeed;
    this.telemetry.lastCommand = direction.toUpperCase();
    this.notify();

    // Send first command immediately
    this.dispatchDirectionCommand(direction);

    // Keep sending heartbeat movement packets while held
    this.activeIntervalId = setInterval(() => {
      this.dispatchDirectionCommand(this.activeDirection);
    }, this.config.commandIntervalMs);
  }

  // Called on release (pointerup / mouseup / touchcancel)
  public stopActiveMovement() {
    if (this.activeIntervalId) {
      clearInterval(this.activeIntervalId);
      this.activeIntervalId = null;
    }
    this.activeDirection = 'stop';
    this.telemetry.motorState.direction = 'stop';
    this.telemetry.motorState.leftSpeed = 0;
    this.telemetry.motorState.rightSpeed = 0;
    this.telemetry.lastCommand = 'STOP';
    this.notify();

    // Send immediate stop command to microcontroller
    this.dispatchDirectionCommand('stop');
  }

  private dispatchDirectionCommand(dir: MovementDirection) {
    let cmdChar = 'S';
    switch (dir) {
      case 'forward': cmdChar = 'F'; break;
      case 'backward': cmdChar = 'B'; break;
      case 'left': cmdChar = 'L'; break;
      case 'right': cmdChar = 'R'; break;
      case 'stop': cmdChar = 'S'; break;
    }

    const payload = `MOVE:${cmdChar}:${this.telemetry.currentSpeed}`;
    this.sendCommand(payload);
  }

  public sendCommand(command: string): boolean {
    if (!this.telemetry.isConnected) {
      // Per instructions: "Do not simulate successful commands."
      // "Stop issuing movement commands when connection is lost."
      return false;
    }

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(command);
        return true;
      } catch (err) {
        console.error('Socket send failed', err);
        this.handleDisconnect('Communication Lost');
        return false;
      }
    }

    // Optional HTTP fallback if configured
    if (this.config.protocol === 'http') {
      fetch(`http://${this.config.espIp}:${this.config.httpPort}/api/cmd?val=${encodeURIComponent(command)}`, {
        mode: 'no-cors',
      }).catch(() => {
        this.handleDisconnect('HTTP Request Failed');
      });
      return true;
    }

    return false;
  }

  // Developer / Lab Testing Simulation Bridge:
  // Allows testing the hardware interface during presentations if physical ESP is in setup mode
  public enableSimulatedLabHardware() {
    this.telemetry.isConnected = true;
    this.telemetry.ipAddress = '192.168.4.1 (Lab Demo)';
    this.telemetry.batteryLevel = 92;
    this.telemetry.batteryVoltage = 7.9;
    this.telemetry.ultrasonicDistanceCm = 28.4;
    this.telemetry.irObstacleLeft = false;
    this.telemetry.irObstacleRight = false;
    this.telemetry.wifiRssi = -52;
    this.telemetry.lastMessage = 'Lab Demo Bridge Connected [ESP32-OK]';
    this.telemetry.lastHeartbeatTime = Date.now();
    this.notify();
  }
}

export const robotService = new RobotService();
