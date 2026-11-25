import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "@/styles";
import { services } from "@/constants";
import { SectionWrapper } from "@/hoc";
import { fadeIn, textVariant } from "@/utils/motion";

const ServiceCard = ({ index, title, icon, desc }) => (
  <Tilt
    tiltMaxAngleX={25}
    tiltMaxAngleY={25}
    scale={1.05}
    transitionSpeed={450}
    className='xs:w-[260px] w-full'
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.4, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card h-full'
    >
      <div className='bg-tertiary rounded-[20px] py-6 px-8 min-h-[300px] flex justify-evenly items-center flex-col text-center h-full'>
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[19px] font-bold'>
          {title}
        </h3>

        <p className='text-secondary text-[13px] leading-relaxed font-light'>
          {desc}
        </p>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[30px] font-light'
      >
        I am a final-year Software Engineering student at the <span className='text-white font-semibold'>University of Greenwich</span> recognized in the <span className='text-[#915EFF] font-semibold'>Top 3 Students of 2024</span>. Experienced in building end-to-end full-stack architectures — ranging from <span className='text-white font-medium'>interactive 3D web applications with Next.js and Three.js</span> to resilient backend systems powered by <span className='text-white font-medium'>28-table 3NF PostgreSQL, Redis caching, and Docker Compose</span>. Seeking a Full-Stack / Software Engineering Internship to deliver scalable code and grow with an engineering team.
      </motion.p>

      <div className='mt-16 flex flex-wrap gap-8 justify-center sm:justify-start'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
