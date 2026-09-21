import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Heart, 
  ThumbsUp, 
} from 'lucide-react';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

const ExpertiseSection = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [toggleActive, setToggleActive] = useState(true);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const services = [
    {
      id: '01',
      category: 'DEVELOPMENT',
      iconText: '</>',
      title: 'Creative Development',
      description: 'Xây dựng các giao diện web mượt mà, tốc độ cao, responsive chuẩn chỉ với React, JavaScript và các công nghệ frontend hiện đại.',
      tags: ['REACT', 'JAVASCRIPT', 'TAILWIND CSS', 'TYPESCRIPT'],
      floatBadge: 'JS',
      badgeColor: 'bg-[#F7DF1E] text-black',
    },
    {
      id: '02',
      category: 'MOTION',
      iconText: '%',
      title: 'Motion & Interaction',
      description: 'Biến những trang web tĩnh thành các trải nghiệm sống động, lôi cuốn thông qua chuyển động tinh tế và các vi tương tác (micro-interactions).',
      tags: ['FRAMER MOTION', 'CANVAS', 'KINETIC TYPE', 'SMOOTH SCROLL'],
      floatBadge: '⚛️',
      badgeColor: 'bg-[#61DAFB] text-black',
    },
    {
      id: '03',
      category: 'UI / UX & SOFT SKILLS',
      iconText: '✦',
      title: 'UI / UX & Kỹ Năng Mềm',
      description: 'Thiết kế hệ thống giao diện có cấu trúc chặt chẽ, đồng thời sở hữu kỹ năng làm việc nhóm, giao tiếp tiếng Anh (IELTS 7.0) và giải quyết vấn đề nhanh chóng.',
      tags: ['IELTS 7.0', 'TEAMWORK', 'AGILE/SCRUM', 'PROBLEM SOLVING'],
      floatBadge: 'UX',
      badgeColor: 'bg-[#10B981] text-white',
    },
    {
      id: '04',
      category: 'MODERN STACK',
      iconText: '⚡',
      title: 'Modern Web Apps & Architecture',
      description: 'Phát triển các ứng dụng toàn diện với kiến trúc component rõ ràng, tích hợp RESTful/GraphQL APIs, xử lý dữ liệu thời gian thực và tối ưu hiệu năng.',
      tags: ['NODE.JS', 'POSTGRESQL', 'DOCKER', 'REST APIS'],
      floatBadge: 'API',
      badgeColor: 'bg-[#EC4899] text-white',
    },
  ];

  return (
    <section
      id="expertise"
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 bg-[#080808] text-[#f4efea] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 pb-6 border-b border-[#1f1f1f]">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#888888] uppercase mb-2 block">
                EXPERTISE & SKILLS
              </span>
              <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-white">
                CHUYÊN MÔN & KỸ NĂNG CỐT LÕI
              </h2>
            </div>
            <p className="text-xs font-mono text-[#888888] tracking-widest mt-2 sm:mt-0 uppercase">
              [ HOVER TO EXPLORE INTERACTIVE ELEMENTS ]
            </p>
          </div>
        </ScrollReveal>

        {/* MAIN LIST OF EXPERTISE ROWS WITH STAGGERED SLIDE-IN (Screenshot 5) */}
        <ScrollStagger staggerDelay={0.12} className="space-y-4 relative">
          {services.map((item) => {
            const isHovered = hoveredRow === item.id;

            return (
              <ScrollStaggerItem key={item.id} direction="left">
                <div
                  onMouseEnter={() => setHoveredRow(item.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'bg-[#141414] border-[#d8c8a8]/60 shadow-2xl scale-[1.01]'
                      : 'bg-[#0e0e0e] border-[#1c1c1c] hover:border-[#333333]'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Category & Number + Square Icon */}
                    <div className="lg:col-span-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#181818] border border-[#d8c8a8]/40 flex items-center justify-center font-mono text-sm font-bold text-[#d8c8a8] group-hover:scale-105 group-hover:border-[#d8c8a8] transition-all">
                        {item.iconText}
                      </div>

                      <div>
                        <div className="text-[11px] font-mono tracking-widest text-[#777777] uppercase">
                          {item.id} / {item.category}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold font-syne text-[#f4efea] group-hover:text-[#d8c8a8] transition-colors mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-5 text-sm text-[#999999] leading-relaxed">
                      {item.description}
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181818] text-[#bbbbbb] border border-[#262626]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Arrow Icon */}
                    <div className="lg:col-span-3 flex justify-end">
                      <div className="w-10 h-10 rounded-full border border-[#2a2a2a] group-hover:border-[#d8c8a8] group-hover:bg-[#d8c8a8] text-[#888888] group-hover:text-[#0d0d0d] flex items-center justify-center transition-all">
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}

          {/* FLOATING INTERACTIVE PURPLE CARD & TECH LOGOS ON HOVER (Screenshot 5) */}
          {hoveredRow && (
            <div
              className="hidden sm:flex pointer-events-auto absolute z-40 transition-transform duration-150 ease-out flex-col items-center"
              style={{
                left: `${Math.min(Math.max(cursorPos.x, 240), 750)}px`,
                top: `${cursorPos.y - 120}px`,
              }}
            >
              {/* Purple Interactive Card */}
              <div className="relative w-36 h-36 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] p-3 shadow-2xl shadow-purple-900/60 flex flex-col justify-between text-white animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between text-xs">
                  <button 
                    onClick={handleLike}
                    className="flex items-center gap-1 hover:scale-110 transition-transform"
                    title="Thả tim"
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-300 text-rose-300' : 'text-white'}`} />
                  </button>
                  <span className="text-[11px] font-mono">{likes}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-[11px] font-mono">100% Match</span>
                </div>

                <div 
                  onClick={() => setToggleActive(!toggleActive)}
                  className="w-full py-1 px-2 rounded-lg bg-black/20 flex items-center justify-between text-[10px] font-mono cursor-pointer hover:bg-black/30 transition-colors"
                >
                  <span>Active</span>
                  <div className={`w-7 h-4 rounded-full p-0.5 transition-colors ${toggleActive ? 'bg-white' : 'bg-white/30'}`}>
                    <div className={`w-3 h-3 rounded-full bg-[#7C3AED] transition-transform ${toggleActive ? 'translate-x-3' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges (JS, React, HTML5) */}
              <div className="absolute -left-10 -bottom-4 px-2.5 py-1 rounded-md font-bold font-mono text-xs shadow-lg bg-[#F7DF1E] text-black rotate-[-8deg] animate-bounce" style={{ animationDuration: '2.5s' }}>
                JS
              </div>
              <div className="absolute -right-8 -top-3 w-8 h-8 rounded-lg font-bold font-mono text-xs shadow-lg bg-[#61DAFB] text-black flex items-center justify-center rotate-[12deg] animate-bounce" style={{ animationDuration: '3s' }}>
                ⚛️
              </div>
              <div className="absolute -right-4 -bottom-6 px-2 py-0.5 rounded-md font-bold font-mono text-xs shadow-lg bg-[#E44D26] text-white rotate-[5deg]">
                5
              </div>
            </div>
          )}
        </ScrollStagger>

        {/* BOTTOM TICKER */}
        <ScrollReveal direction="fade" delay={0.3}>
          <div className="mt-16 pt-6 border-t border-[#1f1f1f] flex items-center justify-between text-xs font-mono tracking-widest text-[#777777] uppercase">
            <span>MOTION DESIGN</span>
            <span className="text-[#d8c8a8]">✦</span>
            <span>UI / UX</span>
            <span className="text-[#d8c8a8]">✦</span>
            <span>CREATIVE CODE</span>
            <span className="text-[#d8c8a8]">✦</span>
            <span>FULLSTACK WEB</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default ExpertiseSection;
