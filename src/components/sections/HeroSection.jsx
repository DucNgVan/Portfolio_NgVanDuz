import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, FileText } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const HeroSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredNav, setHoveredNav] = useState(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const navLinks = [
    { id: 'work', label: t.nav.work || 'WORK', href: '#work' },
    { id: 'about', label: t.nav.about || 'ABOUT', href: '#about' },
    { id: 'expertise', label: t.nav.expertise || 'EXPERTISE', href: '#expertise' },
    { id: 'achievements', label: t.nav.achievements || 'HONORS', href: '#achievements' },
    { id: 'contact', label: t.nav.contact || 'CONTACT', href: '#contact' },
  ];

  // Letters for kinetic display
  const softwareLetters = (t.hero.titleWord1 || "SOFTWARE").split("");

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] lg:h-screen w-full bg-[#F4EFEA] text-[#0D0D0D] flex flex-col justify-between p-5 sm:p-8 lg:px-14 lg:py-10 select-none overflow-hidden"
    >
      {/* 1. TOP NAVIGATION */}
      <header className="w-full flex items-center justify-between z-30">
        {/* Left: Elegant Signature Script Logo */}
        <a 
          href="#home" 
          className="font-hand text-3xl sm:text-4xl text-[#0D0D0D] hover:opacity-75 transition-opacity cursor-pointer"
        >
          {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
        </a>

        {/* Center: Desktop Clean Spaced Nav Links with Floating Active Dot */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 relative">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onMouseEnter={() => setHoveredNav(link.id)}
              onMouseLeave={() => setHoveredNav(null)}
              className="text-xs font-semibold tracking-widest text-[#0D0D0D] hover:text-[#8C6D3F] transition-colors relative py-1 group"
            >
              {hoveredNav === link.id && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0D0D0D] animate-in fade-in zoom-in duration-150"></span>
              )}
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0D0D0D] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Minimalist Hamburger Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-[#0D0D0D] hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 stroke-[1.8]" />
        </button>
      </header>

      {/* Mobile / Fullscreen Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F4EFEA] flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="font-hand text-3xl text-[#0D0D0D]">
              {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#0D0D0D] hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-7 h-7 stroke-[1.8]" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-bebas text-5xl sm:text-6xl text-[#0D0D0D] hover:text-[#8C6D3F] tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}

            <a
              href={personalInfo.resumeUrl}
              download="NguyenVanDuc_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D0D0D] text-[#F4EFEA] font-mono text-xs font-bold shadow-md hover:bg-[#8C6D3F] transition-all"
            >
              <FileText className="w-4 h-4 text-[#d8c8a8]" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#555555] border-t border-[#0D0D0D]/10 pt-4">
            <span>©2026 {personalInfo.name}</span>
            <span>DA NANG, VIETNAM</span>
          </div>
        </div>
      )}

      {/* 2. MAIN HERO CONTENT (Artistic Kinetic Typography & Optical Centering) */}
      <div className="my-auto flex flex-col items-center justify-center text-center w-full z-10 py-4 sm:py-6">
        
        {/* Kinetic Giant Word 1: "SOFTWARE" - Elegant Elongation & Liquid Wave Interaction */}
        <div 
          className="flex justify-center items-center overflow-visible py-2 sm:py-3 origin-center"
          style={{
            transform: `translate(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px) scaleY(1.2)`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
          }}
        >
          {softwareLetters.map((char, index) => (
            <span
              key={index}
              data-char={char}
              className="wave-letter font-bebas text-[24vw] sm:text-[20vw] lg:text-[18vw] leading-[0.76] tracking-[0.02em] text-[#0D0D0D] cursor-pointer select-none"
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Kinetic Word 2: "ENGINEERING" */}
        <h2 
          className="font-bebas text-[11vw] sm:text-[8vw] lg:text-[6.2vw] leading-none tracking-[0.16em] text-[#0D0D0D] mt-2 sm:mt-3"
          style={{
            transform: `translate(${-mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {t.hero.titleWord2 || "ENGINEERING"}
        </h2>

        {/* Subtitle Pills: VISUALS • CODE • ARCHITECTURE */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-6 mt-4 sm:mt-5 text-[11px] sm:text-sm font-semibold tracking-[0.2em] text-[#0D0D0D] uppercase font-mono">
          <span>{t.hero.subtitleVisuals || "VISUALS"}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>{t.hero.subtitleCode || "CODE"}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>{t.hero.subtitleArch || "ARCHITECTURE"}</span>
        </div>

        {/* Bio Paragraphs */}
        <div className="max-w-xl mt-3.5 sm:mt-4 text-xs sm:text-sm font-sans text-[#555555] leading-relaxed text-center px-4">
          <p className="font-medium text-[#444444]">
            {lang === 'vi'
              ? 'Sinh viên Kỹ thuật Phần mềm năm cuối tại Đại học Greenwich (Việt Nam)'
              : 'Final-Year Software Engineering Student at University of Greenwich (Vietnam)'}
          </p>
          <p className="mt-1 text-[#0D0D0D] font-bold text-xs sm:text-[13px] tracking-wide">
            {lang === 'vi'
              ? 'Chuyên sâu Clean Architecture, Backend quy mô lớn & Tối ưu Cơ sở dữ liệu'
              : 'Specializing in Clean Architecture, Scalable Backend & Database Optimization'}
          </p>
        </div>

      </div>

      {/* 3. HERO FOOTER BAR (3-Column Layout: Left Signature, Center Mouse Pin, Right Contact Badge) */}
      <div className="w-full grid grid-cols-3 items-end z-20 pt-3 pb-1 sm:pt-2">
        {/* Bottom Left: ©2026 + Handwritten Signature */}
        <div className="text-[10px] sm:text-xs font-mono text-[#444444] tracking-wide flex items-center gap-1.5 mb-1 justify-start">
          <span>©2026</span>
          <span className="font-hand text-lg sm:text-xl text-[#0D0D0D]">
            {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
          </span>
        </div>

        {/* Bottom Center: SCROLL TO EXPLORE WITH ANIMATED MOUSE PIN */}
        <div className="flex justify-center items-end">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-[9px] sm:text-[11px] font-mono tracking-widest text-[#333333] hover:text-[#0D0D0D] transition-colors group cursor-pointer mb-1"
          >
            <span className="tracking-[0.2em] uppercase text-[8px] sm:text-[10px] font-semibold text-[#555555] group-hover:text-[#0D0D0D] transition-colors whitespace-nowrap">
              {t.hero.scrollExplore || "SCROLL TO EXPLORE"}
            </span>
            {/* Animated Scroll Mouse Pin Icon */}
            <div className="w-3.5 h-6 sm:w-4 sm:h-7 rounded-full border-2 border-[#0D0D0D] flex items-start justify-center p-1 group-hover:scale-105 transition-transform">
              <div className="w-1 h-1.5 sm:h-2 bg-[#0D0D0D] rounded-full animate-bounce"></div>
            </div>
          </a>
        </div>

        {/* Bottom Right: Circular Rotating Badge ("GET IN TOUCH") + Location */}
        <div className="flex flex-col items-end gap-1 justify-end">
          <div className="flex flex-col items-center">
            <a
              href="#contact"
              className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 flex items-center justify-center group cursor-pointer"
              title="Get in touch"
            >
              {/* Rotating circular SVG text */}
              <svg
                className="w-full h-full animate-rotate-badge text-[#0D0D0D]"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  />
                </defs>
                <text
                  fontSize="8"
                  fontWeight="600"
                  fill="currentColor"
                >
                  <textPath
                    href="#circlePath"
                    startOffset="0%"
                    textLength="225"
                    lengthAdjust="spacingAndGlyphs"
                  >
                    GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •
                  </textPath>
                </text>
              </svg>

              {/* Central Arrow Button */}
              <div className="absolute w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-[#0D0D0D] text-[#F4EFEA] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8C6D3F] transition-all shadow-sm">
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Location Caption */}
            <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-mono tracking-widest text-[#555555] uppercase font-semibold whitespace-nowrap">
              {t.hero.basedIn || "DA NANG, VIETNAM"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
