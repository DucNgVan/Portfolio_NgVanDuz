import React from "react";
import { ShieldCheck, Award, ExternalLink, FileCheck } from "lucide-react";
import { testimonials } from "@/constants";

export const GiatsHonors = ({ onOpenCert }) => {
  return (
    <section id="honors" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#28282b] text-[#f0f4f1] z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-16">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#f2ffbd] uppercase mb-2">
              Recognition & Institutional Honors
            </p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Academic & Honors.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-md">
            Officially verified academic distinctions awarded by University of Greenwich, FPT Education, and Ministry of Public Security Hospital 199.
          </p>
        </div>

        {/* Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-[#1c1c1f] rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-2xl"
            >
              <div>
                {/* Year & Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-black font-mono text-[#f2ffbd]">
                    {idx === 0 ? "2024" : idx === 1 ? "2026" : "2025"}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/70 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Description */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#f2ffbd] transition-colors">
                  {item.testimonial}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Conferred by <strong>{item.name}</strong>, {item.designation} at {item.company}.
                </p>
              </div>

              {/* Certificate Decision & Trigger */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{item.decisionRef}</span>
                  </p>
                </div>

                <button
                  onClick={() => onOpenCert && onOpenCert(item)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#f2ffbd] hover:text-black transition-colors"
                  title="Inspect Certificate Document"
                  aria-label="Inspect Certificate Document"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiatsHonors;
