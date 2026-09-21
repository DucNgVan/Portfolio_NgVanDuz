import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Check, Heart } from 'lucide-react';

const HandshakeInteractive = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [hasShaken, setHasShaken] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  const triggerHandshake = () => {
    if (isShaking) return;

    setIsShaking(true);
    setHasShaken(true);
    setShakeCount((prev) => prev + 1);

    // Multi-stage celebratory confetti matching the editorial palette
    setTimeout(() => {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#d8c8a8', '#f4efea', '#e2d5bd', '#ffffff', '#111111'],
      });
    }, 350);

    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 50,
        origin: { x: 0.2, y: 0.7 },
        colors: ['#d8c8a8', '#f4efea'],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 50,
        origin: { x: 0.8, y: 0.7 },
        colors: ['#bfa882', '#ffffff'],
      });
    }, 700);

    setTimeout(() => {
      setIsShaking(false);
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#111111] border border-[#222222] shadow-2xl text-center overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d8c8a8]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#d8c8a8]/30 text-xs font-mono text-[#d8c8a8] mb-4">
        <Sparkles className="w-3.5 h-3.5 text-[#d8c8a8]" />
        <span>INTERACTIVE HANDSHAKE</span>
      </div>

      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-2">
        Let's Shake Hands!
      </h3>
      <p className="text-[#888888] text-xs sm:text-sm max-w-md mx-auto mb-6">
        A handshake marks the beginning of great partnerships and meaningful projects. Click below to connect!
      </p>

      {/* HANDSHAKE ANIMATION STAGE */}
      <div 
        onClick={triggerHandshake}
        className="relative h-44 w-full flex items-center justify-center cursor-pointer group select-none rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d8c8a8]/40 transition-all mb-6 overflow-hidden"
        title="Click to shake hands"
      >
        {/* Shockwave circles on handshake */}
        {isShaking && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border border-[#d8c8a8]/60 animate-ping"></div>
            <div className="w-40 h-40 rounded-full border border-[#d8c8a8]/30 animate-pulse"></div>
          </div>
        )}

        {/* SVG Interactive Hands Graphic */}
        <div className="relative flex items-center justify-center gap-2">
          
          {/* Left Hand (Visitor / Partner) */}
          <div
            className={`transition-transform duration-500 ${
              isShaking
                ? 'animate-hand-left -translate-x-2'
                : 'group-hover:translate-x-3 translate-x-0'
            }`}
          >
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28 text-[#f4efea] drop-shadow-[0_0_10px_rgba(244,239,234,0.3)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="5" y="42" width="22" height="24" rx="4" fill="#181818" stroke="#d8c8a8" strokeWidth="2" />
              <line x1="12" y1="46" x2="12" y2="62" stroke="#d8c8a8" strokeWidth="1.5" />
              <path
                d="M27 46 C35 44, 45 42, 54 48 C60 52, 64 58, 62 64 C60 69, 52 70, 42 66 C34 63, 27 60, 27 58 Z"
                fill="#333333"
                stroke="#f4efea"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M52 48 C58 45, 68 47, 72 52 C74 55, 71 59, 65 59 C60 59, 55 58, 52 57"
                stroke="#d8c8a8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 54 C56 52, 66 54, 70 58 C72 61, 68 64, 62 64 C57 64, 52 63, 49 62"
                stroke="#d8c8a8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M47 60 C53 58, 63 60, 66 64 C68 67, 64 70, 58 70 C53 70, 48 68, 45 67"
                stroke="#d8c8a8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-[11px] font-mono text-[#aaaaaa] mt-1">You (Visitor)</div>
          </div>

          {/* Sparkle icon at contact point */}
          <div className="relative z-10 flex flex-col items-center">
            {isShaking ? (
              <div className="p-2 rounded-full bg-[#d8c8a8] text-[#0d0d0d] font-bold animate-bounce shadow-lg shadow-[#d8c8a8]/50">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
            ) : (
              <div className="p-2 rounded-full bg-[#181818] border border-[#333333] text-[#888888] group-hover:text-[#d8c8a8] group-hover:border-[#d8c8a8]/50 transition-colors">
                <Heart className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Right Hand (Developer) */}
          <div
            className={`transition-transform duration-500 ${
              isShaking
                ? 'animate-hand-right translate-x-2'
                : 'group-hover:-translate-x-3 translate-x-0'
            }`}
          >
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28 text-[#d8c8a8] drop-shadow-[0_0_10px_rgba(216,200,168,0.4)] transform -scale-x-100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="5" y="42" width="22" height="24" rx="4" fill="#181818" stroke="#d8c8a8" strokeWidth="2" />
              <line x1="12" y1="46" x2="12" y2="62" stroke="#d8c8a8" strokeWidth="1.5" />
              <path
                d="M27 46 C35 44, 45 42, 54 48 C60 52, 64 58, 62 64 C60 69, 52 70, 42 66 C34 63, 27 60, 27 58 Z"
                fill="#2b261f"
                stroke="#d8c8a8"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M52 48 C58 45, 68 47, 72 52 C74 55, 71 59, 65 59 C60 59, 55 58, 52 57"
                stroke="#f4efea"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 54 C56 52, 66 54, 70 58 C72 61, 68 64, 62 64 C57 64, 52 63, 49 62"
                stroke="#f4efea"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M47 60 C53 58, 63 60, 66 64 C68 67, 64 70, 58 70 C53 70, 48 68, 45 67"
                stroke="#f4efea"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-[11px] font-mono text-[#d8c8a8] mt-1">Me (Developer)</div>
          </div>

        </div>

        {/* Floating Hint Overlay */}
        {!isShaking && !hasShaken && (
          <div className="absolute bottom-2 inset-x-0 text-center">
            <span className="text-[10px] font-mono tracking-widest text-[#d8c8a8] bg-[#111111]/90 px-3 py-1 rounded-full border border-[#d8c8a8]/30 shadow uppercase">
              ✦ Click to shake hands
            </span>
          </div>
        )}
      </div>

      {/* Button to trigger */}
      <button
        onClick={triggerHandshake}
        disabled={isShaking}
        className="w-full py-3.5 px-6 rounded-2xl bg-[#d8c8a8] hover:bg-[#e2d5bd] text-[#0d0d0d] font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#d8c8a8]/20"
      >
        {isShaking ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Shaking hands... Pleasure to meet you!</span>
          </>
        ) : (
          <>
            <span>🤝 Let's Connect & Shake Hands</span>
            {shakeCount > 0 && (
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full font-mono">
                ({shakeCount})
              </span>
            )}
          </>
        )}
      </button>

      {/* Congratulation Notification Badge */}
      {hasShaken && (
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#d8c8a8]/40 text-[#d8c8a8] text-xs font-mono flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Handshake confirmed! Excited to connect and collaborate with you.</span>
        </div>
      )}

    </div>
  );
};

export default HandshakeInteractive;
