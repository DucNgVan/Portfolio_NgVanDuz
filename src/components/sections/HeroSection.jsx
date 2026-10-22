import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, FileText, FolderGit2, Menu, X } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const HeroSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.expertise, href: '#expertise' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.achievements, href: '#achievements' },
    { label: t.nav.contact, href: '#contact' },
  ];

  // Letters for kinetic display
  const softwareLetters = (t.hero.titleWord1 || "SOFTWARE").split("");

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#F4EFEA] text-[#0D0D0D] flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none overflow-hidden"
    >
      {/* 1. TOP NAVIGATION HEADER */}
      <header className="w-full flex items-center justify-between z-30">
        {/* Brand identity: Cursive signature + Clear readable role tagline */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="font-hand text-3xl sm:text-4xl text-[#0D0D0D] group-hover:opacity-75 transition-opacity">
            {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
          </span>
          <span className="hidden sm:inline-block w-px h-6 bg-[#0D0D0D]/20"></span>
          <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-[#333333] font-semibold uppercase">
            Full-Stack Intern
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-widest text-[#0D0D0D] hover:text-[#8C6D3F] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0D0D0D] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}

          {/* Quick Resume Download Action */}
          <a
            href={personalInfo.resumeUrl}
            download="NguyenVanDuc_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D0D0D] text-[#F4EFEA] text-xs font-mono font-semibold hover:bg-[#8C6D3F] transition-colors shadow-sm"
            title="Download ATS Resume PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.nav.resume || "RESUME (PDF)"}</span>
          </a>

          {/* Header Language Switcher (Single primary switcher on hero) */}
          <LanguageSwitcher variant="nav" />
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={personalInfo.resumeUrl}
            download="NguyenVanDuc_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#0D0D0D] text-[#F4EFEA] text-xs font-mono"
            title="Download CV"
          >
            <FileText className="w-4 h-4" />
          </a>
          <LanguageSwitcher variant="nav" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0D0D0D] hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F4EFEA] flex flex-col justify-center items-center gap-6 p-8 animate-in fade-in duration-300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 p-3 text-[#0D0D0D]"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="text-center mb-4">
            <h3 className="font-syne text-2xl font-bold text-[#0D0D0D]">{personalInfo.name}</h3>
            <p className="text-xs font-mono text-[#555555] mt-1">{t.hero.role}</p>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-bebas text-4xl sm:text-5xl text-[#0D0D0D] hover:text-[#8C6D3F] transition-colors"
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
            className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D0D0D] text-[#F4EFEA] font-mono text-sm font-bold shadow-lg"
          >
            <FileText className="w-4 h-4" />
            <span>{t.hero.ctaCv || "Download CV (PDF)"}</span>
          </a>
        </div>
      )}

      {/* 2. MAIN HERO CONTENT: Identification, Kinetic Display & Direct CTAs */}
      <div className="my-auto flex flex-col items-center justify-center text-center w-full z-10 py-6 sm:py-8">
        
        {/* CLEAR 5-SECOND CANDIDATE IDENTIFICATION */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0D0D]/5 border border-[#0D0D0D]/15 mb-4 sm:mb-6 animate-in fade-in duration-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-semibold tracking-wide text-[#0D0D0D]">
            {t.hero.greeting} — {t.hero.role}
          </span>
        </div>

        {/* Kinetic Wavy Word 1: "SOFTWARE" */}
        <div 
          className="flex justify-center items-center overflow-visible"
          style={{
            transform: `translate(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {softwareLetters.map((char, index) => (
            <span
              key={index}
              className="wave-letter font-bebas text-[18vw] sm:text-[15vw] leading-[0.8] tracking-tight text-[#0D0D0D] cursor-default"
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
          className="font-bebas text-[11vw] sm:text-[8.8vw] leading-[0.85] tracking-wider text-[#0D0D0D] mt-1 sm:mt-2"
          style={{
            transform: `translate(${-mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {t.hero.titleWord2 || "ENGINEERING"}
        </h2>

        {/* Clear Subtitle Headline */}
        <p className="max-w-2xl mt-4 sm:mt-5 text-xs sm:text-sm font-sans font-medium text-[#444444] leading-relaxed px-4">
          {t.hero.subHeadline}
        </p>

        {/* Subtitle Pills: VISUALS • CODE • ARCHITECTURE */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 text-[11px] sm:text-xs font-semibold tracking-widest text-[#222222] uppercase font-sans">
          <span>{t.hero.subtitleVisuals}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>{t.hero.subtitleCode}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>{t.hero.subtitleArch}</span>
        </div>

        {/* PRIMARY CALL-TO-ACTION BUTTONS (Solves the missing CTA problem!) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <a
            href="#work"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D0D0D] text-[#F4EFEA] hover:bg-[#8C6D3F] transition-all text-xs sm:text-sm font-mono font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4 text-[#d8c8a8]" />
            <span>{t.hero.ctaProjects || "View Projects"}</span>
          </a>

          <a
            href={personalInfo.resumeUrl}
            download="NguyenVanDuc_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#0D0D0D]/20 text-[#0D0D0D] hover:border-[#0D0D0D] hover:bg-[#FAF8F5] transition-all text-xs sm:text-sm font-mono font-bold shadow-xs hover:-translate-y-0.5 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#8C6D3F]" />
            <span>{t.hero.ctaCv || "Download CV (PDF)"}</span>
          </a>
        </div>

        {/* SCROLL TO EXPLORE INDICATOR */}
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1.5 mt-8 text-[11px] font-mono tracking-widest text-[#555555] hover:text-[#0D0D0D] transition-colors group cursor-pointer"
        >
          <span className="tracking-[0.2em]">{t.hero.scrollExplore}</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#0D0D0D]" />
        </a>
      </div>

      {/* 3. HERO FOOTER BAR */}
      <div className="w-full flex items-end justify-between z-20 pt-4">
        {/* Bottom Left: Copyright & University standing */}
        <div className="text-xs font-mono text-[#444444] tracking-wide flex flex-col sm:flex-row sm:items-center gap-1">
          <span>©2026 {personalInfo.name}</span>
          <span className="hidden sm:inline text-[#888888]">•</span>
          <span className="text-[11px] text-[#666666]">University of Greenwich</span>
        </div>

        {/* Bottom Right: Circular Rotating Badge & Location */}
        <div className="flex flex-col items-end sm:items-center gap-2">
          <a
            href="#contact"
            className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center group cursor-pointer"
            title="Open to Internships - Contact Me"
          >
            {/* Rotating circular SVG text */}
            <svg
              className="w-full h-full animate-rotate-badge text-[#0D0D0D]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fontSize="8.6" fontWeight="600" letterSpacing="2.2" fill="currentColor">
                <textPath href="#circlePath" startOffset="0%">
                  {t.hero.rotatingBadge || "OPEN TO INTERNSHIPS • READY TO CONTRIBUTE •"}
                </textPath>
              </text>
            </svg>

            {/* Central Arrow Button */}
            <div className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D0D0D] text-[#F4EFEA] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8C6D3F] transition-all shadow-md">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Location Caption with ample spacing to avoid any clash */}
          <span className="text-[10px] font-mono tracking-widest text-[#444444] uppercase font-semibold">
            {t.hero.basedIn || "DA NANG, VIETNAM"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
