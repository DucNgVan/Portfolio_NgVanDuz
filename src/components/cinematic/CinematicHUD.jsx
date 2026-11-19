import React from 'react';
import { Play, Pause, Volume2, VolumeX, Film, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const CinematicHUD = ({
  scrollProgress = 0,
  isPlaying = false,
  onTogglePlay = () => {},
  isMuted = true,
  onToggleMute = () => {},
  onSelectScene = () => {},
  onSwitchMode = () => {},
  currentMode = 'cinematic',
}) => {
  const { lang } = useLanguage();

  const scenes = [
    { id: 0, titleVi: '01. KHỞI NGUYÊN', titleEn: '01. PROLOGUE', progress: 0.08 },
    { id: 1, titleVi: '02. KIẾN TRÚC', titleEn: '02. ARCHITECTURE', progress: 0.30 },
    { id: 2, titleVi: '03. DỰ ÁN', titleEn: '03. PROJECTS', progress: 0.54 },
    { id: 3, titleVi: '04. VINH DANH', titleEn: '04. HONORS', progress: 0.76 },
    { id: 4, titleVi: '05. KẾT NỐI', titleEn: '05. TRANSMISSION', progress: 0.94 },
  ];

  // Active scene based on scrollProgress
  const activeSceneIndex = scrollProgress < 0.22 
    ? 0 
    : scrollProgress < 0.44 
    ? 1 
    : scrollProgress < 0.66 
    ? 2 
    : scrollProgress < 0.86 
    ? 3 
    : 4;

  const activeScene = scenes[activeSceneIndex];

  // Calculate video timecode (00:00:00 to 00:05:00)
  const totalSeconds = Math.round(scrollProgress * 300);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timecode = `00:0${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      {/* 1. TOP CINEMATIC BAR (Bright Studio Header) */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 bg-gradient-to-b from-[#f8f7f4]/95 via-[#f8f7f4]/85 to-transparent pointer-events-none px-4 sm:px-8 flex items-center justify-between border-b border-black/[0.03]">
        
        {/* Left: REC Status & Timecode */}
        <div className="pointer-events-auto flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold tracking-widest text-[10px]">REC</span>
          </div>

          <span className="text-[#1a1a1a] font-bold text-xs sm:text-sm tracking-wider">
            {timecode}
          </span>
          <span className="text-[#888] hidden sm:inline">// 00:05:00</span>
        </div>

        {/* Center: Current Scene Title */}
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-black/[0.08] shadow-sm backdrop-blur-md">
          <Film className="w-3.5 h-3.5 text-[#a89068]" />
          <span className="font-bebas text-base sm:text-lg tracking-wider text-[#1a1a1a]">
            {lang === 'vi' ? activeScene.titleVi : activeScene.titleEn}
          </span>
        </div>

        {/* Right: Controls & Mode Switcher */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          
          {/* Audio toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-full bg-white/90 hover:bg-white border border-black/[0.08] text-[#555] hover:text-[#1a1a1a] transition-all cursor-pointer shadow-sm"
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#a89068]" />}
          </button>

          {/* Auto Play / Pause Video Scroller */}
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1a1a] hover:bg-black border border-black/15 text-white text-xs font-mono transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span className="text-amber-200 font-bold hidden sm:inline">PAUSE VIDEO</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#d8c8a8] fill-[#d8c8a8]" />
                <span className="text-[#f4efea] font-bold hidden sm:inline">AUTO PLAY</span>
              </>
            )}
          </button>

          {/* Mode Switcher */}
          <button
            onClick={onSwitchMode}
            className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-black/[0.08] text-[#1a1a1a] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Switch to Editorial Standard Mode"
          >
            <Layers className="w-3.5 h-3.5 text-[#a89068]" />
            <span className="hidden md:inline font-medium">
              {currentMode === 'cinematic' ? 'Editorial Mode' : 'Cinematic Video'}
            </span>
          </button>
        </div>

      </div>

      {/* 2. BOTTOM CINEMATIC TIMELINE SCRUBBER (Video Timeline Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-20 sm:h-24 bg-gradient-to-t from-[#f8f7f4] via-[#f8f7f4]/90 to-transparent pointer-events-none px-4 sm:px-10 flex flex-col justify-end pb-3 sm:pb-4 border-t border-black/[0.02]">
        
        {/* Timeline progress line with chapter dots */}
        <div className="pointer-events-auto relative w-full max-w-5xl mx-auto flex flex-col gap-2">
          
          {/* Chapter markers */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => onSelectScene(s.progress)}
                className={`transition-all cursor-pointer flex items-center gap-1.5 py-1 ${
                  activeSceneIndex === idx
                    ? 'text-[#1a1a1a] font-bold scale-105'
                    : 'text-[#888] hover:text-[#333]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeSceneIndex === idx ? 'bg-[#1a1a1a] shadow-[0_0_6px_rgba(0,0,0,0.3)]' : 'bg-[#bbb]'}`} />
                <span className="hidden md:inline">{lang === 'vi' ? s.titleVi : s.titleEn}</span>
                <span className="md:hidden">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Scrubber Track */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPercent = (e.clientX - rect.left) / rect.width;
              onSelectScene(clickPercent);
            }}
            className="relative w-full h-1.5 sm:h-2 bg-black/[0.08] rounded-full cursor-pointer overflow-hidden group shadow-inner"
          >
            {/* Filled progress bar */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#d8c8a8] via-[#a89068] to-[#1a1a1a] rounded-full transition-all duration-75"
              style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#888]">
            <span>BRIGHT CINEMATIC EXPERIENCE • 3D TIMELINE</span>
            <span>PRESS SPACE OR SCROLL TO SCRUB TIMELINE</span>
          </div>

        </div>

      </div>
    </>
  );
};

export default CinematicHUD;
