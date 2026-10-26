import React, { useState } from 'react';
import { Target, Layers, MapPin, GraduationCap, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';
import profileImg from '@/assets/images/profile.jpg';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getTechIcon } from '@/components/ui/TechIcons';

const allTechStack = [
  { name: 'React.js', category: 'Frontend' },
  { name: 'Next.js 14', category: 'Full-Stack' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Express', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Relational DB' },
  { name: 'Redis', category: 'Cache Store' },
  { name: 'Docker', category: 'DevOps' },
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
      <strong key={i} className="font-semibold text-[#f4efea] hover:text-[#d8c8a8] transition-colors">
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
  const [isHovered, setIsHovered] = useState(false);

  const metaList = t.about.metadata || [];
  const metaLocation = metaList.find((m) => m.label.includes('LOCATION') || m.label.includes('ĐỊA ĐIỂM')) || metaList[0];
  const metaDegree = metaList.find((m) => m.label.includes('DEGREE') || m.label.includes('BẰNG')) || metaList[1];
  const metaAlmaMater = metaList.find((m) => m.label.includes('ALMA') || m.label.includes('TRƯỜNG')) || metaList[2];
  const metaTargetRole = metaList.find((m) => m.label.includes('ROLE') || m.label.includes('VỊ TRÍ')) || metaList[3];
  const metaCoreFocus = metaList.find((m) => m.label.includes('FOCUS') || m.label.includes('CHUYÊN MÔN')) || metaList[4];

  return (
    <section
      id="about"
      className="relative min-h-screen lg:h-screen lg:max-h-screen w-full bg-[#080808] text-[#f4efea] flex flex-col justify-between py-8 sm:py-12 lg:py-5 px-6 sm:px-10 lg:px-12 xl:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between my-auto">
        
        {/* UPPER MAIN GRID: Portrait Showcase (Left) + Editorial Content & Bento HUD (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center my-auto">
          
          {/* LEFT COLUMN: Large Cinematic Portrait Showcase */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-start">
            <ScrollReveal direction="zoom" delay={0.1} className="w-full max-w-[320px] sm:max-w-[340px] lg:max-w-none">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full h-[380px] sm:h-[420px] lg:h-[430px] xl:h-[455px] rounded-2xl overflow-hidden bg-[#121212] border border-[#262626] shadow-2xl group transition-all duration-500 hover:border-[#d8c8a8]/60"
              >
                {/* Full-Bleed Portrait Photo */}
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-700 filter brightness-[0.96] contrast-[1.04]"
                  loading="eager"
                />

                {/* Cinematic Vignettes */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#080808]/85 via-[#080808]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-transparent pointer-events-none" />

                {/* Top Floating Glass Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                  <div className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-wider text-[#f4efea] font-medium uppercase">
                      {t.about.badgeAvailable}
                    </span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#d8c8a8] font-bold shadow-lg">
                    BSc (Hons)
                  </div>
                </div>

                {/* Bottom Glass Information Overlay */}
                <div className="absolute bottom-3 inset-x-3 z-10 flex flex-col gap-1.5 p-3 sm:p-3.5 rounded-xl bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="font-syne font-bold text-sm sm:text-base tracking-wider text-[#f4efea] uppercase whitespace-nowrap">
                      {personalInfo.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#d8c8a8] shrink-0">
                      GREENWICH VN
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1.5 border-t border-white/10">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#d8c8a8]">
                      Clean Architecture
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#cccccc]">
                      PostgreSQL 3NF
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#cccccc]">
                      Redis • Docker
                    </span>
                  </div>
                </div>

                {/* Architectural Corner Crosshairs */}
                <span className="absolute top-2 left-2 text-[#d8c8a8]/40 font-mono text-xs pointer-events-none">+</span>
                <span className="absolute top-2 right-2 text-[#d8c8a8]/40 font-mono text-xs pointer-events-none">+</span>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Section Header + Editorial Bio + 5-Card Bento HUD Matrix */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center text-left">
            
            {/* Header: Eyebrow + ABOUT ME Title + Sub-tag */}
            <ScrollReveal direction="down" delay={0.1}>
              <div className="flex items-end justify-between border-b border-[#222222] pb-2 sm:pb-2.5 mb-2.5 sm:mb-3">
                <div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#a3a3a3] tracking-widest mb-1">
                    <span className="text-[#d8c8a8]">{'//'}</span>
                    <span>{t.about.eyebrow.replace(/^[—\s-]+/, '')}</span>
                  </div>
                  <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wider leading-none">
                    <span className="text-[#d8c8a8]">{lang === 'vi' ? 'GIỚI THIỆU ' : 'ABOUT '}</span>
                    <span className="text-[#f4efea]">{lang === 'vi' ? 'BẢN THÂN' : 'ME'}</span>
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#777777] uppercase tracking-wider pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8]"></span>
                  <span>FULL-STACK SOFTWARE ENGINEER</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Editorial Bio Text: 2 Paragraphs with Clear Typography */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col gap-2 sm:gap-2.5 text-xs sm:text-[13px] lg:text-[13.5px] xl:text-[14px] leading-relaxed text-[#c9cbcf] mb-3">
                <div className="pl-3 sm:pl-3.5 border-l-2 border-[#d8c8a8]/70 py-0.5">
                  <p>
                    {renderFormattedBio(t.about.bioP1)}
                  </p>
                </div>
                <p className="text-[#9ea2a8]">
                  {renderFormattedBio(t.about.bioP2)}
                </p>
              </div>
            </ScrollReveal>

            {/* 5-Card Architectural Bento HUD Matrix */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-2.5">
                
                {/* CARD 1: TARGET ROLE (3 cols) */}
                <div className="col-span-2 sm:col-span-1 lg:col-span-3 p-2.5 sm:p-3 rounded-xl bg-[#111111]/90 border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 flex items-start gap-2.5 group">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#2c2c2c] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-110 transition-transform">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono tracking-wider text-[#888888] uppercase truncate">
                      {metaTargetRole?.label || (lang === 'vi' ? 'VỊ TRÍ MONG MUỐN' : 'TARGET ROLE')}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate">
                      {metaTargetRole?.value || 'FULL-STACK INTERN'}
                    </span>
                  </div>
                </div>

                {/* CARD 2: CORE FOCUS (3 cols) */}
                <div className="col-span-2 sm:col-span-1 lg:col-span-3 p-2.5 sm:p-3 rounded-xl bg-[#111111]/90 border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 flex items-start gap-2.5 group">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#2c2c2c] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-110 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono tracking-wider text-[#888888] uppercase truncate">
                      {metaCoreFocus?.label || (lang === 'vi' ? 'CHUYÊN MÔN CỐT LÕI' : 'CORE FOCUS')}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate">
                      {metaCoreFocus?.value || 'SYSTEM ARCHITECTURE'}
                    </span>
                  </div>
                </div>

                {/* CARD 3: LOCATION (2 cols) */}
                <div className="col-span-1 lg:col-span-2 p-2 sm:p-2.5 rounded-xl bg-[#111111]/90 border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 flex items-start gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-[#181818] border border-[#2c2c2c] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-110 transition-transform">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] font-mono tracking-wider text-[#888888] uppercase truncate">
                      {metaLocation?.label || (lang === 'vi' ? 'ĐỊA ĐIỂM' : 'LOCATION')}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate" title={metaLocation?.value}>
                      {metaLocation?.value
                        ? metaLocation.value
                            .replace(' (HYBRID / REMOTE READY)', ' • HYBRID/REMOTE')
                            .replace(' (SẴN SÀNG HYBRID / REMOTE)', ' • HYBRID/REMOTE')
                        : 'DA NANG, VIETNAM'}
                    </span>
                  </div>
                </div>

                {/* CARD 4: DEGREE (2 cols) */}
                <div className="col-span-1 lg:col-span-2 p-2 sm:p-2.5 rounded-xl bg-[#111111]/90 border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 flex items-start gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-[#181818] border border-[#2c2c2c] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] font-mono tracking-wider text-[#888888] uppercase truncate">
                      {metaDegree?.label || (lang === 'vi' ? 'BẰNG CẤP' : 'DEGREE')}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate" title={metaDegree?.value}>
                      {metaDegree?.value || 'BSC (HONS) SE'}
                    </span>
                  </div>
                </div>

                {/* CARD 5: ALMA MATER (2 cols) */}
                <div className="col-span-2 lg:col-span-2 p-2 sm:p-2.5 rounded-xl bg-[#111111]/90 border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 flex items-start gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-[#181818] border border-[#2c2c2c] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-110 transition-transform">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] font-mono tracking-wider text-[#888888] uppercase truncate">
                      {metaAlmaMater?.label || (lang === 'vi' ? 'TRƯỜNG ĐÀO TẠO' : 'ALMA MATER')}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate" title={metaAlmaMater?.value}>
                      {metaAlmaMater?.value || 'UNIV. OF GREENWICH'}
                    </span>
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>

        {/* BOTTOM: Full-Width Kinetic Core Technical Stack Marquee */}
        <div className="shrink-0 mt-2 lg:mt-3 pt-2 lg:pt-2.5 border-t border-[#1e1e1e]">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#d8c8a8] uppercase font-bold">
                {lang === 'vi' ? 'HỆ THỐNG CÔNG NGHỆ CỐT LÕI' : 'CORE TECHNICAL STACK'}
              </span>
              <span className="text-[9px] font-mono text-[#666666] hidden md:inline">
                [ 17 TECHNOLOGIES ]
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider hidden sm:inline">
              {lang === 'vi' ? '✦ CUỘN HOẶC KÉO NGANG ĐỂ KHÁM PHÁ' : '✦ DRAG OR SCROLL HORIZONTALLY'}
            </span>
          </div>

          {/* Smooth Horizontal Carousel Track with Native Drag/Scroll and Hover Pause */}
          <div className="relative w-full overflow-hidden group">
            {/* Left and Right Subtle Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 px-2 cursor-grab active:cursor-grabbing select-none">
              <div className="flex items-center gap-2.5 animate-marquee group-hover:[animation-play-state:paused] shrink-0">
                {[...allTechStack, ...allTechStack].map((tech, idx) => {
                  const Icon = getTechIcon(tech.name);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#d8c8a8]/70 hover:bg-[#181818] transition-all duration-300 shrink-0 shadow-sm group/item hover:-translate-y-0.5"
                    >
                      <div className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2c2c2c] flex items-center justify-center p-1 shrink-0 group-hover/item:scale-105 transition-transform">
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono font-bold text-[#f4efea] group-hover/item:text-[#d8c8a8] transition-colors whitespace-nowrap">
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

      </div>
    </section>
  );
};

export default AboutSection;
