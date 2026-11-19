import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-10 border-t border-[#1e2026] bg-[#0c0d10] text-[#888888] select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <span className="text-base font-bold font-syne text-[#f4efea]">ducnv.dev</span>
          <span className="text-xs font-mono text-[#666666]">/ Portfolio 2026</span>
        </div>

        <div className="text-xs font-mono tracking-wider text-[#666666] uppercase">
          INSPIRED BY MONCY.DEV • CRAFTED FOR IMPACT
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#262833] text-[#aaaaaa] hover:text-[#d8c8a8] hover:border-[#d8c8a8]/50 text-xs font-mono transition-all cursor-pointer group"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#d8c8a8]" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
