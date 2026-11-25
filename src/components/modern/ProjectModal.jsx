import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Target, 
  CheckCircle2, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/TechIcons';

export const ProjectModal = ({ project, onClose }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (project.images && project.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
        } else if (e.key === 'ArrowRight') {
          setActiveImgIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const images = project.images && project.images.length > 0 
    ? project.images 
    : [{ url: project.image, title: project.title, caption: project.tagline }];

  const currentImg = images[activeImgIndex] || images[0];

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0d0e15] border border-white/15 rounded-2xl shadow-2xl overflow-hidden select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#d8c8a8] border border-[#d8c8a8]/30 px-2.5 py-0.5 rounded-full">
              {project.projectTypeLabel || 'Project Blueprint'}
            </span>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
              {project.statusBadge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Title & Tagline */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Image Slider Gallery */}
          <div className="relative rounded-xl overflow-hidden bg-black/60 border border-white/10 group">
            <div className="aspect-video w-full overflow-hidden flex items-center justify-center bg-black/40">
              <img
                src={currentImg.url}
                alt={currentImg.title || project.title}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </div>

            {/* Slider Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer opacity-90 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer opacity-90 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activeImgIndex === idx ? 'bg-[#d8c8a8] scale-125' : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Caption */}
            {currentImg.caption && (
              <div className="p-3 bg-black/80 border-t border-white/10 text-xs font-mono text-neutral-300">
                {currentImg.caption}
              </div>
            )}
          </div>

          {/* Problem & Engineered Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-2 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Problem Statement</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Role & Contributions */}
          {project.myRole && (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-2 uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>Architectural Role & Scope</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.myRole}
              </p>
            </div>
          )}

          {/* Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="text-xs font-mono font-bold text-[#d8c8a8] uppercase tracking-wider mb-2">
                Key Technical Achievements
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
              Technologies & Architecture:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Access Note if applicable */}
          {project.accessNote && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300/90 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{project.accessNote}</span>
            </div>
          )}

        </div>

        {/* Modal Footer Action Buttons */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="text-xs font-mono text-neutral-500">
            Esc to close
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:border-white text-white text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-[#d8c8a8] text-black font-semibold text-xs font-mono shadow-lg hover:brightness-110 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
