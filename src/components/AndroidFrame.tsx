import React from 'react';
import { useApp } from '../context/AppContext';
import { DrawerMenu } from './common/DrawerMenu';
import { AndroidProjectViewerModal } from './common/AndroidProjectViewerModal';

export const AndroidFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notification } = useApp();

  return (
    <div className="relative w-full min-h-screen h-screen flex flex-col bg-[#060b16] text-slate-100 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Responsive App Wrapper: Fills entire screen on mobile, cleanly centered on wide screens */}
      <div className="relative w-full max-w-2xl mx-auto h-full flex flex-col bg-[#060c18] border-x border-cyan-950/20 shadow-2xl overflow-hidden">
        
        {/* Screen Content Viewport (Direct Android Interface filling the entire screen) */}
        <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col bg-[#060c18]">
          {children}
        </div>

      </div>

      {/* Navigation Drawer */}
      <DrawerMenu />

      {/* Android Studio Source Code Inspector Modal */}
      <AndroidProjectViewerModal />

      {/* Floating System Toast */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-950/95 to-[#0b1b36]/95 border border-cyan-400/60 text-cyan-200 text-xs font-semibold shadow-2xl shadow-cyan-500/30 backdrop-blur-md">
          {notification}
        </div>
      )}
    </div>
  );
};
