import React from 'react';

interface RobotGraphicProps {
  className?: string;
  isOnline?: boolean;
}

export const RobotGraphic: React.FC<RobotGraphicProps> = ({
  className = 'w-full h-full',
  isOnline = false,
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 filter drop-shadow-[0_10px_20px_rgba(6,182,212,0.25)]"
      >
        <defs>
          {/* Wheel gradients */}
          <linearGradient id="yellowTireGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="60%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="blackRubberGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27272A" />
            <stop offset="50%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>

          {/* Chassis gradient */}
          <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
          </linearGradient>

          {/* Arduino PCB blue */}
          <linearGradient id="arduinoPcb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* L298N Heat sink red */}
          <linearGradient id="l298nSink" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Sonar cylinder metallic */}
          <linearGradient id="sonarMetal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>

        {/* Shadow under robot */}
        <ellipse cx="160" cy="180" rx="125" ry="24" fill="#030712" fillOpacity="0.8" />
        <ellipse cx="160" cy="180" rx="80" ry="14" fill="#00E5FF" fillOpacity="0.12" />

        {/* Rear Left Wheel */}
        <g id="rearLeftWheel">
          <rect x="36" y="44" width="28" height="64" rx="8" fill="url(#blackRubberGrad)" stroke="#3F3F46" strokeWidth="2" />
          <rect x="42" y="52" width="16" height="48" rx="4" fill="url(#yellowTireGrad)" />
          {/* Wheel spokes */}
          <circle cx="50" cy="76" r="4" fill="#18181B" />
        </g>

        {/* Rear Right Wheel */}
        <g id="rearRightWheel">
          <rect x="256" y="44" width="28" height="64" rx="8" fill="url(#blackRubberGrad)" stroke="#3F3F46" strokeWidth="2" />
          <rect x="262" y="52" width="16" height="48" rx="4" fill="url(#yellowTireGrad)" />
          <circle cx="270" cy="76" r="4" fill="#18181B" />
        </g>

        {/* Front Left Wheel */}
        <g id="frontLeftWheel">
          <rect x="36" y="124" width="28" height="66" rx="8" fill="url(#blackRubberGrad)" stroke="#3F3F46" strokeWidth="2" />
          <rect x="42" y="132" width="16" height="50" rx="4" fill="url(#yellowTireGrad)" />
          <circle cx="50" cy="157" r="4" fill="#18181B" />
        </g>

        {/* Front Right Wheel */}
        <g id="frontRightWheel">
          <rect x="256" y="124" width="28" height="66" rx="8" fill="url(#blackRubberGrad)" stroke="#3F3F46" strokeWidth="2" />
          <rect x="262" y="132" width="16" height="50" rx="4" fill="url(#yellowTireGrad)" />
          <circle cx="270" cy="157" r="4" fill="#18181B" />
        </g>

        {/* Main 4WD Acrylic Chassis Platform */}
        <rect
          x="56"
          y="56"
          width="208"
          height="124"
          rx="18"
          fill="url(#chassisGrad)"
          stroke="#00E5FF"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Decorative Grid and Circuit Lines */}
        <path d="M 68 85 L 252 85" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 68 120 L 252 120" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 68 155 L 252 155" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />

        {/* Arduino Microcontroller PCB Board (Left Center) */}
        <g id="arduinoBoard">
          <rect x="80" y="74" width="70" height="88" rx="4" fill="url(#arduinoPcb)" stroke="#38BDF8" strokeWidth="1" />
          {/* Main MCU IC */}
          <rect x="94" y="94" width="42" height="14" rx="2" fill="#09090B" />
          <text x="98" y="104" fill="#E0F2FE" fontSize="6" fontFamily="monospace">ATMEGA328P</text>
          {/* Header pins */}
          <rect x="83" y="77" width="64" height="4" fill="#020617" />
          <rect x="83" y="154" width="64" height="4" fill="#020617" />
          <text x="86" y="136" fill="#BAE6FD" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Arduino</text>
          <text x="86" y="145" fill="#38BDF8" fontSize="6" fontFamily="sans-serif">UNO R3</text>
        </g>

        {/* L298N Motor Driver with Red Heat Sink (Right Center) */}
        <g id="motorDriver">
          <rect x="170" y="86" width="68" height="66" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1" />
          {/* Aluminum Fin Heat Sink */}
          <rect x="180" y="90" width="48" height="26" rx="2" fill="url(#l298nSink)" />
          {/* Fins lines */}
          <line x1="188" y1="90" x2="188" y2="116" stroke="#B91C1C" strokeWidth="1.5" />
          <line x1="196" y1="90" x2="196" y2="116" stroke="#B91C1C" strokeWidth="1.5" />
          <line x1="204" y1="90" x2="204" y2="116" stroke="#B91C1C" strokeWidth="1.5" />
          <line x1="212" y1="90" x2="212" y2="116" stroke="#B91C1C" strokeWidth="1.5" />
          {/* Screw terminal blocks */}
          <rect x="174" y="128" width="16" height="18" fill="#15803D" rx="2" />
          <rect x="216" y="128" width="16" height="18" fill="#15803D" rx="2" />
        </g>

        {/* Forward Mount: HC-SR04 Ultrasonic Sonar Sensor ("Eyes") */}
        <g id="sonarSensor">
          {/* Sensor PCB */}
          <rect x="110" y="22" width="100" height="34" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          
          {/* Left Transducer Cylinder (Transmitter) */}
          <circle cx="134" cy="39" r="14" fill="url(#sonarMetal)" stroke="#334155" strokeWidth="1" />
          <circle cx="134" cy="39" r="10" fill="#0F172A" />
          <circle cx="134" cy="39" r="6" fill="#1E293B" />
          <text x="127" y="42" fill="#94A3B8" fontSize="8" fontWeight="bold">T</text>

          {/* Right Transducer Cylinder (Receiver) */}
          <circle cx="186" cy="39" r="14" fill="url(#sonarMetal)" stroke="#334155" strokeWidth="1" />
          <circle cx="186" cy="39" r="10" fill="#0F172A" />
          <circle cx="186" cy="39" r="6" fill="#1E293B" />
          <text x="180" y="42" fill="#94A3B8" fontSize="8" fontWeight="bold">R</text>

          {/* Sonar text */}
          <text x="144" y="32" fill="#F8FAFC" fontSize="6" fontFamily="monospace">HC-SR04</text>
          
          {/* Ultrasonic pulses effect if online */}
          {isOnline && (
            <>
              <path d="M 120 16 A 18 18 0 0 1 148 16" stroke="#00E5FF" strokeWidth="1.5" fill="none" opacity="0.8" />
              <path d="M 172 16 A 18 18 0 0 1 200 16" stroke="#00E5FF" strokeWidth="1.5" fill="none" opacity="0.8" />
            </>
          )}
        </g>

        {/* Status Indicator LED (Glowing Cyan/Green) */}
        <circle
          cx="160"
          cy="66"
          r="4"
          fill={isOnline ? '#10B981' : '#EF4444'}
          filter="drop-shadow(0 0 6px #00E5FF)"
        />
        <text
          x="160"
          y="78"
          fill="#94A3B8"
          fontSize="6"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {isOnline ? 'SYS_ONLINE' : 'SYS_STANDBY'}
        </text>
      </svg>
    </div>
  );
};
