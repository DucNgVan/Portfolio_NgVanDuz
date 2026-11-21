import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Preloader = ({ onComplete }) => {
  const { lang } = useLanguage();
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(15);
  const [isReady, setIsReady] = useState(false);
  const hasCompletedRef = useRef(false);
  const fadeOutTimerRef = useRef(null);

  const safeComplete = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    // 1. Check if user prefers reduced motion; skip immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      safeComplete();
      return;
    }

    let modelLoaded = typeof window !== 'undefined' && Boolean(window.__cinematicModelLoaded);
    let windowLoaded = typeof document !== 'undefined' && document.readyState === 'complete';
    let minTimeElapsed = false;

    // Handle GLB 3D model loaded event from CinematicCanvas
    const handleGlbLoaded = () => {
      modelLoaded = true;
      checkAllReady();
    };
    window.addEventListener('glb-loaded', handleGlbLoaded);

    // Handle full window load event
    const handleWindowLoad = () => {
      windowLoaded = true;
      checkAllReady();
    };
    if (!windowLoaded) {
      window.addEventListener('load', handleWindowLoad);
    }

    // Minimum display timer for calm, luxurious handwriting animation (~2.8s)
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkAllReady();
    }, 2800);

    // Progressive simulated counter that approaches 90% while assets download
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const inc = Math.random() * 8 + 3;
        return Math.min(90, prev + inc);
      });
    }, 180);

    // Check if everything is fully loaded and ready
    const checkAllReady = () => {
      if (modelLoaded && (windowLoaded || document.readyState === 'complete') && minTimeElapsed) {
        clearInterval(progressInterval);
        setProgress(100);
        setIsReady(true);

        if (!fadeOutTimerRef.current && !hasCompletedRef.current) {
          fadeOutTimerRef.current = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              safeComplete();
            }, 650);
          }, 450);
        }
      }
    };

    // Safety fallback: if network stalls, do not trap user indefinitely (max 10s)
    const safetyMaxTimer = setTimeout(() => {
      modelLoaded = true;
      windowLoaded = true;
      minTimeElapsed = true;
      checkAllReady();
    }, 10000);

    return () => {
      window.removeEventListener('glb-loaded', handleGlbLoaded);
      window.removeEventListener('load', handleWindowLoad);
      clearTimeout(minTimer);
      clearTimeout(safetyMaxTimer);
      clearInterval(progressInterval);
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#070707] flex flex-col items-center justify-center select-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadeOut ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* 1. APPLE HELLO TWO-STAGE HANDWRITING ANIMATION */}
      <div className="flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
        <div className="relative w-[300px] sm:w-[500px] h-[110px] sm:h-[160px] flex items-center justify-center">
          <svg
            className="w-full h-full text-[#d8c8a8] overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 638 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="14.8883"
            strokeLinecap="round"
          >
            <title>hello</title>

            {/* Path 1: h1 (Ascender loop of h) */}
            <path
              d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
              pathLength="1"
              className="apple-h1-path"
            />

            {/* Path 2: h2 + ello */}
            <path
              d="M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186"
              pathLength="1"
              className="apple-ello-path"
            />
          </svg>
        </div>

        <span className="font-mono text-xs text-[#a0a0a0] tracking-[0.28em] uppercase mt-4 mb-8">
          PORTFOLIO • NGUYEN VAN DUC
        </span>

        {/* 2. CREATIVE LUXURY CIRCULAR LOADER */}
        <div className="flex flex-col items-center justify-center gap-3.5">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            {/* Ambient Pulse Glow Ring */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isReady 
                  ? 'bg-[#ffd066]/20 blur-md scale-110' 
                  : 'bg-[#d8c8a8]/10 blur-sm scale-100 animate-pulse'
              }`} 
            />

            {/* Orbiting Precision Dashed Ring (Counter-clockwise rotation) */}
            <div 
              className="absolute inset-0 rounded-full border border-dashed border-[#d8c8a8]/30 animate-spin" 
              style={{ animationDuration: '6s', animationDirection: 'reverse' }}
            />

            {/* High-speed Gold Arc (Clockwise rotation) */}
            <div 
              className={`absolute inset-0.5 rounded-full border-2 border-transparent transition-all duration-300 animate-spin ${
                isReady
                  ? 'border-[#ffd066] shadow-[0_0_15px_rgba(255,208,102,0.6)]'
                  : 'border-t-[#ffd066] border-r-[#d8c8a8]/80'
              }`}
              style={{ animationDuration: isReady ? '0.6s' : '1.4s' }}
            />

            {/* Center Percentage Display */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight transition-colors duration-300 ${
                isReady ? 'text-[#ffd066]' : 'text-[#d8c8a8]'
              }`}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Dynamic Technical Status Text */}
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${
              isReady ? 'bg-[#ffd066]' : 'bg-[#d8c8a8] animate-ping'
            }`} />
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#a09e98]">
              {isReady 
                ? (lang === 'vi' ? 'KHỞI TẠO HOÀN TẤT • SẴN SÀNG' : 'INITIALIZATION COMPLETE • READY')
                : (lang === 'vi' ? 'ĐANG NẠP 3D SCENE & ASSETS...' : 'LOADING 3D SCENE & ASSETS...')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
