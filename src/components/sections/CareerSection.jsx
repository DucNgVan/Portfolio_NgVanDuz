import React from 'react';
import { Calendar, Trophy, Medal, Flame, Star, CheckCircle2, Award, Briefcase } from 'lucide-react';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

const careerMilestones = [
  {
    year: '2024',
    roleEn: 'Top 3 Outstanding Student 2024',
    roleVi: 'Top 3 Sinh Viên Xuất Sắc 2024',
    company: 'University of Greenwich (Vietnam)',
    badge: 'Academic Honor',
    descEn: 'Recognized among the Top 3 Students campus-wide for outstanding academic commitment, software engineering foundations, and student community contributions.',
    descVi: 'Được vinh danh trong Top 3 sinh viên xuất sắc toàn cơ sở nhờ nền tảng kỹ thuật phần mềm vững chắc, tư duy giải thuật và đóng góp phong trào.',
    icon: Trophy,
    color: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  },
  {
    year: '2024',
    roleEn: 'Second Place (2nd Prize Winner)',
    roleVi: 'Giải Nhì (2nd Prize Winner)',
    company: 'Impact Innovation Bootcamp · 199 Hospital',
    badge: 'Hackathon Award',
    descEn: 'Achieved Second Place innovating practical healthcare technology solutions under fast-paced hackathon prototyping sprints organized by 199 Hospital.',
    descVi: 'Đạt Giải Nhì chung cuộc tại cuộc thi đổi mới sáng tạo tổ chức bởi Bệnh viện 199, phát triển nguyên mẫu công nghệ y tế trong thời gian giới hạn.',
    icon: Medal,
    color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  },
  {
    year: '2024',
    roleEn: 'National Finalist',
    roleVi: 'Vòng Chung Kết Toàn Quốc',
    company: 'LG Dream Code Challenge · LG Electronics',
    badge: 'National Competition',
    descEn: 'Advanced to the National Finals of the prestigious LG Dream Code Challenge, competing among top nationwide engineering students in algorithmic problem solving.',
    descVi: 'Vượt qua hàng trăm thí sinh toàn quốc để tiến vào Vòng Chung Kết thử thách lập trình giải thuật và logic phần mềm do LG Electronics tổ chức.',
    icon: Flame,
    color: 'text-[#d8c8a8] border-[#d8c8a8]/30 bg-[#d8c8a8]/10',
  },
  {
    year: '2024',
    roleEn: 'The Best Club President of 2024',
    roleVi: 'Chủ Nhiệm CLB Xuất Sắc Nhất 2024',
    company: 'Greenwich Newspaper Group',
    badge: 'Campus Leadership',
    descEn: 'Led team operations, digital editorial workflows, and campus tech media initiatives, resulting in the "Best Club of 2024" award.',
    descVi: 'Điều hành hoạt động ban chủ nhiệm, quản lý quy trình xuất bản nội dung số và điều phối dự án truyền thông đạt danh hiệu CLB Xuất Sắc Nhất.',
    icon: Star,
    color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  },
  {
    year: 'NOW',
    roleEn: 'Full-Stack / Software Engineering Intern',
    roleVi: 'Thực Tập Sinh Kỹ Sư Phần Mềm',
    company: 'Open for Opportunities · Da Nang & Remote',
    badge: 'Ready to Join',
    descEn: 'Seeking a Full-Stack / Backend Engineering Internship to contribute directly to production products, clean architectures, and team objectives.',
    descVi: 'Sẵn sàng gia nhập đội ngũ phát triển với vai trò Thực tập sinh Full-Stack / Backend, cống hiến mã nguồn chất lượng và học hỏi cùng team.',
    icon: Briefcase,
    color: 'text-[#ede5dc] border-[#ede5dc]/30 bg-[#ede5dc]/10',
  },
];

const CareerSection = () => {
  const { lang } = useLanguage();

  return (
    <section
      id="career"
      className="relative py-24 sm:py-32 bg-[#0c0d10] text-[#f4efea] overflow-hidden select-none border-t border-[#1e2026]"
    >
      {/* Background ambient lighting (Gentle warm champagne) */}
      <div 
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(216,200,168,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate(-40%, -50%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* MoncyDev Header */}
        <ScrollReveal direction="up">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-[0.25em] text-[#d8c8a8] uppercase block mb-3 font-semibold">
              // 03. MILESTONES & HONORS
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-syne tracking-tight text-[#f4efea] leading-[1.05]">
              My career <span className="text-[#d8c8a8] font-light">&</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8c8a8] to-[#ede5dc]">
                experience
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* MoncyDev Glowing Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l border-[#23252e] space-y-10">
          
          {careerMilestones.map((item, index) => {
            const Icon = item.icon;
            const isNow = item.year === 'NOW';

            return (
              <ScrollReveal key={index} direction="up" delay={index * 0.08}>
                <div className="relative group">
                  
                  {/* Glowing Timeline Dot */}
                  <div 
                    className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isNow
                        ? 'border-[#d8c8a8] bg-[#d8c8a8] shadow-[0_0_15px_rgba(216,200,168,0.6)] scale-125'
                        : 'border-[#d8c8a8]/60 bg-[#0c0d10] group-hover:bg-[#d8c8a8] group-hover:scale-125'
                    }`}
                  />

                  {/* Milestone Card */}
                  <div className="p-6 sm:p-7 rounded-3xl bg-[#131418] border border-[#22242c] hover:border-[#d8c8a8]/50 transition-all duration-300 shadow-xl group-hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold font-syne text-[#f4efea] group-hover:text-[#d8c8a8] transition-colors">
                            {lang === 'vi' ? item.roleVi : item.roleEn}
                          </h3>
                          <div className="text-xs font-mono text-[#aaaaaa]">
                            {item.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#1a1b22] border border-[#2a2d39] text-[#d8c8a8]">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#888888]">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#cccccc] font-sans leading-relaxed pt-2 border-t border-[#1e2029]">
                      {lang === 'vi' ? item.descVi : item.descEn}
                    </p>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default CareerSection;
