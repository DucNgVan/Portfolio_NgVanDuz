import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Preloader = ({ onComplete }) => {
  const { lang } = useLanguage();
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const hasCompletedRef = useRef(false);
  const fadeOutTimerRef = useRef(null);

  const safeComplete = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    window.__preloaderActive = false;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.dispatchEvent(new CustomEvent('intro-complete'));
    onComplete();
  };

  useEffect(() => {
    window.__preloaderActive = true;
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Lock page scrolling completely while intro preloader is active
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const blockScroll = (e) => {
      if (e.cancelable) e.preventDefault();
    };
    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });

    // 1. Check if user prefers reduced motion; skip immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      safeComplete();
      return () => {
        window.__preloaderActive = false;
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener('wheel', blockScroll);
        window.removeEventListener('touchmove', blockScroll);
      };
    }

    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 1024;
    let modelLoaded = typeof window !== 'undefined' && (isMobileDevice || Boolean(window.__cinematicModelLoaded));
    let windowLoaded = typeof document !== 'undefined' && document.readyState === 'complete';
    let minTimeElapsed = false;
    let isCompleting = false;

    // Handle GLB 3D model loaded event from CinematicCanvas
    const handleGlbLoaded = () => {
      modelLoaded = true;
      checkReadyState();
    };
    window.addEventListener('glb-loaded', handleGlbLoaded);

    // Handle full window load event
    const handleWindowLoad = () => {
      windowLoaded = true;
      checkReadyState();
    };
    if (!windowLoaded) {
      window.addEventListener('load', handleWindowLoad);
    }

    // Snappy minimum display timer so the handwriting flow can be admired without delaying the user
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkReadyState();
    }, isMobileDevice ? 1200 : 1800);

    // Progressive counter tied to handwriting:
    // Natural organic deceleration as it approaches 90% while assets download
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (isCompleting) {
          if (prev >= 100) return 100;
          return Math.min(100, prev + 3.5);
        }
        if (prev >= 90) return prev;
        const diff = 90 - prev;
        const step = diff * 0.035 + 0.45;
        return Math.min(90, prev + step);
      });
    }, 55);

    // Check if everything is fully loaded and ready
    const checkReadyState = () => {
      if (modelLoaded && (windowLoaded || document.readyState === 'complete') && minTimeElapsed) {
        isCompleting = true;
      }
    };

    // When progress hits 100%, trigger final golden glow and exit transition
    const checkCompletionInterval = setInterval(() => {
      if (isCompleting) {
        setProgress((curr) => {
          if (curr >= 100) {
            clearInterval(progressInterval);
            clearInterval(checkCompletionInterval);
            setIsReady(true);

            if (!fadeOutTimerRef.current && !hasCompletedRef.current) {
              fadeOutTimerRef.current = setTimeout(() => {
                setFadeOut(true);
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                setTimeout(() => {
                  safeComplete();
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  });
                }, 650);
              }, 500);
            }
            return 100;
          }
          return curr;
        });
      }
    }, 60);

    // Safety fallback: if network stalls, do not trap user indefinitely (max 3.5s)
    const safetyMaxTimer = setTimeout(() => {
      modelLoaded = true;
      windowLoaded = true;
      minTimeElapsed = true;
      isCompleting = true;
    }, isMobileDevice ? 2500 : 3600);

    return () => {
      window.__preloaderActive = false;
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      window.removeEventListener('glb-loaded', handleGlbLoaded);
      window.removeEventListener('load', handleWindowLoad);
      clearTimeout(minTimer);
      clearTimeout(safetyMaxTimer);
      clearInterval(progressInterval);
      clearInterval(checkCompletionInterval);
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
    };
  }, []);

  // Compute exact stroke offsets based on real-time loading progress (0% - 100%)
  // Path 1 (Ascender loop of 'h'): 0% - 20%
  const h1Offset = Math.max(0, Math.min(1, 1 - progress / 20));
  // Path 2 (Rest of 'h' + 'ello'): 20% - 100%
  const elloOffset = Math.max(0, Math.min(1, 1 - (progress - 20) / 80));

  const path1D = "M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356";
  const path2D = "M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#070707] flex flex-col items-center justify-center select-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadeOut ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
        
        {/* PROGRESSIVE HANDWRITING AS THE REAL LOADING EFFECT */}
        <div className="relative w-[310px] sm:w-[500px] h-[115px] sm:h-[160px] flex items-center justify-center">
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

            {/* Layer 1: Subtle Stencil Track (Faint silhouette waiting to be filled) */}
            <g opacity="0.10" stroke="#d8c8a8">
              <path d={path1D} />
              <path d={path2D} />
            </g>

            {/* Layer 2: Active Progressive Ink Stroke (Directly driven by loading progress) */}
            <g
              stroke="#d8c8a8"
              style={{
                filter: isReady
                  ? 'drop-shadow(0 0 20px rgba(255, 208, 102, 0.9)) drop-shadow(0 2px 10px rgba(216, 200, 168, 0.7))'
                  : 'drop-shadow(0 2px 12px rgba(216, 200, 168, 0.45))',
                transition: 'filter 0.4s ease-out',
              }}
            >
              {/* Path 1: Ascender loop of h (draws from 0% to 20%) */}
              <path
                d={path1D}
                pathLength="1"
                className="apple-h1-path"
                style={{
                  strokeDashoffset: h1Offset,
                }}
              />

              {/* Path 2: Rest of h + ello (draws from 20% to 100%) */}
              <path
                d={path2D}
                pathLength="1"
                className="apple-ello-path"
                style={{
                  strokeDashoffset: elloOffset,
                }}
              />
            </g>
          </svg>
        </div>

        {/* Minimalist Subtitle */}
        <span className="font-mono text-[11px] sm:text-xs text-[#8c8270] tracking-[0.28em] uppercase mt-4 mb-2">
          PORTFOLIO • NGUYEN VAN DUC
        </span>

        {/* Sleek Minimalist Loading Readout & Progress Status */}
        <div className="flex flex-col items-center justify-center gap-1.5 mt-1">
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs font-bold tracking-widest transition-colors duration-300 ${
              isReady ? 'text-[#ffd066]' : 'text-[#d8c8a8]'
            }`}>
              {Math.round(progress)}%
            </span>
            <span className="w-1 h-1 rounded-full bg-[#8c8270]" />
            <span className="font-mono text-[10.5px] tracking-wide text-[#999285]">
              {isReady ? (
                <span className="text-[#ffd066] font-semibold">INITIALIZATION COMPLETE • ENTERING</span>
              ) : (
                <>
                  {progress < 25 && 'Crafting letterforms...'}
                  {progress >= 25 && progress < 65 && 'Synthesizing 3D environment...'}
                  {progress >= 65 && progress < 92 && 'Optimizing textures & shaders...'}
                  {progress >= 92 && 'Finalizing exhibition stage...'}
                </>
              )}
            </span>
          </div>

          {/* Ultra-fine Golden Loading Track */}
          <div className="w-36 sm:w-44 h-[2px] bg-white/10 rounded-full overflow-hidden mt-1.5">
            <div 
              className="h-full bg-gradient-to-r from-[#bfa074] via-[#ffd066] to-[#fff4d0] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
