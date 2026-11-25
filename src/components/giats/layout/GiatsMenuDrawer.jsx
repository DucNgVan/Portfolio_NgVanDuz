import React, { useEffect, useState } from "react";
import { ArrowUpRight, X, Mail, Phone, MapPin, Download } from "lucide-react";

export const GiatsMenuDrawer = ({ isOpen, onClose, onNavigate }) => {
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

  const menuLinks = [
    { title: "01 // HOME", href: "#home" },
    { title: "02 // ABOUT ME", href: "#about" },
    { title: "03 // HONORS & AWARDS", href: "#honors" },
    { title: "04 // SELECTED PROJECTS", href: "#projects" },
    { title: "05 // RESUME (PDF)", href: "/NguyenVanDuc_CV.pdf", isExternal: true },
    { title: "06 // CONTACT", href: "#contact" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-[#1c1c1f] text-[#f0f4f1] transition-all duration-500 overflow-y-auto"
      style={{ animation: "fadeIn 0.35s ease-out" }}
    >
      {/* Top Header inside Drawer */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">DUCNGVAN</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
            Open for Roles
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white text-sm font-medium transition-colors"
          aria-label="Close Menu"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation Links with Perspective Hover */}
      <div className="w-full max-w-7xl mx-auto my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col space-y-4 sm:space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest text-white/40">Navigation</p>
          {menuLinks.map((item, idx) => (
            <div key={idx} className="overflow-hidden group">
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white/80 group-hover:text-[#f2ffbd] transition-all duration-300 transform group-hover:translate-x-3"
                  onClick={onClose}
                >
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-3 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white/80 group-hover:text-[#f2ffbd] transition-all duration-300 transform group-hover:translate-x-3"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onNavigate && onNavigate(item.href);
                  }}
                >
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Quick Contact & Info Sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-end space-y-8 pt-8 lg:pt-0 border-t lg:border-t-0 border-white/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Direct Contact</p>
            <a
              href="mailto:ducngvan04@gmail.com"
              className="text-lg font-semibold text-white hover:text-[#f2ffbd] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#915EFF]" />
              <span>ducngvan04@gmail.com</span>
            </a>
            <a
              href="tel:0788551709"
              className="text-sm font-mono text-white/70 hover:text-white transition-colors flex items-center gap-2 mt-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>078.855.1709</span>
            </a>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Location & Timezone</p>
            <p className="text-sm text-white/80 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Da Nang, Vietnam (GMT+7)</span>
            </p>
            <p className="text-xs font-mono text-white/50 mt-1">
              Current Time: <span className="text-white font-medium">{timeStr}</span>
            </p>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Online Profiles</p>
            <div className="flex items-center gap-4 text-sm font-medium">
              <a
                href="https://github.com/DucNgVan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#f2ffbd] transition-colors"
              >
                GitHub
              </a>
              <span>/</span>
              <a
                href="https://linkedin.com/in/ducngvan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#f2ffbd] transition-colors"
              >
                LinkedIn
              </a>
              <span>/</span>
              <a
                href="/NguyenVanDuc_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#f2ffbd] transition-colors flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/40 font-mono">
        <span>© 2026 NGUYEN VAN DUC</span>
        <span>INSPIRED BY GIATS.ME</span>
      </div>
    </div>
  );
};

export default GiatsMenuDrawer;
