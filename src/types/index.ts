export type Screen = 
  | 'splash'
  | 'login'
  | 'home'
  | 'control'
  | 'camera'
  | 'sensors'
  | 'project'
  | 'components'
  | 'gallery'
  | 'team'
  | 'timeline'
  | 'admin'
  | 'settings';

export type RobotMode = 'manual' | 'auto';

export type MovementDirection = 'forward' | 'backward' | 'left' | 'right' | 'stop';

export interface RobotTelemetry {
  isConnected: boolean;
  ipAddress: string;
  port: number;
  batteryLevel: number | null; // null represents unavailable (never invent values)
  batteryVoltage: number | null;
  ultrasonicDistanceCm: number | null; // null if unavailable
  irObstacleLeft: boolean | null;
  irObstacleRight: boolean | null;
  wifiRssi: number | null; // dBm
  currentMode: RobotMode;
  currentSpeed: number; // 0 to 100
  lastCommand: string;
  lastMessage: string;
  lastHeartbeatTime: number | null;
  motorState: {
    leftSpeed: number;
    rightSpeed: number;
    direction: MovementDirection;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  contribution: string;
  bio: string;
  photoUrl: string;
  isLead?: boolean;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: 'controller' | 'motor' | 'driver' | 'sensor' | 'communication' | 'display' | 'chassis';
  description: string;
  purpose: string;
  specification: string;
  status: 'Implemented' | 'In Testing' | 'Planned';
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'all' | 'robot' | 'circuit' | 'components' | 'expo';
  imageUrl: string;
  date: string;
  description: string;
}

export interface TimelinePhase {
  id: number;
  phaseNumber: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  milestones: string[];
  targetDate: string;
}

export interface RobotConfig {
  espIp: string;
  httpPort: number;
  wsPort: number;
  protocol: 'websocket' | 'http';
  cameraStreamUrl: string;
  cameraSnapshotUrl: string;
  commandIntervalMs: number;
  safetyTimeoutMs: number;
  autoReconnect: boolean;
}

export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
  token?: string;
  lastLogin?: string;
}
