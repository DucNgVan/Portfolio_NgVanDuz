import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ExpertiseSection from './components/ExpertiseSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4efea] selection:bg-[#d8c8a8] selection:text-[#0d0d0d] relative overflow-x-hidden">
      {/* Dynamic Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#d8c8a8] origin-left z-50 pointer-events-none shadow-[0_0_10px_rgba(216,200,168,0.7)]"
        style={{ scaleX }}
      />

      {/* 1. Preloader Screen (Screenshot 1 & 2) */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Custom Smooth Difference Cursor */}
      <CustomCursor />

      {/* 3. Main Sections */}
      <main>
        {/* Trang chủ: Hero with Cream Background & Kinetic SOFTWARE (Screenshot 3) */}
        <HeroSection />

        {/* Giới thiệu: About Me with Portrait Card & Metadata Grid (Screenshot 4) */}
        <AboutSection />

        {/* Dự án: Colossal WORK with Liquid Droplets & GitHub Repos (Screenshot 6) */}
        <WorkSection />

        {/* Chuyên môn: Expertise with Floating Purple Card & Tech Badges (Screenshot 5) */}
        <ExpertiseSection />

        {/* Thành tích nổi bật trong Đại học */}
        <AchievementsSection />

        {/* Liên hệ & Hiệu ứng Bắt tay Hợp tác */}
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

export default App;
