import React from "react";
import { ArrowUpRight } from "lucide-react";
import PreFooterPhysics from "../canvas/PreFooterPhysics";

export const GiatsPreFooter = () => {
  return (
    <section className="relative w-full py-20 sm:py-28 px-6 sm:px-12 bg-[#f0f4f1] text-[#28282b] z-10">
      <div className="w-full max-w-7xl mx-auto rounded-3xl bg-[#1c1c1f] text-white p-8 sm:p-14 border border-black/10 overflow-hidden relative shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#f2ffbd]">
              ✦ Collaboration & Internship
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s engineer your next breakthrough together.
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              Available for Software Engineering Internships and high-impact Full-Stack contract opportunities. Reach out and let&apos;s build something exceptional.
            </p>

            <div>
              <a
                href="mailto:ducngvan04@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f2ffbd] hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Interactive 3D Physics Sticker Canvas */}
          <div className="lg:col-span-6 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative">
            <PreFooterPhysics />
            <div className="absolute bottom-3 left-4 pointer-events-none">
              <span className="text-[10px] font-mono text-white/40 tracking-wider">
                Interactive Physics • Move Cursor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiatsPreFooter;
