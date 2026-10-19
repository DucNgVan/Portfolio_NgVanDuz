import React, { useState } from 'react';
import { Laptop } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';
import profileImg from '@/assets/images/profile.jpg';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';

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
                <div className="relative z-10">
                  <span className="font-syne font-bold text-lg tracking-wider text-[#f4efea] uppercase">
                    {personalInfo.name}
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

                {/* Floating Mini Icon Stack - Positioned vertically centered on right side, away from all text */}
                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 pointer-events-none">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow pointer-events-auto"
                  >
                    &lt;/&gt;
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow pointer-events-auto"
                  >
                    %
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a1a]/90 backdrop-blur border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow pointer-events-auto"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </motion.div>
                </div>

                {/* Status footer inside card */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 pt-3 border-t border-white/5 text-[10px] sm:text-[11px] font-mono text-[#888888]">
                  <span className="text-[#a0a0a0] leading-snug">{t.about.badgeGrad}</span>
                  <span className="text-[#d8c8a8] flex items-center gap-1.5 shrink-0 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {t.about.badgeAvailable}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Editorial Statement & Information */}
          <div className="lg:col-span-7 flex flex-col justify-start text-left">
            
            {/* Eyebrow */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="flex items-center gap-2 text-xs font-mono text-[#888888] tracking-widest mb-4">
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

            {/* Two Columns of Editorial Bio Text */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#a0a0a0] leading-relaxed">
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
          className="w-full h-px bg-[#222222] mt-16 sm:mt-20 mb-8 sm:mb-10 origin-left"
        />

        {/* FULL WIDTH METADATA SPECIFICATIONS (1-LINE PER ITEM) */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-3 sm:gap-y-3.5">
          {t.about.metadata.map((item, idx) => (
            <ScrollStaggerItem key={idx} direction="up">
              <div className="flex items-baseline gap-2.5 sm:gap-3 py-2 border-b border-[#1c1c1c] group hover:border-[#d8c8a8]/40 transition-colors">
                <span className="text-[11px] sm:text-xs font-mono tracking-wider text-[#777777] uppercase shrink-0">
                  {item.label}:
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#d8c8a8] font-mono leading-normal">
                  {item.value}
                </span>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

      </div>
    </section>
  );
};

export default AboutSection;
