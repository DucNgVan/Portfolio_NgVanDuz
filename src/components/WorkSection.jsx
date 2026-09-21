import React, { useState } from 'react';
import { ExternalLink, Star, GitFork, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Github } from './BrandIcons';
import { githubProjects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

const WorkSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const techTicker = [
    'JavaScript', 'React JS', 'Lenis', 'GSAP', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Docker', 'Firebase', 'Next.js'
  ];

  const bottomTicker = [
    'UI/UX', 'INTERACTIVE WEB', 'CREATIVE DEVELOPMENT', 'MOTION DESIGN', 'HIGH PERFORMANCE', 'CLEAN CODE'
  ];

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-[#F4EFEA] text-[#0D0D0D] overflow-hidden select-none">
      
      {/* 1. TOP TECH TICKER */}
      <ScrollReveal direction="fade" duration={0.6}>
        <div className="w-full overflow-hidden border-y border-[#0D0D0D]/15 py-3.5 mb-14">
          <div className="flex whitespace-nowrap gap-10 animate-marquee">
            {[...techTicker, ...techTicker, ...techTicker].map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono tracking-widest text-[#555555] uppercase hover:text-[#0D0D0D] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 2. COLOSSAL "WORK" SECTION HEADER WITH DROPLETS (Screenshot 6) */}
      <div className="flex flex-col items-center justify-center text-center px-4 mb-20 relative">
        {/* Eyebrow */}
        <ScrollReveal direction="down">
          <div className="flex flex-col items-center gap-2 mb-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#666666] uppercase">
              SCROLL TO EXPLORE MY
            </span>
            <div className="w-1.5 h-6 rounded-full bg-[#0D0D0D] flex items-end justify-center pb-1">
              <div className="w-1 h-1 rounded-full bg-[#F4EFEA] animate-ping"></div>
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
          <h2 className="font-bebas text-[28vw] sm:text-[24vw] leading-[0.75] tracking-tight text-[#0D0D0D] drop-shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
            WORK
          </h2>

          {/* Liquid Splash Droplets */}
          <div className="absolute top-1/4 left-[18%] w-3 h-3 rounded-full bg-[#0D0D0D] animate-droplet" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-6 left-[22%] w-4 h-4 rounded-full bg-[#0D0D0D] animate-droplet" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute bottom-2 left-[30%] w-2.5 h-2.5 rounded-full bg-[#0D0D0D] animate-droplet" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute bottom-8 left-[50%] w-5 h-5 rounded-full bg-[#0D0D0D] animate-droplet" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute bottom-3 left-[56%] w-2 h-2 rounded-full bg-[#0D0D0D] animate-droplet" style={{ animationDelay: '0.9s' }}></div>
          <div className="absolute bottom-6 right-[18%] w-4 h-4 rounded-full bg-[#0D0D0D] animate-droplet" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 right-[32%] w-2.5 h-2.5 rounded-full bg-[#0D0D0D] animate-droplet" style={{ animationDelay: '1.5s' }}></div>
        </motion.div>

        {/* BOTTOM MARQUEE BAR */}
        <ScrollReveal direction="up" delay={0.2} className="w-full max-w-5xl mt-8 pt-6 border-t border-[#0D0D0D]/15">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono tracking-widest text-[#555555] uppercase">
            {bottomTicker.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-[#0D0D0D] transition-colors">{item}</span>
                {idx < bottomTicker.length - 1 && <span className="text-[#BFA882]">✦</span>}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* 3. CURATED PROJECTS / GITHUB REPOS GRID WITH STAGGERED ENTRANCE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <ScrollStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {githubProjects.map((project, index) => (
            <ScrollStaggerItem key={project.id} direction="up">
              <div
                className="group relative rounded-3xl bg-[#0D0D0D] border border-[#222222] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#BFA882] hover:-translate-y-2 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-[#F4EFEA]"
              >
                <div>
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
                  <h3 className="text-2xl font-bold font-syne text-[#F4EFEA] group-hover:text-[#d8c8a8] transition-colors mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#a0a0a0] leading-relaxed mb-6 line-clamp-3 font-sans">
                    {project.description}
                  </p>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
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
                <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d8c8a8] hover:underline cursor-pointer group/btn"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Chi tiết kiến trúc</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-[#181818] hover:bg-[#252525] border border-[#333333] hover:border-[#d8c8a8] text-[#cccccc] hover:text-white transition-all"
                      title="Xem trên GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-[#d8c8a8] hover:bg-[#e2d5bd] text-[#0D0D0D] font-bold transition-all shadow"
                      title="Xem Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
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
