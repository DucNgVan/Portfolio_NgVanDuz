import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Check, Eye } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';

export const PrivacyConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user has not made a choice yet
    const existing = analyticsService.getConsentStatus();
    if (!existing) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2500); // Appear softly after preloader & initial scene render
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    analyticsService.setConsentStatus('granted');
    setVisible(false);
  };

  const handleDecline = () => {
    analyticsService.setConsentStatus('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-xs md:max-w-sm z-[9990] animate-fadeIn pointer-events-auto">
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-black/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-black/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-3 h-3" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#111113]">
              Telemetry & Analytics
            </span>
          </div>

          <button
            onClick={handleDecline}
            className="text-[#999] hover:text-[#111113] p-0.5 rounded-lg transition-colors cursor-pointer"
            title="Dismiss / Decline"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[11px] text-[#666] font-sans leading-relaxed mb-2.5">
          Collects <strong>anonymous UX telemetry</strong> to improve performance. Zero ad cookies or personal tracking.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleDecline}
            className="text-[11px] font-mono text-[#888] hover:text-[#111113] px-2 py-1 transition-colors cursor-pointer"
          >
            Decline
          </button>

          <button
            onClick={handleAccept}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#111113] hover:bg-black text-white text-[11px] font-mono font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Accept</span>
          </button>
        </div>

      </div>
    </div>
  );
};
