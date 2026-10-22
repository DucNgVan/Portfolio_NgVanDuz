import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-[#1e1e1e] bg-[#060606] text-[#aaaaaa] select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo Brand in Hand Font */}
          <div className="flex items-center gap-2">
            <span className="font-hand text-2xl text-[#d8c8a8]">
              {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
            </span>
            <span className="text-xs font-mono text-[#888888]">/ Portfolio 2026</span>
          </div>

          {/* Tagline */}
          <div className="text-xs font-mono tracking-wider text-[#999999] uppercase">
            {t.footer?.tagline || 'CRAFTED WITH PRECISION • REACT & TAILWIND'}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#2e2e2e] hover:border-[#d8c8a8] text-[#cccccc] hover:text-[#d8c8a8] text-xs font-mono transition-all cursor-pointer group"
            aria-label="Back to top"
          >
            <span>{t.footer?.backToTop || 'BACK TO TOP'}</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#d8c8a8]" />
          </button>

        </div>

        {/* Copyright & Open To Opportunities */}
        <div className="mt-8 pt-6 border-t border-[#181818] text-center text-xs font-mono text-[#777777]">
          © 2026 {personalInfo.name}. {t.footer?.copyright || 'All rights reserved. Open for Full-Stack / Software Engineering Internship opportunities!'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
