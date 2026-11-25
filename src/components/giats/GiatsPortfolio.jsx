import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "@/styles/giats.scss";
import BackgroundShader from "./canvas/BackgroundShader";
import GiatsNavbar from "./layout/GiatsNavbar";
import GiatsMenuDrawer from "./layout/GiatsMenuDrawer";
import GiatsHero from "./sections/GiatsHero";
import GiatsAbout from "./sections/GiatsAbout";
import GiatsHonors from "./sections/GiatsHonors";
import GiatsQuote from "./sections/GiatsQuote";
import GiatsProjects from "./sections/GiatsProjects";
import GiatsPreFooter from "./sections/GiatsPreFooter";
import GiatsFooter from "./sections/GiatsFooter";

import { CertificateModal } from "@/components/modern/CertificateModal";
import { ProjectModal } from "@/components/modern/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export const GiatsPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const lenisRef = useRef(null);

  // Initialize Lenis luxury smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleScrollTo = (target) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="giats-root relative w-full min-h-screen bg-[#f0f4f1] text-[#28282b] selection:bg-[#28282b] selection:text-[#f2ffbd]">
      {/* 1. Generative Procedural Shader Background (Fixed behind entire site) */}
      <BackgroundShader />

      {/* 2. Top Navigation Bar */}
      <GiatsNavbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* 3. Fullscreen Editorial Menu Drawer */}
      <GiatsMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleScrollTo}
      />

      {/* 4. Main Scrollable Editorial Experience */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Section 1: Hero with Architectural Window Cutout & 3D Floating Meshes */}
        <GiatsHero />

        {/* Section 2: About & Philosophy with Editorial Parallax */}
        <GiatsAbout
          onOpenCert={(cert) => setSelectedCert(cert)}
        />

        {/* Section 3: Honors & Recognition (Giats Clients style) */}
        <GiatsHonors
          onOpenCert={(cert) => setSelectedCert(cert)}
        />

        {/* Section 4: Architectural Mindset Quote (ScrollTrigger word opacity) */}
        <GiatsQuote />

        {/* Section 5: Selected Projects with Stacked Card Peel Effect */}
        <GiatsProjects
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
        />

        {/* Section 6: Interactive 3D Physics PreFooter */}
        <GiatsPreFooter />

        {/* Section 7: Comprehensive Editorial Footer */}
        <GiatsFooter onScrollTo={handleScrollTo} />
      </main>

      {/* 5. Verifiable Certificate & Decision Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}

      {/* 6. Technical Project Architecture Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default GiatsPortfolio;
