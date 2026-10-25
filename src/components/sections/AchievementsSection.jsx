import React from 'react';
import { 
  Trophy, 
  Medal, 
  Flame, 
  Star, 
  GraduationCap, 
  Code2, 
  Globe, 
  Calendar, 
  CheckCircle2,
  Award
} from 'lucide-react';
import { achievements } from '@/data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const iconMap = {
  Medal: Medal,
  Award: Medal,
  Flame: Flame,
  Trophy: Trophy,
  Star: Star,
};

const AchievementsSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  const credentialIcons = [GraduationCap, Trophy, Code2, Globe];
  const credentialsList = (t.achievements?.credentials || []).map((c, idx) => ({
    ...c,
    icon: credentialIcons[idx] || Award,
  }));

  const honorsList = achievements.map((item, idx) => {
    const trans = t.achievements?.list?.[idx] || {};
    return {
      ...item,
      title: trans.title || item.title,
      organization: trans.organization || item.organization,
      description: trans.description || item.description,
      badge: trans.badge || item.badge,
      verificationLabel: trans.verificationLabel || item.verificationLabel || "Verified",
    };
  });

  return (
    <section id="achievements" className="relative py-24 sm:py-32 bg-[#080808] text-[#F4EFEA] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono tracking-[0.25em] text-[#a3a3a3] uppercase mb-2 block font-semibold">
              {t.achievements?.eyebrow || 'HONORS & RECOGNITION'}
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-[#F4EFEA]">
              {t.achievements?.title || 'ACADEMIC HONORS & VERIFIED MILESTONES'}
            </h2>
            <div className="w-24 h-[2px] bg-[#d8c8a8] mx-auto mt-3"></div>
          </ScrollReveal>
        </div>

        {/* 1. TOP METRIC CREDENTIAL CARDS */}
        <ScrollStagger staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 items-stretch">
          {credentialsList.map((item, idx) => {
            const Icon = item.icon;
            const credentialTags = ['#01 DEGREE', '#02 HONORS', '#03 PROJECTS', '#04 ENGLISH'];
            return (
              <ScrollStaggerItem key={idx} direction="zoom" className="h-full flex">
                <div className="relative p-5 sm:p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 group hover:-translate-y-1 shadow-2xl h-full w-full flex flex-col justify-between">
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-[#d8c8a8] shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 stroke-[2] shrink-0" />
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-[#1c1c1c] border border-[#333333] text-[10px] font-mono text-[#d8c8a8] font-semibold tracking-wider">
                        {credentialTags[idx] || `#0${idx + 1}`}
                      </span>
                    </div>

                    <div className="font-bebas text-3xl sm:text-4xl text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors flex items-baseline">
                      {item.value}
                      <span className="text-xs font-mono text-[#d8c8a8] ml-1.5 font-bold">{item.suffix}</span>
                    </div>

                    <div className="text-xs font-bold text-[#f4efea] mt-2 font-sans">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#aaaaaa] mt-1 leading-relaxed font-sans font-medium">
                      {item.desc}
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>

        {/* Subtitle for Detailed Awards */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#d8c8a8] uppercase tracking-wider font-semibold">
            <Award className="w-4 h-4" />
            <span>{t.achievements?.milestonesHeading || 'Honors & Award Milestones'}</span>
          </div>
        </ScrollReveal>

        {/* 2. DETAILED HONORS & AWARDS CARDS (WITH ACCURATE VERIFICATION LABELS!) */}
        <ScrollStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {honorsList.map((item, index) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <ScrollStaggerItem key={index} direction="up" className="h-full flex">
                <div className="relative overflow-hidden p-7 rounded-3xl bg-[#111111] border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 group shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-1 h-full w-full flex flex-col justify-between">
                  {/* Subtle Shimmer traversing on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none"></div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-2xl bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-[#d8c8a8] group-hover:scale-105 transition-transform flex-shrink-0">
                          <Icon className="w-6 h-6 stroke-[2] flex-shrink-0 text-[#d8c8a8]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#aaaaaa] font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#d8c8a8]" />
                            <span>{item.year}</span>
                          </div>
                          <div className="text-xs text-[#aaaaaa] font-mono font-semibold">{item.organization}</div>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1c1c1c] border border-[#333333] text-[#d8c8a8]">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-syne text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors mb-3 min-h-[3.25rem] flex items-center">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#aaaaaa] leading-relaxed mb-6 font-sans flex-1 font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Accurate verification label tailored to each award */}
                  <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-xs font-mono text-[#888888] mt-auto">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {item.verificationLabel}
                    </span>
                    <span className="text-[#d8c8a8] font-semibold">{item.category}</span>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>

      </div>
    </section>
  );
};

export default AchievementsSection;
