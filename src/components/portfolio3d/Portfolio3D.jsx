import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Works from "./Works";
import Feedbacks from "./Feedbacks";
import Contact from "./Contact";
import { StarsCanvas } from "@/components/canvas";
import { ProjectModal } from "@/components/modern/ProjectModal";
import { CertificateModal } from "@/components/modern/CertificateModal";
import { analyticsService } from "@/services/analyticsService";
import { ArrowUp } from "lucide-react";

export const Portfolio3D = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [daNangTime, setDaNangTime] = useState("");

  useEffect(() => {
    analyticsService.trackVisit();

    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setDaNangTime(now.toLocaleTimeString("en-US", options) + " ICT");
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative z-0 bg-primary min-h-screen text-white font-sans selection:bg-[#915EFF] selection:text-white overflow-x-hidden'>
      {/* Hero Section with 3D Desk Computer Canvas */}
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center relative'>
        <Navbar />
        <Hero />
      </div>

      {/* About Section with 3D Tilt Cards */}
      <About />

      {/* Experience Section with Milestone Timeline */}
      <Experience />

      {/* Tech Section with 3D Floating Icosahedrons */}
      <Tech />

      {/* Works Section with 3D Tilt Project Cards */}
      <Works onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* Feedbacks & Honors Section */}
      <Feedbacks onSelectCert={(cert) => setSelectedCert(cert)} />

      {/* Contact Section with 3D Earth & Starfield */}
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>

      {/* Footer */}
      <footer className='py-8 px-6 sm:px-16 border-t border-white/10 bg-[#040612] text-xs font-mono text-secondary'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <span className='font-bold text-white'>Nguyen Van Duc</span>
            <span>• Da Nang, Viet Nam ({daNangTime})</span>
          </div>

          <div className='text-center text-secondary/70'>
            Adrian Hajdin 3D Architecture • Powered by Three.js & React Three Fiber
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#915EFF] text-secondary hover:text-white transition-all cursor-pointer'
          >
            <span>Top</span>
            <ArrowUp className='w-3 h-3 text-[#915EFF]' />
          </button>
        </div>
      </footer>

      {/* Inspection Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
};

export default Portfolio3D;
