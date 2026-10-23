import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Info, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';

// Visual themed artwork per project to give high-fashion/Awwwards look
const PROJECT_THEMES = {
  1: {
    gradient: 'from-emerald-950/60 via-teal-950/40 to-black',
    accent: '#34d399',
    glow: 'rgba(52, 211, 153, 0.25)',
    border: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
    iconText: '3D MESH / THREE.JS',
    pattern: 'mesh'
  },
  2: {
    gradient: 'from-indigo-950/60 via-purple-950/40 to-black',
    accent: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.25)',
    border: 'border-indigo-500/30',
    badgeBg: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40',
    iconText: 'POSTGRES 3NF / REDIS',
    pattern: 'matrix'
  },
  3: {
    gradient: 'from-amber-950/60 via-orange-950/40 to-black',
    accent: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.25)',
    border: 'border-amber-500/30',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
    iconText: 'MEVN / MONGODB',
    pattern: 'circuit'
  },
  4: {
    gradient: 'from-cyan-950/60 via-sky-950/40 to-black',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.25)',
    border: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
    iconText: 'ANDROID NATIVE / GPS',
    pattern: 'topography'
  }
};

const Project3DCarousel = ({ projects, onSelectProject, t }) => {
  // Use 8 items (4 projects duplicated) for a lush 360-degree cylinder
  const items = [...projects, ...projects].map((p, idx) => ({
    ...p,
    uniqueKey: `${p.id}-${idx}`,
    slotIndex: idx,
    theme: PROJECT_THEMES[p.id] || PROJECT_THEMES[1]
  }));

  const totalSlots = items.length; // 8
  const anglePerSlot = 360 / totalSlots; // 45 degrees

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const containerRef = useRef(null);
  const reqIdRef = useRef(null);

  // Resize listener to adapt 3D cylinder radius
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive radius calculation
  // Radius R needs to be wide enough so cards don't collide
  const getRadius = () => {
    if (windowWidth < 640) return 260; // Mobile
    if (windowWidth < 1024) return 360; // Tablet
    return 460; // Desktop
  };

  const getCardDimensions = () => {
    if (windowWidth < 640) return { width: 250, height: 380 };
    if (windowWidth < 1024) return { width: 290, height: 430 };
    return { width: 330, height: 470 };
  };

  const radius = getRadius();
  const cardDim = getCardDimensions();

  // Subtle auto-rotation when user is not dragging
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    let lastTime = performance.now();
    const step = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      // Gentle spin: ~4 degrees per second
      setRotation((prev) => prev - delta * 4);
      reqIdRef.current = requestAnimationFrame(step);
    };

    reqIdRef.current = requestAnimationFrame(step);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [autoRotate, isDragging]);

  // Pointer drag handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setStartX(clientX);
    setStartRotation(rotation);
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startX;
    // Sensitivity factor
    const sensitivity = windowWidth < 640 ? 0.35 : 0.25;
    setRotation(startRotation + deltaX * sensitivity);
  }, [isDragging, startX, startRotation, windowWidth]);

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  // Next / Prev step navigation
  const rotateStep = (direction) => {
    setAutoRotate(false);
    setRotation((prev) => {
      // Snap to nearest slot in that direction
      const currentSlot = Math.round(prev / anglePerSlot);
      return (currentSlot + direction) * anglePerSlot;
    });
  };

  // Active project calculation (the one facing camera: angle + rotation mod 360 ≈ 0)
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const activeSlot = (totalSlots - Math.round(normalizedRotation / anglePerSlot)) % totalSlots;
  const activeProject = items[activeSlot] || items[0];

  return (
    <div className="relative w-full flex flex-col items-center select-none overflow-hidden py-6">
      
      {/* 1. TOP INTERACTION GUIDE & CONTROLS */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-5xl px-6 mb-6 z-20 gap-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#a3a3a3] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#d8c8a8] animate-pulse" />
          <span>{t?.work?.dragHint || 'DRAG HORIZONTALLY TO ROTATE 3D CYLINDER'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all flex items-center gap-1.5 ${
              autoRotate 
                ? 'bg-[#d8c8a8]/10 text-[#d8c8a8] border-[#d8c8a8]/40' 
                : 'bg-[#141414] text-[#888888] border-[#222222] hover:text-[#cccccc]'
            }`}
            title="Toggle Auto Spin"
          >
            <RotateCcw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{autoRotate ? (t?.work?.autoSpinOn || 'AUTO-SPIN: ON') : (t?.work?.autoSpinOff || 'AUTO-SPIN: OFF')}</span>
          </button>

          <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-full border border-[#222222]">
            <button
              onClick={() => rotateStep(1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#cccccc] hover:text-white hover:bg-[#222222] transition-colors"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => rotateStep(-1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#cccccc] hover:text-white hover:bg-[#222222] transition-colors"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. 3D PERSPECTIVE STAGE */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative w-full h-[520px] sm:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: `${windowWidth < 640 ? 1000 : 1400}px`,
          perspectiveOrigin: '50% 48%'
        }}
      >
        {/* Background ambient lighting in center of cylinder */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-700 blur-[100px] opacity-35"
          style={{
            background: activeProject?.theme?.glow || 'rgba(216, 200, 168, 0.2)'
          }}
        />

        {/* ROTATING 3D CAROUSEL CONTAINER */}
        <div
          className="relative w-0 h-0 transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`
          }}
        >
          {items.map((project, index) => {
            const itemAngle = index * anglePerSlot;
            
            // Calculate angle relative to front camera (0 = facing camera, 180 = opposite)
            const currentAngle = (itemAngle + rotation) % 360;
            const normalizedAngle = ((currentAngle % 360) + 360) % 360;
            const diffFromFront = Math.abs(normalizedAngle > 180 ? 360 - normalizedAngle : normalizedAngle);
            
            // Cards in front are opaque & large; cards in back are transparent & slightly scaled down
            const isFacingFront = diffFromFront < 40;
            const opacity = Math.max(0.35, Math.cos((diffFromFront * Math.PI) / 180));
            const scale = Math.max(0.85, 1 - (diffFromFront / 180) * 0.15);

            return (
              <div
                key={project.uniqueKey}
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  width: `${cardDim.width}px`,
                  height: `${cardDim.height}px`,
                  opacity: opacity,
                  transition: isDragging ? 'none' : 'opacity 0.3s ease, filter 0.3s ease',
                  filter: diffFromFront > 90 ? 'blur(1.5px)' : 'none',
                  zIndex: Math.round(100 - diffFromFront)
                }}
              >
                {/* 3D PROJECT CARD */}
                <div
                  className={`w-full h-full rounded-2xl bg-[#0d0d0d] border ${
                    isFacingFront ? 'border-[#d8c8a8] shadow-[0_20px_50px_rgba(0,0,0,0.9)]' : 'border-[#222222]'
                  } p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group`}
                  style={{
                    boxShadow: isFacingFront ? `0 15px 45px -10px ${project.theme.glow}` : undefined
                  }}
                >
                  {/* Decorative background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${project.theme.gradient} opacity-40 pointer-events-none`} />

                  {/* Card Header: 01, 02... + Category Badge */}
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono tracking-wider font-bold text-[#d8c8a8]">
                      0{(project.id)} // {project.theme.iconText}
                    </span>

                    {project.liveDemo ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE DEMO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#181818] text-[#aaaaaa] border border-[#2e2e2e]">
                        {project.statusBadge || 'REPO'}
                      </span>
                    )}
                  </div>

                  {/* Geometric artwork abstract thumbnail */}
                  <div className="relative z-10 w-full h-24 sm:h-28 rounded-xl bg-black/60 border border-white/5 p-3 flex flex-col justify-between overflow-hidden mb-3">
                    {/* Abstract technical pattern preview */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider">{project.category}</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8]" />
                      </div>
                    </div>

                    <div className="my-auto">
                      <div className="text-sm sm:text-base font-bold font-syne text-white line-clamp-1 group-hover:text-[#d8c8a8] transition-colors">
                        {project.title.split('—')[0].trim()}
                      </div>
                      <div className="text-[11px] font-mono text-[#aaaaaa] line-clamp-1">
                        {project.title.split('—')[1] || project.tagline}
                      </div>
                    </div>

                    <div className="flex gap-1.5 overflow-hidden">
                      {project.tech.slice(0, 3).map((tech, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#cccccc] border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Summary */}
                  <div className="relative z-10 flex-1 flex flex-col justify-start">
                    <p className="text-xs text-[#bbbbbb] line-clamp-3 leading-relaxed font-sans mb-3">
                      {project.description}
                    </p>

                    {/* Tech tag chips */}
                    <div className="flex flex-wrap gap-1.5 mt-auto mb-2">
                      {project.tech.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161616] text-[#cccccc] border border-[#262626]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#161616] text-[#777777] border border-[#262626]">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div className="relative z-10 pt-3 border-t border-[#1f1f1f] flex items-center justify-between mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#d8c8a8] hover:underline font-semibold cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      <span>{t.work?.archDetails || 'Details'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-[#181818] hover:bg-[#252525] border border-[#2e2e2e] text-[#cccccc] hover:text-white transition-colors"
                        title="GitHub Repo"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 rounded-lg bg-[#d8c8a8] hover:bg-[#e6d8be] text-[#080808] text-[11px] font-mono font-bold transition-colors inline-flex items-center gap-1"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE PROJECT QUICK HIGHLIGHT DOCK */}
      <div className="w-full max-w-4xl px-4 mt-6 z-20">
        <div className="rounded-2xl bg-[#111111]/90 backdrop-blur-md border border-[#262626] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#333333] flex items-center justify-center font-mono font-bold text-[#d8c8a8] shrink-0 text-sm">
              0{activeProject?.id}
            </div>
            <div>
              <div className="text-xs font-mono tracking-wider text-[#a3a3a3] uppercase">{t?.work?.activeShowcase || 'ACTIVE SHOWCASE'}</div>
              <div className="text-sm sm:text-base font-bold font-syne text-[#F4EFEA] line-clamp-1">
                {activeProject?.title}
              </div>
            </div>
          </div>

          {/* Action buttons for currently active project */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => onSelectProject(activeProject)}
              className="px-4 py-2 rounded-xl bg-[#1c1c1c] hover:bg-[#282828] border border-[#333333] text-[#F4EFEA] text-xs font-mono transition-all flex items-center gap-1.5 font-semibold"
            >
              <Info className="w-3.5 h-3.5 text-[#d8c8a8]" />
              <span>{t.work?.archDetails || 'View Architecture'}</span>
            </button>

            {activeProject?.liveDemo && (
              <a
                href={activeProject.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#d8c8a8] hover:bg-[#e6d8be] text-[#080808] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            <a
              href={activeProject?.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-[#181818] hover:bg-[#252525] border border-[#333333] text-[#cccccc] hover:text-white text-xs font-mono transition-all"
              title="GitHub Repo"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Slot navigation indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {projects.map((p, idx) => {
            const isCurrent = activeProject?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setAutoRotate(false);
                  // Find nearest slot corresponding to this project id
                  const targetSlot = items.findIndex((item) => item.id === p.id);
                  if (targetSlot !== -1) {
                    setRotation(-targetSlot * anglePerSlot);
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  isCurrent
                    ? 'w-8 h-2 bg-[#d8c8a8]'
                    : 'w-2 h-2 bg-[#333333] hover:bg-[#666666]'
                }`}
                aria-label={`Jump to ${p.title}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project3DCarousel;
