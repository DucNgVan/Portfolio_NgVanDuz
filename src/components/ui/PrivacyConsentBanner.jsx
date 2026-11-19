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
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[9990] animate-fadeIn pointer-events-auto">
      <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-black/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#111113]">
              Privacy & Portfolio Analytics
            </span>
          </div>

          <button
            onClick={handleDecline}
            className="text-[#999] hover:text-[#111113] p-1 rounded-lg transition-colors cursor-pointer"
            title="Dismiss / Decline"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-[#555] font-sans leading-relaxed mb-3.5">
          To help Nguyen Van Duc improve system performance and UX for future engineering roles, this portfolio collects <strong>anonymous telemetry</strong> (scroll depth, project inspections, device types). No personal identity or ad cookies are stored.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={handleDecline}
            className="text-xs font-mono font-semibold text-[#777] hover:text-[#111113] px-2 py-1.5 transition-colors cursor-pointer"
          >
            Decline
          </button>

          <button
            onClick={handleAccept}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111113] hover:bg-black text-white text-xs font-mono font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accept Anonymous Analytics</span>
          </button>
        </div>

      </div>
    </div>
  );
};
