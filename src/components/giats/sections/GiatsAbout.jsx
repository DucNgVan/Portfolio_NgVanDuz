import React from "react";
import { ArrowUpRight, Award, GraduationCap, CheckCircle2 } from "lucide-react";

export const GiatsAbout = ({ onOpenCert }) => {
  return (
    <section id="about" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#f0f4f1] text-[#28282b] z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-16">
        {/* Main Headline */}
        <div className="border-b border-[#28282b]/15 pb-10">
          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#28282b]/50 uppercase mb-3">
            Profile & Engineering Philosophy
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#28282b] leading-[1.1]">
            Hey, My name&apos;s <br />
            <span className="text-[#28282b] underline decoration-[#915EFF] decoration-4 underline-offset-8">
              Nguyen Van Duc!
            </span>
          </h2>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Quote Block (Parallax Card) */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#28282b]/10 shadow-xl shadow-black/5 relative overflow-hidden group">
            <span className="absolute top-4 right-6 text-7xl font-serif text-[#915EFF]/15 select-none pointer-events-none">
              “
            </span>
            <p className="text-xl sm:text-2xl font-medium text-[#28282b] leading-relaxed relative z-10">
              “My engineering journey is driven by deep curiosity and rigorous system design. From 3NF relational architectures to reactive real-time systems, I solve complex problems with clean, maintainable, and battle-tested code.”
            </p>
            <div className="mt-8 pt-6 border-t border-[#28282b]/10 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#28282b]">Nguyen Van Duc</p>
                <p className="text-xs text-[#28282b]/60 font-mono">BSc (Hons) Software Engineering</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#f2ffbd] text-[#28282b] font-bold font-mono">
                Greenwich Vietnam
              </span>
            </div>
          </div>

          {/* Details & Academic Verified Highlights */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <p className="text-base sm:text-lg text-[#28282b]/80 leading-relaxed font-normal">
              A dedicated software engineering student with an honors track record at the <strong className="text-[#28282b] font-semibold">University of Greenwich (Vietnam)</strong>. I combine deep analytical rigor with creative frontend execution to build digital platforms that operate smoothly at scale.
            </p>

            {/* Academic Credential Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/70 border border-[#28282b]/10 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[#915EFF] mb-2">
                  <Award className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase">Top 3 Student</span>
                </div>
                <p className="text-sm font-semibold text-[#28282b]">Ranked Top 3 Highest GPA</p>
                <p className="text-xs text-[#28282b]/60 font-mono mt-1">Decision: 157/QĐ-FPTUDN (2024)</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 border border-[#28282b]/10 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase">Best Student COMP1643</span>
                </div>
                <p className="text-sm font-semibold text-[#28282b]">Information & Content Mgmt</p>
                <p className="text-xs text-[#28282b]/60 font-mono mt-1">Decision: 181 QH-PPTUDN (2026)</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/NguyenVanDuc_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="giats-btn"
              >
                <span className="btn-text flex items-center gap-2">
                  <span>DOWNLOAD RESUME (PDF)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <span className="btn-ball" />
              </a>

              <a
                href="mailto:ducngvan04@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#28282b] text-white text-xs font-bold font-mono tracking-wider hover:bg-black transition-colors"
              >
                <span>WORK WITH ME</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiatsAbout;
