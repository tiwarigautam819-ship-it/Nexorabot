import React, { useEffect, useState } from 'react';
import { ArrowRight, Bot, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RobotGraphic } from '../common/RobotGraphic';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 12;
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-full flex flex-col justify-between items-center px-6 py-8 bg-[#060c18] overflow-hidden select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Branding */}
      <div className="z-10 flex flex-col items-center text-center mt-6">
        {/* Glowing 3D-effect Logo */}
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-cyan-400 p-0.5 shadow-xl shadow-cyan-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#081226] rounded-2xl flex items-center justify-center">
              <span className="font-tech text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500">
                N
              </span>
            </div>
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-md -z-10 animate-pulse" />
        </div>

        <h1 className="font-tech text-3xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
          NEXORA
        </h1>
        <p className="text-xs text-cyan-300/80 font-medium tracking-wide mt-1">
          Robot Control Engine
        </p>
        <p className="text-[12px] text-slate-400 italic mt-2">
          Innovating Today, Engineering Tomorrow.
        </p>
      </div>

      {/* Center 3D Robotic Vehicle Preview on glowing circular pedestal */}
      <div className="z-10 relative my-auto flex flex-col items-center justify-center">
        {/* Circular Glowing Pedestal */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Animated concentric rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '24s' }} />
          <div className="absolute inset-6 rounded-full border border-cyan-400/30 border-dashed animate-spin" style={{ animationDuration: '36s', animationDirection: 'reverse' }} />
          <div className="absolute inset-12 rounded-full bg-gradient-to-b from-cyan-500/10 to-transparent blur-md" />

          {/* Glowing bottom disc */}
          <div className="absolute bottom-6 w-56 h-14 bg-gradient-to-t from-cyan-500/40 via-blue-600/20 to-transparent rounded-[100%] blur-sm shadow-[0_0_30px_#06b6d4]" />

          {/* Robot Model Graphic */}
          <div className="relative z-10 w-64 h-52 flex items-center justify-center">
            <RobotGraphic isOnline={false} className="w-full h-full" />
          </div>
        </div>

        {/* Status chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono-code tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          SYSTEM_INITIALIZING
        </div>
      </div>

      {/* Bottom Progress Bar & Launch Buttons */}
      <div className="z-10 w-full max-w-xs flex flex-col items-center gap-4 mb-4">
        {/* Progress indicator */}
        <div className="w-full space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>Loading...</span>
            <span className="font-mono-code text-cyan-400">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0e1c38] rounded-full overflow-hidden p-0.5 border border-cyan-950/60">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 shadow-[0_0_10px_#06b6d4]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Enter Nexora Engine</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('login')}
          className="text-xs text-slate-400 hover:text-cyan-300 transition-colors"
        >
          Administrator Sign In
        </button>
      </div>
    </div>
  );
};
