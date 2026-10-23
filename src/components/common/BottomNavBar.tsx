import React from 'react';
import { Home, Layers, Users, Image as ImageIcon, MoreHorizontal, Gamepad2, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Screen } from '../../types';

export const BottomNavBar: React.FC = () => {
  const { currentScreen, navigateTo, setIsDrawerOpen, telemetry } = useApp();

  const navItems: { id: Screen | 'more'; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'project', label: 'Project', icon: <Layers className="w-5 h-5" /> },
    { id: 'team', label: 'Team', icon: <Users className="w-5 h-5" /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'more', label: 'More', icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  const handleTabClick = (id: Screen | 'more') => {
    if (id === 'more') {
      setIsDrawerOpen(true);
    } else {
      navigateTo(id);
    }
  };

  return (
    <nav className="relative z-20 flex items-center justify-around px-2 py-2 bg-[#081022]/95 backdrop-blur-lg border-t border-cyan-950/40">
      {navItems.map((item) => {
        const isActive = item.id === currentScreen;
        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all duration-200 active:scale-95 relative ${
              isActive
                ? 'text-cyan-400 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              {item.icon}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              )}
            </div>
            <span className="text-[11px] mt-1 font-medium tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
