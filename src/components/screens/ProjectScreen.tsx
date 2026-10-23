import React from 'react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Radio,
  Shield,
  Smartphone,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/TopAppBar';
import { BottomNavBar } from '../common/BottomNavBar';
import { RobotGraphic } from '../common/RobotGraphic';

export const ProjectScreen: React.FC = () => {
  const { navigateTo } = useApp();

  const keyFeatures = [
    { title: 'Mobile Control', desc: 'Real-time Android remote touch steering', icon: <Smartphone className="w-5 h-5 text-cyan-400" /> },
    { title: 'Obstacle Detection', desc: 'Ultrasonic & IR proximity failsafes', icon: <Shield className="w-5 h-5 text-cyan-400" /> },
    { title: 'Custom Control Engine', desc: 'Bidirectional telemetry & watchdog', icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { title: 'Wi-Fi Communication', desc: 'Low-latency ESP32 WebSockets', icon: <Wifi className="w-5 h-5 text-cyan-400" /> },
  ];

  const componentsUsed = [
    'Arduino Uno',
    'DC Motors & Wheels',
    'Motor Driver (L298N)',
    'Ultrasonic Sensor (HC-SR04)',
    'IR Sensor',
    'ESP32 / ESP8266',
    'Wi-Fi Camera',
    'Display Screen',
  ];

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#060c18] text-slate-100 overflow-y-auto">
      {/* Top Bar */}
      <TopAppBar
        title="Our Project"
        showBack
        showSettings
      />

      <div className="flex-1 px-4 py-3 space-y-4">
        {/* Hero Photo Banner */}
        <div className="relative w-full h-48 rounded-2xl bg-[#09152b] border border-cyan-500/30 overflow-hidden flex items-center justify-center shadow-xl">
          <RobotGraphic isOnline={true} className="w-full h-full p-2" />
          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono-code text-cyan-300">
            PROTOTYPE_v2.4
          </div>
        </div>

        {/* Project Overview */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Nexora Smart Robot</h2>
          <p className="text-xs text-cyan-400 font-medium mt-0.5">
            Innovating Today, Engineering Tomorrow.
          </p>
        </div>

        {/* About the Project section */}
        <div className="p-4 rounded-2xl bg-[#09152b] border border-cyan-950 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            About the Project
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Nexora Smart Robot is a prototype of a smart, mobile-controlled robot designed with advanced sensors, wireless communication and our own Control Engine to provide seamless control and monitoring.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            Developed by our robotics engineering team for academic showcases and the upcoming Skill Expo, Nexora combines embedded hardware safety, live video telemetry, and high-traction 4WD mobility.
          </p>
        </div>

        {/* Key Features (4 rounded cards matching reference) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Key Features
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0a1733] to-[#071126] border border-cyan-500/20 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center mb-2 shadow-sm">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Components Used (Pill chips) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Components Used
            </h3>
            <button
              onClick={() => navigateTo('components')}
              className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View Specs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {componentsUsed.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo('components')}
                className="px-3 py-1.5 rounded-xl bg-[#09162e] hover:bg-cyan-950 border border-cyan-900/50 hover:border-cyan-500/40 text-[11px] text-slate-300 font-medium transition-all"
              >
                {comp}
              </button>
            ))}
          </div>
        </div>

        {/* Objectives Progress: Completed vs Under Development */}
        <div className="p-4 rounded-2xl bg-[#09152b] border border-cyan-950 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Project Objectives & Status
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Mobile-Controlled Robot:</span>
                <p className="text-[11px] text-slate-400">
                  Custom Android touch engine with directional joystick and speed throttle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Obstacle Detection:</span>
                <p className="text-[11px] text-slate-400">
                  HC-SR04 sonar module with threshold emergency braking.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-cyan-300">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Wireless Communication:</span>
                <p className="text-[11px] text-slate-400">
                  ESP32 high-frequency WebSockets with 400ms safety watchdog.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-amber-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Future Testing & Skill Expo:</span>
                <p className="text-[11px] text-slate-400">
                  Field obstacle courses, public expo demonstration, and onboard display reel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
