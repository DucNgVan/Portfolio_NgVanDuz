import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { styles } from "@/styles";
import { SectionWrapper } from "@/hoc";
import { fadeIn, textVariant } from "@/utils/motion";
import { testimonials } from "@/constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  ref: decisionRef,
  onOpenCert,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.4, 0.75)}
    className='bg-black-200 p-8 rounded-3xl xs:w-[320px] w-full flex flex-col justify-between border border-white/10 shadow-2xl'
  >
    <div>
      <p className='text-white font-black text-[44px] leading-none text-[#915EFF] font-serif'>"</p>

      <div className='mt-1'>
        <p className='text-white tracking-wider text-[15px] leading-relaxed font-light'>
          {testimonial}
        </p>
      </div>
    </div>

    <div className='mt-7 pt-4 border-t border-white/10 flex items-center justify-between gap-4'>
      <div className='flex-1 flex flex-col'>
        <p className='text-white font-medium text-[15px]'>
          <span className='blue-text-gradient'>@</span> {name}
        </p>
        <p className='mt-1 text-secondary text-[12px]'>
          {designation} · {company}
        </p>
        {decisionRef && (
          <p className='mt-1 text-[11px] font-mono text-emerald-400 flex items-center gap-1'>
            <ShieldCheck className='w-3.5 h-3.5' />
            <span>{decisionRef}</span>
          </p>
        )}
      </div>

      <img
        src={image}
        alt={`feedback_by-${name}`}
        className='w-12 h-12 rounded-full object-cover border-2 border-[#915EFF] cursor-pointer'
        onClick={onOpenCert}
        title="Inspect Certificate"
      />
    </div>
  </motion.div>
);

export const Feedbacks = ({ onSelectCert }) => {
  return (
    <div className='mt-12 bg-black-100 rounded-[20px] overflow-hidden'>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Verified recognition</p>
          <h2 className={styles.sectionHeadText}>Honors & Awards.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center sm:justify-start`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name + index}
            index={index}
            {...testimonial}
            onOpenCert={() => onSelectCert && onSelectCert(testimonial)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "honors");
