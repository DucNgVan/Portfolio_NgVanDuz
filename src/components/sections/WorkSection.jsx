import React, { useState } from 'react';
import { ExternalLink, Info, CheckCircle2, Cpu, Orbit, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { Github } from '@/components/ui/BrandIcons';
import { githubProjects } from '@/data/portfolioData';
import ProjectModal from '@/components/ui/ProjectModal';
import Project3DCarousel from '@/components/ui/Project3DCarousel';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const WorkSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'grid'

  const techTicker = [
    'Next.js 14', 'Three.js 3D', 'Node.js', 'Express', 'PostgreSQL 3NF', 'Redis Cache', 'Docker Compose', 'TypeScript', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Vue.js 3'
  ];

  const bottomTicker = t.work?.bottomTicker || [
    'NEXT.JS 14', 'THREE.JS 3D', 'NODE.JS REST APIS', 'POSTGRESQL 3NF', 'REDIS CACHING', 'DOCKER COMPOSE', 'CLEAN CODE'
  ];

  const localizedProjects = githubProjects.map((project) => {
    const trans = (t.work?.projects || []).find((p) => p.id === project.id) || {};
    return {
      ...project,
      title: trans.title || project.title,
      category: trans.category || project.category,
      tagline: trans.tagline || project.tagline,
      description: trans.description || project.description,
      problem: trans.problem || project.problem,
      solution: trans.solution || project.solution,
      myRole: trans.myRole || project.myRole,
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
                className="text-xs font-mono tracking-widest text-[#999999] uppercase hover:text-[#d8c8a8] transition-colors"
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
            <span className="text-xs font-mono tracking-[0.25em] text-[#a3a3a3] uppercase font-semibold">
              {t.work?.eyebrow || 'SCROLL TO EXPLORE MY'}
            </span>
            <div className="w-1.5 h-6 rounded-full bg-[#d8c8a8] flex items-end justify-center pb-1">
              <div className="w-1 h-1 rounded-full bg-[#080808] animate-ping"></div>
            </div>
          </div>
        </ScrollReveal>

        {/* GIANT "WORK" / "PROJECTS" TEXT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <h2 className="font-bebas text-[24vw] sm:text-[20vw] leading-[0.75] tracking-tight text-[#F4EFEA] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            {t.work?.title || 'PROJECTS'}
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
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono tracking-widest text-[#a3a3a3] uppercase">
            {bottomTicker.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-white transition-colors">{item}</span>
                {idx < bottomTicker.length - 1 && <span className="text-[#d8c8a8]">✦</span>}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>

        {/* VIEW MODE TOGGLE SWITCH: 3D CYLINDER vs CLASSIC GRID */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setViewMode('3d')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              viewMode === '3d'
                ? 'bg-[#d8c8a8] text-[#080808] font-bold shadow-[0_0_25px_rgba(216,200,168,0.35)]'
                : 'bg-[#141414] text-[#888888] border border-[#222222] hover:text-[#cccccc] hover:border-[#333333]'
            }`}
          >
            <Orbit className={`w-3.5 h-3.5 ${viewMode === '3d' ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            <span>{t.work?.view3D || '3D ORBIT VIEW'}</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-[#d8c8a8] text-[#080808] font-bold shadow-[0_0_25px_rgba(216,200,168,0.35)]'
                : 'bg-[#141414] text-[#888888] border border-[#222222] hover:text-[#cccccc] hover:border-[#333333]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t.work?.viewGrid || 'CURATED GRID'}</span>
          </button>
        </div>
      </div>

      {/* 3. SHOWCASE DISPLAY: 3D ORBIT CAROUSEL OR CURATED GRID */}
      {viewMode === '3d' ? (
        <Project3DCarousel
          projects={localizedProjects}
          onSelectProject={setSelectedProject}
          t={t}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <ScrollStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {localizedProjects.map((project, index) => (
              <ScrollStaggerItem key={project.id} direction="up" className="h-full flex">
                <div
                  className="group relative rounded-3xl bg-[#111111] border border-[#222222] p-7 sm:p-8 flex flex-col justify-between w-full h-full transition-all duration-300 hover:border-[#d8c8a8]/60 hover:-translate-y-2 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-[#F4EFEA]"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Card Header: Project sequence + Status indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono tracking-widest text-[#d8c8a8] font-bold">
                        0{index + 1} // {project.category.toUpperCase()}
                      </span>
                      
                      {project.liveDemo ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {project.statusBadge || "Live Demo"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#1c1c1c] text-[#bbbbbb] border border-[#333333]">
                          {project.statusBadge || "Architecture Repo"}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold font-syne text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors mb-2 min-h-[3.5rem] flex items-center leading-snug">
                      {project.title}
                    </h3>

                    {/* Tagline / Summary */}
                    <p className="text-xs sm:text-sm text-[#d8c8a8]/90 font-mono mb-3 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Detailed Description with High Contrast */}
                    <p className="text-sm text-[#cccccc] leading-relaxed mb-6 font-sans flex-1">
                      {project.description}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.tech.map((tItem, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#181818] border border-[#2a2a2a] text-[#dddddd] group-hover:border-[#d8c8a8]/40 transition-colors font-medium"
                        >
                          {tItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between mt-auto">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d8c8a8] hover:underline cursor-pointer group/btn font-semibold"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>{t.work?.archDetails || 'Architecture Details'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#181818] hover:bg-[#252525] border border-[#333333] hover:border-[#d8c8a8] text-[#cccccc] hover:text-white text-xs font-mono transition-all"
                        title={t.work?.viewGithub || 'View GitHub Repo'}
                      >
                        <Github className="w-4 h-4" />
                        <span className="hidden sm:inline">Repo</span>
                      </a>
                      
                      {/* Only show Live Demo button when an actual verified live URL exists! */}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#d8c8a8] hover:bg-[#e6d8be] text-[#080808] text-xs font-mono font-bold transition-all shadow-md"
                          title={t.work?.viewDemo || 'View Live Demo'}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      )}

      {/* Project Architecture Modal with Refined Aesthetic */}
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
