import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { githubProjects } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const WorkSection = () => {
  const { lang } = useLanguage();

  const marqueeText = "Next.js 14 · Three.js · Node.js · Express · PostgreSQL 3NF · Redis · Docker Compose · TypeScript · Vue 3 · Firebase · Tailwind CSS · Clean Architecture · REST APIs · ";

  const projectDescriptions = {
    1: lang === 'vi' 
      ? 'Tái chế lưới ma đại dương thành túi xách thời trang độc bản, tích hợp studio 3D thời gian thực và AI studio.'
      : 'Turns discarded ocean ghost nets into custom bags, with real-time 3D preview and an AI studio.',
    2: lang === 'vi'
      ? 'Đồ án tốt nghiệp: Nền tảng API du lịch với tính năng lập lịch trình thông minh, so sánh vé máy bay và khách sạn.'
      : 'Final-year project: a travel platform API with itinerary planning and flight/hotel comparison.',
    3: lang === 'vi'
      ? 'Hệ thống tiếp nhận và giải quyết sự cố IT: 8 REST endpoints và dashboard tương tác thời gian thực cho kỹ thuật viên.'
      : 'IT ticket resolution platform: 8 REST endpoints and a reactive dashboard for support staff.',
    4: lang === 'vi'
      ? 'Ứng dụng theo dõi đường mòn dã ngoại Android với tọa độ GPS, ghi nhật ký ngoại tuyến và đồng bộ trực tiếp.'
      : 'Android trail tracker with GPS waypoints, offline logging and real-time sync.',
    5: lang === 'vi'
      ? 'Hệ thống quản lý nội dung doanh nghiệp SharePoint cho điều phối quyên góp và quản lý tình nguyện viên.'
      : 'Enterprise SharePoint CMS for donation scheduling, volunteer management and automated workflows.',
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-20 sm:py-28 bg-[#09090b] text-[#f4efea] border-t border-white/10 select-none overflow-hidden"
    >
      {/* 1. TOP MARQUEE TICKER matching reference HTML */}
      <div className="w-full overflow-hidden whitespace-nowrap border-y border-white/15 py-3 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#a79e92]">
        <div className="inline-block animate-marquee">
          <span>{marqueeText.repeat(4)}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 mt-12 sm:mt-16">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d8c8a8] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#d8c8a8] uppercase font-semibold">
              // 03. SELECTED CASE STUDIES
            </span>
          </div>

          <h2 className="font-bebas text-7xl sm:text-8xl md:text-9xl text-center tracking-wide text-[#f4efea] leading-[0.85] mb-12 sm:mb-20">
            {lang === 'vi' ? 'DỰ ÁN' : 'PROJECTS'}
          </h2>
        </ScrollReveal>

        {/* 2. PROJECT ARTICLES matching reference HTML layout */}
        <div className="divide-y divide-white/20 border-y border-white/20">
          {githubProjects.map((project, idx) => {
            const shortTitle = project.title.split('—')[0].split(':')[0].trim();
            const desc = projectDescriptions[project.id] || project.tagline;

            return (
              <article 
                key={project.id}
                className="relative py-8 sm:py-12 group transition-all duration-300 hover:px-4 sm:hover:px-6 hover:bg-[#13141a]/60 rounded-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                  
                  {/* Left (7 cols): Title & Description */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-[#d8c8a8] font-bold">
                        0{idx + 1} /
                      </span>
                      <span className="text-[11px] font-mono tracking-widest text-[#a79e92] uppercase">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-[#f4efea] group-hover:text-[#d8c8a8] transition-colors leading-[0.9]">
                      {shortTitle}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-[#a79e92] font-sans max-w-xl leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Right (5 cols): Tech Stack & Links */}
                  <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between">
                    <div className="text-xs font-mono text-[#a79e92] mb-4 text-left lg:text-right">
                      {project.tech.join(', ')}
                    </div>

                    {/* Actions Links */}
                    <div className="flex items-center gap-5 text-sm sm:text-base font-bold font-sans">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#d8c8a8] hover:text-white transition-colors underline decoration-[#d8c8a8] underline-offset-4"
                        >
                          <span>Demo</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#f4efea] hover:text-[#d8c8a8] transition-colors underline decoration-white/40 underline-offset-4"
                      >
                        <span>Repo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WorkSection;
