import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, AlertCircle, Wrench, UserCheck } from 'lucide-react';
import { Github } from './BrandIcons';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const ProjectModal = ({ project, onClose }) => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111111] border border-[#2a2a2a] p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#d8c8a8]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header: Close Button & Category */}
        <div className="flex items-start justify-between pb-5 border-b border-[#222222]">
          <div className="pr-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1a1a1a] border border-[#333333] text-[#d8c8a8]">
              {project.category}
            </span>
            <h3 className="text-2xl font-bold font-syne text-[#f4efea] mt-2.5 tracking-tight leading-snug">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="text-xs sm:text-sm text-[#aaaaaa] font-mono mt-1">
                {project.tagline}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1a1a1a] border border-[#333333] text-[#aaaaaa] hover:text-[#f4efea] hover:border-[#d8c8a8] transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="py-5 space-y-6">
          
          {/* Overview Description */}
          <div className="text-[#cccccc] text-sm sm:text-base leading-relaxed">
            {project.description}
          </div>

          {/* Problem & Solution Breakdown */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.problem && (
                <div className="p-4 rounded-2xl bg-[#161616] border border-[#262626]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#d8c8a8] uppercase font-semibold mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{t.modal?.problemTitle || "Problem Solved"}</span>
                  </div>
                  <p className="text-xs text-[#bbbbbb] leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-4 rounded-2xl bg-[#161616] border border-[#262626]">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase font-semibold mb-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{t.modal?.solutionTitle || "Technical Solution"}</span>
                  </div>
                  <p className="text-xs text-[#bbbbbb] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Role & Contributions */}
          {project.myRole && (
            <div className="p-4 rounded-2xl bg-[#161616] border border-[#262626]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d8c8a8] uppercase font-semibold mb-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t.modal?.roleTitle || "My Role & Contributions"}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#cccccc] leading-relaxed">
                {project.myRole}
              </p>
            </div>
          )}

          {/* Key Architecture & Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#d8c8a8] flex items-center gap-2 mb-3 font-semibold">
                <Cpu className="w-4 h-4" />
                <span>{t.modal?.highlightsTitle || 'Key Architecture & Engineering Highlights'}</span>
              </h4>
              <div className="space-y-2.5">
                {project.highlights.map((hl, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-[#161616] border border-[#262626]">
                    <CheckCircle2 className="w-4 h-4 text-[#d8c8a8] mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-[#cccccc]">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#d8c8a8] flex items-center gap-2 mb-3 font-semibold">
              <Layers className="w-4 h-4" />
              <span>{t.modal?.techTitle || 'Technologies Applied'}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech?.map((tItem, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[#1a1a1a] border border-[#333333] text-[#f4efea]"
                >
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#222222] flex flex-wrap items-center justify-end gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181818] hover:bg-[#252525] border border-[#333333] hover:border-[#d8c8a8] text-[#cccccc] hover:text-white text-xs font-mono font-medium transition-all"
          >
            <Github className="w-4 h-4" />
            <span>{t.modal?.viewGithub || 'View GitHub Repository'}</span>
          </a>

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d8c8a8] hover:bg-[#e4d7bc] text-[#080808] text-xs font-mono font-bold transition-all shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.modal?.viewDemo || 'Open Live Demo'}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
