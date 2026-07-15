import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Code2, 
  Users, 
  Cpu, 
  Zap, 
  Kanban, 
  Globe, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Terminal,
  Compass
} from 'lucide-react';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';
import { techSkills, softSkills as rawSoftSkills } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const iconMap = {
  Users: Users,
  Cpu: Cpu,
  Zap: Zap,
  Kanban: Kanban,
  Globe: Globe,
};

const ExpertiseSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'technical' | 'softskills'

  const baseDomainCategories = [
    {
      id: '01',
      category: 'CLIENT-SIDE',
      iconText: '</>',
      skills: techSkills.frontend,
      tags: ['REACT.JS', 'NEXT.JS', 'JAVASCRIPT', 'TAILWIND CSS', 'VUE.JS'],
    },
    {
      id: '02',
      category: 'SERVER & DATABASE',
      iconText: '⚡',
      skills: techSkills.backend,
      tags: ['NODE.JS', 'EXPRESS', 'JAVA OOP', 'REST APIS', 'SQL / POSTGRESQL'],
    },
    {
      id: '03',
      category: 'DEVOPS & WORKFLOW',
      iconText: '✦',
      skills: techSkills.devopsAndTools,
      tags: ['GIT & GITHUB', 'DOCKER', 'POSTMAN', 'AGILE / SCRUM'],
    },
  ];

  const domainCategories = baseDomainCategories.map((base, idx) => {
    const trans = t.expertise?.domains?.[idx] || {};
    return {
      ...base,
      ...trans,
    };
  });

  const softSkillsList = rawSoftSkills.map((base, idx) => {
    const trans = t.expertise?.softSkills?.[idx] || {};
    return {
      ...base,
      ...trans,
    };
  });

  const tickerItems = t.expertise?.ticker || [
    'FULL-STACK WEB',
    'TEAM COLLABORATION',
    'AGILE & SCRUM',
    'PROBLEM SOLVING',
    'TECHNICAL ENGLISH',
  ];

  return (
    <section
      id="expertise"
      className="relative py-24 sm:py-32 bg-[#F4EFEA] text-[#0D0D0D] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-6 border-b border-[#0D0D0D]/15">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#666666] uppercase mb-2 block">
                {t.expertise?.eyebrow || 'SKILLS & EXPERTISE'}
              </span>
              <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-[#0D0D0D]">
                {t.expertise?.title || 'SKILLS & COMPETENCY MATRIX'}
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-xl">
                {t.expertise?.subtitle || 'Tailored for a Software Engineering Graduate — combining practical full-stack fundamentals with strong teamwork, adaptability, and analytical problem-solving.'}
              </p>
            </div>

            {/* View Filter Switcher */}
            <div className="mt-6 md:mt-0 flex items-center p-1.5 rounded-2xl bg-[#FFFFFF] border border-[#E5DEC9] shadow-sm">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#0D0D0D] text-[#F4EFEA] font-bold shadow'
                    : 'text-[#666666] hover:text-[#0D0D0D]'
                }`}
              >
                {t.expertise?.tabAll || 'All Overview'}
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'technical'
                    ? 'bg-[#0D0D0D] text-[#F4EFEA] font-bold shadow'
                    : 'text-[#666666] hover:text-[#0D0D0D]'
                }`}
              >
                {t.expertise?.tabTech || 'Technical Stack'}
              </button>
              <button
                onClick={() => setActiveTab('softskills')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'softskills'
                    ? 'bg-[#0D0D0D] text-[#F4EFEA] font-bold shadow'
                    : 'text-[#666666] hover:text-[#0D0D0D]'
                }`}
              >
                {t.expertise?.tabSoft || 'Soft Skills'}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 1. TECHNICAL FOUNDATIONS (CHUYÊN NGÀNH TIÊU CHUẨN KỸ SƯ PHẦN MỀM) */}
        {(activeTab === 'all' || activeTab === 'technical') && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#8C6D3F] uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>{t.expertise?.techHeading || 'Technical Foundations (Curated for Junior Software Engineer)'}</span>
            </div>

            <ScrollStagger staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {domainCategories.map((domain) => (
                <ScrollStaggerItem key={domain.id} direction="up" className="h-full flex">
                  <div
                    className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E5DEC9] hover:border-[#BFA882] transition-all duration-300 flex flex-col justify-between w-full h-full group hover:-translate-y-1 shadow-sm hover:shadow-xl"
                  >
                    <div className="flex-1 flex flex-col">
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase">
                          {domain.id} / {domain.category}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center font-mono text-xs font-bold text-[#8C6D3F] group-hover:border-[#BFA882] transition-all">
                          {domain.iconText}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-syne text-[#0D0D0D] group-hover:text-[#8C6D3F] transition-colors mb-2 min-h-[3.25rem] flex items-center">
                        {domain.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 flex-1">
                        {domain.description}
                      </p>

                      {/* Skill Items with Realistic Levels */}
                      <div className="space-y-3 mb-6">
                        {domain.skills.map((s, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-[#333333] font-medium">{s.name}</span>
                              <span className="text-[#888888]">{s.level}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#EFE9DF] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#BFA882] to-[#8C6D3F]"
                                style={{ width: `${s.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Tags */}
                    <div className="pt-4 border-t border-[#EAE3D8] flex flex-wrap gap-1.5 mt-auto">
                      {domain.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#666666] border border-[#E5DEC9]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        )}

        {/* 2. DEDICATED SOFT SKILLS SECTION (NƠI THỂ HIỆN KỸ NĂNG MỀM) */}
        {(activeTab === 'all' || activeTab === 'softskills') && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C6D3F] uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>{t.expertise?.softHeading || 'Professional Soft Skills & Engineering Mindset'}</span>
              </div>
              <span className="text-[11px] font-mono text-[#888888] uppercase hidden sm:inline">
                {t.expertise?.softCount || '[ 5 Core Competencies ]'}
              </span>
            </div>

            <ScrollStagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {softSkillsList.map((item) => {
                const IconComponent = iconMap[item.icon] || Sparkles;

                return (
                  <ScrollStaggerItem key={item.id} direction="up" className="h-full flex">
                    <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5DEC9] hover:border-[#BFA882] transition-all duration-300 flex flex-col justify-between w-full h-full group hover:-translate-y-1 shadow-sm hover:shadow-xl">
                      <div className="flex-1 flex flex-col">
                        {/* Header: Icon & Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center text-[#8C6D3F] group-hover:scale-105 group-hover:border-[#BFA882] transition-all">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E5DEC9] text-[#8C6D3F] font-medium">
                            {item.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold font-syne text-[#0D0D0D] group-hover:text-[#8C6D3F] transition-colors mb-2 min-h-[3.25rem] flex items-center">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 font-sans flex-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Tag Chips */}
                      <div className="pt-4 border-t border-[#EAE3D8] flex flex-wrap gap-1.5 mt-auto">
                        {item.tags?.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#666666] border border-[#E5DEC9]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStagger>
          </div>
        )}

        {/* BOTTOM TICKER */}
        <ScrollReveal direction="fade" delay={0.2}>
          <div className="mt-16 pt-6 border-t border-[#0D0D0D]/15 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs font-mono tracking-widest text-[#666666] uppercase">
            {tickerItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                {idx < tickerItems.length - 1 && <span className="text-[#BFA882]">✦</span>}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default ExpertiseSection;
