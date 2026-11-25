import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { styles } from "@/styles";
import { github } from "@/assets";
import { SectionWrapper } from "@/hoc";
import { projects } from "@/constants";
import { fadeIn, textVariant } from "@/utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
  onOpenModal,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.35, 0.75)}>
      <Tilt
        tiltMaxAngleX={18}
        tiltMaxAngleY={18}
        scale={1.03}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[350px] w-full shadow-2xl flex flex-col justify-between h-full'
      >
        <div>
          <div 
            className='relative w-full h-[220px] rounded-2xl overflow-hidden cursor-pointer group'
            onClick={onOpenModal}
          >
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            />

            <div className='absolute inset-0 flex justify-end gap-2 m-3 card-img_hover'>
              {live_demo_link && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(live_demo_link, "_blank");
                  }}
                  className='bg-gradient-to-r from-amber-400 to-[#d8c8a8] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:brightness-110 transition-all'
                  title='Live Demo'
                >
                  <ExternalLink className='w-5 h-5 text-black' />
                </div>
              )}

              {source_code_link && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(source_code_link, "_blank");
                  }}
                  className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:border border-white/40 transition-all'
                  title='GitHub Repository'
                >
                  <img
                    src={github}
                    alt='source code'
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>
              )}
            </div>
          </div>

          <div className='mt-5'>
            <h3 
              onClick={onOpenModal}
              className='text-white font-bold text-[22px] hover:text-[#915EFF] transition-colors cursor-pointer'
            >
              {name}
            </h3>
            <p className='mt-2 text-secondary text-[14px] leading-relaxed font-light'>
              {description}
            </p>
          </div>
        </div>

        <div className='mt-4 flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[13px] font-mono ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

export const Works = ({ onSelectProject }) => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Featured Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[30px] font-light'
        >
          Following projects showcase my engineering capabilities through real-world examples. Each project is briefly described with links to code repositories and live demonstrations. They reflect my ability to solve complex problems, build 3D interactive interfaces, structure 3NF databases, and manage multi-service deployments.
        </motion.p>
      </div>

      <div className='mt-16 flex flex-wrap gap-7 justify-center sm:justify-start'>
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            onOpenModal={() => onSelectProject && onSelectProject(project)}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
