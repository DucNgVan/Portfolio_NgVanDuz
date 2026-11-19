import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import AchievementsGallery3D from '@/components/ui/AchievementsGallery3D';

export const AchievementsSection = () => {
  const { lang } = useLanguage();

  const honorsList = [
    {
      title: 'Top 3 Student',
      year: '2024',
      org: 'University of Greenwich',
      descVi: 'Vinh danh Top 3 sinh viên có thành tích học tập xuất sắc nhất học kỳ Summer 2024.',
      descEn: 'Recognized for superior academic excellence, ranking Top 3 across Greenwich International Bachelor program.',
    },
    {
      title: '2nd Prize, Impact Innovation Bootcamp',
      year: '2024',
      org: '199 Hospital, Ministry of Public Security',
      descVi: 'Giải Nhì cuộc thi đổi mới sáng tạo và chuyển đổi số y tế tổ chức bởi Bệnh viện 199 - Bộ Công An.',
      descEn: '2nd Prize in healthcare innovation & digital transformation hackathon organized by Hospital 199.',
    },
    {
      title: 'Best Club of the Year',
      year: '2024',
      org: 'Greenwich Newspaper Group, as Club President',
      descVi: 'Dẫn dắt CLB Báo chí Greenwich đạt danh hiệu CLB xuất sắc nhất campus với vai trò Chủ nhiệm CLB.',
      descEn: 'Led Greenwich Newspaper Group to the premier campus organization award as Club President.',
    },
    {
      title: 'National Finalist, Dream Code Challenge',
      year: '2024',
      org: 'LG Electronics',
      descVi: 'Vào Vòng Chung kết toàn quốc thử thách lập trình thuật toán và cấu trúc dữ liệu nâng cao.',
      descEn: 'Advanced to National Finals among top algorithmic coders across Vietnam.',
    },
  ];

  return (
    <section 
      id="honors" 
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-10 lg:px-14 bg-[#0f0f0f] text-[#f4efea] border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#d8c8a8] animate-pulse" />
                <span className="text-xs font-mono tracking-[0.25em] text-[#d8c8a8] uppercase font-semibold">
                  // 04. ACADEMIC HONORS & VERIFIED MILESTONES
                </span>
              </div>
              <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide text-[#f4efea] leading-[0.85]">
                {lang === 'vi' ? 'THÀNH TÍCH' : 'HONORS'}
              </h2>
            </div>

            <div className="mt-4 sm:mt-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181920] border border-white/10 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-semibold text-[11px] uppercase tracking-wider">
                100% Verified Credentials
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 1. INTERACTIVE 3D EXHIBITION GALLERY WALL */}
        <div className="mb-14">
          <AchievementsGallery3D />
        </div>

        {/* 2. EDITORIAL HONORS LIST matching reference HTML */}
        <ScrollReveal direction="up">
          <ul className="divide-y divide-[#7f6339]/40 border-y border-[#7f6339]/40 max-w-4xl">
            {honorsList.map((item, idx) => (
              <li key={idx} className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 items-baseline group">
                <div>
                  <h3 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#f4efea] group-hover:text-[#d8c8a8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#a79e92] font-sans mt-0.5">
                    {item.org}
                  </p>
                </div>
                <div className="font-bebas text-2xl sm:text-3xl text-[#d8c8a8] sm:text-right">
                  {item.year}
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default AchievementsSection;
