import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFound = ({ onGoHome = () => (window.location.href = '/') }) => {
  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#f4efea] flex flex-col justify-between p-6 sm:p-10 lg:p-14 selection:bg-[#d8c8a8] selection:text-black font-sans relative overflow-hidden select-none">
      
      {/* Ambient Radial Golden Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(216, 200, 168, 0.08) 0%, rgba(140, 109, 63, 0.03) 45%, transparent 70%)',
        }}
      />

      {/* Top Header: Brand Signature */}
      <header className="flex items-center justify-between w-full max-w-6xl mx-auto z-10">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); onGoHome(); }}
          className="font-hand font-semibold text-3xl sm:text-4xl text-[#f4efea] hover:text-[#d8c8a8] transition-colors cursor-pointer"
        >
          nguyenvanduc
        </a>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-[#8c7355]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8c7355]" />
          <span>PORTFOLIO // 2025</span>
        </div>
      </header>

      {/* Center 404 Feature */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto z-10 my-12">
        {/* Subtle Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-[0.2em] uppercase text-[#d8c8a8] mb-6">
          <Compass className="w-3.5 h-3.5 text-[#d8c8a8] animate-spin [animation-duration:12s]" />
          <span>404 • PAGE NOT FOUND</span>
        </div>

        {/* Sculptural 404 Headline */}
        <h1 className="text-7xl sm:text-9xl font-black tracking-tight leading-none mb-3 bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] via-[#e5ded4] to-[#8c7355] font-sans">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold font-sans text-white mb-3 tracking-wide">
          Trang không tồn tại
        </h2>

        <p className="text-sm text-[#9ca3af] font-sans leading-relaxed max-w-md mb-8">
          Đường dẫn bạn vừa truy cập có thể đã bị thay đổi, chuyển hướng hoặc không tồn tại trong hệ thống.
        </p>

        {/* Primary Action Button */}
        <button
          onClick={onGoHome}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#d8c8a8] to-[#c5a880] text-[#0a0b10] font-sans font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(216,200,168,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Quay về Trang chủ</span>
        </button>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full max-w-6xl mx-auto flex items-center justify-between text-[11px] font-mono text-[#666] border-t border-white/[0.06] pt-6 z-10">
        <span>© 2025 Nguyen Van Duc</span>
        <span>DA NANG, VIETNAM</span>
      </footer>

    </div>
  );
};

export default NotFound;
