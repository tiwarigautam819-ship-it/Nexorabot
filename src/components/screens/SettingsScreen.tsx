import React, { useState } from 'react';
import {
  Bell,
  ChevronRight,
  Globe,
  Info,
  Moon,
  Radio,
  Shield,
  Smartphone,
  Wifi,
  FileCode2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';

export const SettingsScreen: React.FC = () => {
  const { navigateTo, config, updateConfig, setShowAndroidExportModal } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showWifiModal, setShowWifiModal] = useState(false);

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Settings"
        showBack
      />

      <div className="flex-1 px-4 py-3 space-y-4">
        {/* App Settings Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            App Settings
          </h3>

          <div className="rounded-2xl bg-[#09152b] border border-cyan-950 divide-y divide-cyan-950/60 overflow-hidden">
            {/* Notification toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Notification</p>
                  <p className="text-[10px] text-slate-400">Telemetry & safety alerts</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Dark Mode</p>
                  <p className="text-[10px] text-slate-400">Robotics high-contrast theme</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <button
              onClick={() => alert('English is the primary system language.')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-cyan-950/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Language</p>
                  <p className="text-[10px] text-slate-400">System locale</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>English</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            {/* About Nexora */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-cyan-950/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">About Nexora</p>
                  <p className="text-[10px] text-slate-400">Version, team & licensing</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Connection Settings Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Connection Settings
          </h3>

          <div className="rounded-2xl bg-[#09152b] border border-cyan-950 divide-y divide-cyan-950/60 overflow-hidden">
            {/* Wi-Fi Configuration */}
            <button
              onClick={() => setShowWifiModal(true)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-cyan-950/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Wi-Fi Configuration</p>
                  <p className="text-[10px] text-slate-400">SoftAP SSID & password setup</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {/* Robot Communication */}
            <button
              onClick={() => navigateTo('admin')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-cyan-950/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Robot Communication</p>
                  <p className="text-[10px] text-slate-400">WebSocket / HTTP port configuration</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Native Android Project Shortcut */}
        <div className="pt-2">
          <button
            onClick={() => setShowAndroidExportModal(true)}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 flex items-center justify-between text-left hover:border-cyan-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Native Android Studio Source</p>
                <p className="text-[10px] text-cyan-400/90">
                  Kotlin & Jetpack Compose files, Gradle, ESP32 Sketch
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-3.5 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
              <span className="font-tech text-3xl font-extrabold text-white">N</span>
            </div>

            <div>
              <h2 className="font-tech text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                NEXORA
              </h2>
              <p className="text-xs font-semibold text-cyan-300">Robot Control Engine</p>
              <p className="text-[11px] text-slate-400 italic mt-0.5">
                Innovating Today, Engineering Tomorrow.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#060c18] border border-cyan-950 text-left space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Package Name:</span>
                <span className="font-mono-code text-cyan-400">com.nexora.robotcontrol</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Architecture:</span>
                <span className="text-slate-200">MVVM &bull; StateFlow &bull; Compose</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Project Lead:</span>
                <span className="text-slate-200">Gautam Tiwari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Authorized Admin:</span>
                <span className="font-mono-code text-slate-300">tiwarigautam819@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Safety Watchdog:</span>
                <span className="text-emerald-400 font-semibold">400ms Auto-Halt Active</span>
              </div>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Wi-Fi Setup Modal */}
      {showWifiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#09152b] border border-cyan-500/40 p-5 space-y-3.5 shadow-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span>Robot Wi-Fi Hotspot Setup</span>
            </h3>

            <div className="p-3 rounded-xl bg-[#060c18] border border-cyan-950 text-xs space-y-2">
              <p className="text-slate-300">
                To link your Android phone to Nexora Smart Robot:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-400 text-[11px]">
                <li>Power on the robot using the main rocker switch.</li>
                <li>Connect phone Wi-Fi to SSID: <strong className="text-cyan-300 font-mono-code">NEXORA_ROBOT_AP</strong></li>
                <li>Default Password: <strong className="text-cyan-300 font-mono-code">nexora1234</strong></li>
                <li>Default Gateway IP: <strong className="text-cyan-300 font-mono-code">192.168.4.1</strong></li>
              </ol>
            </div>

            <button
              onClick={() => setShowWifiModal(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
