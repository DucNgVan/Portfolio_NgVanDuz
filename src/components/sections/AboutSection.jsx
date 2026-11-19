import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const AboutSection = () => {
  const { lang } = useLanguage();

  return (
    <section 
      id="about" 
      className="relative min-h-[90svh] py-24 sm:py-32 px-6 sm:px-10 lg:px-14 bg-[#0f0f0f] text-[#f4efea] flex items-center border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column (5 cols): Editorial Accent Box / Tech Philosophy Card */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <ScrollReveal direction="right">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#14151a] border border-[#2b2d36] shadow-2xl overflow-hidden group">
              <div 
                className="absolute -top-20 -right-20 w-44 h-44 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(201,164,104,0.15) 0%, transparent 70%)',
                }}
              />
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#d8c8a8] uppercase font-semibold block mb-4">
                // ENGINEERING MINDSET
              </span>
              <div className="font-bebas text-4xl sm:text-5xl text-[#f4efea] leading-[0.95] mb-4">
                MODULAR.<br />
                SCALABLE.<br />
                <span className="text-[#d8c8a8]">CLEAN ARCHITECTURE.</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a79e92] font-sans leading-relaxed">
                {lang === 'vi'
                  ? 'Ưu tiên thiết kế hệ thống theo chuẩn Clean Architecture, tách biệt rõ ràng các tầng logic, chuẩn hóa cơ sở dữ liệu 3NF và tối ưu hóa hiệu năng truy vấn bằng Redis.'
                  : 'Prioritizing Clean Architecture design, decoupling system layers, 3NF database normalization, and query optimization with Redis in-memory caching.'}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column (7 cols): Content matching reference HTML */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <ScrollReveal direction="up">
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-[#f4efea] leading-[0.9] mb-6">
              {lang === 'vi' 
                ? 'XÂY DỰNG BACKEND VỮNG VÀNG THEO QUY MÔ.' 
                : 'I BUILD BACKENDS THAT STAY CLEAN AS THEY GROW.'}
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-[#f4efea] font-sans font-normal leading-relaxed mb-8 max-w-2xl">
              {lang === 'vi'
                ? 'Sinh viên năm cuối, tìm kiếm cơ hội thực tập nơi tôi có thể học hỏi từ đội ngũ vững mạnh và trực tiếp triển khai các hệ thống thực tế. Định hướng trong 5 năm tới: Trở thành Middle Full-Stack Engineer chuyên sâu thiết kế kiến trúc quy mô lớn.'
                : 'Final-year student, looking for an internship where I can learn from a strong team and ship real systems. In five years: a Middle Full-Stack Engineer who designs large-scale architecture.'}
            </p>

            {/* Definition List matching reference HTML */}
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 pt-6 border-t border-[#7f6339]/40 max-w-xl text-sm sm:text-base font-sans">
              <dt className="text-[#d8c8a8] font-mono uppercase text-xs sm:text-sm pt-0.5">Role</dt>
              <dd className="font-medium text-[#f4efea]">Full-Stack Intern / Junior Engineer</dd>

              <dt className="text-[#d8c8a8] font-mono uppercase text-xs sm:text-sm pt-0.5">Degree</dt>
              <dd className="font-medium text-[#f4efea]">BSc (Hons) Software Engineering, Greenwich</dd>

              <dt className="text-[#d8c8a8] font-mono uppercase text-xs sm:text-sm pt-0.5">Base</dt>
              <dd className="font-medium text-[#f4efea]">Da Nang · hybrid or remote</dd>
            </dl>

            <p className="mt-8 text-xs sm:text-sm text-[#a79e92] font-mono">
              <span className="text-[#d8c8a8] font-semibold">Daily tools: </span>
              React, Next.js, TypeScript, Node.js, PostgreSQL, Redis, Docker, Three.js.
            </p>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
