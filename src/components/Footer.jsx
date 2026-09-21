import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-[#1a1a1a] bg-[#060606] text-[#888888] select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo Brand in Hand Font */}
          <div className="flex items-center gap-2">
            <span className="font-hand text-2xl text-[#d8c8a8]">
              {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
            </span>
            <span className="text-xs font-mono text-[#555555]">/ Portfolio 2026</span>
          </div>

          {/* Tagline */}
          <div className="text-xs font-mono tracking-wider text-[#666666]">
            CRAFTED WITH PRECISION • REACT & TAILWIND
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#262626] hover:border-[#d8c8a8] text-[#888888] hover:text-[#d8c8a8] text-xs font-mono transition-all cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#111111] text-center text-[11px] font-mono text-[#444444]">
          © 2026 {personalInfo.name}. All rights reserved. Open for new opportunities and collaborations!
        </div>
      </div>
    </footer>
  );
};

export default Footer;
