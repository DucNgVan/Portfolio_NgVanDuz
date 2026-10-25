import React, { useState } from 'react';
import { 
  Code2, 
  Users, 
  Cpu, 
  Zap, 
  Kanban, 
  Globe, 
  Sparkles,
  Layers,
  Server,
  Wrench,
} from 'lucide-react';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';
import { techSkills, softSkills as rawSoftSkills } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { getTechIcon } from '@/components/ui/TechIcons';

const iconMap = {
  Users: Users,
  Cpu: Cpu,
  Zap: Zap,
  Kanban: Kanban,
  Globe: Globe,
};

const domainIcons = {
  '01': Code2,
  '02': Server,
  '03': Wrench,
};

const ExpertiseSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'technical' | 'softskills'

  const baseDomainCategories = [
    {
      id: '01',
      category: 'CLIENT-SIDE',
      skills: techSkills.frontend,
      tags: ['React.js', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    },
    {
      id: '02',
      category: 'SERVER & DATABASE',
      skills: techSkills.backend,
      tags: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Java'],
    },
    {
      id: '03',
      category: 'DEVOPS & WORKFLOW',
      skills: techSkills.devopsAndTools,
      tags: ['Git Flow', 'Docker', 'Postman', 'Firebase', 'Scrum'],
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

  return (
    <section
      id="expertise"
      className="relative py-20 sm:py-28 bg-[#080808] text-[#F4EFEA] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-6 border-b border-[#222222]">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#a3a3a3] uppercase mb-2 block font-semibold">
                {t.expertise?.eyebrow || 'SKILLS & EXPERTISE'}
              </span>
              <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-[#F4EFEA]">
                {t.expertise?.title || 'TECHNICAL COMPETENCY MATRIX'}
              </h2>
              <p className="text-xs sm:text-sm text-[#aaaaaa] mt-2 max-w-2xl font-medium leading-relaxed">
                {t.expertise?.subtitle || 'Full-stack engineering competencies with proven production experience, clean architecture, and modern developer tooling.'}
              </p>
            </div>

            {/* View Filter Switcher */}
            <div className="mt-6 md:mt-0 flex items-center p-1.5 rounded-2xl bg-[#141414] border border-[#2a2a2a] shadow-sm">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#d8c8a8] text-[#080808] font-bold shadow-xs'
                    : 'text-[#888888] hover:text-[#d8c8a8]'
                }`}
              >
                {t.expertise?.tabAll || 'All Overview'}
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'technical'
                    ? 'bg-[#d8c8a8] text-[#080808] font-bold shadow-xs'
                    : 'text-[#888888] hover:text-[#d8c8a8]'
                }`}
              >
                {t.expertise?.tabTech || 'Technical Stack'}
              </button>
              <button
                onClick={() => setActiveTab('softskills')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'softskills'
                    ? 'bg-[#d8c8a8] text-[#080808] font-bold shadow-xs'
                    : 'text-[#888888] hover:text-[#d8c8a8]'
                }`}
              >
                {t.expertise?.tabSoft || 'Soft Skills'}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 1. TECHNICAL FOUNDATIONS WITH BRAND LOGOS */}
        {(activeTab === 'all' || activeTab === 'technical') && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#d8c8a8] uppercase tracking-wider font-semibold">
              <Code2 className="w-4 h-4" />
              <span>{t.expertise?.techHeading || 'Technical Foundations & Production Stack'}</span>
            </div>

            <ScrollStagger staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {domainCategories.map((domain) => {
                const DomainIcon = domainIcons[domain.id] || Layers;

                return (
                  <ScrollStaggerItem key={domain.id} direction="up" className="h-full flex">
                    <div
                      className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 flex flex-col justify-between w-full h-full group hover:-translate-y-1 shadow-2xl"
                    >
                      <div className="flex-1 flex flex-col">
                        {/* Top Header */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase font-semibold">
                            {domain.id} / {domain.category}
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-[#181818] border border-[#2c2c2c] flex items-center justify-center text-[#d8c8a8] group-hover:border-[#d8c8a8] group-hover:scale-105 transition-all">
                            <DomainIcon className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Domain Title */}
                        <h3 className="text-xl font-bold font-syne text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors mb-2 min-h-[2.5rem] flex items-center">
                          {domain.title}
                        </h3>

                        {/* Description (Concise & Clear) */}
                        <p className="text-xs text-[#aaaaaa] leading-relaxed mb-5 font-medium">
                          {domain.description}
                        </p>

                        {/* Technology items with Authentic Tech Logos */}
                        <div className="space-y-2.5 mb-6">
                          {domain.skills.map((s, idx) => {
                            const TechIconComponent = getTechIcon(s.name);

                            return (
                              <div 
                                key={idx} 
                                className="p-2.5 rounded-xl bg-[#161616] border border-[#262626] hover:border-[#d8c8a8]/60 hover:bg-[#1a1a1a] transition-all flex items-center gap-3 group/item shadow-sm"
                              >
                                {/* Official Tech Logo Icon */}
                                <div className="w-9 h-9 rounded-lg bg-[#1f1f1f] border border-[#333333] flex items-center justify-center p-1.5 shrink-0 group-hover/item:scale-110 transition-transform shadow-xs">
                                  {TechIconComponent ? (
                                    <TechIconComponent className="w-5 h-5" />
                                  ) : (
                                    <Code2 className="w-4 h-4 text-[#d8c8a8]" />
                                  )}
                                </div>

                                {/* Tech Information */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1.5 mb-0.5">
                                    <span className="text-xs font-mono font-bold text-[#F4EFEA] truncate">
                                      {s.name}
                                    </span>
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#1c1c1c] border border-[#333333] text-[#d8c8a8] font-semibold shrink-0">
                                      {s.tier ? s.tier.replace(' / Production', '') : 'Core'}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#888888] font-sans truncate font-medium">
                                    {s.experience || s.highlight}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom Key Tags */}
                      <div className="pt-4 border-t border-[#222222] flex flex-wrap gap-1.5 mt-auto">
                        {domain.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#181818] text-[#aaaaaa] border border-[#2a2a2a] font-medium"
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

        {/* 2. DEDICATED SOFT SKILLS SECTION */}
        {(activeTab === 'all' || activeTab === 'softskills') && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d8c8a8] uppercase tracking-wider font-semibold">
                <Users className="w-4 h-4" />
                <span>{t.expertise?.softHeading || 'Professional Soft Skills & Engineering Mindset'}</span>
              </div>
              <span className="text-[11px] font-mono text-[#888888] uppercase hidden sm:inline font-medium">
                {t.expertise?.softCount || '[ 5 Core Competencies ]'}
              </span>
            </div>

            <ScrollStagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {softSkillsList.map((item) => {
                const IconComponent = iconMap[item.icon] || Sparkles;

                return (
                  <ScrollStaggerItem key={item.id} direction="up" className="h-full flex">
                    <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#d8c8a8]/60 transition-all duration-300 flex flex-col justify-between w-full h-full group hover:-translate-y-1 shadow-2xl">
                      <div className="flex-1 flex flex-col">
                        {/* Header: Icon & Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-[#d8c8a8] group-hover:scale-105 group-hover:border-[#d8c8a8] transition-all">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#1c1c1c] border border-[#333333] text-[#d8c8a8] font-semibold">
                            {item.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold font-syne text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors mb-2 min-h-[2.5rem] flex items-center">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed mb-6 font-sans flex-1 font-medium">
                          {item.description}
                        </p>
                      </div>

                      {/* Tag Chips */}
                      <div className="pt-4 border-t border-[#222222] flex flex-wrap gap-1.5 mt-auto">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#181818] text-[#aaaaaa] border border-[#2a2a2a]"
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

      </div>
    </section>
  );
};

export default ExpertiseSection;
