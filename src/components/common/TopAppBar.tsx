import React from 'react';
import { ArrowLeft, Bell, Menu, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Screen } from '../../types';

interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  showSettings?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  showAvatar?: boolean;
  onBack?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  showBack = false,
  showLogo = false,
  showSettings = false,
  showMenu = false,
  showNotifications = false,
  showAvatar = false,
  onBack,
}) => {
  const { goBack, navigateTo, setIsDrawerOpen, adminUser, telemetry } = useApp();

  return (
    <header className="relative z-20 flex items-center justify-between px-4 py-3 bg-[#060c18]/90 backdrop-blur-md border-b border-cyan-950/40">
      <div className="flex items-center gap-2">
        {showMenu && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all rounded-lg hover:bg-cyan-950/30"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {showBack && (
          <button
            onClick={onBack || goBack}
            className="p-2 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all rounded-lg hover:bg-cyan-950/30"
            aria-label="Navigate back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {showLogo ? (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-sm shadow-cyan-500/50">
              <span className="font-extrabold text-white text-xs tracking-tighter">N</span>
            </div>
            <span className="font-tech text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              NEXORA
            </span>
          </div>
        ) : (
          title && (
            <h1 className="text-base font-semibold text-slate-100 tracking-wide flex items-center gap-2">
              {title}
            </h1>
          )
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {showSettings && (
          <button
            onClick={() => navigateTo('settings')}
            className="p-2 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all rounded-lg hover:bg-cyan-950/30"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        )}

        {showNotifications && (
          <button
            onClick={() => navigateTo('sensors')}
            className="relative p-2 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all rounded-lg hover:bg-cyan-950/30"
            aria-label="System status & alerts"
          >
            <Bell className="w-5 h-5" />
            {!telemetry.isConnected && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#060c18]" />
            )}
          </button>
        )}

        {showAvatar && (
          <button
            onClick={() => navigateTo(adminUser.isAuthenticated ? 'admin' : 'login')}
            className="relative p-0.5 rounded-full ring-1.5 ring-cyan-500/50 hover:ring-cyan-400 transition-all active:scale-95 ml-1"
            aria-label="Admin Profile"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Gautam Tiwari"
              className="w-7 h-7 rounded-full object-cover"
            />
            {adminUser.isAuthenticated && (
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#060c18]" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};
