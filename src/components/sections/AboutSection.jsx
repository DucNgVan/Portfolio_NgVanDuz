import React, { useState } from 'react';
import { Laptop } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';

const AboutSection = () => {
  const [hoveredCard, setHoveredCard] = useState(false);

  const metadata = [
    { label: "BASED", value: "VIETNAM" },
    { label: "FOCUS", value: "WEB / MOTION / FULLSTACK" },
    { label: "BUILDING WEBSITES", value: "3+ YEARS" },
    { label: "MINDSET", value: "ALWAYS LEARNING" },
    { label: "PROJECTS DONE", value: "15+ REPOS" },
    { label: "EDUCATION", value: "UNIVERSITY (GPA 3.75)" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#080808] text-[#f4efea] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* SECTION TITLE WITH ANIMATED GOLD ACCENT LINE */}
        <div className="text-center mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-[#f4efea]">
              ABOUT ME
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Portrait Card with Floating Icon Stack */}
          <div className="lg:col-span-5 flex justify-center">
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
                  <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden bg-[#181818] border border-[#2c2c2c] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <svg
                      className="w-40 h-40 text-[#d8c8a8] opacity-80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>

                {/* Floating Mini Icon Stack on Right side of Card */}
                <div className="absolute right-4 bottom-8 flex flex-col gap-3 z-20">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow"
                  >
                    &lt;/&gt;
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow"
                  >
                    %
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-[#d8c8a8] text-xs font-mono shadow"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </motion.div>
                </div>

                {/* Status footer inside card */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#888888]">
                  <span>SOFTWARE ENGINEERING</span>
                  <span className="text-[#d8c8a8] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> AVAILABLE
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Editorial Statement & Information */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Eyebrow */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="flex items-center gap-2 text-xs font-mono text-[#888888] tracking-widest mb-4">
                <span>—— WHO AM I ?</span>
              </div>
            </ScrollReveal>

            {/* Main Statement Headline */}
            <ScrollReveal direction="up" delay={0.2}>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-8">
                I BUILD <span className="text-[#d8c8a8]">DIGITAL WORLDS</span> WHERE <br />
                <span className="text-[#d8c8a8]">DESIGN MEETS CODE</span>.
              </h3>
            </ScrollReveal>

            {/* Two Columns of Editorial Bio Text */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#a0a0a0] leading-relaxed mb-12">
                <p>
                  I'm <strong className="text-white font-medium">{personalInfo.name}</strong> — a software engineer and creative coder passionate about crafting modern web experiences, turning ideas, fluid interactions, and expressive motion into memorable digital products.
                </p>
                <p>
                  I care deeply about the nuances: typographic rhythm, latency, the breathing room of micro-interactions, and that seamless tactile fluidity that brings digital software to life.
                </p>
              </div>
            </ScrollReveal>

            {/* Metadata Grid with Staggered Entrance */}
            <ScrollStagger className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-8 pt-8 border-t border-[#1f1f1f]">
              {metadata.map((item, idx) => (
                <ScrollStaggerItem key={idx} direction="up">
                  <div className="text-[11px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-bold text-[#d8c8a8] font-mono">
                    {item.value}
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
