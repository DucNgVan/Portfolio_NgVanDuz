import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPos = useRef({ x: -200, y: -200 });
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;

    const setVisibility = (visible) => {
      isVisibleRef.current = visible;
      const opacity = visible ? '1' : '0';
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (ringRef.current) ringRef.current.style.opacity = opacity;
    };

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        setVisibility(true);
        // Teleport trail to mouse on initial appearance to prevent sweeping across screen
        trailPos.current.x = e.clientX;
        trailPos.current.y = e.clientY;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${isHoveredRef.current ? 0 : 1})`;
      }
    };

    const onMouseEnter = () => setVisibility(true);
    const onMouseLeave = () => setVisibility(false);
    const onTouchStart = () => setVisibility(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // 60-120fps requestAnimationFrame lerp loop for the outer ring
    const animateTrail = () => {
      const dx = mousePos.current.x - trailPos.current.x;
      const dy = mousePos.current.y - trailPos.current.y;
      
      // Smooth lerp speed (0.22)
      trailPos.current.x += dx * 0.22;
      trailPos.current.y += dy * 0.22;

      if (ringRef.current) {
        const scale = isHoveredRef.current ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);

    // Interactive element hover detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const interactive = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive-hover') ||
        target.closest('.wave-letter') ||
        target.closest('.cursor-pointer') ||
        target.closest('[data-cursor="hover"]')
      );

      if (interactive !== isHoveredRef.current) {
        isHoveredRef.current = interactive;

        if (ringRef.current) {
          if (interactive) {
            ringRef.current.style.backgroundColor = 'rgba(244, 239, 234, 0.95)';
            ringRef.current.style.borderColor = 'transparent';
          } else {
            ringRef.current.style.backgroundColor = 'transparent';
            ringRef.current.style.borderColor = 'rgba(244, 239, 234, 0.6)';
          }
        }

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${interactive ? 0 : 1})`;
        }
      }
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

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none"
        style={{
          opacity: 0,
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)',
          willChange: 'transform, opacity',
        }}
      />
      {/* Trailing interactive ring */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none"
        style={{
          opacity: 0,
          backgroundColor: 'transparent',
          borderColor: 'rgba(244, 239, 234, 0.6)',
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%) scale(1)',
          willChange: 'transform, background-color, border-color, opacity',
        }}
      />
    </>
  );
};

export default CustomCursor;
