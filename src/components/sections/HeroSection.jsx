import React from 'react';
import InteractiveCharacter from '@/components/ui/InteractiveCharacter';
import InteractiveSoftwareTitle from '@/components/ui/InteractiveSoftwareTitle';
import { useLanguage } from '@/context/LanguageContext';

export const HeroSection = () => {
  const { lang } = useLanguage();

  return (
    <section 
      id="hero" 
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center text-center pt-24 sm:pt-28 pb-6 px-6 sm:px-10 lg:px-14 overflow-hidden select-none bg-[#0f0f0f] text-[#f4efea]"
    >
      {/* Subtle ambient lighting */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,164,104,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* 1. TOP: Kinetic Editorial Headline "SOFTWARE ENGINEERING" */}
      <div className="relative z-20 flex flex-col items-center mt-2 sm:mt-4">
        <InteractiveSoftwareTitle 
          word1="SOFTWARE" 
          word2="ENGINEERING"
          className="scale-95 sm:scale-100"
        />

        {/* Lead Tagline directly below headline */}
        <p className="max-w-[46ch] text-xs sm:text-sm md:text-base text-[#a79e92] font-sans mt-4 sm:mt-5 leading-relaxed px-4">
          {lang === 'vi' ? (
            <>
              Sinh viên năm cuối ngành Kỹ thuật Phần mềm tại Đại học Greenwich (Việt Nam).{' '}
              <b className="text-[#f4efea] font-semibold">Clean architecture, scalable backend, database optimization.</b>
            </>
          ) : (
            <>
              Final-year Software Engineering student at University of Greenwich (Vietnam).{' '}
              <b className="text-[#f4efea] font-semibold">Clean architecture, scalable backend, database optimization.</b>
            </>
          )}
        </p>
      </div>

      {/* 2. CENTER: Interactive 3D Character Model (Horizontal 360° Drag) */}
      <div className="relative z-10 w-full max-w-2xl h-[340px] sm:h-[420px] lg:h-[480px] flex items-center justify-center my-auto">
        <InteractiveCharacter />
      </div>

      {/* 3. BOTTOM: Footer Bar matching reference HTML */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-end justify-between text-xs font-mono text-[#a79e92] pt-4 border-t border-white/5">
        
        {/* Left: ©2026 nguyenvanduc */}
        <div className="text-left">
          <span>©2026 </span>
          <span className="font-hand text-lg sm:text-xl text-[#f4efea] font-semibold tracking-normal">
            nguyenvanduc
          </span>
        </div>

        {/* Center: Scroll indicator with animated mouse wheel */}
        <a 
          href="#about"
          className="flex flex-col items-center gap-1.5 text-[11px] tracking-widest text-[#a79e92] hover:text-[#d8c8a8] transition-colors cursor-pointer group"
        >
          <span className="uppercase text-[10px] font-mono">SCROLL</span>
          <div className="w-3.5 h-6 rounded-full border border-white/40 group-hover:border-[#d8c8a8] relative transition-colors">
            <span className="absolute left-1/2 top-1.5 -translate-x-1/2 w-0.5 h-1.5 bg-[#d8c8a8] rounded-full animate-bounce" />
          </div>
        </a>

        {/* Right: Location & Status */}
        <div className="text-right">
          <span className="text-[#a79e92] tracking-wider uppercase text-[11px]">
            DA NANG, VIETNAM
          </span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
