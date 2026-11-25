import React, { useEffect, useRef } from 'react';

/**
 * KineticCanvas
 * Ultra-lightweight, 60-120 FPS 2D kinetic particle & constellation canvas.
 * Zero Three.js / WebGL overhead, completely eliminates mobile battery drain,
 * while creating an interactive celestial depth effect responding to mouse & scroll.
 */
export const KineticCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const scrollRef = useRef({ lastY: 0, velocity: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = null;
    let width = 0;
    let height = 0;
    let particles = [];
    let isVisible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      // Density based on screen area (fewer on mobile for speed)
      const count = Math.floor(Math.min(75, (width * height) / 18000));
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.6 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulsePhase: Math.random() * Math.PI * 2,
          // Subtle color variation between warm champagne and cool cyan
          isWarm: Math.random() > 0.45,
        });
      }
    };

    const onMouseMove = (e) => {
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.vx = dx * 0.15;
      mouseRef.current.vy = dy * 0.15;
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - scrollRef.current.lastY;
      scrollRef.current.velocity = deltaY * 0.08;
      scrollRef.current.lastY = currentY;
    };

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    resize();

    let lastTime = performance.now();

    const loop = (now) => {
      animationId = requestAnimationFrame(loop);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Decay scroll velocity
      scrollRef.current.velocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const maxConnectDist = Math.min(105, width * 0.18);
      const mouseInfluenceRadius = 140;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic drift + scroll drift
        p.x += p.vx * 60 * dt;
        p.y += (p.vy * 60 - scrollRef.current.velocity) * dt;

        // Interactive cursor repulsion / gentle magnet
        const dx = mx - p.x;
        const dy = my - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < mouseInfluenceRadius && distToMouse > 0) {
          const force = (1 - distToMouse / mouseInfluenceRadius) * 0.8;
          p.x -= (dx / distToMouse) * force * 15 * dt;
          p.y -= (dy / distToMouse) * force * 15 * dt;
        }

        // Wrap around screen boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Pulsing glow
        p.pulsePhase += p.pulseSpeed;
        const alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isWarm) {
          ctx.fillStyle = `rgba(216, 200, 168, ${Math.max(0.08, alpha)})`;
        } else {
          ctx.fillStyle = `rgba(125, 211, 252, ${Math.max(0.08, alpha * 0.85)})`;
        }
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distDx = p.x - p2.x;
          const distDy = p.y - p2.y;
          const dist = Math.sqrt(distDx * distDx + distDy * distDy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.isWarm
              ? `rgba(216, 200, 168, ${lineAlpha})`
              : `rgba(125, 211, 252, ${lineAlpha * 0.7})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Deep Cosmic Nebula Gradient Spots */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full bg-[#d8c8a8]/[0.035] blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-[#38bdf8]/[0.025] blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-[15%] left-[20%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-[#d8c8a8]/[0.03] blur-[130px] pointer-events-none" />

      {/* 2. Interactive Kinetic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};

export default KineticCanvas;
