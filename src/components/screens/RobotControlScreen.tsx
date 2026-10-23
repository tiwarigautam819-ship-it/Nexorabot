import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Gauge,
  Octagon,
  RefreshCw,
  Settings,
  ShieldAlert,
  Sliders,
  Sparkles,
  Wifi,
  WifiOff,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { MovementDirection } from '../../types';

export const RobotControlScreen: React.FC = () => {
  const {
    telemetry,
    config,
    startMovement,
    stopMovement,
    triggerEmergencyStop,
    setRobotSpeed,
    setRobotMode,
    connectRobot,
    disconnectRobot,
    enableSimulatedLabHardware,
  } = useApp();

  const [activePressedBtn, setActivePressedBtn] = useState<MovementDirection | null>(null);
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [ipInput, setIpInput] = useState(config.espIp);

  // Direction handlers with touch safety:
  // Starts on pointer down / mouse down / touch start
  const handleDirectionPress = (dir: MovementDirection) => {
    setActivePressedBtn(dir);
    startMovement(dir);
  };

  // Halts immediately on pointer up / mouse leave / touch end / touch cancel
  const handleDirectionRelease = () => {
    setActivePressedBtn(null);
    stopMovement();
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 select-none overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Robot Control"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-4">
        {/* Hardware Communication Alert Banner */}
        {!telemetry.isConnected ? (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/80 via-[#260e14] to-[#1c080d] border border-red-500/50 shadow-lg shadow-red-950/30 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-red-300 tracking-wide uppercase">
                Robot Disconnected
              </h3>
              <p className="text-[11px] text-red-400/90 mt-0.5 leading-snug">
                Check your Wi-Fi connection and ESP32 hardware IP.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={() => connectRobot(ipInput)}
                  className="px-2.5 py-1 rounded-lg bg-red-500/30 hover:bg-red-500/40 border border-red-400/50 text-white text-[11px] font-semibold transition-all active:scale-95"
                >
                  Retry Connection
                </button>
                <button
                  onClick={enableSimulatedLabHardware}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-all"
                >
                  Demo Mode
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-[#091a2e] border border-emerald-500/40 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <div>
                <p className="text-xs font-bold text-emerald-300 font-mono-code">
                  ESP32 Linked: {telemetry.ipAddress}
                </p>
                <p className="text-[10px] text-slate-400">
                  Watchdog Active (400ms auto-stop safety)
                </p>
              </div>
            </div>
            <button
              onClick={disconnectRobot}
              className="text-[10px] text-red-400 hover:underline px-2 py-1"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* Mode Selector Tabs: Manual vs Automatic */}
        <div className="p-1 rounded-xl bg-[#0a1428] border border-cyan-950 flex items-center gap-1">
          <button
            onClick={() => setRobotMode('manual')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              telemetry.currentMode === 'manual'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setRobotMode('auto')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              telemetry.currentMode === 'auto'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Automatic</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Obstacle Avoid
            </span>
          </button>
        </div>

        {/* Central Controller Workspace: D-Pad & Speed Gauge */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Main Virtual D-Pad Console */}
          <div className="relative flex-1 flex items-center justify-center py-2">
            {/* Outer Glowing Circle Housing */}
            <div className="relative w-56 h-56 rounded-full bg-gradient-to-b from-[#0b1733] to-[#071024] p-2 border-2 border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)] flex items-center justify-center">
              {/* Inner Circle Frame */}
              <div className="relative w-full h-full rounded-full border border-cyan-400/20 bg-[#060e20] flex items-center justify-center">
                
                {/* UP / FORWARD BUTTON */}
                <button
                  onPointerDown={() => handleDirectionPress('forward')}
                  onPointerUp={handleDirectionRelease}
                  onPointerLeave={handleDirectionRelease}
                  onPointerCancel={handleDirectionRelease}
                  disabled={!telemetry.isConnected}
                  aria-label="Forward"
                  className={`absolute top-2 left-1/2 -translate-x-1/2 w-14 h-12 rounded-xl flex items-center justify-center transition-all ${
                    activePressedBtn === 'forward'
                      ? 'bg-cyan-400 text-black scale-95 shadow-[0_0_15px_#22d3ee]'
                      : 'bg-[#0f1f40] text-cyan-300 hover:bg-[#162d5d] border border-cyan-500/40 active:scale-95'
                  } ${!telemetry.isConnected ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ArrowUp className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* DOWN / BACKWARD BUTTON */}
                <button
                  onPointerDown={() => handleDirectionPress('backward')}
                  onPointerUp={handleDirectionRelease}
                  onPointerLeave={handleDirectionRelease}
                  onPointerCancel={handleDirectionRelease}
                  disabled={!telemetry.isConnected}
                  aria-label="Backward"
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-12 rounded-xl flex items-center justify-center transition-all ${
                    activePressedBtn === 'backward'
                      ? 'bg-cyan-400 text-black scale-95 shadow-[0_0_15px_#22d3ee]'
                      : 'bg-[#0f1f40] text-cyan-300 hover:bg-[#162d5d] border border-cyan-500/40 active:scale-95'
                  } ${!telemetry.isConnected ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ArrowDown className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* LEFT BUTTON */}
                <button
                  onPointerDown={() => handleDirectionPress('left')}
                  onPointerUp={handleDirectionRelease}
                  onPointerLeave={handleDirectionRelease}
                  onPointerCancel={handleDirectionRelease}
                  disabled={!telemetry.isConnected}
                  aria-label="Turn Left"
                  className={`absolute left-2 top-1/2 -translate-y-1/2 w-12 h-14 rounded-xl flex items-center justify-center transition-all ${
                    activePressedBtn === 'left'
                      ? 'bg-cyan-400 text-black scale-95 shadow-[0_0_15px_#22d3ee]'
                      : 'bg-[#0f1f40] text-cyan-300 hover:bg-[#162d5d] border border-cyan-500/40 active:scale-95'
                  } ${!telemetry.isConnected ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* RIGHT BUTTON */}
                <button
                  onPointerDown={() => handleDirectionPress('right')}
                  onPointerUp={handleDirectionRelease}
                  onPointerLeave={handleDirectionRelease}
                  onPointerCancel={handleDirectionRelease}
                  disabled={!telemetry.isConnected}
                  aria-label="Turn Right"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-14 rounded-xl flex items-center justify-center transition-all ${
                    activePressedBtn === 'right'
                      ? 'bg-cyan-400 text-black scale-95 shadow-[0_0_15px_#22d3ee]'
                      : 'bg-[#0f1f40] text-cyan-300 hover:bg-[#162d5d] border border-cyan-500/40 active:scale-95'
                  } ${!telemetry.isConnected ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* CENTER STOP BUTTON */}
                <button
                  onClick={triggerEmergencyStop}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex flex-col items-center justify-center shadow-lg shadow-red-500/30 hover:brightness-110 active:scale-90 transition-all border border-red-400/50 z-10"
                  aria-label="Immediate Stop"
                >
                  <span className="font-tech text-xs font-extrabold tracking-wider">STOP</span>
                </button>

              </div>
            </div>
          </div>

          {/* Vertical Speed Throttle Slider */}
          <div className="w-16 flex flex-col items-center justify-between py-2 px-1 rounded-2xl bg-[#09152e] border border-cyan-950">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Speed
            </span>
            <span className="font-mono-code text-cyan-400 text-xs font-bold my-1">
              {telemetry.currentSpeed}%
            </span>

            {/* Slider track */}
            <div className="relative h-36 flex items-center justify-center my-2">
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={telemetry.currentSpeed}
                onChange={(e) => setRobotSpeed(Number(e.target.value))}
                className="w-32 h-2 accent-cyan-400 -rotate-90 origin-center cursor-pointer bg-slate-800 rounded-lg"
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setRobotSpeed(Math.min(100, telemetry.currentSpeed + 10))}
                className="p-1 rounded bg-[#0d1e40] text-cyan-300 hover:bg-cyan-900/40 text-xs"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setRobotSpeed(Math.max(10, telemetry.currentSpeed - 10))}
                className="p-1 rounded bg-[#0d1e40] text-cyan-300 hover:bg-cyan-900/40 text-xs"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Direct Action Controls (Forward, Immediate Stop, Backward) */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <button
            onPointerDown={() => handleDirectionPress('forward')}
            onPointerUp={handleDirectionRelease}
            onPointerLeave={handleDirectionRelease}
            onPointerCancel={handleDirectionRelease}
            disabled={!telemetry.isConnected}
            className={`py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 font-semibold text-xs border transition-all ${
              activePressedBtn === 'forward'
                ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_15px_#22d3ee]'
                : 'bg-[#091630] text-cyan-300 border-cyan-900/60 hover:bg-[#0e2147] active:scale-95'
            } ${!telemetry.isConnected ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <ChevronUp className="w-4 h-4" />
            <span>Forward</span>
          </button>

          <button
            onClick={triggerEmergencyStop}
            className="py-3 px-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-600/25 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Octagon className="w-4 h-4" />
            <span>Stop</span>
          </button>

          <button
            onPointerDown={() => handleDirectionPress('backward')}
            onPointerUp={handleDirectionRelease}
            onPointerLeave={handleDirectionRelease}
            onPointerCancel={handleDirectionRelease}
            disabled={!telemetry.isConnected}
            className={`py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 font-semibold text-xs border transition-all ${
              activePressedBtn === 'backward'
                ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_15px_#22d3ee]'
                : 'bg-[#091630] text-cyan-300 border-cyan-900/60 hover:bg-[#0e2147] active:scale-95'
            } ${!telemetry.isConnected ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <ChevronDown className="w-4 h-4" />
            <span>Backward</span>
          </button>
        </div>

        {/* Safety & Protocol Footer Notes */}
        <div className="p-3 rounded-xl bg-[#071124] border border-cyan-950/60 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Microcontroller Watchdog:</span>
            <span className="font-mono-code text-cyan-400">400ms Heartbeat Failsafe</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Motor Active State:</span>
            <span className="font-mono-code font-bold uppercase text-slate-200">
              {telemetry.motorState.direction} ({telemetry.motorState.leftSpeed} PWM)
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Hardware Command:</span>
            <span className="font-mono-code text-xs text-amber-300 truncate max-w-[180px]">
              {telemetry.lastCommand}
            </span>
          </div>
        </div>

        {/* Hardware IP & Port Quick Configuration toggle */}
        <div className="pt-1">
          <button
            onClick={() => setShowConfigDrawer(!showConfigDrawer)}
            className="w-full text-center text-[11px] text-cyan-400/80 hover:text-cyan-300 py-1 transition-colors flex items-center justify-center gap-1"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showConfigDrawer ? 'Hide Hardware Connection Setup' : 'Hardware Connection Settings (ESP32 IP)'}</span>
          </button>

          {showConfigDrawer && (
            <div className="mt-2 p-3 rounded-xl bg-[#09152b] border border-cyan-900/60 space-y-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  ESP32 IP Address / Host:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="192.168.4.1"
                    className="flex-1 bg-[#060e20] border border-cyan-950 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono-code outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => connectRobot(ipInput)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                  >
                    Connect
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Default ESP32 Access Point IP: 192.168.4.1 | Port: 81 (WebSocket)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
