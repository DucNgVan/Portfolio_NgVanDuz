import React from 'react';
import profileImg from '@/assets/images/profile.jpg';
import { personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getTechIcon } from '@/components/ui/TechIcons';

const allTechStack = [
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Express', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Relational DB' },
  { name: 'Redis', category: 'Cache Store' },
  { name: 'Docker', category: 'Containerization' },
  { name: 'Next.js 14', category: 'React Framework' },
  { name: 'React.js', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Three.js', category: '3D Graphics' },
  { name: 'MongoDB', category: 'NoSQL DB' },
  { name: 'Git & GitHub', category: 'VCS' },
  { name: 'Postman', category: 'API Testing' },
  { name: 'Firebase', category: 'Cloud BaaS' },
  { name: 'Vue.js 3', category: 'Frontend' },
  { name: 'Java', category: 'Mobile & OOP' },
];

const renderFormattedBio = (text) => {
  if (!text) return null;
  const keywords = [
    'Clean Architecture',
    'PostgreSQL (3NF)',
    'Redis caching',
    'Docker Compose',
    'Node.js/Express',
    'Middle Full-Stack Engineer',
    'Nguyễn Văn Đức',
    'Nguyen Van Duc',
    'University of Greenwich (Vietnam)',
    'Đại học Greenwich (Việt Nam)'
  ];
  const regex = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    keywords.includes(part) ? (
      <strong key={i} className="font-semibold text-[#F4EFEA]">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

const AboutSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  return (
    <section
      id="about"
      className="relative min-h-screen lg:h-screen lg:max-h-screen w-full bg-[#080808] text-[#F4EFEA] flex flex-col justify-between py-6 sm:py-8 lg:py-5 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between my-auto">
        
        {/* 1. TOP HEADER: Single BOLD Title (No duplicate about me) + Status */}
        <div className="shrink-0 mb-3 lg:mb-4">
          <div className="flex items-end justify-between pb-2.5 border-b border-[#222222]">
            <div>
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-wider leading-none">
                <span className="text-[#d8c8a8]">{lang === 'vi' ? 'GIỚI THIỆU ' : 'ABOUT '}</span>
                <span className="text-[#F4EFEA]">{lang === 'vi' ? 'BẢN THÂN' : 'ME'}</span>
              </h2>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1 pb-1">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#2a2a2a] text-[10px] font-mono text-[#F4EFEA]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase font-semibold text-[#d8c8a8]">{t.about.badgeAvailable || 'READY FOR INTERNSHIP'}</span>
                <span className="text-[#555555]">•</span>
                <span>DA NANG, VN</span>
              </div>
              <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider">
                BSC (HONS) SOFTWARE ENGINEERING
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN CONTENT GRID: Clear Photo (Left) + Name, Bio, Specs & Marquee (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center my-auto">
          
          {/* LEFT: Portrait Photograph (CLEAN & UNOBSTRUCTED - No Box Covering Photo) */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-start">
            <ScrollReveal direction="zoom" delay={0.1} className="w-full max-w-[340px] lg:max-w-none">
              <div className="relative w-full h-[400px] sm:h-[430px] lg:h-[460px] xl:h-[480px] rounded-2xl overflow-hidden bg-[#111111] border border-[#262626] shadow-2xl group transition-all duration-500 hover:border-[#d8c8a8]/50">
                
                {/* Full Photo Visible Clearly */}
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-700 filter brightness-[0.98] contrast-[1.02]"
                  loading="eager"
                />

                {/* Subtle Edge Vignettes */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#080808]/70 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080808]/80 to-transparent pointer-events-none" />

                {/* Subtle Status Pin in Top Corner */}
                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider text-[#d8c8a8] font-bold shadow">
                    BSc (Hons)
                  </span>
                </div>

                {/* Corner Crosshairs */}
                <span className="absolute top-2 left-2 text-[#d8c8a8]/40 font-mono text-xs pointer-events-none">+</span>
                <span className="absolute bottom-2 left-2 text-[#d8c8a8]/40 font-mono text-xs pointer-events-none">+</span>
                <span className="absolute bottom-2 right-2 text-[#d8c8a8]/40 font-mono text-xs pointer-events-none">+</span>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Editorial Headline + Bio + Specs Grid + Marquee Under Da Nang */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center text-left">
            
            {/* Editorial Headline */}
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-[#d8c8a8] tracking-wider mb-3 leading-tight">
                {lang === 'vi'
                  ? 'ƯU TIÊN HÀNG ĐẦU LÀ CLEAN ARCHITECTURE & TỐI ƯU HỆ THỐNG.'
                  : 'CLEAN ARCHITECTURE, SCALABLE BACKEND & DATABASE OPTIMIZATION.'}
              </h3>
            </ScrollReveal>

            {/* Editorial Bio Paragraphs */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="flex flex-col gap-2 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed text-[#c9cbcf] mb-3">
                <div className="pl-3.5 border-l-2 border-[#d8c8a8] py-0.5">
                  <p>{renderFormattedBio(t.about.bioP1)}</p>
                </div>
                <p className="text-[#a0a4a8]">{renderFormattedBio(t.about.bioP2)}</p>
              </div>
            </ScrollReveal>

            {/* Blueprint Specifications Grid (Ending with Da Nang, Vietnam) */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-b border-[#222222] divide-y sm:divide-y-0 sm:divide-x divide-[#222222] py-2 mb-3">
                
                {/* Left Column (Items 1 & 3) */}
                <div className="flex flex-col gap-2 py-1 sm:pr-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-[#888888] uppercase">
                      {lang === 'vi' ? '[01] VỊ TRÍ MONG MUỐN' : '[01] TARGET ROLE'}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#F4EFEA] font-mono mt-0.5">
                      Full-Stack Intern / Junior Engineer
                    </span>
                  </div>

                  {/* ITEM 3: DA NANG, VIETNAM */}
                  <div className="flex flex-col pt-1.5 border-t border-[#1a1a1a]">
                    <span className="text-[9px] font-mono tracking-widest text-[#888888] uppercase">
                      {lang === 'vi' ? '[03] ĐỊA ĐIỂM & HÌNH THỨC' : '[03] LOCATION & PREFERENCE'}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#F4EFEA] font-mono mt-0.5">
                      Da Nang, Vietnam • Hybrid / Remote Ready
                    </span>
                  </div>
                </div>

                {/* Right Column (Items 2 & 4) */}
                <div className="flex flex-col gap-2 py-1 sm:pl-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-[#888888] uppercase">
                      {lang === 'vi' ? '[02] CHUYÊN MÔN CỐT LÕI' : '[02] CORE FOCUS'}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#d8c8a8] font-mono mt-0.5">
                      Clean Architecture & Scalable Backend
                    </span>
                  </div>

                  <div className="flex flex-col pt-1.5 border-t border-[#1a1a1a]">
                    <span className="text-[9px] font-mono tracking-widest text-[#888888] uppercase">
                      {lang === 'vi' ? '[04] HỌC VẤN & BẰNG CẤP' : '[04] ACADEMIC FOUNDATION'}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#F4EFEA] font-mono mt-0.5">
                      BSc (Hons) Software Eng. • Univ. of Greenwich
                    </span>
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* MARQUEE BAR: Placed directly under Da Nang, Vietnam & Specs Grid */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="w-full pt-0.5">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8] animate-pulse"></span>
                    <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#d8c8a8] uppercase font-bold">
                      {lang === 'vi' ? 'HỆ THỐNG CÔNG NGHỆ CỐT LÕI' : 'CORE TECHNICAL STACK'}
                    </span>
                    <span className="text-[9px] font-mono text-[#666666] hidden md:inline">
                      [ 17 TECHNOLOGIES ]
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider hidden sm:inline">
                    {lang === 'vi' ? '✦ CUỘN HOẶC KÉO NGANG' : '✦ DRAG OR HOVER'}
                  </span>
                </div>

                {/* Marquee Slider inside Right Column */}
                <div className="relative w-full overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 cursor-grab active:cursor-grabbing select-none">
                    <div className="flex items-center gap-2 animate-marquee group-hover:[animation-play-state:paused] shrink-0">
                      {[...allTechStack, ...allTechStack].map((tech, idx) => {
                        const Icon = getTechIcon(tech.name);
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#d8c8a8]/70 hover:bg-[#161616] transition-all duration-300 shrink-0 shadow-sm group/item hover:-translate-y-0.5"
                          >
                            <div className="w-5 h-5 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center p-0.5 shrink-0 group-hover/item:scale-105 transition-transform">
                              {Icon && <Icon className="w-3 h-3" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10.5px] font-mono font-bold text-[#F4EFEA] group-hover/item:text-[#d8c8a8] transition-colors whitespace-nowrap">
                                {tech.name}
                              </span>
                              <span className="text-[8px] font-mono text-[#777777] uppercase tracking-wider">
                                {tech.category}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;