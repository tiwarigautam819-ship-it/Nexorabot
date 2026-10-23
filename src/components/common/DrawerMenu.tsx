import React from 'react';
import {
  Home,
  Layers,
  Cpu,
  Image,
  Users,
  Gamepad2,
  Activity,
  Camera,
  Calendar,
  ShieldCheck,
  Settings,
  Mail,
  X,
  FileCode2,
  ChevronRight,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Screen } from '../../types';

export const DrawerMenu: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    currentScreen,
    navigateTo,
    adminUser,
    telemetry,
    setShowAndroidExportModal,
  } = useApp();

  if (!isDrawerOpen) return null;

  const menuItems: { id: Screen; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'project', label: 'Our Project', icon: <Layers className="w-4 h-4" /> },
    { id: 'components', label: 'Components', icon: <Cpu className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <Image className="w-4 h-4" /> },
    { id: 'team', label: 'Our Team', icon: <Users className="w-4 h-4" /> },
    { id: 'control', label: 'Robot Control', icon: <Gamepad2 className="w-4 h-4" />, badge: telemetry.isConnected ? 'Ready' : 'Offline' },
    { id: 'sensors', label: 'Sensors Telemetry', icon: <Activity className="w-4 h-4" /> },
    { id: 'camera', label: 'Camera View', icon: <Camera className="w-4 h-4" /> },
    { id: 'timeline', label: 'Project Development', icon: <Calendar className="w-4 h-4" /> },
    {
      id: adminUser.isAuthenticated ? 'admin' : 'login',
      label: adminUser.isAuthenticated ? 'Admin Panel' : 'Admin Login',
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: adminUser.isAuthenticated ? 'Active' : 'Auth',
    },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Body */}
      <div className="relative z-10 w-4/5 max-w-xs h-full bg-[#081022] border-r border-cyan-900/40 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-cyan-950/60 bg-gradient-to-b from-[#0a152e] to-[#081022]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/40">
                  <span className="font-extrabold text-white text-sm">N</span>
                </div>
                <div>
                  <h2 className="font-tech text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-none">
                    NEXORA
                  </h2>
                  <p className="text-[10px] text-cyan-300/80 font-medium tracking-wide">
                    Robot Control Engine
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-cyan-950/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Innovating Today, Engineering Tomorrow.
            </p>

            {/* Hardware Status chip */}
            <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0d1c3a] border border-cyan-900/40 text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                {telemetry.isConnected ? (
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <WifiOff className="w-3.5 h-3.5 text-red-400" />
                )}
                Hardware Status
              </span>
              <span
                className={`font-semibold ${
                  telemetry.isConnected ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {telemetry.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-2 px-3 space-y-0.5">
            {menuItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-900/60 to-blue-900/40 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                          item.badge === 'Ready' || item.badge === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-cyan-950/60 bg-[#060c18] space-y-2">
          {/* Android Code Explorer Button */}
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              setShowAndroidExportModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-sm transition-all active:scale-98"
          >
            <FileCode2 className="w-4 h-4 text-cyan-400" />
            <span>Android Studio Project</span>
          </button>

          <div className="pt-2 text-center">
            <p className="text-[10px] text-slate-500">
              Nexora Robot Engine v2.4 (Android Native)
            </p>
            <p className="text-[9px] text-slate-600 mt-0.5">
              Lead: tiwarigautam819@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
