import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'
  threshold = 0.15,
  once = true,
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    zoom: { scale: 0.92, y: 20 },
    fade: { y: 0, x: 0 },
  };

  const initial = {
    opacity: 0,
    ...(directions[direction] || directions.up),
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple / GSAP fluid cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStagger = ({
  children,
  className = '',
  staggerDelay = 0.12,
  threshold = 0.15,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerItem = ({
  children,
  className = '',
  direction = 'up',
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 45, y: 0 },
    right: { x: -45, y: 0 },
    zoom: { scale: 0.9, y: 20 },
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          ...(directions[direction] || directions.up),
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
