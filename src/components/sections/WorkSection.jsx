import React, { useState } from 'react';
import { ExternalLink, Star, GitFork, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Github } from '@/components/ui/BrandIcons';
import { githubProjects } from '@/data/portfolioData';
import ProjectModal from '@/components/ui/ProjectModal';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const WorkSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [selectedProject, setSelectedProject] = useState(null);

  const techTicker = [
    'JavaScript', 'React JS', 'Lenis', 'GSAP', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Docker', 'Firebase', 'Next.js'
  ];

  const bottomTicker = t.work?.bottomTicker || [
    'UI/UX', 'INTERACTIVE WEB', 'CREATIVE DEVELOPMENT', 'MOTION DESIGN', 'HIGH PERFORMANCE', 'CLEAN CODE'
  ];

  const localizedProjects = githubProjects.map((project) => {
    const trans = (t.work?.projects || []).find((p) => p.id === project.id) || {};
    return {
      ...project,
      title: trans.title || project.title,
      category: trans.category || project.category,
      description: trans.description || project.description,
      highlights: trans.highlights || project.highlights,
    };
  });

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-[#080808] text-[#F4EFEA] overflow-hidden select-none">
      
      {/* 1. TOP TECH TICKER */}
      <ScrollReveal direction="fade" duration={0.6}>
        <div className="w-full overflow-hidden border-y border-[#222222] py-3.5 mb-14">
          <div className="flex whitespace-nowrap gap-10 animate-marquee">
            {[...techTicker, ...techTicker, ...techTicker].map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono tracking-widest text-[#777777] uppercase hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 2. COLOSSAL "WORK" SECTION HEADER WITH DROPLETS */}
      <div className="flex flex-col items-center justify-center text-center px-4 mb-20 relative">
        {/* Eyebrow */}
        <ScrollReveal direction="down">
          <div className="flex flex-col items-center gap-2 mb-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#888888] uppercase">
              {t.work?.eyebrow || 'SCROLL TO EXPLORE MY'}
            </span>
            <div className="w-1.5 h-6 rounded-full bg-[#d8c8a8] flex items-end justify-center pb-1">
              <div className="w-1 h-1 rounded-full bg-[#080808] animate-ping"></div>
            </div>
          </div>
        </ScrollReveal>

        {/* GIANT "WORK" TEXT WITH FLUID ZOOM ON SCROLL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <h2 className="font-bebas text-[28vw] sm:text-[24vw] leading-[0.75] tracking-tight text-[#F4EFEA] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            {t.work?.title || 'WORK'}
          </h2>

          {/* Liquid Splash Droplets in Cream / Gold Accent */}
          <div className="absolute top-1/4 left-[18%] w-3 h-3 rounded-full bg-[#d8c8a8] animate-droplet" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-6 left-[22%] w-4 h-4 rounded-full bg-[#d8c8a8] animate-droplet" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute bottom-2 left-[30%] w-2.5 h-2.5 rounded-full bg-[#d8c8a8] animate-droplet" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute bottom-8 left-[50%] w-5 h-5 rounded-full bg-[#d8c8a8] animate-droplet" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute bottom-3 left-[56%] w-2 h-2 rounded-full bg-[#d8c8a8] animate-droplet" style={{ animationDelay: '0.9s' }}></div>
          <div className="absolute bottom-6 right-[18%] w-4 h-4 rounded-full bg-[#d8c8a8] animate-droplet" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 right-[32%] w-2.5 h-2.5 rounded-full bg-[#d8c8a8] animate-droplet" style={{ animationDelay: '1.5s' }}></div>
        </motion.div>

        {/* BOTTOM MARQUEE BAR */}
        <ScrollReveal direction="up" delay={0.2} className="w-full max-w-5xl mt-8 pt-6 border-t border-[#222222]">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono tracking-widest text-[#888888] uppercase">
            {bottomTicker.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-white transition-colors">{item}</span>
                {idx < bottomTicker.length - 1 && <span className="text-[#d8c8a8]">✦</span>}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* 3. CURATED PROJECTS / GITHUB REPOS GRID WITH STAGGERED ENTRANCE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <ScrollStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {localizedProjects.map((project, index) => (
            <ScrollStaggerItem key={project.id} direction="up" className="h-full flex">
              <div
                className="group relative rounded-3xl bg-[#111111] border border-[#222222] p-7 sm:p-8 flex flex-col justify-between w-full h-full transition-all duration-300 hover:border-[#d8c8a8]/60 hover:-translate-y-2 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-[#F4EFEA]"
              >
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono tracking-widest text-[#888888]">
                      0{index + 1} / {project.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
                      <span className="flex items-center gap-1 text-[#d8c8a8]">
                        <Star className="w-3.5 h-3.5 fill-[#d8c8a8]" /> {project.stars}
                      </span>
                      <span className="flex items-center gap-1 text-[#aaaaaa]">
                        <GitFork className="w-3.5 h-3.5" /> {project.forks}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors mb-3 min-h-[3.5rem] flex items-center">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#a0a0a0] leading-relaxed mb-6 line-clamp-3 min-h-[4.2rem] font-sans">
                    {project.description}
                  </p>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#181818] border border-[#2a2a2a] text-[#cccccc] group-hover:border-[#d8c8a8]/40 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between mt-auto">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d8c8a8] hover:underline cursor-pointer group/btn"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{t.work?.archDetails || 'Architecture Details'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-[#181818] hover:bg-[#252525] border border-[#333333] hover:border-[#d8c8a8] text-[#cccccc] hover:text-white transition-all"
                      title={t.work?.viewGithub || 'View on GitHub'}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveDemo && project.liveDemo !== project.githubUrl && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-[#d8c8a8] hover:bg-[#e2d5bd] text-[#0D0D0D] font-bold transition-all shadow"
                        title={t.work?.viewDemo || 'View Live Demo'}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>

      {/* Project Architecture Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default WorkSection;
