import React, { useRef, useState, useEffect } from 'react';

/**
 * InteractiveSoftwareTitle
 * Implements the bespoke kinetic typography seen in the reference portfolio:
 * - Condensed, high-impact display font (Bebas Neue)
 * - Distinctive gold accent with warm ambient glow on the letter 'S'
 * - Smooth pointer proximity wave physics (letters dynamically scale along Y-axis as cursor moves)
 * - Staggered entrance animation
 */
export const InteractiveSoftwareTitle = ({ 
  word1 = "SOFTWARE", 
  word2 = "ENGINEERING",
  className = "" 
}) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const [scales, setScales] = useState(() => Array(word1.length).fill(1));

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Only track when cursor is within vertical vicinity of hero title
      if (Math.abs(e.clientY - (rect.top + rect.height / 2)) > 260) {
        setScales(Array(word1.length).fill(1));
        return;
      }

      const nextScales = lettersRef.current.map((el) => {
        if (!el) return 1;
        const lRect = el.getBoundingClientRect();
        const letterCenter = lRect.left + lRect.width / 2;
        const dist = Math.abs(e.clientX - letterCenter);
        const radius = Math.max(90, window.innerWidth * 0.08);
        const factor = Math.max(0, 1 - dist / radius);
        return 1 + factor * 0.22; // subtle vertical wave stretch
      });

      setScales(nextScales);
    };

    const handlePointerLeave = () => {
      setScales(Array(word1.length).fill(1));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [word1.length]);

  return (
    <div 
      ref={containerRef} 
      className={`relative inline-flex flex-col items-center lg:items-end select-none ${className}`}
    >
      {/* 1. Main Display: "SOFTWARE" with gold 'S' and interactive scaleY wave */}
      <h2 
        className="flex items-baseline font-bebas font-normal tracking-wide leading-[0.85] text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        aria-label={`${word1} ${word2}`}
      >
        {word1.split('').map((char, idx) => {
          const isFirstLetter = idx === 0; // 'S'
          const scale = scales[idx] || 1;

          return (
            <span
              key={idx}
              ref={(el) => (lettersRef.current[idx] = el)}
              className="inline-block transition-transform duration-150 ease-out will-change-transform"
              style={{
                transform: `scaleY(${scale})`,
                transformOrigin: '50% 100%',
              }}
            >
              <span
                className={`inline-block ${
                  isFirstLetter
                    ? 'text-[#d8c8a8] drop-shadow-[0_10px_35px_rgba(216,200,168,0.55)]'
                    : 'text-[#f4efea] hover:text-[#d8c8a8] transition-colors duration-200'
                }`}
                style={{
                  animation: `fadeInUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both`,
                  animationDelay: `${idx * 65 + 150}ms`,
                }}
              >
                {char}
              </span>
            </span>
          );
        })}
      </h2>

      {/* 2. Subtitle: "ENGINEERING" */}
      <div 
        className="font-bebas font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-[#d8c8a8] via-[#ede5dc] to-[#bfa882] mt-1.5 sm:mt-2 leading-none"
        style={{
          animation: 'fadeInUp 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '600ms',
        }}
      >
        {word2}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(35%);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveSoftwareTitle;
