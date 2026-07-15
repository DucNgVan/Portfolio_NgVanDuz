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
    };
  });

  return (
    <section id="achievements" className="relative py-24 sm:py-32 bg-[#F4EFEA] text-[#0D0D0D] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono tracking-[0.25em] text-[#666666] uppercase mb-2 block">
              {t.achievements?.eyebrow || 'HONORS & RECOGNITION'}
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-[#0D0D0D]">
              {t.achievements?.title || 'ACADEMIC HONORS & GREENWICH MILESTONES'}
            </h2>
            <div className="w-24 h-[2px] bg-[#0D0D0D] mx-auto mt-3"></div>
          </ScrollReveal>
        </div>

        {/* 1. TOP METRIC CREDENTIAL CARDS (Distinct from detailed awards below) */}
        <ScrollStagger staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 items-stretch">
          {credentialsList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollStaggerItem key={idx} direction="zoom" className="h-full flex">
                <div className="relative p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5DEC9] hover:border-[#BFA882] transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-lg h-full w-full flex flex-col justify-between">
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center text-[#8C6D3F] flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 stroke-[2] flex-shrink-0" />
                      </div>
                      <span className="text-[10px] font-mono text-[#888888] tracking-widest uppercase">
                        {t.achievements?.verified || 'VERIFIED'}
                      </span>
                    </div>

                    <div className="font-bebas text-3xl sm:text-4xl text-[#0D0D0D] group-hover:text-[#8C6D3F] transition-colors flex items-baseline">
                      {item.value}
                      <span className="text-xs font-mono text-[#8C6D3F] ml-1.5">{item.suffix}</span>
                    </div>

                    <div className="text-xs font-semibold text-[#222222] mt-1.5 font-sans">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#777777] mt-0.5 leading-relaxed font-sans">
                      {item.desc}
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>

        {/* Section Subtitle for Detailed Awards */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#8C6D3F] uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>{t.achievements?.milestonesHeading || 'Honors & Award Milestones'}</span>
          </div>
        </ScrollReveal>

        {/* 2. DETAILED ACADEMIC HONORS CARDS */}
        <ScrollStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {honorsList.map((item, index) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <ScrollStaggerItem key={index} direction="up" className="h-full flex">
                <div className="relative overflow-hidden p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5DEC9] hover:border-[#BFA882] transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1 h-full w-full flex flex-col justify-between">
                  {/* Subtle Shimmer traversing on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none"></div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-2xl bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center text-[#8C6D3F] group-hover:scale-105 transition-transform flex-shrink-0">
                          <Icon className="w-6 h-6 stroke-[2] flex-shrink-0 text-[#8C6D3F]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#666666]">
                            <Calendar className="w-3.5 h-3.5 text-[#BFA882]" />
                            <span>{item.year}</span>
                          </div>
                          <div className="text-xs text-[#777777] font-mono">{item.organization}</div>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#FAF8F5] border border-[#BFA882]/50 text-[#8C6D3F]">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-syne text-[#0D0D0D] group-hover:text-[#8C6D3F] transition-colors mb-3 min-h-[3.5rem] flex items-center">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#555555] leading-relaxed mb-6 font-sans flex-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE3D8] flex items-center justify-between text-xs font-mono text-[#666666] mt-auto">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t.achievements?.certified || 'University Certified'}
                    </span>
                    <span className="text-[#8C6D3F]">{t.achievements?.milestoneBadge || 'Academic Milestone'}</span>
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
