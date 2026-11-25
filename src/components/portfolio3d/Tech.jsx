import React from "react";
import { motion } from "framer-motion";

import { styles } from "@/styles";
import { BallCanvas } from "@/components/canvas";
import { SectionWrapper } from "@/hoc";
import { technologies } from "@/constants";
import { textVariant } from "@/utils/motion";

export const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()} className='mb-14'>
        <p className={`${styles.sectionSubText} text-center`}>
          My technical skillset
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Interactive 3D Tech Stack.
        </h2>
      </motion.div>

      <div className='flex flex-row flex-wrap justify-center gap-10 max-w-6xl mx-auto'>
        {technologies.map((technology) => (
          <div className='w-28 h-28 flex flex-col items-center justify-center' key={technology.name} title={technology.name}>
            <BallCanvas icon={technology.icon} />
            <p className='text-[11px] font-mono text-secondary text-center mt-1 select-none'>
              {technology.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
