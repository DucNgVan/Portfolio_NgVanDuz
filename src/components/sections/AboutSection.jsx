import React, { useState } from 'react';
import { Laptop } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';
import profileImg from '@/assets/images/profile.jpg';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';
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

const AboutSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [hoveredCard, setHoveredCard] = useState(false);

  return (
    <section
      id="about"
      className="relative min-h-screen lg:h-screen lg:max-h-screen w-full bg-[#080808] text-[#f4efea] flex flex-col justify-between py-8 sm:py-12 lg:py-5 px-6 sm:px-10 lg:px-12 xl:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between">
        
        {/* SECTION TITLE: 'ABOUT' in Sand-gold (#d8c8a8), 'ME' in White (#f4efea) */}
        <div className="text-center shrink-0 mb-2 lg:mb-2.5">
          <ScrollReveal direction="down">
            <h2 className="font-bebas text-3xl sm:text-5xl lg:text-4xl xl:text-5xl tracking-wider">
              <span className="text-[#d8c8a8]">{lang === 'vi' ? 'GIỚI THIỆU ' : 'ABOUT '}</span>
              <span className="text-[#f4efea]">{lang === 'vi' ? 'BẢN THÂN' : 'ME'}</span>
            </h2>
          </ScrollReveal>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 lg:w-24 h-[2px] bg-[#d8c8a8] mx-auto mt-1 origin-center"
          />
        </div>

        {/* MAIN CONTENT GRID: Portrait Card + Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 xl:gap-12 items-center my-auto shrink-0">
          
          {/* LEFT: Portrait Card with Floating Icon Stack */}
          <div className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-start">
            <ScrollReveal direction="zoom" delay={0.15} className="w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[260px] xl:max-w-[285px]">
              <div
                onMouseEnter={() => setHoveredCard(true)}
                onMouseLeave={() => setHoveredCard(false)}
                className="relative w-full rounded-2xl bg-[#111111] border border-[#222222] p-3.5 sm:p-4 lg:p-4 xl:p-5 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#d8c8a8]/50 hover:-translate-y-1 group"
              >
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#d8c8a8]/10 rounded-full blur-2xl pointer-events-none"></div>

                {/* Name Tag on Top of Card */}
                <div className="relative z-10 flex items-center justify-between mb-2">
                  <span className="font-syne font-bold text-sm lg:text-base tracking-wider text-[#f4efea] uppercase">
                    {personalInfo.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1c1c1c] text-[#d8c8a8] border border-[#333333]">
                    BSc (Hons)
                  </span>
                </div>

                {/* Portrait Graphic */}
                <div className="relative my-auto flex items-center justify-center py-1 sm:py-2">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden bg-[#181818] border-2 border-[#2c2c2c] group-hover:border-[#d8c8a8]/60 flex items-center justify-center shadow-xl transition-all duration-500 relative">
                    <img
                      src={profileImg}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>
                </div>

                {/* Floating Mini Icon Stack - Centered on right side */}
                <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 pointer-events-none">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-[10px] sm:text-xs font-mono shadow pointer-events-auto"
                    title="Code"
                  >
                    &lt;/&gt;
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-[10px] sm:text-xs font-mono shadow pointer-events-auto"
                    title="Architecture"
                  >
                    SQL
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-[10px] sm:text-xs font-mono shadow pointer-events-auto"
                    title="Full-Stack"
                  >
                    <Laptop className="w-3 h-3" />
                  </motion.div>
                </div>

                {/* Status footer inside card */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-1 pt-2 mt-1.5 border-t border-white/5 text-[9px] sm:text-[10px] font-mono text-[#aaaaaa]">
                  <span className="text-[#cccccc] leading-snug">{t.about.badgeGrad}</span>
                  <span className="text-[#d8c8a8] flex items-center gap-1 shrink-0 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {t.about.badgeAvailable}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Editorial Statement & Clear Professional Profile */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center text-left">
            
            {/* Eyebrow */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#a3a3a3] tracking-widest mb-1.5 lg:mb-2">
                <span>{t.about.eyebrow}</span>
              </div>
            </ScrollReveal>

            {/* Editorial Bio Text - Stacked Top & Bottom */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col gap-2.5 lg:gap-3 text-xs sm:text-[13px] lg:text-[13px] xl:text-[14px] text-[#d1d5db] leading-relaxed">
                <p>
                  {t.about.bioP1}
                </p>
                <p>
                  {t.about.bioP2}
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>

        {/* FULL WIDTH HORIZONTAL DIVIDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-[#262626] my-2 lg:my-2.5 shrink-0 origin-left"
        />

        {/* 1. INTERACTIVE HORIZONTAL TECH STACK LOGO BAR (PLACED ABOVE LOCATION) */}
        <div className="shrink-0 mb-1 lg:mb-2">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#d8c8a8] uppercase font-bold">
                {lang === 'vi' ? 'HỆ THỐNG CÔNG NGHỆ CỐT LÕI' : 'CORE TECHNICAL STACK'}
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider hidden sm:inline">
              {lang === 'vi' ? '✦ CUỘN HOẶC KÉO NGANG ĐỂ KHÁM PHÁ' : '✦ DRAG OR SCROLL HORIZONTALLY'}
            </span>
          </div>

          {/* Smooth Horizontal Carousel Track with Native Drag/Scroll and Hover Pause */}
          <div className="relative w-full overflow-hidden group">
            {/* Left and Right Subtle Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

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

        {/* 2. FULL WIDTH METADATA SPECIFICATIONS (LOCATION, DEGREE, ETC.) */}
        <div className="pt-2 lg:pt-2.5 border-t border-[#1e1e1e] shrink-0">
          <ScrollStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-1.5">
            {t.about.metadata
              .filter((item) => !item.label.toUpperCase().includes('TECH'))
              .map((item, idx) => (
                <ScrollStaggerItem key={idx} direction="up">
                  <div className="flex flex-col py-1 border-b border-[#222222] group hover:border-[#d8c8a8]/50 transition-colors">
                    <span className="text-[9px] font-mono tracking-wider text-[#888888] uppercase shrink-0">
                      {item.label}:
                    </span>
                    <span className="text-[10px] sm:text-[11px] lg:text-[11px] font-bold text-[#d8c8a8] font-mono leading-tight mt-0.5">
                      {item.value}
                    </span>
                  </div>
                </ScrollStaggerItem>
              ))}
          </ScrollStagger>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
