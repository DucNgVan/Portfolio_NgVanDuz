import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ExternalLink, Info, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';

// Editorial visual themes matching high-end Awwwards studio aesthetics
const CARD_THEMES = [
  {
    projectId: 1,
    tag: '3D WEBGL / THREE.JS',
    gradient: 'from-[#032622] via-[#021413] to-[#010808]',
    accent: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.3)',
    borderColor: 'border-teal-500/40',
    type: 'mesh'
  },
  {
    projectId: 2,
    tag: 'POSTGRESQL 3NF / REDIS',
    gradient: 'from-[#140b2e] via-[#0c061d] to-[#04020a]',
    accent: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.3)',
    borderColor: 'border-purple-500/40',
    type: 'nodes'
  },
  {
    projectId: 3,
    tag: 'MEVN STACK / REST API',
    gradient: 'from-[#241704] via-[#140d02] to-[#060401]',
    accent: '#d8c8a8',
    glowColor: 'rgba(216, 200, 168, 0.3)',
    borderColor: 'border-amber-500/40',
    type: 'circuit'
  },
  {
    projectId: 4,
    tag: 'NATIVE ANDROID / GPS',
    gradient: 'from-[#052315] via-[#02130a] to-[#010703]',
    accent: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.3)',
    borderColor: 'border-emerald-500/40',
    type: 'topo'
  },
  {
    projectId: 2,
    tag: 'DISTRIBUTED ARCHITECTURE',
    gradient: 'from-[#1a0d33] via-[#0d061c] to-[#030109]',
    accent: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.3)',
    borderColor: 'border-indigo-500/40',
    type: 'nodes'
  },
  {
    projectId: 1,
    tag: 'AI CHARM STUDIO / 360°',
    gradient: 'from-[#022b27] via-[#011715] to-[#010908]',
    accent: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    borderColor: 'border-cyan-500/40',
    type: 'mesh'
  }
];

const Project3DCarousel = ({ projects, onSelectProject, t }) => {
  // Map 6 cards to maintain a cinematic 6-sided cylinder
  const items = CARD_THEMES.map((theme, idx) => {
    const parentProject = projects.find((p) => p.id === theme.projectId) || projects[0];
    return {
      ...parentProject,
      uniqueKey: `card-${theme.projectId}-${idx}`,
      slotIndex: idx,
      theme
    };
  });

  const totalSlots = items.length; // 6
  const anglePerSlot = 360 / totalSlots; // 60 degrees

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const containerRef = useRef(null);
  const reqIdRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive cylinder geometry
  const getRadius = () => {
    if (windowWidth < 640) return 260; // Mobile
    if (windowWidth < 1024) return 330; // Tablet
    return 420; // Desktop
  };

  const getCardDimensions = () => {
    if (windowWidth < 640) return { width: 230, height: 350 };
    if (windowWidth < 1024) return { width: 270, height: 400 };
    return { width: 310, height: 450 };
  };

  const radius = getRadius();
  const cardDim = getCardDimensions();

  // Subtle auto-rotation when idle
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    let lastTime = performance.now();
    const step = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      setRotation((prev) => prev - delta * 5); // 5 deg/s
      reqIdRef.current = requestAnimationFrame(step);
    };

    reqIdRef.current = requestAnimationFrame(step);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [autoRotate, isDragging]);

  // Pointer drag interaction
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
    const sensitivity = windowWidth < 640 ? 0.32 : 0.22;
    setRotation(startRotation + deltaX * sensitivity);
  }, [isDragging, startX, startRotation, windowWidth]);

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  // Rotate to specific slot
  const snapToSlot = (slotIdx) => {
    setAutoRotate(false);
    setRotation(-slotIdx * anglePerSlot);
  };

  const rotateStep = (dir) => {
    setAutoRotate(false);
    setRotation((prev) => {
      const currentSlot = Math.round(prev / anglePerSlot);
      return (currentSlot + dir) * anglePerSlot;
    });
  };

  // Determine active project (facing camera)
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const activeSlot = (totalSlots - Math.round(normalizedRotation / anglePerSlot)) % totalSlots;
  const activeItem = items[activeSlot] || items[0];

  const handleCardClick = (item, slotIdx) => {
    if (activeSlot === slotIdx) {
      // Front card clicked -> open details
      onSelectProject(item);
    } else {
      // Side card clicked -> rotate to front
      snapToSlot(slotIdx);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none overflow-visible py-4">
      
      {/* 1. TOP INTERACTION GUIDE & CONTROLS */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-5xl px-6 mb-4 z-20 gap-3">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#a3a3a3] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#d8c8a8] animate-pulse" />
          <span>{t?.work?.dragHint || 'DRAG TO ROTATE · CLICK CARD TO SELECT'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all flex items-center gap-1.5 ${
              autoRotate 
                ? 'bg-[#d8c8a8]/10 text-[#d8c8a8] border-[#d8c8a8]/40' 
                : 'bg-[#141414] text-[#888888] border-[#222222] hover:text-[#cccccc]'
            }`}
          >
            <RotateCcw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
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

      {/* 2. MATHEMATICALLY PURE 3D CYLINDER STAGE */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative w-full h-[500px] sm:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        style={{
          perspective: `${windowWidth < 640 ? 950 : 1300}px`,
          perspectiveOrigin: '50% 50%'
        }}
      >
        {/* Ambient radial glow in center */}
        <div
          className="absolute w-[450px] h-[450px] rounded-full pointer-events-none transition-all duration-700 blur-[120px] opacity-25"
          style={{ background: activeItem?.theme?.glowColor || 'rgba(216, 200, 168, 0.25)' }}
        />

        {/* 3D CYLINDER ROTATION HUB (Centered at 50%, 50%) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * anglePerSlot;
            
            // Angular difference from camera front
            const currentAngle = (itemAngle + rotation) % 360;
            const normalizedAngle = ((currentAngle % 360) + 360) % 360;
            const diffFromFront = Math.abs(normalizedAngle > 180 ? 360 - normalizedAngle : normalizedAngle);
            
            const isFront = diffFromFront < 35;
            const isBack = diffFromFront > 110;
            const opacity = Math.max(0.35, Math.cos((diffFromFront * Math.PI) / 180));

            return (
              <div
                key={item.uniqueKey}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(item, index);
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${cardDim.width}px`,
                  height: `${cardDim.height}px`,
                  marginLeft: `-${cardDim.width / 2}px`,
                  marginTop: `-${cardDim.height / 2}px`,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity: opacity,
                  filter: isBack ? 'blur(2px)' : 'none',
                  zIndex: Math.round(100 - diffFromFront),
                  cursor: isFront ? 'pointer' : 'grab'
                }}
              >
                {/* EDITORIAL POSTER CARD */}
                <div
                  className={`w-full h-full rounded-2xl bg-gradient-to-b ${item.theme.gradient} border ${
                    isFront 
                      ? 'border-[#d8c8a8] shadow-[0_20px_60px_rgba(0,0,0,0.9)] scale-100' 
                      : 'border-white/10 shadow-2xl scale-95'
                  } p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group`}
                  style={{
                    boxShadow: isFront ? `0 25px 60px -10px ${item.theme.glowColor}` : undefined
                  }}
                >
                  {/* Subtle noise/grid texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

                  {/* Top Bar: Sequence + Status Pill */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest font-bold text-[#d8c8a8]">
                      0{item.id} // {item.theme.tag}
                    </span>

                    {item.liveDemo ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE DEMO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-[#cccccc] border border-white/10 font-semibold">
                        {item.statusBadge || 'REPO'}
                      </span>
                    )}
                  </div>

                  {/* Graphic Poster Centerpiece */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
                    {/* Abstract technical icon representation */}
                    <div 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        borderColor: item.theme.accent,
                        background: `radial-gradient(circle at center, ${item.theme.glowColor}, transparent 70%)`
                      }}
                    >
                      {item.theme.type === 'mesh' && (
                        <div className="relative w-12 h-12 border border-dashed rounded-lg border-teal-300/80 animate-spin" style={{ animationDuration: '18s' }}>
                          <div className="absolute inset-2 border border-teal-300/60 rounded" />
                        </div>
                      )}
                      {item.theme.type === 'nodes' && (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="w-8 h-1.5 rounded bg-purple-400/80" />
                          <div className="w-12 h-1.5 rounded bg-indigo-400/60" />
                          <div className="w-6 h-1.5 rounded bg-purple-300/80" />
                        </div>
                      )}
                      {item.theme.type === 'circuit' && (
                        <div className="text-xs font-mono font-bold text-amber-300/90 tracking-tighter">
                          &lt;MEVN/&gt;
                        </div>
                      )}
                      {item.theme.type === 'topo' && (
                        <div className="relative w-10 h-10 border-2 rounded-full border-emerald-400/80 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                      )}
                    </div>

                    {/* Headline */}
                    <h4 className="text-lg sm:text-xl font-bold font-syne text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors leading-tight mb-2">
                      {item.title.split('—')[0].trim()}
                    </h4>
                    
                    <p className="text-xs font-mono text-[#a3a3a3] line-clamp-2 px-2">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Card Bottom: Tech Pills & Action */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {item.tech.slice(0, 2).map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#cccccc] border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(item);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#d8c8a8] hover:bg-[#e6d8be] text-[#080808] text-[11px] font-mono font-bold transition-all shadow-md inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      <span>{t?.work?.archDetails ? t.work.archDetails.split(' ')[0] : 'View'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. DEDICATED SEPARATE BOTTOM CONTROLLER (No overlap!) */}
      <div className="w-full max-w-3xl px-6 mt-8 z-20 flex flex-col items-center">
        {/* Active showcase panel */}
        <div className="w-full rounded-2xl bg-[#0f0f0f] border border-[#222222] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#333333] flex items-center justify-center font-mono font-bold text-[#d8c8a8] shrink-0 text-sm">
              0{activeItem?.id}
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-wider text-[#a3a3a3] uppercase">{t?.work?.activeShowcase || 'ACTIVE SHOWCASE'}</div>
              <div className="text-sm sm:text-base font-bold font-syne text-[#F4EFEA] line-clamp-1">
                {activeItem?.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => onSelectProject(activeItem)}
              className="px-4 py-2 rounded-xl bg-[#1c1c1c] hover:bg-[#282828] border border-[#333333] text-[#F4EFEA] text-xs font-mono transition-all flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-[#d8c8a8]" />
              <span>{t?.work?.archDetails || 'Architecture Details'}</span>
            </button>

            {activeItem?.liveDemo && (
              <a
                href={activeItem.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#d8c8a8] hover:bg-[#e6d8be] text-[#080808] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </a>
            )}

            <a
              href={activeItem?.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#181818] hover:bg-[#252525] border border-[#333333] text-[#cccccc] hover:text-white transition-all"
              title="GitHub Repo"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Clean pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {projects.map((p) => {
            const isCurrent = activeItem?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  const targetSlot = items.findIndex((item) => item.id === p.id);
                  if (targetSlot !== -1) snapToSlot(targetSlot);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isCurrent ? 'w-8 h-2 bg-[#d8c8a8]' : 'w-2 h-2 bg-[#333333] hover:bg-[#666666]'
                }`}
                aria-label={`Show ${p.title}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project3DCarousel;
