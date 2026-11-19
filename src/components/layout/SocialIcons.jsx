import React from 'react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import { Mail, FileText } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

export const SocialIcons = () => {
  return (
    <>
      {/* 1. FIXED LEFT VERTICAL SOCIAL RAIL (Gentle Warm Sand Palette) */}
      <div 
        id="social"
        className="fixed left-5 sm:left-8 bottom-8 z-40 hidden md:flex flex-col items-center gap-5 text-[#8e929e]"
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="p-2 rounded-xl hover:text-[#d8c8a8] hover:bg-[#d8c8a8]/10 hover:scale-115 transition-all duration-300 group cursor-pointer"
        >
          <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
        </a>

        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="p-2 rounded-xl hover:text-[#d8c8a8] hover:bg-[#d8c8a8]/10 hover:scale-115 transition-all duration-300 group cursor-pointer"
        >
          <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
        </a>

        <a
          href={`mailto:${personalInfo.email}`}
          aria-label="Direct Email"
          className="p-2 rounded-xl hover:text-[#d8c8a8] hover:bg-[#d8c8a8]/10 hover:scale-115 transition-all duration-300 group cursor-pointer"
        >
          <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
        </a>

        {/* Vertical subtle divider line */}
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#33353e] to-transparent mt-1" />
      </div>

      {/* 2. FIXED RIGHT ROTATED RESUME BUTTON (Moncy Signature) */}
      <div className="fixed right-6 sm:right-8 bottom-12 z-40 hidden md:flex items-center">
        <a
          href={personalInfo.resumeUrl}
          download="NguyenVanDuc_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#8e929e] hover:text-[#f4efea] hover:scale-105 transition-all duration-300 origin-bottom-right rotate-90 select-none group cursor-pointer"
        >
          <span className="group-hover:text-[#d8c8a8] transition-colors">RESUME (PDF)</span>
          <FileText className="w-3.5 h-3.5 text-[#d8c8a8]" />
        </a>
      </div>
    </>
  );
};

export default SocialIcons;
