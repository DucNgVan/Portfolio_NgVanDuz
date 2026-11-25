import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, Award, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';

export const CertificateModal = ({ certificate, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!certificate) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[94vh] flex flex-col bg-[#0d0e15] border border-white/20 rounded-2xl shadow-2xl overflow-hidden select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#d8c8a8]" />
            <div>
              <div className="text-xs font-mono font-bold text-[#d8c8a8] uppercase tracking-wider">
                {certificate.badge || 'Official Verified Milestone'}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">
                {certificate.issuer}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed((prev) => !prev)}
              className="p-1.5 rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close certificate lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Image Canvas */}
        <div className="overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/60 min-h-[300px]">
          <img
            src={certificate.image}
            alt={certificate.title}
            className={`rounded-lg shadow-2xl object-contain transition-all duration-300 cursor-pointer ${
              isZoomed ? 'scale-125 sm:scale-150 my-10' : 'max-h-[60vh] w-auto'
            }`}
            onClick={() => setIsZoomed((prev) => !prev)}
          />
        </div>

        {/* Certificate Details & Verification Footer */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-white/[0.02] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {certificate.title}
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d8c8a8]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{certificate.year}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            {certificate.description}
          </p>

          {/* Legal / Institutional Decision Ref */}
          {certificate.verificationRef && (
            <div className="flex items-start gap-2 pt-2 border-t border-white/[0.08] text-[11px] font-mono text-emerald-400/90">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>Verified Decision: {certificate.verificationRef}</span>
            </div>
          )}
        </div>

      </div>
    </div>,
    document.body
  );
};

export default CertificateModal;
