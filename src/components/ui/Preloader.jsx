import React, { useState, useEffect, useRef } from 'react';

const Preloader = ({ onComplete }) => {
  const [showHello, setShowHello] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const textRef = useRef(null);
  const circleRef = useRef(null);
  const pencilRef = useRef(null);
  const animFrameRef = useRef(null);

  // Circumference for r = 42
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ≈ 263.89

  useEffect(() => {
    // Ultra-smooth counter (2.6s) with Quintic ease-out for silky deceleration
    const duration = 2600;
    let startTime = null;

    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuint(progress);

      const currentPercent = Math.min(Math.round(easedProgress * 100), 100);

      // Direct DOM update: Counter text
      if (textRef.current) {
        textRef.current.textContent = `${currentPercent}%`;
      }

      // Direct DOM update: SVG circle stroke
      if (circleRef.current) {
        const offset = circumference * (1 - easedProgress * 0.96);
        circleRef.current.style.strokeDashoffset = `${offset}`;
      }

      // Direct DOM update: Rotating pencil tip
      if (pencilRef.current) {
        const angle = easedProgress * 345;
        pencilRef.current.style.transform = `rotate(${angle}deg)`;
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        if (textRef.current) textRef.current.textContent = '100%';
        if (circleRef.current) circleRef.current.style.strokeDashoffset = '0';
        if (pencilRef.current) pencilRef.current.style.transform = 'rotate(360deg)';

        // Graceful pause before transition into cursive "hello"
        setTimeout(() => {
          setShowHello(true);
        }, 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [circumference]);

  useEffect(() => {
    if (showHello) {
      // Moderate, graceful handwriting duration:
      // h1 (1.1s) + ello starts at 0.75s & runs 2.6s (finishes at 3.35s)
      // Hold completed word for 1.1s to appreciate the calligraphy -> total 4.45s
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
        }, 750);
      }, 4450);

      return () => clearTimeout(timer);
    }
  }, [showHello, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#070707] flex flex-col items-center justify-center select-none transition-transform duration-750 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadeOut ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {!showHello ? (
        <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
          
          {/* Large Bold Percentage */}
          <div
            ref={textRef}
            className="font-bebas text-8xl sm:text-9xl text-[#e5dec9] tracking-wider mb-6 font-bold tabular-nums"
          >
            0%
          </div>

          {/* Curved Circular Pencil Loader */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg 
              className="w-full h-full -rotate-90 overflow-visible" 
              viewBox="0 0 100 100"
            >
              {/* Subtle Track Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#181818"
                strokeWidth="2.5"
              />

              {/* Progress Arc */}
              <circle
                ref={circleRef}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#d8c8a8"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
              />
            </svg>

            {/* Pencil Tip Indicator */}
            <div
              ref={pencilRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'rotate(0deg)',
                transformOrigin: '50% 50%',
                willChange: 'transform',
              }}
            >
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-[#070707] rounded-full border border-[#d8c8a8]"></div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* OFFICIAL APPLE HELLO ANIMATION */
        <div className="flex flex-col items-center justify-center px-4 animate-in fade-in duration-400">
          <div className="relative w-[320px] sm:w-[560px] h-[120px] sm:h-[190px] flex items-center justify-center">
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

          <span className="font-mono text-xs text-[#888888] tracking-[0.3em] uppercase mt-4 animate-pulse">
            PORTFOLIO • 2026
          </span>
        </div>
      )}

      {/* Skip button for user convenience */}
      <button
        onClick={() => {
          setFadeOut(true);
          setTimeout(onComplete, 250);
        }}
        className="absolute bottom-8 text-xs font-mono text-[#555555] hover:text-[#d8c8a8] transition-colors cursor-pointer uppercase tracking-widest"
      >
        [ Skip Intro ]
      </button>
    </div>
  );
};

export default Preloader;
