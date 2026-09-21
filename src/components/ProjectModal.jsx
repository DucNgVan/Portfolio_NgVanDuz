import React from 'react';
import { X, ExternalLink, Star, GitFork, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { Github } from './BrandIcons';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner accent */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header: Close Button & Category */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
              {project.category}
            </span>
            <h3 className="text-2xl font-bold text-white mt-2.5 tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Description */}
        <div className="py-5 space-y-6">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* GitHub Metrics */}
          <div className="flex items-center gap-4 py-2 px-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
              <Star className="w-4 h-4 fill-amber-400/20" />
              <span>{project.stars} Stars</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <GitFork className="w-4 h-4" />
              <span>{project.forks} Forks</span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-xs font-mono text-emerald-400">✓ Open Source</span>
          </div>

          {/* Key Engineering Highlights */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Điểm nổi bật về kiến trúc & kỹ thuật</span>
            </h4>
            <div className="space-y-2.5">
              {project.highlights?.map((hl, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/70">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Công nghệ sử dụng</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700/80 text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-mono font-medium transition-all"
          >
            <Github className="w-4 h-4" />
            <span>Xem GitHub Repo</span>
          </a>
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-cyan-500/20"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Trải nghiệm Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
