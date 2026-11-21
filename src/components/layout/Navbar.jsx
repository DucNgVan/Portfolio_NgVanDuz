import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onNavigate = null, scrollProgress = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDarkSection = scrollProgress >= 0.64 && scrollProgress <= 0.90;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'ABOUT', progress: 0.00, href: '#about' },
    { id: 'expertise', label: 'EXPERTISE', progress: 0.30, href: '#expertise' },
    { id: 'projects', label: 'PROJECTS', progress: 0.54, href: '#projects' },
    { id: 'honors', label: 'HONORS', progress: 0.76, href: '#honors' },
    { id: 'contact', label: 'CONTACT', progress: 1.00, href: '#contact' },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(link.progress);
      return;
    }

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 100) {
      window.scrollTo({
        top: link.progress * totalHeight,
        behavior: 'smooth',
      });
    } else {
      const targetElem = document.querySelector(link.href);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          isDarkSection
            ? 'bg-[#0a0b10]/85 backdrop-blur-md border-b border-white/10 py-4 px-6 sm:px-10 lg:px-14 shadow-md'
            : isScrolled
            ? 'bg-[#f8f7f4]/90 backdrop-blur-md border-b border-black/[0.05] py-4 px-6 sm:px-10 lg:px-14 shadow-sm'
            : 'bg-transparent py-5 sm:py-6 px-6 sm:px-10 lg:px-14'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* Left Brand: nguyenvanduc cursive signature matching user screenshot */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, { progress: 0.0, href: '#hero' })}
            className={`font-hand font-semibold text-3xl sm:text-4xl transition-colors tracking-normal cursor-pointer z-10 ${
              isDarkSection ? 'text-white hover:text-[#d8c8a8]' : 'text-[#111113] hover:text-[#8c7355]'
            }`}
          >
            nguyenvanduc
          </a>

          {/* Center Navigation Links matching user screenshot (centered perfectly to never collide with 3D model) */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-9">
            {navLinks.map((link) => {
              const isHonorsActive = isDarkSection && link.id === 'honors';
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-[12px] tracking-[0.18em] uppercase font-medium transition-colors py-1 cursor-pointer ${
                    isHonorsActive
                      ? 'text-[#d8c8a8] font-bold drop-shadow-[0_0_8px_rgba(216,200,168,0.4)]'
                      : isDarkSection
                      ? 'text-neutral-300 hover:text-white'
                      : 'text-[#444] hover:text-[#111113]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`p-2 rounded-full transition-colors cursor-pointer z-10 ${
              isDarkSection ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#111113]'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f8f7f4]/95 backdrop-blur-2xl flex flex-col justify-center items-center p-8 md:hidden animate-fadeIn">
          <nav className="flex flex-col items-center gap-7 text-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-xl tracking-[0.2em] uppercase font-bold text-[#111113] hover:text-[#8c7355] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
