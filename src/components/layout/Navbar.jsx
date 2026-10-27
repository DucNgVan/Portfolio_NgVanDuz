import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const Navbar = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Active section spy
      const sectionIds = ['contact', 'achievements', 'work', 'expertise', 'about', 'home'];
      const scrollPos = scrollY + window.innerHeight * 0.35;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: t.nav.work || 'PROJECTS', href: '#work' },
    { id: 'about', label: t.nav.about || 'ABOUT', href: '#about' },
    { id: 'expertise', label: t.nav.expertise || 'EXPERTISE', href: '#expertise' },
    { id: 'achievements', label: t.nav.achievements || 'HONORS', href: '#achievements' },
    { id: 'contact', label: t.nav.contact || 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      {/* FIXED TOP NAVIGATION BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#222222]/80 shadow-xl shadow-black/50 py-3.5 sm:py-4 px-5 sm:px-8 lg:px-14'
            : 'bg-transparent pt-5 sm:pt-8 lg:pt-10 pb-4 px-5 sm:px-8 lg:px-14'
        }`}
      >
        <div className="w-full flex items-center justify-between mx-auto">
          {/* Left: Signature Logo */}
          <a
            href="#home"
            className={`font-hand text-3xl sm:text-4xl transition-colors cursor-pointer ${
              isScrolled
                ? 'text-[#F4EFEA] hover:text-[#d8c8a8]'
                : 'text-[#0D0D0D] hover:opacity-75'
            }`}
            aria-label="Back to top"
          >
            {personalInfo.name.toLowerCase().replace(/\s+/g, '')}
          </a>

          {/* Center: Desktop Spaced Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredNav === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`text-xs font-semibold tracking-widest transition-colors relative py-1 group cursor-pointer ${
                    isScrolled
                      ? isActive
                        ? 'text-[#d8c8a8]'
                        : 'text-[#cccccc] hover:text-[#d8c8a8]'
                      : isActive
                        ? 'text-[#0D0D0D]'
                        : 'text-[#0D0D0D] hover:text-[#8C6D3F]'
                  }`}
                >
                  {(isHovered || (isActive && isScrolled)) && (
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-in fade-in zoom-in duration-150 ${
                        isScrolled ? 'bg-[#d8c8a8]' : 'bg-[#0D0D0D]'
                      }`}
                    />
                  )}
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-200 ${
                      isActive && isScrolled ? 'w-full' : 'w-0 group-hover:w-full'
                    } ${isScrolled ? 'bg-[#d8c8a8]' : 'bg-[#0D0D0D]'}`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`p-2 transition-colors cursor-pointer ${
              isScrolled
                ? 'text-[#F4EFEA] hover:text-[#d8c8a8]'
                : 'text-[#0D0D0D] hover:opacity-70'
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 stroke-[1.8]" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F4EFEA] text-[#0D0D0D] flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-300 select-none">
          <div className="flex items-center justify-between">
            <span className="font-hand text-3xl sm:text-4xl text-[#0D0D0D]">
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
                className="font-bebas text-5xl sm:text-6xl text-[#0D0D0D] hover:text-[#8C6D3F] tracking-wider transition-colors cursor-pointer"
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
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D0D0D] text-[#F4EFEA] font-mono text-xs font-bold shadow-md hover:bg-[#8C6D3F] transition-all cursor-pointer"
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
    </>
  );
};

export default Navbar;
