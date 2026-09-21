import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Sparkles, Send, Award, Code2, User } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ['home', 'experience', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: User },
    { id: 'experience', label: 'Kinh nghiệm & Kỹ năng', icon: Code2 },
    { id: 'achievements', label: 'Thành tích nổi bật', icon: Award },
    { id: 'contact', label: 'Liên hệ', icon: Send },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 glass-panel border-b border-cyan-500/20 shadow-lg shadow-black/40 backdrop-blur-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Về trang chủ"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-sm shadow-cyan-500/20">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-base tracking-tight text-white flex items-center gap-1">
                DEV.<span className="text-cyan-400">PORTFOLIO</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1"></span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono tracking-wider">v2.0 • Interactive</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 p-1.5 rounded-full bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-sm shadow-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px]"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Contact shortcut */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="relative group px-5 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wide text-white overflow-hidden transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"></div>
              <div className="absolute inset-[1px] bg-slate-950 rounded-[11px] transition-all group-hover:bg-slate-900/70"></div>
              <span className="relative z-10 flex items-center gap-2 text-cyan-300 group-hover:text-white">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Bắt tay hợp tác</span>
              </span>
            </a>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel border border-cyan-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <div className="pt-2 mt-2 border-t border-slate-800">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-md shadow-cyan-500/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>🤝 Bắt tay hợp tác ngay</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
