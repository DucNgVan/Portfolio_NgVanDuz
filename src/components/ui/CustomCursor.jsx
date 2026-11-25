import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const lensRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPos = useRef({ x: -200, y: -200 });
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch / mobile device or reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isCoarse || hasTouch) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let animationFrameId;

    const setVisibility = (visible) => {
      isVisibleRef.current = visible;
      const opacity = visible ? '1' : '0';
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (lensRef.current) lensRef.current.style.opacity = opacity;
    };

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        setVisibility(true);
        trailPos.current.x = e.clientX;
        trailPos.current.y = e.clientY;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseEnter = () => setVisibility(true);
    const onMouseLeave = () => setVisibility(false);
    const onTouchStart = () => {
      setVisibility(false);
      setIsTouchDevice(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // Smooth lerp loop for the trailing circular spotlight lens
    const animateTrail = () => {
      const dx = mousePos.current.x - trailPos.current.x;
      const dy = mousePos.current.y - trailPos.current.y;
      
      trailPos.current.x += dx * 0.20;
      trailPos.current.y += dy * 0.20;

      if (lensRef.current) {
        const scale = isHoveredRef.current ? 1.4 : 1.0;
        lensRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);

    // Hover detection for interactive targets
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, input, [role="button"], .interactive, h1, h2, h3');
      isHoveredRef.current = !!interactive;
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#111113] pointer-events-none z-[10000] transition-opacity duration-200"
        style={{
          opacity: 0,
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Elegant Luxury Follower Ring */}
      <div
        ref={lensRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border border-[#8c7355]/40 bg-[#8c7355]/[0.03] transition-opacity duration-200"
        style={{
          opacity: 0,
          boxShadow: '0 0 15px rgba(216, 200, 168, 0.25)',
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%) scale(1)',
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
};

export default CustomCursor;
