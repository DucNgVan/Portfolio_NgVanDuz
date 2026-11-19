import React, { useState } from 'react';
import { Server, Code2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

const WhatIDoSection = () => {
  const { lang } = useLanguage();
  const [activeCard, setActiveCard] = useState(0);

  const backendSkills = [
    'Node.js',
    'Express.js',
    'PostgreSQL (3NF)',
    'Redis Cache',
    'Docker Compose',
    'RESTful APIs',
    'MongoDB',
    'Java SDK',
    'Git Flow',
    'Postman Tests',
  ];

  const frontendSkills = [
    'Next.js 14',
    'React.js',
    'TypeScript',
    'Three.js 3D',
    'Tailwind CSS',
    'Vue.js 3',
    'Responsive UI',
    'WebGL Shaders',
    'Framer Motion',
    'Figma UI/UX',
  ];

  return (
    <section
      id="what-i-do"
      className="relative py-24 sm:py-32 bg-[#0c0d10] text-[#f4efea] overflow-hidden select-none border-t border-[#1e2026]"
    >
      {/* Background ambient lighting (Soft warm champagne fog) */}
      <div 
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(216,200,168,0.06) 0%, transparent 70%)',
          filter: 'blur(75px)',
          transform: 'translate(40%, -20%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: MoncyDev Signature Giant "W HAT / I DO" Title in Gentle Gold/White */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-mono tracking-[0.25em] text-[#d8c8a8] uppercase block mb-3 font-semibold">
              // 02. CORE SPECIALIZATION
            </span>
            
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-syne tracking-tight leading-[0.9] text-[#f4efea] mb-6">
              W<span className="italic font-light text-[#ede5dc]">HAT</span>
              <br />
              I<span className="text-[#d8c8a8]"> DO</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#9e9ea7] font-sans max-w-md leading-relaxed mb-6">
              {lang === 'vi'
                ? 'Kết hợp kiến trúc backend vững chắc, cơ sở dữ liệu chuẩn hóa 3NF cùng trải nghiệm giao diện người dùng sáng tạo và đồ họa 3D WebGL hiện đại.'
                : 'Bridging resilient backend architectures, 3NF database normalization, and engaging modern web experiences with interactive 3D graphics.'}
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[#7e828d]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8]" />
              <span>Hover cards to expand skillset</span>
            </div>
          </ScrollReveal>

          {/* RIGHT: MoncyDev Dashed Blueprint Boxes */}
          <ScrollReveal direction="left" delay={0.15} className="lg:col-span-7 flex flex-col gap-6">
            
            {/* BOX 1: DEVELOP // BACKEND ARCHITECTURE & SYSTEMS */}
            <div
              onMouseEnter={() => setActiveCard(0)}
              className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-500 cursor-pointer overflow-hidden ${
                activeCard === 0
                  ? 'bg-[#15161b] border-2 border-[#d8c8a8]/60 shadow-[0_0_35px_rgba(216,200,168,0.12)] scale-[1.01]'
                  : 'bg-[#111216]/60 border border-[#22232a] hover:border-[#d8c8a8]/30 opacity-80'
              }`}
            >
              {/* Corner crosshairs */}
              <span className="absolute top-3 left-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>
              <span className="absolute top-3 right-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>
              <span className="absolute bottom-3 left-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>
              <span className="absolute bottom-3 right-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1f26] border border-[#2e313d] flex items-center justify-center text-[#d8c8a8]">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne tracking-wide text-[#f4efea]">
                      DEVELOP
                    </h3>
                    <span className="text-[10px] font-mono text-[#d8c8a8] tracking-widest uppercase">
                      BACKEND & SCALABLE ARCHITECTURE
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#1d1f26] border border-white/10 flex items-center justify-center text-xs font-mono text-[#d8c8a8]">
                  01
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#cccccc] font-sans leading-relaxed mb-5">
                {lang === 'vi'
                  ? 'Thiết kế RESTful APIs dạng module theo chuẩn Clean Architecture, mô hình hóa cơ sở dữ liệu quan hệ PostgreSQL chuẩn 3NF (28 bảng), tích hợp cache Redis tối ưu truy vấn và đóng gói đa dịch vụ bằng Docker Compose.'
                  : 'Designing modular RESTful APIs following Clean Architecture principles, 28-table 3NF relational schema modeling in PostgreSQL, Redis in-memory query caching, and Docker Compose orchestration.'}
              </p>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase block mb-2 font-semibold">
                  SKILLSET & PRODUCTION TOOLS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {backendSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#181920] border border-[#2b2d37] text-[#dddddd] hover:text-[#d8c8a8] hover:border-[#d8c8a8]/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* BOX 2: DESIGN // CLIENT-SIDE & INTERACTIVE 3D */}
            <div
              onMouseEnter={() => setActiveCard(1)}
              className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-500 cursor-pointer overflow-hidden ${
                activeCard === 1
                  ? 'bg-[#15161b] border-2 border-[#d8c8a8]/60 shadow-[0_0_35px_rgba(216,200,168,0.12)] scale-[1.01]'
                  : 'bg-[#111216]/60 border border-[#22232a] hover:border-[#d8c8a8]/30 opacity-80'
              }`}
            >
              {/* Corner crosshairs */}
              <span className="absolute top-3 left-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>
              <span className="absolute top-3 right-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>
              <span className="absolute bottom-3 left-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>
              <span className="absolute bottom-3 right-3 text-[#d8c8a8]/40 font-mono text-xs">+</span>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1d1f26] border border-[#2e313d] flex items-center justify-center text-[#d8c8a8]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-syne tracking-wide text-[#f4efea]">
                      DESIGN & CLIENT-SIDE
                    </h3>
                    <span className="text-[10px] font-mono text-[#d8c8a8] tracking-widest uppercase">
                      MODERN WEB & INTERACTIVE 3D
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#1d1f26] border border-white/10 flex items-center justify-center text-xs font-mono text-[#d8c8a8]">
                  02
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#cccccc] font-sans leading-relaxed mb-5">
                {lang === 'vi'
                  ? 'Xây dựng giao diện web mượt mà, chuẩn công thái học và chuẩn Responsive với Next.js 14 App Router, TypeScript, Tailwind CSS và đồ họa 3D tương tác thời gian thực bằng Three.js (đã áp dụng trên dự án thương mại NÉT).'
                  : 'Engineering responsive, accessible, high-performance web applications with Next.js 14 App Router, TypeScript, Tailwind CSS, and real-time interactive 3D WebGL graphics with Three.js.'}
              </p>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase block mb-2 font-semibold">
                  SKILLSET & CREATIVE TOOLS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {frontendSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#181920] border border-[#2b2d37] text-[#dddddd] hover:text-[#d8c8a8] hover:border-[#d8c8a8]/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
