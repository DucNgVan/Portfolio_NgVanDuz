import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const ExpertiseSection = () => {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0); // Frontend opened by default

  const skillsData = [
    {
      title: 'FRONTEND',
      count: 6,
      items: 'React, Next.js 14, TypeScript, Tailwind CSS, Vue 3, Three.js',
      description: 'Building reactive, high-performance web applications with modular components, fluid micro-interactions, and 3D WebGL immersion.',
    },
    {
      title: 'BACKEND & DATA',
      count: 5,
      items: 'Node.js / Express REST APIs, PostgreSQL (3NF), MongoDB, Redis caching, Java',
      description: 'Architecting scalable server-side systems following Clean Architecture, normalized 3NF database design, JWT auth, and in-memory Redis caching.',
    },
    {
      title: 'DEVOPS & TOOLS',
      count: 4,
      items: 'Docker Compose, Git Flow, Postman, Firebase',
      description: 'Containerized reproducible development environments, disciplined branch management, rigorous automated testing, and CI/CD pipelines.',
    },
  ];

  return (
    <section 
      id="skills" 
      className="relative min-h-[80svh] py-24 sm:py-32 px-6 sm:px-10 lg:px-14 bg-[#0f0f0f] text-[#f4efea] border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d8c8a8] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#d8c8a8] uppercase font-semibold">
              // 02. TECHNICAL FOUNDATIONS
            </span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide text-[#f4efea] leading-[0.85] mb-12">
            {lang === 'vi' ? 'CHUYÊN MÔN' : 'EXPERTISE'}
          </h2>

          {/* Interactive Accordion Rows matching reference HTML */}
          <div className="border-t border-[#7f6339]/40 divide-y divide-[#7f6339]/40">
            {skillsData.map((row, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={row.title}
                  className="py-6 sm:py-8 transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    onMouseEnter={() => setOpenIdx(idx)}
                    className="w-full flex items-baseline justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span 
                      className={`font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide transition-colors duration-300 ${
                        isOpen ? 'text-[#d8c8a8]' : 'text-[#f4efea] group-hover:text-[#d8c8a8]'
                      }`}
                    >
                      {row.title}
                    </span>
                    <span className="font-mono text-sm sm:text-base text-[#a79e92] group-hover:text-[#d8c8a8] transition-colors ml-4">
                      [{row.count}]
                    </span>
                  </button>

                  {/* Expandable Content Container */}
                  <div 
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-lg sm:text-xl lg:text-2xl text-[#f4efea] font-medium font-sans mb-2">
                        {row.items}
                      </p>
                      <p className="text-xs sm:text-sm text-[#a79e92] font-sans max-w-3xl leading-relaxed">
                        {row.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-xs sm:text-sm text-[#a79e92] font-mono">
            <span className="text-[#d8c8a8] font-semibold">Also: </span>
            peer code review, Agile/Scrum, root-cause debugging, technical English documentation.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExpertiseSection;
