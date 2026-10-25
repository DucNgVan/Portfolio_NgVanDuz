import React, { useState } from 'react';
import { Laptop, FileText, Send } from 'lucide-react';
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
    <section id="about" className="relative py-24 sm:py-32 bg-[#080808] text-[#f4efea] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* SECTION TITLE WITH ANIMATED GOLD ACCENT LINE */}
        <div className="text-center mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-[#f4efea]">
              {t.about.sectionTitle}
            </h2>
          </ScrollReveal>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-28 h-[2px] bg-[#d8c8a8] mx-auto mt-3 origin-center"
          />
        </div>

        {/* MAIN CONTENT GRID: Portrait Card + Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Portrait Card with Floating Icon Stack */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <ScrollReveal direction="zoom" delay={0.15} className="w-full max-w-sm">
              <div
                onMouseEnter={() => setHoveredCard(true)}
                onMouseLeave={() => setHoveredCard(false)}
                className="relative w-full aspect-[4/5] rounded-2xl bg-[#111111] border border-[#222222] p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#d8c8a8]/50 hover:-translate-y-2 group"
              >
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#d8c8a8]/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Name Tag on Top of Card */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-syne font-bold text-lg tracking-wider text-[#f4efea] uppercase">
                    {personalInfo.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] text-[#d8c8a8] border border-[#333333]">
                    BSc (Hons)
                  </span>
                </div>

                {/* Portrait Graphic */}
                <div className="relative my-auto flex items-center justify-center">
                  <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden bg-[#181818] border-2 border-[#2c2c2c] group-hover:border-[#d8c8a8]/60 flex items-center justify-center shadow-2xl transition-all duration-500 relative">
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
                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 pointer-events-none">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow pointer-events-auto"
                    title="Code"
                  >
                    &lt;/&gt;
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow pointer-events-auto"
                    title="Architecture"
                  >
                    SQL
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow pointer-events-auto"
                    title="Full-Stack"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </motion.div>
                </div>

                {/* Status footer inside card */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 pt-3 border-t border-white/5 text-[11px] font-mono text-[#aaaaaa]">
                  <span className="text-[#cccccc] leading-snug">{t.about.badgeGrad}</span>
                  <span className="text-[#d8c8a8] flex items-center gap-1.5 shrink-0 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {t.about.badgeAvailable}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Editorial Statement & Clear Professional Profile */}
          <div className="lg:col-span-7 flex flex-col justify-start text-left">
            
            {/* Eyebrow */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="flex items-center gap-2 text-xs font-mono text-[#a3a3a3] tracking-widest mb-4">
                <span>{t.about.eyebrow}</span>
              </div>
            </ScrollReveal>

            {/* Main Statement Headline */}
            <ScrollReveal direction="up" delay={0.2}>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-8">
                {t.about.headlinePart1} <span className="text-[#d8c8a8]">{t.about.headlinePart2}</span> {t.about.headlinePart3} <br />
                <span className="text-[#d8c8a8]">{t.about.headlinePart4}</span>
              </h3>
            </ScrollReveal>

            {/* Two Columns of Editorial Bio Text with Improved WCAG Contrast */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-[#d1d5db] leading-relaxed">
                <p>
                  {t.about.bioP1}
                </p>
                <p>
                  {t.about.bioP2}
                </p>
              </div>

              {/* Action Buttons in About Me */}
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
                <a
                  href={personalInfo.resumeUrl}
                  download="NguyenVanDuc_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d8c8a8] text-[#080808] font-mono text-xs font-bold hover:bg-[#e4d7bc] transition-all shadow-md hover:-translate-y-0.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.about.downloadCvBtn || "Download Resume (PDF)"}</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181818] border border-[#333333] hover:border-[#d8c8a8] text-white font-mono text-xs font-medium transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#d8c8a8]" />
                  <span>{t.nav.contact}</span>
                </a>
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
          className="w-full h-px bg-[#262626] mt-16 sm:mt-20 mb-8 sm:mb-10 origin-left"
        />

        {/* FULL WIDTH METADATA SPECIFICATIONS */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 sm:gap-y-4">
          {t.about.metadata
            .filter((item) => !item.label.toUpperCase().includes('TECH'))
            .map((item, idx) => (
              <ScrollStaggerItem key={idx} direction="up">
                <div className="flex items-baseline gap-2.5 sm:gap-3 py-2 border-b border-[#222222] group hover:border-[#d8c8a8]/50 transition-colors">
                  <span className="text-[11px] sm:text-xs font-mono tracking-wider text-[#a0a0a0] uppercase shrink-0">
                    {item.label}:
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#d8c8a8] font-mono leading-normal">
                    {item.value}
                  </span>
                </div>
              </ScrollStaggerItem>
            ))}
        </ScrollStagger>

        {/* INTERACTIVE HORIZONTAL TECH STACK LOGO BAR (MARQUEE & DRAGGABLE) */}
        <div className="mt-14 pt-10 border-t border-[#1e1e1e]">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d8c8a8] animate-pulse"></span>
              <span className="text-xs font-mono tracking-[0.2em] text-[#d8c8a8] uppercase font-bold">
                {lang === 'vi' ? 'HỆ THỐNG CÔNG NGHỆ CỐT LÕI' : 'CORE TECHNICAL STACK'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider hidden sm:inline">
              {lang === 'vi' ? '✦ CUỘN HOẶC KÉO NGANG ĐỂ KHÁM PHÁ' : '✦ DRAG OR SCROLL HORIZONTALLY'}
            </span>
          </div>

          {/* Smooth Horizontal Carousel Track with Native Drag/Scroll and Hover Pause */}
          <div className="relative w-full overflow-hidden group">
            {/* Left and Right Subtle Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-4 cursor-grab active:cursor-grabbing select-none">
              <div className="flex items-center gap-4 animate-marquee group-hover:[animation-play-state:paused] shrink-0">
                {[...allTechStack, ...allTechStack].map((tech, idx) => {
                  const Icon = getTechIcon(tech.name);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#121212] border border-[#222222] hover:border-[#d8c8a8]/70 hover:bg-[#181818] transition-all duration-300 shrink-0 shadow-md group/item hover:-translate-y-1"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#2c2c2c] flex items-center justify-center p-1 shrink-0 group-hover/item:scale-110 transition-transform">
                        {Icon && <Icon className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#f4efea] group-hover/item:text-[#d8c8a8] transition-colors whitespace-nowrap">
                          {tech.name}
                        </span>
                        <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider">
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
