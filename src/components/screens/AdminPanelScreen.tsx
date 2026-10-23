import React, { useState } from 'react';
import {
  Calendar,
  Camera,
  ChevronRight,
  Cpu,
  FileCode2,
  Image,
  Layers,
  Lock,
  LogOut,
  Radio,
  RefreshCw,
  Save,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Video,
  Wifi,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { AUTHORIZED_ADMIN_EMAIL } from '../../services/storageService';

export const AdminPanelScreen: React.FC = () => {
  const {
    adminUser,
    logoutAdmin,
    navigateTo,
    config,
    updateConfig,
    resetAllData,
    setShowAndroidExportModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'hub' | 'camera_config' | 'robot_config'>('hub');
  const [cameraUrl, setCameraUrl] = useState(config.cameraStreamUrl);
  const [espIp, setEspIp] = useState(config.espIp);
  const [wsPort, setWsPort] = useState(config.wsPort);
  const [protocol, setProtocol] = useState<'websocket' | 'http'>(config.protocol);
  const [safetyTimeout, setSafetyTimeout] = useState(config.safetyTimeoutMs);

  if (!adminUser.isAuthenticated) {
    return (
      <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 p-6 select-none">
        <TopAppBar title="Admin Authorization" showBack />
        <div className="my-auto text-center space-y-4 max-w-xs mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-red-950/40">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white">Administrator Access Required</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            This control room is restricted to authorized project lead:
            <span className="block font-mono-code text-cyan-400 font-semibold mt-1">
              {AUTHORIZED_ADMIN_EMAIL}
            </span>
          </p>
          <button
            onClick={() => navigateTo('login')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            Authenticate Administrator
          </button>
        </div>
      </div>
    );
  }

  const handleSaveHardwareConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      espIp,
      wsPort: Number(wsPort),
      protocol,
      safetyTimeoutMs: Number(safetyTimeout),
    });
    setActiveTab('hub');
  };

  const handleSaveCameraConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      cameraStreamUrl: cameraUrl,
    });
    setActiveTab('hub');
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Admin Panel"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-4">
        {/* Admin Credential Badge */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0d2247] via-[#091a38] to-[#071329] border border-cyan-500/40 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Gautam Tiwari</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  SUPER_ADMIN
                </span>
              </div>
              <p className="text-[10px] text-cyan-400/90 font-mono-code truncate max-w-[190px]">
                {adminUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-950/30 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {activeTab === 'hub' && (
          <>
            {/* Section 1: Project & Team Management list (Matching reference image) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Management Modules
              </h3>

              {/* 1. Project Management */}
              <button
                onClick={() => navigateTo('project')}
                className="w-full p-3 rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Project Management
                    </h4>
                    <p className="text-[10px] text-slate-400">Update project details & goals</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>

              {/* 2. Team Management */}
              <button
                onClick={() => navigateTo('team')}
                className="w-full p-3 rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Team Management
                    </h4>
                    <p className="text-[10px] text-slate-400">Add / edit team members & roles</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>

              {/* 3. Gallery Management */}
              <button
                onClick={() => navigateTo('gallery')}
                className="w-full p-3 rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Image className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Gallery Management
                    </h4>
                    <p className="text-[10px] text-slate-400">Upload & manage project images</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>

              {/* 4. Component Management */}
              <button
                onClick={() => navigateTo('components')}
                className="w-full p-3 rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Component Management
                    </h4>
                    <p className="text-[10px] text-slate-400">Add / edit hardware parts & status</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>

              {/* 5. Timeline Management */}
              <button
                onClick={() => navigateTo('timeline')}
                className="w-full p-3 rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Timeline Management
                    </h4>
                    <p className="text-[10px] text-slate-400">Update project phases & dates</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>

              {/* 6. Camera Configuration */}
              <button
                onClick={() => setActiveTab('camera_config')}
                className="w-full p-3 rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Camera Configuration
                    </h4>
                    <p className="text-[10px] text-slate-400">Set Wi-Fi camera stream URL</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>

              {/* 7. Robot Configuration */}
              <button
                onClick={() => setActiveTab('robot_config')}
                className="w-full p-3 rounded-2xl bg-[#09152b] border border-cyan-950 hover:border-cyan-500/40 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Robot Configuration
                    </h4>
                    <p className="text-[10px] text-slate-400">Set ESP32 IP, port & protocol</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>

            {/* Quick Export & Cloud Tools */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setShowAndroidExportModal(true)}
                className="w-full py-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>Export Native Android Studio Project</span>
              </button>

              <button
                onClick={resetAllData}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[11px] transition-colors"
              >
                Restore Factory Specifications
              </button>
            </div>
          </>
        )}

        {/* Camera Config Sub-panel */}
        {activeTab === 'camera_config' && (
          <form
            onSubmit={handleSaveCameraConfig}
            className="p-4 rounded-2xl bg-[#09152b] border border-cyan-950 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase text-white">Camera Configuration</h3>
              <button
                type="button"
                onClick={() => setActiveTab('hub')}
                className="text-xs text-cyan-400 hover:underline"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                MJPEG / HTTP Camera Stream URL:
              </label>
              <input
                type="text"
                value={cameraUrl}
                onChange={(e) => setCameraUrl(e.target.value)}
                placeholder="http://192.168.4.1/stream"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono-code"
              />
            </div>

            <p className="text-[10px] text-slate-500">
              Provide the live HTTP stream endpoint generated by the ESP32-CAM firmware (e.g. `http://192.168.4.1:81/stream`).
            </p>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 active:scale-98"
            >
              Save Camera Settings
            </button>
          </form>
        )}

        {/* Robot Config Sub-panel */}
        {activeTab === 'robot_config' && (
          <form
            onSubmit={handleSaveHardwareConfig}
            className="p-4 rounded-2xl bg-[#09152b] border border-cyan-950 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase text-white">
                Hardware Communication Setup
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('hub')}
                className="text-xs text-cyan-400 hover:underline"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                ESP32 / ESP8266 IP Address:
              </label>
              <input
                type="text"
                value={espIp}
                onChange={(e) => setEspIp(e.target.value)}
                placeholder="192.168.4.1"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono-code"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Port:</label>
                <input
                  type="number"
                  value={wsPort}
                  onChange={(e) => setWsPort(Number(e.target.value))}
                  placeholder="81"
                  className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono-code"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Protocol:</label>
                <select
                  value={protocol}
                  onChange={(e: any) => setProtocol(e.target.value)}
                  className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="websocket">WebSocket (Low Latency)</option>
                  <option value="http">HTTP REST</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Safety Watchdog Timeout (ms):
              </label>
              <input
                type="number"
                value={safetyTimeout}
                onChange={(e) => setSafetyTimeout(Number(e.target.value))}
                placeholder="400"
                className="w-full bg-[#060c18] border border-cyan-950 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono-code"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Motors halt immediately if no pulse is received within this time window.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 active:scale-98"
            >
              Save Hardware Settings
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
