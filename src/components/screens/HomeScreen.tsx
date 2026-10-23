import React from 'react';
import {
  ArrowRight,
  Battery,
  Bot,
  Camera,
  Compass,
  Cpu,
  Gamepad2,
  Radio,
  Sliders,
  Wifi,
  WifiOff,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { BottomNavBar } from '../common/BottomNavBar';
import { RobotGraphic } from '../common/RobotGraphic';

export const HomeScreen: React.FC = () => {
  const { telemetry, navigateTo, connectRobot, enableSimulatedLabHardware } = useApp();

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top App Bar */}
      <TopAppBar
        showMenu
        showLogo
        showNotifications
        showAvatar
      />

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-3 space-y-4">
        {/* Featured Robot Project Card */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#0e1a38] via-[#0a152e] to-[#081226] border border-cyan-500/25 p-4 shadow-xl overflow-hidden group">
          {/* Subtle tech background glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Robot image container */}
          <div className="relative w-full h-44 rounded-xl bg-[#060e20] border border-cyan-950/60 overflow-hidden flex items-center justify-center mb-3">
            <div className="absolute inset-0 bg-radial from-cyan-950/30 via-transparent to-transparent opacity-80" />
            <RobotGraphic isOnline={telemetry.isConnected} className="w-full h-full py-1" />
            {/* Live Status Badge */}
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#060c18]/80 backdrop-blur-md border border-cyan-500/30 flex items-center gap-1.5 text-[10px]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  telemetry.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                }`}
              />
              <span className="font-mono-code text-slate-300">
                {telemetry.isConnected ? 'LINK_OK' : 'OFFLINE'}
              </span>
            </div>
          </div>

          {/* Details */}
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Nexora Smart Robot
            </h2>
            <p className="text-[11px] text-cyan-400/90 font-medium mt-0.5">
              Smart &bull; Mobile Controlled &bull; Autonomous
            </p>

            <p className="text-xs text-slate-400 mt-2 line-clamp-2">
              Next-generation robotics prototype engineered with custom Control Engine, 4WD traction, and dual obstacle avoidance.
            </p>

            <div className="mt-3.5 flex items-center justify-between">
              <button
                onClick={() => navigateTo('project')}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>View Project Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {!telemetry.isConnected ? (
                <button
                  onClick={() => connectRobot()}
                  className="px-2.5 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-800/50 text-[11px] text-cyan-300 transition-colors"
                >
                  Connect Hardware
                </button>
              ) : (
                <span className="text-[11px] text-emerald-400 font-mono-code">
                  ESP32 Online
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2x2 Telemetry Status Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Robot Status */}
          <div
            onClick={() => navigateTo('control')}
            className="p-3.5 rounded-2xl bg-[#09142b] border border-cyan-950/70 hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  telemetry.isConnected
                    ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-950/50 text-red-400 border border-red-500/30'
                }`}
              >
                {telemetry.isConnected ? (
                  <Wifi className="w-4 h-4" />
                ) : (
                  <WifiOff className="w-4 h-4" />
                )}
              </div>
              <span className="text-[10px] font-mono-code text-slate-500">ESP32</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Robot Status</p>
            <p
              className={`text-sm font-bold mt-0.5 tracking-tight ${
                telemetry.isConnected ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {telemetry.isConnected ? 'Connected' : 'Disconnected'}
            </p>
          </div>

          {/* Card 2: Battery */}
          <div
            onClick={() => navigateTo('sensors')}
            className="p-3.5 rounded-2xl bg-[#09142b] border border-cyan-950/70 hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Battery className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-slate-500">PWR</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Battery</p>
            <p className="text-sm font-bold text-slate-200 mt-0.5">
              {telemetry.batteryLevel !== null ? `${telemetry.batteryLevel} %` : '-- %'}
            </p>
            <p className="text-[9px] text-slate-500">
              {telemetry.batteryLevel !== null ? `${telemetry.batteryVoltage || 7.4}V` : 'Not Available'}
            </p>
          </div>

          {/* Card 3: Sensors */}
          <div
            onClick={() => navigateTo('sensors')}
            className="p-3.5 rounded-2xl bg-[#09142b] border border-cyan-950/70 hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-slate-500">SONAR</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Sensors</p>
            <p className="text-sm font-bold text-slate-200 mt-0.5">
              {telemetry.ultrasonicDistanceCm !== null
                ? `${telemetry.ultrasonicDistanceCm} cm`
                : 'Not Available'}
            </p>
            <p className="text-[9px] text-slate-500">
              {telemetry.isConnected ? 'Active Polling' : 'Data Unavailable'}
            </p>
          </div>

          {/* Card 4: Mode */}
          <div
            onClick={() => navigateTo('control')}
            className="p-3.5 rounded-2xl bg-[#09142b] border border-cyan-950/70 hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-slate-500">ENG</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Mode</p>
            <p className="text-sm font-bold text-cyan-300 mt-0.5 capitalize">
              {telemetry.currentMode}
            </p>
            <p className="text-[9px] text-slate-500">Speed: {telemetry.currentSpeed}%</p>
          </div>
        </div>

        {/* Quick Actions Title */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Actions
            </h3>
            <span className="text-[10px] text-cyan-400/80 font-mono-code">DIRECT_LINK</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Robot Control Shortcut */}
            <button
              onClick={() => navigateTo('control')}
              className="p-4 rounded-2xl bg-gradient-to-b from-[#0a1835] to-[#071126] border border-cyan-500/30 hover:border-cyan-400/60 p-4 text-left flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 active:scale-98 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white mb-3 shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Robot Control
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Virtual Joystick & D-Pad
                </p>
              </div>
            </button>

            {/* Camera View Shortcut */}
            <button
              onClick={() => navigateTo('camera')}
              className="p-4 rounded-2xl bg-gradient-to-b from-[#0a1835] to-[#071126] border border-cyan-500/30 hover:border-cyan-400/60 p-4 text-left flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 active:scale-98 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-3 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Camera View
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Live Wi-Fi Stream
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Demonstration & Lab Bridge Quick Bar */}
        <div className="p-3 rounded-xl bg-[#081226]/80 border border-cyan-950 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-[11px] text-slate-400">
              Hardware Testing & Expo Bench:
            </span>
          </div>
          {!telemetry.isConnected ? (
            <button
              onClick={enableSimulatedLabHardware}
              className="px-2 py-1 rounded bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 text-[10px] text-cyan-300 font-mono-code transition-colors"
            >
              Simulate Lab HW
            </button>
          ) : (
            <span className="text-[10px] text-emerald-400 font-mono-code font-semibold">
              HW Live
            </span>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
};
