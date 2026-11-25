import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export const GiatsNavbar = ({ onOpenMenu, onScrollTo }) => {
  const ballRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!ballRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ballRef.current.style.left = `${x}px`;
    ballRef.current.style.top = `${y}px`;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-12 py-5 sm:py-7 flex justify-between items-center transition-all pointer-events-auto">
      {/* Brand Logo */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          onScrollTo && onScrollTo("#home");
        }}
        className="flex items-center gap-3 group"
      >
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md group-hover:text-[#f2ffbd] transition-colors">
          DUCNGVAN
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono text-white/80 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Da Nang, VN</span>
        </span>
      </a>

      {/* Right Navigation Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Magnetic Get In Touch Button */}
        <a
          href="mailto:ducngvan04@gmail.com"
          onMouseMove={handleMouseMove}
          className="relative hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-medium text-xs tracking-wider uppercase overflow-hidden group transition-all hover:border-white"
        >
          <span
            ref={ballRef}
            className="absolute w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-0 group-hover:scale-100 transition-transform duration-500 ease-out z-0"
          />
          <span className="relative z-10 group-hover:text-black transition-colors flex items-center gap-1.5">
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* CV Link */}
        <a
          href="/NguyenVanDuc_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-mono border border-white/10 transition-all"
        >
          <span>CV (PDF)</span>
        </a>

        {/* Perspective Menu Toggle Button */}
        <button
          onClick={onOpenMenu}
          className="relative px-5 py-2.5 rounded-full bg-[#f2ffbd] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-1.5 shadow-lg shadow-black/30"
          aria-label="Open Navigation Menu"
        >
          <span>MENU</span>
          <span className="text-xs">☰</span>
        </button>
      </div>
    </header>
  );
};

export default GiatsNavbar;
