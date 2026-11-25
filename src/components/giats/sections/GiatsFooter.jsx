import React, { useEffect, useState } from "react";
import { ArrowUp, Mail, MapPin } from "lucide-react";

export const GiatsFooter = ({ onScrollTo }) => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative w-full pt-20 pb-12 px-6 sm:px-12 bg-[#28282b] text-[#f0f4f1] z-10 border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-16">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Sitemap */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#f2ffbd] mb-2">Sitemap</p>
            <a href="#home" onClick={(e) => { e.preventDefault(); onScrollTo && onScrollTo("#home"); }} className="text-sm text-white/70 hover:text-white transition-colors">01 // Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onScrollTo && onScrollTo("#about"); }} className="text-sm text-white/70 hover:text-white transition-colors">02 // About</a>
            <a href="#honors" onClick={(e) => { e.preventDefault(); onScrollTo && onScrollTo("#honors"); }} className="text-sm text-white/70 hover:text-white transition-colors">03 // Honors & Awards</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); onScrollTo && onScrollTo("#projects"); }} className="text-sm text-white/70 hover:text-white transition-colors">04 // Selected Projects</a>
            <a href="/NguyenVanDuc_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">05 // Resume (PDF)</a>
          </div>

          {/* Socials */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#f2ffbd] mb-2">Follow Me</p>
            <a href="https://github.com/DucNgVan" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">GitHub / DucNgVan</a>
            <a href="https://linkedin.com/in/ducngvan" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">LinkedIn / ducngvan</a>
            <a href="https://facebook.com/ducngvan04" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Facebook / ducngvan04</a>
            <a href="tel:0788551709" className="text-sm font-mono text-white/70 hover:text-white transition-colors">Phone: 078.855.1709</a>
          </div>

          {/* Work With Me & Direct Email */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[#f2ffbd]">Work With Me</p>
            <div className="group inline-block">
              <a
                href="mailto:ducngvan04@gmail.com"
                className="text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#f2ffbd] transition-colors flex items-center gap-2"
              >
                <span>ducngvan04@gmail.com</span>
                <Mail className="w-6 h-6 text-[#915EFF] group-hover:scale-110 transition-transform" />
              </a>
              {/* Giats signature decorative SVG underline wave */}
              <svg className="w-full max-w-md h-3 text-[#f2ffbd] mt-1" viewBox="0 0 1200 60" preserveAspectRatio="none">
                <path
                  d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                />
              </svg>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-md font-light">
              Send me an email for inquiries regarding full-stack software development, architectural design, or internship roles.
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-xs text-white/60 font-mono">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Da Nang, Vietnam • Current Time: <strong className="text-white">{timeStr}</strong></span>
          </div>
          <div>
            <span>Availability: <strong className="text-emerald-400">Open for Software Engineering Roles</strong></span>
          </div>
          <div className="sm:text-right">
            <span>© 2026 Nguyen Van Duc. All Rights Reserved.</span>
          </div>
        </div>

        {/* Big Giats-Style Brand Typography */}
        <div className="w-full flex items-center justify-between border-t border-white/10 pt-10 select-none">
          <span className="text-[13vw] sm:text-[14vw] font-black leading-none tracking-tighter text-white/10 hover:text-white/20 transition-colors">
            DUCNGVAN
          </span>

          {/* Go To Top Button */}
          <button
            onClick={scrollToTop}
            className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl bg-white/5 hover:bg-[#f2ffbd] hover:text-black border border-white/10 transition-all group"
            title="Scroll To Top"
            aria-label="Scroll To Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase">TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default GiatsFooter;
