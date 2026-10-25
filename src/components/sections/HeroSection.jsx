import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, FileText, FolderGit2, Menu, X } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

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
      className="relative min-h-screen lg:h-screen w-full bg-[#F4EFEA] text-[#0D0D0D] flex flex-col justify-between p-4 sm:p-6 lg:px-12 lg:py-6 select-none overflow-hidden"
    >
      {/* 1. TOP NAVIGATION HEADER BAR */}
      <header className="w-full z-30">
        <div className="w-full flex items-center justify-between px-5 sm:px-8 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#0D0D0D]/10 shadow-[0_4px_20px_rgba(13,13,13,0.06)] transition-all">
          {/* Brand identity: Cursive signature + Clear readable role tagline */}
          <a href="#home" className="flex items-center gap-3 group">
            <span className="font-hand text-2xl sm:text-3xl text-[#0D0D0D] group-hover:opacity-75 transition-opacity">
              {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
            </span>
            <span className="hidden sm:inline-block w-px h-5 bg-[#0D0D0D]/20"></span>
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0D0D0D] text-[#F4EFEA] text-xs font-mono font-semibold hover:bg-[#8C6D3F] transition-all shadow-sm"
              title="Download ATS Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.nav.resume || "RESUME (PDF)"}</span>
            </a>
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
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0D0D0D] hover:opacity-70 transition-opacity"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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

      {/* 2. MAIN HERO CONTENT: Expanded & Larger Kinetic Typography */}
      <div className="my-auto flex flex-col items-center justify-center text-center w-full z-10 py-2 sm:py-4">
        
        {/* Kinetic Wavy Word 1: "SOFTWARE" (Larger & More Letter Spacing) */}
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
              className="wave-letter font-bebas text-[19vw] sm:text-[16vw] lg:text-[13.5vw] leading-[0.8] tracking-[0.06em] text-[#0D0D0D] cursor-default"
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Kinetic Word 2: "ENGINEERING" (Larger & Wide Letter Spacing) */}
        <h2 
          className="font-bebas text-[12vw] sm:text-[9.8vw] lg:text-[8.2vw] leading-[0.85] tracking-[0.15em] text-[#0D0D0D] mt-1 sm:mt-2"
          style={{
            transform: `translate(${-mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {t.hero.titleWord2 || "ENGINEERING"}
        </h2>

        {/* Subtitle Headline: Split across lines & removed "Remote" as requested */}
        <div className="max-w-2xl mt-4 sm:mt-5 text-xs sm:text-sm font-sans font-medium text-[#444444] leading-relaxed px-4 text-center">
          <p>Final-Year Software Engineering Student at University of Greenwich</p>
          <p className="mt-1 text-[#222222] font-semibold">Open to Internships in Da Nang</p>
        </div>

        {/* Subtitle Pills: VISUALS • CODE • ARCHITECTURE */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 text-[11px] sm:text-xs font-semibold tracking-widest text-[#222222] uppercase font-sans">
          <span>{t.hero.subtitleVisuals}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>{t.hero.subtitleCode}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>{t.hero.subtitleArch}</span>
        </div>

        {/* PRIMARY CALL-TO-ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
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
          className="inline-flex flex-col items-center gap-1 mt-4 sm:mt-5 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#555555] hover:text-[#0D0D0D] transition-colors group cursor-pointer"
        >
          <span className="tracking-[0.2em]">{t.hero.scrollExplore}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#0D0D0D]" />
        </a>
      </div>

      {/* 3. HERO FOOTER BAR: Perfectly Aligned Baseline for Left & Right Elements */}
      <div className="w-full flex items-end justify-between z-20 pt-2 pb-1">
        {/* Bottom Left Element: Copyright & University */}
        <div className="text-xs font-mono text-[#444444] tracking-wide flex flex-col sm:flex-row sm:items-center gap-1 mb-1">
          <span>©2026 {personalInfo.name}</span>
          <span className="hidden sm:inline text-[#888888]">•</span>
          <span className="text-[11px] text-[#666666]">University of Greenwich</span>
        </div>

        {/* Bottom Right Element: Circular Badge ("Get in touch") + Location */}
        <div className="flex flex-col items-center gap-1.5">
          <a
            href="#contact"
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group cursor-pointer"
            title="Get in touch"
          >
            {/* Rotating circular SVG text: "GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •" */}
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
            <div className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D0D0D] text-[#F4EFEA] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8C6D3F] transition-all shadow-md">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Location Caption */}
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#444444] uppercase font-semibold">
            {t.hero.basedIn || "DA NANG, VIETNAM"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
