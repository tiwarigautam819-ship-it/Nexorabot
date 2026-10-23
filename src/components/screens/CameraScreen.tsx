import React, { useState } from 'react';
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Maximize2,
  Minimize2,
  RefreshCw,
  Settings,
  Sliders,
  Video,
  VideoOff,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';

export const CameraScreen: React.FC = () => {
  const { config, updateConfig, navigateTo } = useApp();
  const [streamUrl, setStreamUrl] = useState(config.cameraStreamUrl);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isStreamLoading, setIsStreamLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [streamError, setStreamError] = useState(false);

  const hasConfiguredStream = Boolean(config.cameraStreamUrl && config.cameraStreamUrl.trim().length > 0);

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setStreamError(false);
    updateConfig({ cameraStreamUrl: streamUrl });
    setIsStreamLoading(true);
    setTimeout(() => setIsStreamLoading(false), 1200);
  };

  const handleUseDemoStream = () => {
    // A reliable test live stream for robotics demonstration (or sample stream)
    const demoUrl = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80';
    setStreamUrl(demoUrl);
    updateConfig({ cameraStreamUrl: demoUrl });
    setStreamError(false);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top App Bar */}
      <TopAppBar
        title="Camera View"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-4">
        {/* Camera Connection Alert Banner */}
        {!hasConfiguredStream || streamError ? (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/80 via-[#280d14] to-[#1a080d] border border-red-500/50 shadow-lg flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <VideoOff className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-red-300 tracking-wide uppercase">
                Camera Offline
              </h3>
              <p className="text-[11px] text-red-400/90 mt-0.5">
                Waiting for camera stream... Check Wi-Fi connection and ESP32-CAM stream URL.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-[#091a2e] border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-emerald-300 font-mono-code">
                  Camera Online (ESP32-CAM Hotspot)
                </p>
                <p className="text-[10px] text-slate-400">Stream: {config.cameraStreamUrl}</p>
              </div>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono-code">25 FPS</span>
          </div>
        )}

        {/* Video Player Display Container */}
        <div
          className={`relative rounded-2xl bg-[#050b16] border border-cyan-950/80 overflow-hidden flex flex-col items-center justify-center transition-all ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-black border-none' : 'h-72 w-full shadow-2xl'
          }`}
        >
          {hasConfiguredStream && !streamError ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <img
                src={config.cameraStreamUrl}
                alt="Robot Live Camera Stream"
                className="w-full h-full object-contain"
                onError={() => setStreamError(true)}
              />

              {/* HUD Overlay details */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono-code text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>REC &bull; LIVE_FEED</span>
              </div>

              <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono-code text-slate-300">
                CAM_OV2640 &bull; 640x480
              </div>
            </div>
          ) : (
            /* Empty State matching reference image */
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#0c1833] border border-cyan-900/40 flex items-center justify-center text-slate-400 shadow-inner">
                <Video className="w-8 h-8 text-cyan-400/60" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">No stream available</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Please check the camera connection or configure the camera stream URL in the admin panel.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setShowConfig(true)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-600/40 text-cyan-300 text-xs font-medium transition-colors"
                >
                  Configure URL
                </button>
                <button
                  onClick={handleUseDemoStream}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Sample Cam Feed
                </button>
              </div>
            </div>
          )}

          {/* Fullscreen control button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-[#081226]/80 hover:bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </>
            )}
          </button>
        </div>

        {/* Camera Quick Stream URL Config */}
        <div className="p-4 rounded-2xl bg-[#09152b] border border-cyan-950 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Camera Stream Configuration</span>
            </h4>
            <button
              onClick={() => navigateTo('admin')}
              className="text-[11px] text-cyan-400 hover:underline"
            >
              Admin Settings &rarr;
            </button>
          </div>

          <form onSubmit={handleApplyUrl} className="space-y-2">
            <label className="text-[10px] text-slate-400 block">
              MJPEG / HTTP Stream URL (e.g. http://192.168.4.1:81/stream):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="http://192.168.4.1/stream"
                className="flex-1 bg-[#060c18] border border-cyan-900/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-400 font-mono-code"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
              >
                Apply
              </button>
            </div>
          </form>

          <p className="text-[10px] text-slate-500 leading-normal">
            Compatible with ESP32-CAM (AI-Thinker module) HTTP MJPEG endpoints and Wi-Fi hotspot camera streams.
          </p>
        </div>
      </div>
    </div>
  );
};
