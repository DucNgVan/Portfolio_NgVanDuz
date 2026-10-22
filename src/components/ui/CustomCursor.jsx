import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices and if user prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isReducedMotion) {
      return;
    }

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${isHoveredRef.current ? 0 : 1})`;
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth 60fps/120fps requestAnimationFrame animation loop for the trailing ring
    let animationFrame;
    const animateTrail = () => {
      const dx = mousePos.current.x - trailPos.current.x;
      const dy = mousePos.current.y - trailPos.current.y;
      trailPos.current.x += dx * 0.22;
      trailPos.current.y += dy * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrame = requestAnimationFrame(animateTrail);
    };
    animationFrame = requestAnimationFrame(animateTrail);

    // Hover listener for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const hovered = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive-hover') ||
        target.classList.contains('wave-letter')
      );
      isHoveredRef.current = hovered;

      if (ringRef.current) {
        if (hovered) {
          ringRef.current.style.width = '60px';
          ringRef.current.style.height = '60px';
          ringRef.current.style.backgroundColor = 'rgba(244, 239, 234, 0.95)';
          ringRef.current.style.borderColor = 'transparent';
        } else {
          ringRef.current.style.width = '36px';
          ringRef.current.style.height = '36px';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'rgba(244, 239, 234, 0.6)';
        }
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${hovered ? 0 : 1})`;
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none"
        style={{
          top: 0,
          left: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Trailing interactive ring */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          backgroundColor: 'transparent',
          borderColor: 'rgba(244, 239, 234, 0.6)',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform, width, height, background-color',
        }}
      />
    </>
  );
};

export default CustomCursor;
