import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo } from '@/data/portfolioData';
import { ArrowUp, Copy, Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const ContactSection = () => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.warn('Copy email failed:', err);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-[95svh] py-24 sm:py-32 px-6 sm:px-10 lg:px-14 bg-[#0f0f0f] text-[#f4efea] border-t border-white/10 select-none flex flex-col justify-between"
    >
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        <ScrollReveal direction="up">
          {/* Status badge */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#d8c8a8] mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">
              {lang === 'vi' 
                ? 'Sẵn sàng ứng tuyển thực tập Full-Stack / Software Engineering' 
                : 'Open to a Full-Stack / Software Engineering internship'}
            </span>
          </div>

          {/* Giant Headline: LET'S TALK */}
          <h2 className="font-bebas text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-wide text-[#f4efea] leading-[0.85] mb-6">
            {lang === 'vi' ? 'HÃY LIÊN HỆ' : 'LET’S TALK'}
          </h2>

          {/* Email with gold underline and copy button */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-[#f4efea] hover:text-[#d8c8a8] border-b-2 sm:border-b-4 border-[#d8c8a8] pb-1 transition-colors"
            >
              {personalInfo.email}
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded-full bg-[#181920] border border-white/15 hover:border-[#d8c8a8] text-[#d8c8a8] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{lang === 'vi' ? 'Đã sao chép' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Sao chép email' : 'Copy email'}</span>
                </>
              )}
            </button>
          </div>

          {/* Direct channels */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm sm:text-base font-sans font-medium text-[#a79e92]">
            <a 
              href="tel:0788551709" 
              className="hover:text-[#f4efea] transition-colors"
            >
              078.855.1709
            </a>

            <a 
              href={personalInfo.resumeUrl} 
              download="NguyenVanDuc_CV.pdf"
              className="hover:text-[#d8c8a8] transition-colors underline underline-offset-4"
            >
              CV (PDF)
            </a>

            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#f4efea] transition-colors"
            >
              GitHub
            </a>

            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#f4efea] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer matching reference HTML */}
      <footer className="w-full max-w-6xl mx-auto pt-8 border-t border-[#7f6339]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#a79e92]">
        <div className="flex items-center gap-3">
          <span className="font-hand text-xl text-[#f4efea] font-semibold tracking-normal">
            nguyenvanduc
          </span>
          <span>© 2026 Nguyen Van Duc · Da Nang, Vietnam</span>
        </div>

        <a 
          href="#hero"
          className="flex items-center gap-1.5 hover:text-[#d8c8a8] transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#d8c8a8]" />
        </a>
      </footer>
    </section>
  );
};

export default ContactSection;
