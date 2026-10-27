import React from 'react';
import profileImg from '@/assets/images/profile.jpg';
import { personalInfo } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getTechIcon } from '@/components/ui/TechIcons';

const techStackItems = [
  { name: 'React.js', shortTag: 'React', category: 'Frontend' },
  { name: 'Node.js', shortTag: 'Node.js', category: 'Backend' },
  { name: 'TypeScript', shortTag: 'TS', category: 'Language' },
  { name: 'JavaScript', shortTag: 'JS', category: 'Language' },
  { name: 'Python', shortTag: 'Python', category: 'Language' },
  { name: 'Next.js 14', shortTag: 'Next.js', category: 'Full-Stack' },
  { name: 'Tailwind CSS', shortTag: 'Tailwind', category: 'Styling' },
  { name: 'PostgreSQL', shortTag: 'SQL', category: 'Relational DB' },
  { name: 'MySQL', shortTag: 'SQL', category: 'Relational DB' },
  { name: 'MongoDB', shortTag: 'NoSQL', category: 'Database' },
  { name: 'Redis', shortTag: 'Cache', category: 'In-Memory' },
  { name: 'Docker', shortTag: 'Docker', category: 'DevOps' },
  { name: 'Three.js', shortTag: '3D Web', category: 'Graphics' },
  { name: 'Git & GitHub', shortTag: 'Git', category: 'VCS' },
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

            {/* TECH STACK SHOWCASE: Clean Brand Logos with Floating Capsule Pills */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="w-full pt-1">
                {/* Header: Tech Stack / Technologies I work with */}
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8] animate-pulse"></span>
                    <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#F4EFEA] uppercase font-mono">
                      {lang === 'vi' ? 'HỆ THỐNG CÔNG NGHỆ (TECH STACK)' : 'TECH STACK'}
                    </span>
                    <span className="text-[10px] font-mono text-[#888888] hidden sm:inline">
                      • {lang === 'vi' ? 'Công nghệ chuyên sâu & thực chiến' : 'Technologies I work with'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#666666] uppercase tracking-wider hidden md:inline">
                    [ 14 CORE TECHNOLOGIES ]
                  </span>
                </div>

                {/* Clean Logo Grid with Dark Capsule Badge Pills (Matching Reference Image) */}
                <div className="w-full grid grid-cols-4 sm:grid-cols-7 gap-y-2.5 gap-x-1.5 sm:gap-x-2 pt-1 select-none">
                  {techStackItems.map((tech, idx) => {
                    const Icon = getTechIcon(tech.name);
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 group/tech cursor-pointer interactive-hover"
                        title={`${tech.name} (${tech.category || tech.shortTag})`}
                      >
                        {/* 1. Large Brand Logo Icon (Clean, Authentic Colors) */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center group-hover/tech:scale-115 transition-transform duration-300">
                          {Icon && <Icon className="w-full h-full drop-shadow-sm" />}
                        </div>

                        {/* 2. Capsule Pill Badge directly below logo (Matching Reference Image 2) */}
                        <div className="mt-1 sm:mt-1.5">
                          <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-full bg-[#11141d] border border-white/10 text-[8.5px] sm:text-[9.5px] font-mono font-semibold text-[#e5e5e5] group-hover/tech:border-[#d8c8a8] group-hover/tech:bg-[#181c28] group-hover/tech:text-[#d8c8a8] transition-all shadow-sm whitespace-nowrap">
                            {tech.shortTag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
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