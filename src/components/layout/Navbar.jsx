import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ onNavigate = null, scrollProgress = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Dynamically detect which section is in view
      const sections = ['about', 'expertise', 'projects', 'honors', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'expertise', label: 'EXPERTISE', href: '#expertise' },
    { id: 'projects', label: 'PROJECTS', href: '#projects' },
    { id: 'honors', label: 'HONORS', href: '#honors' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(link.id);
    }

    const targetElem = document.getElementById(link.id) || document.querySelector(link.href);
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          isScrolled
            ? 'bg-[#08090d]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 sm:py-4 px-4 sm:px-10 lg:px-14 shadow-2xl'
            : 'bg-transparent py-5 sm:py-6 px-4 sm:px-10 lg:px-14'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Left Brand: nguyenvanduc cursive signature with golden shimmer */}
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, { id: 'about', href: '#about' })}
            className="group flex items-center gap-2 cursor-pointer z-10"
          >
            <span className="font-hand font-bold text-2xl sm:text-3xl text-white group-hover:text-[#d8c8a8] transition-colors tracking-normal">
              nguyenvanduc
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#d8c8a8]/70 border border-[#d8c8a8]/30 px-2 py-0.5 rounded-full">
              Full-Stack SE
            </span>
          </a>

          {/* Center Navigation Links with Active Indicator */}
          <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 2xl:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`relative text-[12px] tracking-[0.18em] uppercase font-medium transition-all py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#d8c8a8] font-bold drop-shadow-[0_0_12px_rgba(216,200,168,0.5)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d8c8a8] to-transparent animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Quick Resume / Contact CTA & Mobile Menu */}
          <div className="flex items-center gap-3 z-10">
            <a
              href="/NguyenVanDuc_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-[#d8c8a8] border border-[#d8c8a8]/30 hover:border-[#d8c8a8] hover:bg-[#d8c8a8]/10 px-3.5 py-1.5 rounded-full transition-all"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/10 text-white transition-colors cursor-pointer xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08090d]/98 backdrop-blur-2xl flex flex-col justify-center items-center p-8 xl:hidden animate-fadeIn">
          <div className="w-full max-w-sm flex flex-col items-center gap-8 text-center">
            <div className="font-hand text-3xl font-bold text-[#d8c8a8] mb-2">
              nguyenvanduc
            </div>

            <nav className="flex flex-col items-center gap-6 w-full">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`text-lg tracking-[0.2em] uppercase font-bold py-2 w-full transition-colors rounded-xl ${
                      isActive
                        ? 'text-[#d8c8a8] bg-white/[0.05]'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <a
              href="/NguyenVanDuc_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-full border border-[#d8c8a8] text-[#d8c8a8] font-mono text-sm tracking-wider uppercase hover:bg-[#d8c8a8]/10 transition-colors"
            >
              View Official Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
