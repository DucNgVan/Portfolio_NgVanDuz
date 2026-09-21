import React from 'react';
import { Trophy, Award, Flame, Star, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { achievements } from '@/data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';

const iconMap = {
  Award: Award,
  Flame: Flame,
  Trophy: Trophy,
  Star: Star,
};

const AchievementsSection = () => {
  const stats = [
    { label: "Cumulative University GPA", value: "3.75", max: "/4.0", desc: "High Distinction Honors", icon: GraduationCap },
    { label: "Awards & Hackathons", value: "03+", max: " wins", desc: "University & Corporate Level", icon: Trophy },
    { label: "Excellence Scholarships", value: "05", max: " sems", desc: "Top 3% of CS Faculty", icon: Award },
    { label: "Community & Mentoring", value: "200+", max: " devs", desc: "Mentored Freshmen Students", icon: Star },
  ];

  return (
    <section id="achievements" className="relative py-24 sm:py-32 bg-[#F4EFEA] text-[#0D0D0D] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono tracking-[0.25em] text-[#666666] uppercase mb-2 block">
              HONORS & RECOGNITION
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-[#0D0D0D]">
              ACADEMIC HONORS & NOTABLE MILESTONES
            </h2>
            <div className="w-24 h-[2px] bg-[#0D0D0D] mx-auto mt-3"></div>
          </ScrollReveal>
        </div>

        {/* Top Metric Cards with Staggered Entrance */}
        <ScrollStagger staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollStaggerItem key={idx} direction="zoom">
                <div className="relative p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5DEC9] hover:border-[#BFA882] transition-all duration-300 group hover:-translate-y-1.5 shadow-sm hover:shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center text-[#BFA882]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-[#888888] tracking-widest uppercase">
                      VERIFIED
                    </span>
                  </div>

                  <div className="font-bebas text-3xl sm:text-4xl text-[#0D0D0D] group-hover:text-[#BFA882] transition-colors flex items-baseline">
                    {s.value}
                    <span className="text-xs font-mono text-[#BFA882] ml-1">{s.max}</span>
                  </div>

                  <div className="text-xs font-semibold text-[#333333] mt-1">{s.label}</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">{s.desc}</div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>

        {/* Detailed Achievement Cards with Smooth Slide-in */}
        <ScrollStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, index) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <ScrollStaggerItem key={index} direction="up">
                <div className="relative overflow-hidden p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5DEC9] hover:border-[#BFA882] transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1">
                  {/* Subtle Shimmer traversing on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none"></div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center text-[#BFA882] group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
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

                  <h3 className="text-xl font-bold font-syne text-[#0D0D0D] group-hover:text-[#8C6D3F] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#555555] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-[#EAE3D8] flex items-center justify-between text-xs font-mono text-[#666666]">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> University Certified
                    </span>
                    <span className="text-[#8C6D3F]">Academic Milestone</span>
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
