import React from "react";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/TechIcons";
import { projects } from "@/constants";

export const GiatsProjects = ({ onOpenProjectModal }) => {
  return (
    <section id="projects" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#28282b] text-[#f0f4f1] z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#f2ffbd] uppercase mb-2">
              Featured Engineering Work
            </p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Selected Projects.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-md">
            Production-grade fullstack web applications, interactive 3D simulations, and distributed relational architectures.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="flex flex-col space-y-12">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="sticky top-28 bg-[#1c1c1f] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              style={{
                zIndex: idx + 1,
              }}
            >
              {/* Left Column: Details */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-[#f2ffbd] font-bold">
                      0{idx + 1} // {idx === 0 ? "2025" : idx === 3 ? "2026" : "2024"}
                    </span>
                    <span className="text-xs font-mono text-white/50">Production Case Study</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                    {proj.name}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 ${t.color}`}
                    >
                      #{t.name}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  {proj.live_link && (
                    <a
                      href={proj.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f2ffbd] hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={proj.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>SOURCE</span>
                  </a>

                  <button
                    onClick={() => onOpenProjectModal && onOpenProjectModal(proj)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 text-xs font-mono transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#915EFF]" />
                    <span>SPECIFICATION</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Preview */}
              <div
                className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-[16/10] relative group cursor-pointer"
                onClick={() => onOpenProjectModal && onOpenProjectModal(proj)}
              >
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-xs font-mono text-white flex items-center gap-2">
                    <span>Click to inspect technical architecture</span>
                    <ArrowUpRight className="w-4 h-4 text-[#f2ffbd]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiatsProjects;
