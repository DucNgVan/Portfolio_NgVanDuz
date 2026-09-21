import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const HeroSection = () => {
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
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'ACHIEVEMENTS', href: '#achievements' },
    { label: 'CONTACT', href: '#contact' },
  ];

  // Letters for "SOFTWARE"
  const softwareLetters = "SOFTWARE".split("");

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#F4EFEA] text-[#0D0D0D] flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none overflow-hidden"
    >
      {/* 1. TOP NAVIGATION (Header matching Screenshot 3) */}
      <header className="w-full flex items-center justify-between z-30">
        {/* Signature Logo: nguyen van duc in elegant cursive */}
        <a href="#home" className="font-hand text-3xl sm:text-4xl text-[#0D0D0D] hover:opacity-75 transition-opacity">
          {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-widest text-[#0D0D0D] hover:text-[#BFA882] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0D0D0D] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Hamburger Menu Button (Right) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#0D0D0D] hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F4EFEA] flex flex-col justify-center items-center gap-6 p-8 animate-in fade-in duration-300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 p-3 text-[#0D0D0D]"
          >
            <X className="w-8 h-8" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-bebas text-4xl sm:text-5xl text-[#0D0D0D] hover:text-[#BFA882] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* 2. GIANT KINETIC DISPLAY: "SOFTWARE ENGINEERING" */}
      <div className="my-auto flex flex-col items-center justify-center text-center w-full z-10 py-8 sm:py-12">
        {/* Kinetic Wavy Word: "SOFTWARE" */}
        <div 
          className="flex justify-center items-center overflow-visible"
          style={{
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {softwareLetters.map((char, index) => (
            <span
              key={index}
              className="wave-letter font-bebas text-[19vw] sm:text-[17vw] leading-[0.8] tracking-tight text-[#0D0D0D] cursor-default"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* "ENGINEERING" */}
        <h2 
          className="font-bebas text-[11vw] sm:text-[9.5vw] leading-[0.85] tracking-wider text-[#0D0D0D] mt-2 sm:mt-4"
          style={{
            transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          ENGINEERING
        </h2>

        {/* Subtitle: VISUALS • CODE • ARCHITECTURE */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm font-semibold tracking-widest text-[#0D0D0D] uppercase font-sans">
          <span>VISUALS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>CODE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]"></span>
          <span>ARCHITECTURE</span>
        </div>

        {/* SCROLL TO EXPLORE INDICATOR */}
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-2 mt-8 sm:mt-12 text-[11px] font-mono tracking-widest text-[#333333] hover:text-[#0D0D0D] transition-colors group cursor-pointer"
        >
          <span className="tracking-[0.2em]">SCROLL TO EXPLORE</span>
          {/* Animated Scroll Mouse Pin Icon */}
          <div className="w-5 h-8 rounded-full border-2 border-[#0D0D0D] flex items-start justify-center p-1 group-hover:scale-105 transition-transform">
            <div className="w-1 h-2 bg-[#0D0D0D] rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>

      {/* 3. FOOTER BAR */}
      <div className="w-full flex items-end justify-between z-20 pt-4">
        {/* Bottom Left: Copyright */}
        <div className="text-xs font-mono text-[#444444] tracking-wide flex items-center gap-1">
          <span>©2026</span>
          <span className="font-hand text-lg text-[#0D0D0D] ml-1">
            {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
          </span>
        </div>

        {/* Bottom Right: Circular Rotating Badge & Location */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="#contact"
            className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center group cursor-pointer"
            title="Liên hệ / Let's Work Together"
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
              <text fontSize="9.2" fontWeight="600" letterSpacing="2.8" fill="currentColor">
                <textPath href="#circlePath" startOffset="0%">
                  LET'S WORK TOGETHER • LET'S WORK TOGETHER •
                </textPath>
              </text>
            </svg>

            {/* Central Arrow Button */}
            <div className="absolute w-10 h-10 rounded-full bg-[#0D0D0D] text-[#F4EFEA] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#BFA882] transition-all shadow-md">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Location Caption */}
          <span className="text-[10px] font-mono tracking-widest text-[#555555] uppercase">
            BASED IN VIETNAM
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
