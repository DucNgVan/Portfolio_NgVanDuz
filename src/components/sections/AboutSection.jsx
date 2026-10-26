import React from 'react';
import { Target, Code2, MapPin, GraduationCap } from 'lucide-react';
import profileImg from '@/assets/images/profile.jpg';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getTechIcon } from '@/components/ui/TechIcons';

const allTechStack = [
  { name: 'PostgreSQL', category: 'Relational DB' },
  { name: 'Redis', category: 'Cache Store' },
  { name: 'Docker', category: 'Containerization' },
  { name: 'Next.js 14', category: 'React Framework' },
  { name: 'React.js', category: 'UI Library' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Express', category: 'Backend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'Three.js', category: '3D Graphics' },
  { name: 'MongoDB', category: 'NoSQL DB' },
  { name: 'Git & GitHub', category: 'VCS' },
  { name: 'Postman', category: 'API Testing' },
  { name: 'Firebase', category: 'Cloud BaaS' },
  { name: 'Vue.js 3', category: 'Frontend' },
  { name: 'Java', category: 'Mobile & OOP' },
];

const renderFormattedBio = (text) => {
  if (!text) return null;
  const keywords = [
    'Clean Architecture',
    'PostgreSQL (3NF)',
    'Redis caching',
    'Docker Compose',
    'Node.js/Express',
    'Middle Full-Stack Engineer',
    'Nguyễn Văn Đức',
    'Nguyen Van Duc',
    'University of Greenwich (Vietnam)',
    'Đại học Greenwich (Việt Nam)'
  ];
  const regex = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    keywords.includes(part) ? (
      <strong key={i} className="font-semibold text-[#f4efea]">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

const AboutSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  return (
    <section
      id="about"
      className="relative min-h-screen lg:h-screen lg:max-h-screen w-full bg-[#080808] text-[#f4efea] flex flex-col justify-between py-5 sm:py-7 lg:py-4 px-4 sm:px-8 lg:px-12 xl:px-14 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between my-auto">
        
        {/* 1. TOP HEADER BAR: // WHO AM I ? (Left) | FULL-STACK SOFTWARE ENGINEER (Right) */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#777777] tracking-widest px-1 shrink-0 mb-2 sm:mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[#d8c8a8]">{'//'}</span>
            <span className="uppercase">{t.about.eyebrow?.replace(/^[—\s-]+/, '') || (lang === 'vi' ? 'TÔI LÀ AI ?' : 'WHO AM I ?')}</span>
          </div>
          <div className="uppercase hidden sm:block text-[11px] text-[#777777]">
            FULL-STACK SOFTWARE ENGINEER
          </div>
        </div>

        {/* 2. MIDDLE TWO-CARD ROW: Portrait Card (Left) + Editorial About Card with 2x2 Bento (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-4 items-stretch my-auto">
          
          {/* LEFT CARD: Portrait Showcase Card with Photo, Name & Technical Pills */}
          <div className="lg:col-span-5 xl:col-span-4 flex">
            <ScrollReveal direction="zoom" delay={0.1} className="w-full flex">
              <div className="relative w-full rounded-3xl overflow-hidden bg-[#0d0d0d] border border-[#1f1f1f] p-4 sm:p-5 flex flex-col justify-between shadow-2xl group transition-all duration-500 hover:border-[#d8c8a8]/50 min-h-[380px] lg:min-h-[420px] xl:min-h-[440px]">
                
                {/* Full-Bleed Portrait Photo with Smooth Gradient Vignette */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src={profileImg}
                    alt="Nguyen Van Duc"
                    className="w-full h-[78%] object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-700 filter brightness-[0.96] contrast-[1.04]"
                    loading="eager"
                  />
                  {/* Top Vignette for Glass Badges readability */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0d0d0d]/90 via-[#0d0d0d]/40 to-transparent" />
                  {/* Bottom Vignette blending photo seamlessly into the dark card footer */}
                  <div className="absolute inset-x-0 top-1/3 bottom-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/95 to-transparent" />
                </div>

                {/* Top Glass Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#2a2a2a] flex items-center gap-2 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-wider text-[#f4efea] font-semibold uppercase">
                      {t.about.badgeAvailable || "READY FOR INTERNSHIP"}
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#2a2a2a] text-[10px] font-mono text-[#d8c8a8] font-bold shadow-lg">
                    BSc (Hons)
                  </div>
                </div>

                {/* Bottom Card Content: Name (Stacked) + Greenwich VN + 2-Row Tech Tags */}
                <div className="relative z-10 flex flex-col gap-3 mt-auto pt-16">
                  {/* Name (Left) & Greenwich VN (Right) */}
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="font-syne font-extrabold text-xl sm:text-2xl tracking-wider text-[#f4efea] uppercase leading-none">
                        NGUYEN VAN
                      </span>
                      <span className="font-syne font-extrabold text-xl sm:text-2xl tracking-wider text-[#f4efea] uppercase leading-tight">
                        DUC
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-mono text-[#888888] tracking-widest uppercase">
                        GREENWICH
                      </span>
                      <span className="text-[10px] font-mono text-[#d8c8a8] font-bold tracking-widest uppercase">
                        VN
                      </span>
                    </div>
                  </div>

                  {/* 2 Rows of Technical Chips */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-[#161616] border border-[#262626] text-[10px] font-mono text-[#d8c8a8] uppercase tracking-wider font-semibold">
                        CLEAN ARCHITECTURE
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#161616] border border-[#262626] text-[10px] font-mono text-[#cccccc] uppercase tracking-wider">
                        POSTGRESQL 3NF
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-[#161616] border border-[#262626] text-[10px] font-mono text-[#cccccc] uppercase tracking-wider">
                        REDIS
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#161616] border border-[#262626] text-[10px] font-mono text-[#cccccc] uppercase tracking-wider">
                        DOCKER
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT CARD: About Me Statement + 2x2 Bento Grid */}
          <div className="lg:col-span-7 xl:col-span-8 flex">
            <ScrollReveal direction="left" delay={0.15} className="w-full flex">
              <div className="w-full rounded-3xl bg-[#0d0d0d] border border-[#1f1f1f] p-5 sm:p-6 lg:p-7 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-[#d8c8a8]/50 min-h-[380px] lg:min-h-[420px] xl:min-h-[440px]">
                
                {/* Upper Narrative: ABOUT ME. Title & 2-Paragraph Bio */}
                <div>
                  <h2 className="font-bebas text-4xl sm:text-5xl lg:text-5xl tracking-wider leading-none mb-3 sm:mb-3.5">
                    <span className="text-[#d8c8a8]">{lang === 'vi' ? 'GIỚI THIỆU ' : 'ABOUT '}</span>
                    <span className="text-[#f4efea]">{lang === 'vi' ? 'BẢN THÂN.' : 'ME.'}</span>
                  </h2>

                  <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed text-[#c4c7cc]">
                    <p>
                      {renderFormattedBio(t.about.bioP1)}
                    </p>
                    <p className="text-[#9ea2a8]">
                      {renderFormattedBio(t.about.bioP2)}
                    </p>
                  </div>
                </div>

                {/* Lower Matrix: Exactly 2x2 Bento Grid of Key Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-4 lg:mt-5 pt-3 border-t border-[#1c1c1c]">
                  
                  {/* CARD 1: TARGET ROLE */}
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#d8c8a8]/60 transition-all flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-105 transition-transform">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-mono tracking-wider text-[#888888] uppercase truncate">
                        {lang === 'vi' ? 'VỊ TRÍ MONG MUỐN' : 'TARGET ROLE'}
                      </span>
                      <span className="text-xs font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate">
                        Full-Stack Intern / Junior Engineer
                      </span>
                    </div>
                  </div>

                  {/* CARD 2: CORE FOCUS */}
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#d8c8a8]/60 transition-all flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-105 transition-transform">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-mono tracking-wider text-[#888888] uppercase truncate">
                        {lang === 'vi' ? 'CHUYÊN MÔN CỐT LÕI' : 'CORE FOCUS'}
                      </span>
                      <span className="text-xs font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate">
                        {lang === 'vi' ? 'Web & App Architecture' : 'Web & App Architecture'}
                      </span>
                    </div>
                  </div>

                  {/* CARD 3: LOCATION */}
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#d8c8a8]/60 transition-all flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-mono tracking-wider text-[#888888] uppercase truncate">
                        {lang === 'vi' ? 'ĐỊA ĐIỂM' : 'LOCATION'}
                      </span>
                      <span className="text-xs font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate">
                        Da Nang, Vietnam • Hybrid/Remote
                      </span>
                    </div>
                  </div>

                  {/* CARD 4: EDUCATION */}
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#d8c8a8]/60 transition-all flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center shrink-0 text-[#d8c8a8] group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-mono tracking-wider text-[#888888] uppercase truncate">
                        {lang === 'vi' ? 'HỌC VẤN' : 'EDUCATION'}
                      </span>
                      <span className="text-xs font-bold text-[#f4efea] group-hover:text-[#d8c8a8] font-mono leading-tight mt-0.5 truncate">
                        BSc (Hons) Software Eng. • Greenwich
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 3. BOTTOM CARD: Core Technical Stack Marquee in its own Card Frame */}
        <div className="w-full rounded-3xl bg-[#0d0d0d] border border-[#1f1f1f] p-3 sm:p-4 shadow-2xl shrink-0 mt-3 sm:mt-3.5">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8c8a8] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#d8c8a8] uppercase font-bold">
                {lang === 'vi' ? 'HỆ THỐNG CÔNG NGHỆ CỐT LÕI' : 'CORE TECHNICAL STACK'}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#777777] uppercase tracking-wider">
              {lang === 'vi' ? 'RÊ CHUỘT ĐỂ TẠM DỪNG' : 'HOVER TO PAUSE'}
            </span>
          </div>

          {/* Smooth Horizontal Carousel Track with Native Drag/Scroll and Hover Pause */}
          <div className="relative w-full overflow-hidden group">
            {/* Left and Right Subtle Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-0.5 px-2 cursor-grab active:cursor-grabbing select-none">
              <div className="flex items-center gap-2.5 animate-marquee group-hover:[animation-play-state:paused] shrink-0">
                {[...allTechStack, ...allTechStack].map((tech, idx) => {
                  const Icon = getTechIcon(tech.name);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#d8c8a8]/70 hover:bg-[#1a1a1a] transition-all duration-300 shrink-0 shadow-sm group/item hover:-translate-y-0.5"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#1c1c1c] border border-[#2c2c2c] flex items-center justify-center p-1 shrink-0 group-hover/item:scale-105 transition-transform">
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono font-bold text-[#f4efea] group-hover/item:text-[#d8c8a8] transition-colors whitespace-nowrap">
                          {tech.name}
                        </span>
                        <span className="text-[8.5px] font-mono text-[#777777] uppercase tracking-wider">
                          {tech.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;