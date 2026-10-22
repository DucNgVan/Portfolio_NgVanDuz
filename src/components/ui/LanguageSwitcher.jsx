import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ variant = 'floating' }) => {
  const { lang, setLang } = useLanguage();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (variant !== 'floating') return;

    const handleScroll = () => {
      // Show floating switcher only after scrolling past the Hero section
      // to eliminate the double language switcher bug and avoid text overlap in Hero
      const heroThreshold = window.innerHeight * 0.6;
      setScrolledPastHero(window.scrollY > heroThreshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  if (variant === 'nav') {
    return (
      <div className="flex items-center p-0.5 sm:p-1 rounded-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 backdrop-blur-md">
        <button
          onClick={() => setLang('en')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
            lang === 'en'
              ? 'bg-[#0D0D0D] text-[#F4EFEA] shadow-xs'
              : 'text-[#0D0D0D]/70 hover:text-[#0D0D0D]'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => setLang('vi')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
            lang === 'vi'
              ? 'bg-[#0D0D0D] text-[#F4EFEA] shadow-xs'
              : 'text-[#0D0D0D]/70 hover:text-[#0D0D0D]'
          }`}
          aria-label="Chuyển sang Tiếng Việt"
        >
          VI
        </button>
      </div>
    );
  }

  // Floating variant: Only visible when scrolled past Hero
  if (!scrolledPastHero) {
    return null;
  }

  return (
    <aside aria-label="Language selection" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#111111]/95 border border-[#333333] backdrop-blur-xl shadow-2xl hover:border-[#d8c8a8]/80 transition-colors">
        <div className="pl-2 pr-0.5 text-[#d8c8a8]">
          <Globe className="w-3.5 h-3.5" />
        </div>
        <button
          onClick={() => setLang('en')}
          className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
            lang === 'en'
              ? 'bg-[#d8c8a8] text-[#0d0d0d] shadow-sm'
              : 'text-[#aaaaaa] hover:text-[#f4efea]'
          }`}
          title="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => setLang('vi')}
          className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
            lang === 'vi'
              ? 'bg-[#d8c8a8] text-[#0d0d0d] shadow-sm'
              : 'text-[#aaaaaa] hover:text-[#f4efea]'
          }`}
          title="Chuyển sang Tiếng Việt"
        >
          VI
        </button>
      </div>
    </aside>
  );
};

export default LanguageSwitcher;
