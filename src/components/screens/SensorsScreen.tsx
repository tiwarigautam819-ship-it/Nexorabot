import React from 'react';
import {
  Activity,
  Battery,
  Bot,
  Cpu,
  Radio,
  RefreshCw,
  Signal,
  Wifi,
  WifiOff,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { BottomNavBar } from '../common/BottomNavBar';

export const SensorsScreen: React.FC = () => {
  const { telemetry, connectRobot, enableSimulatedLabHardware } = useApp();

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Sensors"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-3.5">
        {/* Connection summary badge */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#09152c] border border-cyan-950">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                telemetry.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
              }`}
            />
            <span className="text-xs font-semibold text-slate-200">
              {telemetry.isConnected ? 'Telemetry Link Active' : 'Sensors Offline'}
            </span>
          </div>
          {!telemetry.isConnected ? (
            <button
              onClick={enableSimulatedLabHardware}
              className="text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-700/50"
            >
              Simulate Live Data
            </button>
          ) : (
            <span className="text-[10px] text-emerald-400 font-mono-code">
              {Date.now() - (telemetry.lastHeartbeatTime || Date.now()) < 3000 ? 'Live Stream' : 'Idle'}
            </span>
          )}
        </div>

        {/* 1. Ultrasonic Sensor Card */}
        <div className="p-4 rounded-2xl bg-[#09142b] border border-cyan-950/80 hover:border-cyan-500/30 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">
                  Ultrasonic Sensor (HC-SR04)
                </h3>
                <p className="text-[10px] text-slate-400">Front Sonar Clearance</p>
              </div>
            </div>
            <span className="text-[10px] font-mono-code text-cyan-400">40 kHz</span>
          </div>

          <div className="flex items-end justify-between pt-2 border-t border-cyan-950/60">
            <div>
              <p className="text-[10px] text-slate-400">Measured Distance</p>
              <p className="text-2xl font-bold font-mono-code text-cyan-300 mt-0.5">
                {telemetry.ultrasonicDistanceCm !== null
                  ? `${telemetry.ultrasonicDistanceCm.toFixed(1)} cm`
                  : '-- cm'}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  telemetry.ultrasonicDistanceCm !== null
                    ? telemetry.ultrasonicDistanceCm < 20
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {telemetry.ultrasonicDistanceCm !== null
                  ? telemetry.ultrasonicDistanceCm < 20
                    ? 'OBSTACLE NEAR'
                    : 'CLEAR'
                  : 'Data Unavailable'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. IR Sensor Card */}
        <div className="p-4 rounded-2xl bg-[#09142b] border border-cyan-950/80 hover:border-cyan-500/30 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">
                  IR Obstacle Proximity
                </h3>
                <p className="text-[10px] text-slate-400">Left & Right Optical Diodes</p>
              </div>
            </div>
            <span className="text-[10px] font-mono-code text-cyan-400">DIGITAL</span>
          </div>

          <div className="flex items-end justify-between pt-2 border-t border-cyan-950/60">
            <div>
              <p className="text-[10px] text-slate-400">Status</p>
              <p className="text-sm font-bold font-mono-code text-slate-300 mt-0.5">
                {telemetry.irObstacleLeft !== null || telemetry.irObstacleRight !== null
                  ? `L: ${telemetry.irObstacleLeft ? 'BLOCK' : 'OK'} | R: ${telemetry.irObstacleRight ? 'BLOCK' : 'OK'}`
                  : '----'}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  telemetry.irObstacleLeft !== null
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {telemetry.irObstacleLeft !== null ? 'Calibrated' : 'Not Available'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Wi-Fi Card */}
        <div className="p-4 rounded-2xl bg-[#09142b] border border-cyan-950/80 hover:border-cyan-500/30 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">Wi-Fi Telemetry</h3>
                <p className="text-[10px] text-slate-400">ESP32 SoftAP & WebSocket</p>
              </div>
            </div>
            <span className="text-[10px] font-mono-code text-cyan-400">2.4 GHz</span>
          </div>

          <div className="flex items-end justify-between pt-2 border-t border-cyan-950/60">
            <div>
              <p className="text-[10px] text-slate-400">Signal RSSI</p>
              <p className="text-xl font-bold font-mono-code text-cyan-300 mt-0.5">
                {telemetry.wifiRssi !== null ? `${telemetry.wifiRssi} dBm` : '-- dBm'}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  telemetry.isConnected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}
              >
                {telemetry.isConnected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Battery Monitoring Card */}
        <div className="p-4 rounded-2xl bg-[#09142b] border border-cyan-950/80 hover:border-cyan-500/30 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Battery className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">
                  Battery Power Monitor
                </h3>
                <p className="text-[10px] text-slate-400">2S Li-ion 7.4V Voltage Divider</p>
              </div>
            </div>
            <span className="text-[10px] font-mono-code text-cyan-400">VOLTAGE</span>
          </div>

          <div className="flex items-end justify-between pt-2 border-t border-cyan-950/60">
            <div>
              <p className="text-[10px] text-slate-400">Level & Voltage</p>
              <p className="text-xl font-bold font-mono-code text-cyan-300 mt-0.5">
                {telemetry.batteryLevel !== null ? `${telemetry.batteryLevel} %` : '-- %'}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  telemetry.batteryLevel !== null
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {telemetry.batteryLevel !== null
                  ? `${telemetry.batteryVoltage || 7.4}V Healthy`
                  : 'Not Available'}
              </span>
            </div>
          </div>
        </div>

        {/* Raw Hardware Message Console */}
        <div className="p-3.5 rounded-2xl bg-[#050c18] border border-cyan-950 font-mono-code text-[11px] space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold text-cyan-400">RAW_HARDWARE_LOG</span>
            <span className="text-[9px]">UART / WS PACKET</span>
          </div>
          <p className="text-slate-300 truncate">
            &gt; {telemetry.lastMessage || 'Waiting for microcontroller message stream...'}
          </p>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
