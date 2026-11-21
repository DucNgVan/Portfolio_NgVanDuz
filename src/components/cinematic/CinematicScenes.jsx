import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  AlertCircle,
  ArrowUpRight, 
  Briefcase,
  Check, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  ChevronUp, 
  Compass,
  Copy, 
  ExternalLink, 
  Eye, 
  Maximize2, 
  RotateCcw, 
  Server, 
  ShieldCheck, 
  Sparkles, 
  Target,
  Trophy, 
  X, 
  Zap, 
  Layers, 
  Code2, 
  Database,
  Image as ImageIcon,
  Send,
  MessageSquare,
  Lock
} from 'lucide-react';
import {
  NodejsIcon,
  ExpressIcon,
  PostgresIcon,
  MongodbIcon,
  RedisIcon,
  DockerIcon,
  ReactIcon,
  NextjsIcon,
  TypescriptIcon,
  TailwindIcon,
  ThreejsIcon,
  VueIcon,
  JavaIcon,
  GitIcon,
  GithubIcon,
  PostmanIcon,
  FirebaseIcon,
} from '@/components/ui/TechIcons';
import { personalInfo, githubProjects } from '@/data/portfolioData';
import { analyticsService } from '@/services/analyticsService';

/**
 * Calculates smooth plateau opacity:
 * Holds solid opacity=1 during [peakStart, peakEnd] so users have plenty of scroll time to read and click.
 */
function getScenePlateau(progress, start, peakStart, peakEnd, end) {
  if (progress < start || progress > end) {
    return { opacity: 0, pointerEvents: 'none', isVisible: false };
  }
  let opacity = 1;
  if (progress < peakStart) {
    opacity = (progress - start) / (peakStart - start);
  } else if (progress > peakEnd) {
    opacity = (end - progress) / (end - peakEnd);
  }
  const clamped = Math.max(0, Math.min(1, opacity));
  return {
    opacity: clamped,
    pointerEvents: clamped > 0.4 ? 'auto' : 'none',
    isVisible: clamped > 0.05,
  };
}

export const CinematicScenes = ({ scrollProgress = 0, mousePos = { x: 0, y: 0 }, onReplay = () => {} }) => {
  const [copied, setCopied] = useState(false);
  const [inspectedCert, setInspectedCert] = useState(null);
  const [inspectedProject, setInspectedProject] = useState(null);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0); // 0..3
  const [techCategoryFilter, setTechCategoryFilter] = useState('all'); // 'all', 'backend', 'frontend', 'tools'
  const [selectedProjIndex, setSelectedProjIndex] = useState(0); // 0..4 (Active Cinema Spotlight)
  const [projectFilter, setProjectFilter] = useState('all');
  const projectCarouselRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isCertZoomed, setIsCertZoomed] = useState(false);
  const [certCategoryFilter, setCertCategoryFilter] = useState('all'); // 'all', 'academic', 'club_skill'

  // Quick Recruiter Message Dispatch State (delivered to Admin Portal)
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [messageSending, setMessageSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleOpenProject = (proj) => {
    setActiveImgIndex(0);
    setInspectedProject(proj);
    analyticsService.trackEvent('project_inspect', { projectId: proj.id, title: proj.title });
  };

  const handleCloseProjectModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    window.__modalClosedTimestamp = Date.now();
    setInspectedProject(null);
  };

  const handleOpenCert = (cert) => {
    setInspectedCert(cert);
    analyticsService.trackEvent('cert_inspect', { certId: cert.id, title: cert.title });
  };

  const handleCloseCertModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    window.__modalClosedTimestamp = Date.now();
    setInspectedCert(null);
    setIsCertZoomed(false);
  };

  // Listen for 3D Pedestal Clicks from CinematicCanvas
  useEffect(() => {
    const handleCustomCertOpen = (e) => {
      if (e.detail) {
        handleOpenCert(e.detail);
      }
    };
    window.addEventListener('open-certificate', handleCustomCertOpen);
    return () => window.removeEventListener('open-certificate', handleCustomCertOpen);
  }, []);

  const handleSendQuickMessage = (e) => {
    e.preventDefault();
    if (!quickMessage.trim()) {
      setMessageError('Please enter a brief note or inquiry.');
      return;
    }
    setMessageSending(true);
    setMessageError('');

    setTimeout(() => {
      analyticsService.addMessage({
        senderName: senderName.trim() || 'Recruiter / Visitor',
        senderContact: senderContact.trim() || 'Portfolio Direct Message',
        message: quickMessage.trim(),
      });
      setMessageSending(false);
      setMessageSent(true);
      setQuickMessage('');
      setSenderName('');
      setSenderContact('');
      setTimeout(() => setMessageSent(false), 5000);
    }, 350);
  };

  const projectGallery = inspectedProject?.images && inspectedProject.images.length > 0
    ? inspectedProject.images
    : inspectedProject?.image 
      ? [{ url: inspectedProject.image, title: inspectedProject.title, caption: inspectedProject.tagline || inspectedProject.description }]
      : [];

  // Lock background body scrolling when modal is active
  useEffect(() => {
    if (inspectedProject || inspectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [inspectedProject, inspectedCert]);

  const countComp = githubProjects.filter((p) => p.projectType === 'competition').length;
  const countFinal = githubProjects.filter((p) => p.projectType === 'final_year').length;
  const countUniv = githubProjects.filter((p) => p.projectType === 'university' || p.id === 4).length;

  const filterCategories = [
    { id: 'all', label: `All Projects (${githubProjects.length})` },
    { id: 'competition', label: `Competition (${countComp})` },
    { id: 'final_year', label: `Final Year (${countFinal})` },
    { id: 'university', label: `University (${countUniv})` },
  ];

  const filteredProjects = githubProjects.filter((proj) => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'university') {
      return proj.projectType === 'university' || proj.id === 4;
    }
    if (projectFilter === 'final_year') {
      return proj.projectType === 'final_year';
    }
    return proj.projectType === projectFilter;
  });

  const handleSelectFilter = (filterId) => {
    setProjectFilter(filterId);
    setActiveProjectIndex(0);
    if (projectCarouselRef.current) {
      projectCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const getCardStep = () => {
    if (!projectCarouselRef.current) return 360;
    const firstCard = projectCarouselRef.current.firstElementChild;
    if (!firstCard) return 360;
    const gap = window.innerWidth >= 640 ? 20 : 16;
    return firstCard.offsetWidth + gap;
  };

  const handleCarouselScroll = () => {
    if (!projectCarouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = projectCarouselRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    const step = getCardStep();
    const activeIdx = Math.round(scrollLeft / (step || 1));
    setActiveProjectIndex(Math.min(activeIdx, Math.max(0, filteredProjects.length - 1)));
  };

  const scrollProjects = (direction) => {
    if (!projectCarouselRef.current) return;
    const step = getCardStep();
    projectCarouselRef.current.scrollBy({
      left: direction * step,
      behavior: 'smooth',
    });
  };

  const scrollToProject = (index) => {
    if (!projectCarouselRef.current) return;
    const step = getCardStep();
    projectCarouselRef.current.scrollTo({
      left: index * step,
      behavior: 'smooth',
    });
  };

  // Auto-glide effect: smoothly advances projects every 3.8s, pauses on hover/interaction
  useEffect(() => {
    if (!isAutoPlay || isCarouselHovered || filteredProjects.length <= 1) return;

    const interval = setInterval(() => {
      if (!projectCarouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = projectCarouselRef.current;
      const step = getCardStep();
      const maxScroll = scrollWidth - clientWidth - 15;

      if (scrollLeft >= maxScroll) {
        projectCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        projectCarouselRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isAutoPlay, isCarouselHovered, filteredProjects.length]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      analyticsService.trackEvent('email_copy');
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  // Generous plateau visibility windows across the extended 1050vh scroll
  const s1 = getScenePlateau(scrollProgress, 0.00, 0.00, 0.16, 0.23);
  const s2 = getScenePlateau(scrollProgress, 0.19, 0.26, 0.38, 0.45);
  const s3 = getScenePlateau(scrollProgress, 0.41, 0.48, 0.61, 0.68);
  const s4 = getScenePlateau(scrollProgress, 0.62, 0.68, 0.86, 0.92);
  const s5 = getScenePlateau(scrollProgress, 0.88, 0.93, 1.00, 1.00);

  // Mouse Parallax & Dynamic Color Shift for large typography (small text remains static)
  const mx = mousePos?.x || 0;
  const my = mousePos?.y || 0;
  const largeTitleParallax = {
    transform: `translate3d(${mx * 12}px, ${-my * 8}px, 0)`,
    transition: 'transform 0.15s ease-out',
  };
  const gradientAngle = 90 + mx * 45;

  const certificates = [
    // ----------------------------------------------------
    // GROUP 1: ACADEMIC EXCELLENCE & TECH INNOVATION
    // ----------------------------------------------------
    {
      id: 'top3_2024',
      category: 'academic',
      categoryLabel: 'Academic & Honors',
      badge: 'TOP 3 IN COHORT',
      title: 'Top 3 Outstanding Students — Summer 2024',
      titleEn: 'Top 3 Outstanding Students — Summer 2024',
      issuer: 'University of Greenwich (Vietnam)',
      recipient: 'Nguyen Van Duc (GCD230006)',
      image: '/certificates/cert_top3_2024.jpg',
      year: '2024',
      verificationRef: 'GKDN240149 • Decision: 157/QĐ-FPTUDN',
      description: 'Honored for exceptional academic excellence, ranking in the Top 3 highest GPA students across the entire Greenwich International Bachelor cohort (Da Nang Campus).'
    },
    {
      id: 'best_student_icm_2026',
      category: 'academic',
      categoryLabel: 'Academic & Honors',
      badge: 'TOP OF CLASS',
      title: 'Top Student: Information & Content Management',
      titleEn: 'Top Student: Information & Content Management',
      issuer: 'Greenwich International Bachelor Program',
      recipient: 'Nguyen Van Duc (GCD230006)',
      image: '/certificates/cert_best_student_icm_2026.jpg',
      year: '2026',
      verificationRef: 'Decision: 181 QH-PPTUDN • GKD2300025',
      description: 'Achieved the highest overall academic score in Information and Content Management (COMP1643) during the Summer Trimester 2026, certified by Campus Director Dr. Nguyen Duy Nghiem.'
    },
    {
      id: 'bootcamp_innovation_2025',
      category: 'academic',
      categoryLabel: 'Academic & Innovation',
      badge: '2ND PRIZE WINNER',
      title: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
      titleEn: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
      issuer: 'Greenwich Vietnam & Hospital 199 Innovation Hub',
      recipient: 'Nguyen Van Duc (GCD230006)',
      image: '/certificates/cert_bootcamp_innovation_2025.jpg',
      year: '2025',
      verificationRef: 'Da Nang Campus Director: Dr. Nguyen Duy Nghiem',
      description: 'Awarded 2nd Prize at the Impact Innovation Bootcamp 2025 for engineering practical digital transformation and smart public healthcare solutions.'
    },

    // ----------------------------------------------------
    // GROUP 2: LEADERSHIP, MENTORSHIP & CLUBS
    // ----------------------------------------------------
    {
      id: 'peer_mentoring_2024',
      category: 'club_skill',
      categoryLabel: 'Leadership & Mentoring',
      badge: 'OUTSTANDING MENTOR',
      title: 'Outstanding Mentor — Greenwich Peer Mentoring Club',
      titleEn: 'Certificate of Recognition — Peer Mentoring Club (GPM)',
      issuer: 'Greenwich Peer Mentoring Club & Student Affairs Dept',
      recipient: 'Nguyen Van Duc',
      image: '/certificates/cert_peer_mentoring_2024.jpg',
      year: '2024',
      verificationRef: 'Head of Business: MSc. Nguyen Minh Hai & GPM President: Dinh Van Thanh Khoi',
      description: 'Recognized for outstanding mentorship and dedication, coaching and guiding incoming students in academic coursework and technical skills throughout the 7-week Fall 2024 semester.'
    },
    {
      id: 'gnews_club_2024',
      category: 'club_skill',
      categoryLabel: 'Clubs & Soft Skills',
      badge: 'MEDIA & PRESS',
      title: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
      titleEn: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
      issuer: 'Student Affairs Department & GNews Editorial Board',
      recipient: 'Nguyen Van Duc',
      image: '/certificates/cert_gnews_club_2024.jpg',
      year: '2024',
      verificationRef: 'Head of Student Affairs: Mai Doan Ngoc Tuyet Oanh & GNews Board',
      description: 'Certified for active contributions to the university technical journalism board, leading content publishing, media production, and student tech event coverage.'
    },
    {
      id: 'gmc_music_club',
      category: 'club_skill',
      categoryLabel: 'Clubs & Soft Skills',
      badge: 'MUSIC & ARTS',
      title: "Outstanding Performance — 'Under the Baubles' Gala",
      titleEn: "Outstanding Participation — 'Under the Baubles' Musical Night",
      issuer: 'Greenwich Music Club (GMC) & Student Affairs Dept',
      recipient: 'Nguyen Van Duc',
      image: '/certificates/cert_gmc_music_club.jpg',
      year: '2024',
      verificationRef: 'Club President: Le Tat Chuong & Student Affairs: Mai Doan Ngoc Tuyet Oanh',
      description: "Honored for distinguished contributions to event management, team coordination, and live musical performance at the annual 'Under the Baubles' gala."
    },
  ];

  const filteredCertificates = certCategoryFilter === 'all' 
    ? certificates 
    : certificates.filter((c) => c.category === certCategoryFilter);

  const workflowSteps = [
    {
      id: 0,
      step: '01',
      title: 'Architecture & Schema Blueprint',
      short: 'Data Blueprint',
      subtitle: 'Data Modeling & Contract Definition',
      provenIn: 'Nomadix (28 Tables), Helpdesk, VAVA CMS',
      summary: 'Designing normalized database schemas and API contracts before writing code.',
      detail: 'Engineered a normalized 28-table 3NF relational schema for Nomadix eliminating data redundancy with Knex migration rollbacks. Modeled document collections with Mongoose for Helpdesk Library and structured SharePoint relational lists for VAVA CMS. Established strict RESTful/OpenAPI contracts.',
      deliverables: ['28-Table 3NF PostgreSQL', 'Knex Migrations & Rollbacks', 'Mongoose Schemas', 'OpenAPI / Postman Contracts'],
      techKeys: ['PostgreSQL', 'MongoDB', 'Postman', 'Node.js']
    },
    {
      id: 1,
      step: '02',
      title: 'Modular Core & Modern UI / 3D',
      short: 'Core & 3D Web',
      subtitle: 'Decoupled Services & Reactive 3D Web',
      provenIn: 'NÉT Studio (3D WebGL), Helpdesk (Vue 3), M-Hike',
      summary: 'Building decoupled service layers with Express/Node.js paired with reactive UIs and WebGL.',
      detail: 'Constructed modular REST services separating controllers and business logic. Built an interactive 360° product visualizer with real-time material rendering in Three.js embedded in Next.js 14 for Nét Studio (net-s.id.vn), reactive SPAs in Vue 3 for Helpdesk, and native Android Java for M-Hike.',
      deliverables: ['Real-Time 3D Product Visualizer', 'Next.js 14 App Router', 'Vue 3 Reactive SPAs', 'Android Java SDK & Mapbox'],
      techKeys: ['Next.js 14', 'React', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Vue.js 3', 'Node.js', 'Express.js', 'Java / Android']
    },
    {
      id: 2,
      step: '03',
      title: 'Performance Tuning & Security Hardening',
      short: 'Optimization & Auth',
      subtitle: 'Sub-ms Caching & Defensive Auth',
      provenIn: 'Nomadix (Redis Cache), VAVA CMS (RBAC)',
      summary: 'Implementing sub-millisecond query caching and securing authentication boundaries.',
      detail: 'Engineered Redis Cache-Aside layer with 15-min TTL, reducing database read load by 68%. Tuned composite B-Tree indexes for sub-12ms query execution. Hardened system security with JWT refresh token rotation, token revocation store, and strict role-based access control (RBAC).',
      deliverables: ['Redis In-Memory Cache (Sub-ms)', 'Composite B-Tree Indexes', 'JWT Refresh Token Rotation', 'Role-Based Access Control (RBAC)'],
      techKeys: ['Redis', 'PostgreSQL', 'Node.js', 'Express.js']
    },
    {
      id: 3,
      step: '04',
      title: 'Containerization, Testing & Live Delivery',
      short: 'Docker & Delivery',
      subtitle: 'Isolated Environments & Live Production',
      provenIn: 'net-s.id.vn (Live Domain), Nomadix Docker Cluster',
      summary: 'Packaging multi-service containers, automated testing, and custom domain shipping.',
      detail: 'Orchestrated multi-container local environments with Docker Compose (Node API + PostgreSQL + Redis) using isolated bridge networks. Integrated automated HTTP test collections (Postman / api_test.http), and shipped production releases to live custom domain net-s.id.vn.',
      deliverables: ['Multi-Service Docker Compose', 'Automated HTTP Test Suites', 'Production Domain net-s.id.vn', 'Git Flow & Branch Strategy'],
      techKeys: ['Docker', 'Git & GitHub', 'Postman', 'Firebase']
    }
  ];

  const techStackItems = [
    // Backend & Databases
    { name: 'Node.js', icon: NodejsIcon, category: 'backend', tag: 'Server Runtime', color: '#539E43' },
    { name: 'Express.js', icon: ExpressIcon, category: 'backend', tag: 'REST APIs', color: '#111113' },
    { name: 'PostgreSQL', icon: PostgresIcon, category: 'backend', tag: '3NF Relational', color: '#418AC9' },
    { name: 'MongoDB', icon: MongodbIcon, category: 'backend', tag: 'Document DB', color: '#47A248' },
    { name: 'Redis', icon: RedisIcon, category: 'backend', tag: 'Sub-ms Cache', color: '#DC382D' },
    { name: 'Docker', icon: DockerIcon, category: 'backend', tag: 'Containers', color: '#2496ED' },

    // Frontend & 3D
    { name: 'Next.js 14', icon: NextjsIcon, category: 'frontend', tag: 'App Router / SSR', color: '#000000' },
    { name: 'React', icon: ReactIcon, category: 'frontend', tag: 'UI Library', color: '#61DAFB' },
    { name: 'TypeScript', icon: TypescriptIcon, category: 'frontend', tag: 'Type Safety', color: '#3178C6' },
    { name: 'Three.js', icon: ThreejsIcon, category: 'frontend', tag: '3D WebGL', color: '#000000' },
    { name: 'Tailwind CSS', icon: TailwindIcon, category: 'frontend', tag: 'Design System', color: '#38BDF8' },
    { name: 'Vue.js 3', icon: VueIcon, category: 'frontend', tag: 'Reactive SPAs', color: '#4FC08D' },

    // Tools & Cloud
    { name: 'Git & GitHub', icon: GitIcon, category: 'tools', tag: 'Git Flow', color: '#F05032' },
    { name: 'Postman', icon: PostmanIcon, category: 'tools', tag: 'API Testing', color: '#FF6C37' },
    { name: 'Firebase', icon: FirebaseIcon, category: 'tools', tag: 'Cloud / Auth', color: '#FFA000' },
    { name: 'Java / Android', icon: JavaIcon, category: 'tools', tag: 'Native Mobile', color: '#007396' },
  ];

  const filteredTechStack = techCategoryFilter === 'all'
    ? techStackItems
    : techStackItems.filter(item => item.category === techCategoryFilter);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      
      {/* =========================================================================
          SCENE 01: PROLOGUE
          Layout: Left = Identity & Bio | Center = 3D Character | Right = Detailed Target Roles
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-14 pt-20 sm:pt-24 pb-12 transition-opacity duration-300"
        style={{ opacity: s1.opacity, pointerEvents: s1.pointerEvents }}
      >
        {/* Left Column: Core Identity & Bio */}
        <div className="w-full md:w-[32%] lg:w-[29%] max-w-[340px] xl:max-w-[390px] flex flex-col items-start text-left pointer-events-auto">
          
          {/* Artistic Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c7355]" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8c7355] font-bold">
              PORTFOLIO // 2025
            </span>
          </div>

          {/* Dynamic Interactive Large Headline */}
          <h1 
            style={largeTitleParallax}
            className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[72px] font-black font-sans uppercase tracking-tight leading-[0.88] text-[#111113] mb-3 select-none cursor-default"
          >
            Nguyen <br />
            <span 
              style={{
                backgroundImage: `linear-gradient(${gradientAngle}deg, #111113 0%, #8c7355 50%, #c5a880 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Van Duc
            </span>
          </h1>

          {/* Role badge */}
          <div className="flex items-center gap-2 mb-3.5">
            <span className="px-3 py-1 rounded-full bg-[#111113] text-white font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-sm">
              Full-Stack Software Engineer
            </span>
            <span className="text-[11px] font-mono text-[#8c7355] font-semibold">
              // Backend & 3D
            </span>
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-[13px] text-[#4a4845] font-sans font-normal leading-relaxed mb-3.5">
            Final-year Software Engineering student at <strong className="text-[#111113] font-semibold">University of Greenwich</strong>. Specializing in modular backend architectures (PostgreSQL 3NF, Redis, Docker) and interactive 3D web platforms (Next.js 14, Three.js).
          </p>

          {/* Editorial Credentials Strip (Fills vertical void artistically) */}
          <div className="grid grid-cols-3 gap-2 py-2.5 my-1 border-y border-black/[0.08] w-full text-left">
            <div>
              <span className="block text-[9px] font-mono text-[#8c7355] uppercase tracking-wider font-semibold">Degree</span>
              <span className="text-xs font-bold text-[#111113] font-sans">BSc (Hons)</span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-[#8c7355] uppercase tracking-wider font-semibold">Standing</span>
              <span className="text-xs font-bold text-[#111113] font-sans">Top 3 '24</span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-[#8c7355] uppercase tracking-wider font-semibold">Focus</span>
              <span className="text-xs font-bold text-[#111113] font-sans">Full-Stack</span>
            </div>
          </div>

          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-black/[0.08] text-[11px] font-mono text-[#555] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Da Nang, Vietnam
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] font-mono text-emerald-800 font-bold shadow-[0_2px_8px_rgba(16,185,129,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Internship
            </span>
          </div>

          {/* Mobile-only Desired Roles Tag */}
          <div className="md:hidden mt-2 px-3 py-1.5 rounded-xl bg-white/80 border border-black/[0.07] text-[10px] font-mono text-[#666]">
            <span className="text-[#8c7355] font-bold">🎯 Target:</span> Backend Intern • Full-Stack Intern • SE Intern
          </div>

        </div>

        {/* Center Void: Wide open corridor where the centered 3D character sits with ample clearance */}
        <div className="hidden md:block flex-1 min-w-[200px] lg:min-w-[280px] pointer-events-none" />

        {/* Right Column: Detailed Target Roles & Career Objectives */}
        <div className="hidden md:flex flex-col items-start text-left w-[32%] lg:w-[28%] max-w-[300px] xl:max-w-[320px] pointer-events-auto">
          
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#8c7355]" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8c7355] font-bold">
              CAREER DIRECTION // 2024–2025
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black font-sans uppercase tracking-tight text-[#111113] mb-3">
            Target Roles
          </h3>

          {/* Minimalist Typographic List with Subtle Dividers */}
          <div className="w-full space-y-3">
            
            {/* Role 1 */}
            <div className="border-b border-black/[0.08] pb-2.5">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-xs sm:text-sm font-bold text-[#111113] font-sans">
                  01 // Backend Engineering Intern
                </span>
                <span className="text-[9px] font-mono font-bold text-[#8c7355] uppercase">
                  PRIMARY
                </span>
              </div>
              <p className="text-[11px] text-[#555] font-sans leading-relaxed mb-1.5">
                Microservices, 3NF PostgreSQL schema design, Redis cache & high-concurrency APIs.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-[#666]">
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Node.js</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Express</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">PostgreSQL</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Redis</span>
              </div>
            </div>

            {/* Role 2 */}
            <div className="border-b border-black/[0.08] pb-2.5">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-xs sm:text-sm font-bold text-[#111113] font-sans">
                  02 // Full-Stack Developer Intern
                </span>
                <span className="text-[9px] font-mono font-bold text-[#666] uppercase">
                  GROWTH
                </span>
              </div>
              <p className="text-[11px] text-[#555] font-sans leading-relaxed mb-1.5">
                Modern React 19, Next.js 14 App Router, Three.js 3D web & Tailwind CSS.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-[#666]">
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">React</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Next.js</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">TypeScript</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Tailwind</span>
              </div>
            </div>

            {/* Role 3 */}
            <div className="pb-0.5">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-xs sm:text-sm font-bold text-[#111113] font-sans">
                  03 // Software Engineer Intern
                </span>
                <span className="text-[9px] font-mono font-bold text-[#666] uppercase">
                  FOUNDATION
                </span>
              </div>
              <p className="text-[11px] text-[#555] font-sans leading-relaxed mb-1.5">
                Clean Architecture, automated test suites, Docker Compose & Git Flow.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-[#666]">
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Clean Arch</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Docker</span>
                <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#333]">Git Flow</span>
              </div>
            </div>

          </div>

          {/* Preferences minimal footer */}
          <div className="mt-2.5 pt-2 border-t border-black/[0.08] w-full flex items-center justify-between text-[10px] font-mono text-[#666]">
            <span>Mode: <strong className="text-[#111113]">Hybrid / On-site / Remote</strong></span>
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Immediate
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCENE 02: WORKSTATION CORE (ENGINEERING WORKFLOW & TECH STACK)
          Layout: Model on LEFT (cleanly separated), UI on RIGHT
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-center justify-end px-6 sm:px-10 lg:px-14 xl:px-20 pt-20 sm:pt-24 pb-10 transition-opacity duration-300"
        style={{ opacity: s2.opacity, pointerEvents: s2.pointerEvents }}
      >
        <div className="w-full max-w-lg lg:max-w-xl flex flex-col items-start text-left ml-auto">
          
          {/* Header */}
          <div className="mb-3.5 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8c7355]" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8c7355] font-bold">
                CORE CAPABILITIES // 02
              </span>
            </div>
            <h2 
              style={largeTitleParallax}
              className="text-2xl sm:text-4xl lg:text-[40px] font-black font-sans uppercase tracking-tight text-[#111113] leading-none mb-1.5 select-none cursor-default"
            >
              Engineering Workflow & <br />
              <span 
                style={{
                  backgroundImage: `linear-gradient(${gradientAngle}deg, #111113 0%, #8c7355 50%, #c5a880 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Tech Stack.
              </span>
            </h2>

            <p className="text-xs text-[#66625d] font-sans leading-relaxed">
              Proven 4-stage engineering lifecycle synthesized from 5 production & capstone systems, powered by modern tooling:
            </p>
          </div>

          {/* Section 1: 4-Step Engineering Workflow */}
          <div className="w-full mb-4">
            {/* Minimalist Borderless Tabs */}
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-2 mb-3 w-full">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowStep === idx;
                return (
                  <button
                    key={step.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveWorkflowStep(idx);
                    }}
                    className={`relative pb-1 text-xs font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive ? 'font-bold text-[#111113]' : 'font-medium text-[#777] hover:text-[#111113]'
                    }`}
                  >
                    <span className={`text-[10px] font-mono ${isActive ? 'text-[#8c7355] font-bold' : 'text-[#999]'}`}>
                      {step.step}
                    </span>
                    <span>{step.short}</span>
                    {isActive && (
                      <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-[#8c7355] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Phase Content (Soft background without nested boxes) */}
            <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-white/70 border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-black/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#8c7355] uppercase tracking-wider">
                    Phase {workflowSteps[activeWorkflowStep].step} ·
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold font-sans text-[#111113]">
                    {workflowSteps[activeWorkflowStep].title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#777]">
                  Proven in: <strong className="text-[#111113] font-medium">{workflowSteps[activeWorkflowStep].provenIn}</strong>
                </span>
              </div>

              <p className="text-xs text-[#444] font-sans leading-relaxed mb-2.5">
                {workflowSteps[activeWorkflowStep].detail}
              </p>

              {/* Clean Inline Deliverables (Zero nested box frames!) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-sans text-[#444] pt-1 border-t border-black/[0.04]">
                <span className="font-mono text-[#8c7355] font-semibold text-[10px] uppercase tracking-wider">Deliverables:</span>
                {workflowSteps[activeWorkflowStep].deliverables.map((item, dIdx) => (
                  <span key={dIdx} className="inline-flex items-center gap-1 text-[#333]">
                    <span className="text-[#8c7355] font-bold">✓</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Tech Stack (Clean, Airy Icon Grid) */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111113]">
                  // Tech Stack Toolkit
                </span>
              </div>

              {/* Clean text filter tabs (No box frames) */}
              <div className="flex items-center gap-2 text-[11px] font-mono">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'backend', label: 'Backend' },
                  { id: 'frontend', label: 'Frontend' },
                  { id: 'tools', label: 'Tools' },
                ].map((cat, cIdx, arr) => (
                  <React.Fragment key={cat.id}>
                    <button
                      onClick={() => setTechCategoryFilter(cat.id)}
                      className={`transition-colors cursor-pointer ${
                        techCategoryFilter === cat.id
                          ? 'text-[#111113] font-bold underline underline-offset-4 decoration-[#8c7355]'
                          : 'text-[#888] hover:text-[#111113]'
                      }`}
                    >
                      {cat.label}
                    </button>
                    {cIdx < arr.length - 1 && <span className="text-black/[0.15]">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Grid of 16 Tech Icons (Airy, borderless chips with soft active tint) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {filteredTechStack.map((tech) => {
                const Icon = tech.icon;
                const isRelatedToActiveStep = workflowSteps[activeWorkflowStep].techKeys.includes(tech.name);
                return (
                  <div
                    key={tech.name}
                    className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-default ${
                      isRelatedToActiveStep
                        ? 'bg-[#8c7355]/10 text-[#111113] ring-1 ring-[#bfa074]/35 shadow-sm'
                        : 'hover:bg-black/[0.035] text-[#555]'
                    }`}
                    title={`${tech.name} · ${tech.tag}`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[11px] font-sans truncate leading-tight group-hover:text-[#8c7355] transition-colors ${
                        isRelatedToActiveStep ? 'font-bold text-[#111113]' : 'font-medium text-[#222]'
                      }`}>
                        {tech.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#777] truncate leading-tight">
                        {tech.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCENE 03: SYSTEM VAULT (PROJECTS)
          Layout: 5-Project Architectural Showcase (All 5 Projects Visible & Interactive)
      ========================================================================= */}
      {/* =========================================================================
          SCENE 03: SYSTEM VAULT (PROJECTS)
          Layout: Clean, compact 2x2 cards grid with category filters and pagination
          - Minimal, tidy typography without heavy walls of text
          - 100% clean image preview without overlapping badges
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-start px-6 sm:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 lg:pt-26 pb-8 transition-opacity duration-300 pointer-events-auto overflow-hidden"
        style={{ opacity: s3.opacity, pointerEvents: s3.pointerEvents }}
      >
        <div className="w-full max-w-xl lg:max-w-[46rem] xl:max-w-[50rem] flex flex-col items-start text-left">
          
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c7355]" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8c7355] font-bold">
              FEATURED ARCHIVE // 03
            </span>
          </div>

          {/* Dynamic Interactive Large Headline */}
          <h2 
            style={largeTitleParallax}
            className="text-xl sm:text-2xl lg:text-3xl font-black font-sans uppercase tracking-tight text-[#111113] leading-[1.0] mb-1 select-none cursor-default"
          >
            System Vault <br />
            <span 
              style={{
                backgroundImage: `linear-gradient(${gradientAngle}deg, #111113 0%, #8c7355 50%, #c5a880 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Releases.
            </span>
          </h2>

          <p className="text-[10px] sm:text-[11px] text-[#66625d] font-sans mb-2">
            Click any project to inspect full architecture, interactive 3D demos, and source code:
          </p>

          {/* Category Filter Chips & Carousel Controls */}
          <div className="w-full flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    projectFilter === cat.id
                      ? 'bg-[#111113] text-white shadow-sm'
                      : 'bg-black/5 hover:bg-black/10 text-[#666]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Auto-glide toggle & Arrow Controls (< >) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                  isAutoPlay
                    ? 'bg-amber-500/10 text-amber-800 border-amber-500/25 shadow-sm'
                    : 'bg-black/5 text-[#777] border-black/10'
                }`}
                title={isAutoPlay ? 'Auto-glide active (pauses on hover)' : 'Auto-glide paused (click to resume)'}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? 'bg-amber-600 animate-pulse' : 'bg-neutral-400'}`} />
                <span>{isAutoPlay ? 'Auto-Glide' : 'Manual'}</span>
              </button>

              <div className="flex items-center gap-1 bg-black/5 p-0.5 rounded-xl border border-black/[0.06]">
                <button
                  onClick={() => scrollProjects(-1)}
                  disabled={!canScrollLeft}
                  className="p-1 rounded-lg hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[#111113]"
                  title="Previous project"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9.5px] font-mono font-bold text-[#8c7355] px-1.5 tracking-wider">
                  {activeProjectIndex + 1}/{filteredProjects.length}
                </span>
                <button
                  onClick={() => scrollProjects(1)}
                  disabled={!canScrollRight}
                  className="p-1 rounded-lg hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[#111113]"
                  title="Next project"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Gliding Carousel Track - EXACTLY 2 CARDS PER FRAME ON DESKTOP */}
          <div 
            ref={projectCarouselRef}
            onScroll={handleCarouselScroll}
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            onTouchStart={() => setIsCarouselHovered(true)}
            onTouchEnd={() => setIsCarouselHovered(false)}
            className="w-full flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-0.5 select-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredProjects.map((proj, idx) => {
              // Clean short title
              let shortTitle = proj.title.split('—')[0].trim();
              if (proj.id === 3) shortTitle = 'IT Helpdesk';
              if (proj.id === 2) shortTitle = 'Nomadix';
              if (proj.id === 1) shortTitle = 'Nét Studio';
              if (proj.id === 5) shortTitle = 'VAVA CMS';
              if (proj.id === 4) shortTitle = 'M-Hike Mobile';

              // 2 core tech badges
              const coreTech = proj.tech ? proj.tech.slice(0, 2) : [];

              return (
                <div 
                  key={proj.id}
                  onClick={() => handleOpenProject(proj)}
                  className="w-full sm:w-[calc(50%-10px)] shrink-0 snap-start flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/95 hover:bg-white border border-black/[0.08] hover:border-[#bfa074] p-3.5 sm:p-4 lg:p-4.5 transition-all duration-300 backdrop-blur-xl group hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] cursor-pointer hover:-translate-y-1 select-none"
                >
                  <div>
                    {/* 1. Top Badges: Project Type + Numeric Index */}
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      {proj.id === 4 ? (
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold tracking-wide uppercase border bg-indigo-500/15 text-indigo-800 border-indigo-500/30">
                            🎓 Final Year
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold tracking-wide uppercase border bg-emerald-500/15 text-emerald-800 border-emerald-500/30">
                            🏛️ University
                          </span>
                        </div>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide uppercase border ${
                          proj.projectType === 'competition'
                            ? 'bg-amber-500/15 text-amber-800 border-amber-500/30'
                            : proj.projectType === 'final_year'
                              ? 'bg-indigo-500/15 text-indigo-800 border-indigo-500/30'
                              : 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30'
                        }`}>
                          {proj.projectType === 'competition' && '🏆 Competition Project'}
                          {proj.projectType === 'final_year' && '🎓 Final Year Project'}
                          {proj.projectType === 'university' && '🏛️ University Project'}
                        </span>
                      )}
                      <span className="text-[9.5px] font-mono font-bold text-[#8c7355]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* 2. Large Crisp Mockup Image Preview (Uncropped, high-contrast) */}
                    <div className="relative aspect-[16/9.5] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3 border border-black/[0.08] bg-[#f5f3ee] flex items-center justify-center">
                      {proj.image ? (
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          style={{
                            imageRendering: '-webkit-optimize-contrast',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                          }}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#888] p-2 text-center">
                          <ImageIcon className="w-5 h-5 mb-0.5 text-[#bfa074]" />
                          <span className="text-[9px] font-mono font-bold tracking-wider">PREVIEW</span>
                        </div>
                      )}
                    </div>

                    {/* 3. Bold Project Title */}
                    <h3 className="text-sm sm:text-base font-black font-sans uppercase tracking-tight text-[#111113] group-hover:text-[#8c7355] transition-colors truncate mb-1">
                      {shortTitle}
                    </h3>

                    {/* 4. Two-line crisp tagline */}
                    <p className="text-[11px] sm:text-[11.5px] text-[#555] font-sans line-clamp-2 leading-relaxed mb-3 min-h-[32px]">
                      {proj.tagline || proj.description}
                    </p>

                    {/* 5. Core Tech Badges */}
                    <div className="flex items-center gap-1.5 overflow-hidden mb-3.5">
                      {coreTech.map((t) => (
                        <span 
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-black/[0.04] text-[9px] font-mono text-[#555] font-semibold truncate border border-black/[0.04]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 6. Bottom Action Bar: GitHub Logo + Go Live + Details */}
                  <div className="pt-2.5 border-t border-black/[0.06] flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* GitHub Logo button (if has githubUrl) */}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-black/[0.05] hover:bg-[#111113] text-[#24292f] hover:text-white transition-all shadow-sm hover:scale-110 flex items-center justify-center cursor-pointer"
                          title="View source code on GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5 fill-current" />
                        </a>
                      )}

                      {/* Go Live button (if has liveDemo) */}
                      {proj.liveDemo && (
                        <a
                          href={proj.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-mono font-bold transition-all shadow-sm hover:scale-105 cursor-pointer"
                          title="Open live production platform"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                          <span>Go Live</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {/* Details button */}
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#111113] group-hover:bg-[#8c7355] text-white text-[9px] font-mono font-bold transition-all shadow-sm shrink-0">
                      <span>Details</span>
                      <ArrowUpRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Glide navigation dot indicators (no Vietnamese text) */}
          <div className="w-full flex items-center justify-between pt-2.5 px-1 text-[10px] font-mono text-[#777]">
            <div className="flex items-center gap-1.5">
              {filteredProjects.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToProject(dotIdx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeProjectIndex === dotIdx ? 'w-6 bg-[#8c7355]' : 'w-2 bg-black/15 hover:bg-black/30'
                  }`}
                  title={`Project 0${dotIdx + 1}`}
                />
              ))}
            </div>
            <span className="text-[9.5px] font-mono text-[#888] select-none">
              {activeProjectIndex + 1} of {filteredProjects.length} Projects
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCENE 04: HALL OF HONORS (3D EXHIBITION GALLERY - SPOTLIGHT AMPHITHEATER)
          Layout: 
          - Luminous, razor-sharp header matching all other scenes with glowing text borders
          - Model in FOREGROUND CENTER admiring certificates
          - 6 Exhibition Pedestals in deep background crescent amphitheater
          - Overhead theatrical spotlights shining down over each plinth
          - 100% clean, unobstructed 3D view (direct click on 3D pedestals)
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex flex-col items-center justify-start pt-20 sm:pt-24 px-4 sm:px-8 pointer-events-none transition-opacity duration-300"
        style={{ opacity: s4.opacity }}
      >
        {/* Top Centered Header - Gloriously Illuminated with Specular Border & Neon Gold Glow */}
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center select-none pointer-events-none animate-fadeIn">
          
          {/* Eyebrow Tag with Pulsing Gold Orb */}
          <div className="flex items-center justify-center gap-2 mb-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd066] shadow-[0_0_10px_#ffd066] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#f7db99] font-bold drop-shadow-[0_0_6px_rgba(255,208,102,0.5)]">
              ACADEMIC &amp; LEADERSHIP ARCHIVE // 04
            </span>
          </div>

          {/* Main Title: VERIFIED MILESTONES with Radiant White Specular Border & Gold Neon Glow */}
          <h2 
            style={{
              ...largeTitleParallax,
              textShadow: '0 0 16px rgba(255, 230, 160, 0.85), 0 0 35px rgba(255, 208, 102, 0.6), 0 0 60px rgba(216, 180, 90, 0.35)',
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black font-sans uppercase tracking-[0.08em] leading-none mb-2.5 select-none cursor-default text-center"
          >
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#fff4d0] to-[#f0c766]"
              style={{
                WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.95)',
                filter: 'drop-shadow(0 2px 14px rgba(255, 230, 160, 0.6))',
              }}
            >
              Verified Milestones
            </span>
          </h2>

          {/* Elegant Architectural Gold Divider with Center Diamond Emblem */}
          <div className="flex items-center justify-center gap-3 w-full max-w-md mx-auto mb-2 opacity-90 select-none">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ffd066]/80 to-[#ffd066]" />
            <span className="text-[#ffe494] text-[11px] drop-shadow-[0_0_8px_#ffd066]">✦</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ffd066]/80 to-[#ffd066]" />
          </div>

          {/* Subtitle / Curatorial Citation */}
          <p className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] text-[#f7e6c4] uppercase text-center max-w-lg mx-auto drop-shadow-[0_0_10px_rgba(255,230,160,0.5)] mb-1.5 select-none">
            Honors, Scholarships &amp; Student Leadership • 2024 — 2026
          </p>

          {/* Interactive Hint */}
          <p className="text-[10px] sm:text-[11px] text-neutral-400/90 font-sans text-center flex items-center justify-center gap-1.5 select-none mt-0.5">
            <span className="w-1 h-1 rounded-full bg-[#ffd066]/80" />
            <span>Click directly on any 3D pedestal to inspect official credentials &amp; verification details</span>
          </p>

        </div>
      </section>

      {/* =========================================================================
          SCENE 05: FINAL TRANSMISSION (CONTACT & QUICK ADMIN DISPATCH)
          Layout: Model glides to RIGHT (Normal Zoom), UI on the LEFT (Interleaved!)
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-20 xl:px-24 pt-20 sm:pt-24 pb-12 transition-opacity duration-300"
        style={{ opacity: s5.opacity, pointerEvents: s5.pointerEvents }}
      >
        <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-start text-left my-auto">
          
          {/* Artistic Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c7355]" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8c7355] font-bold">
              GET IN TOUCH // 05
            </span>
          </div>

          {/* Dynamic Interactive Large Headline */}
          <h2 
            style={largeTitleParallax}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-[#111113] leading-[0.95] mb-3 select-none cursor-default"
          >
            Let's Build <br />
            <span 
              style={{
                backgroundImage: `linear-gradient(${gradientAngle}deg, #111113 0%, #8c7355 50%, #c5a880 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Together.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#4a4845] font-sans leading-relaxed mb-4 max-w-md">
            Available for software engineering internships, backend challenges, and modern full-stack collaborations.
          </p>

          {/* Recruiter & Visitor Quick Direct Message Box (Dispatched to Admin Portal) */}
          <div className="w-full max-w-lg p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-black/[0.08] backdrop-blur-xl mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#111113] flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3 text-[#8c7355]" />
                  <span>Contact for Work</span>
                </span>
              </div>
              <span className="text-[9.5px] font-mono text-[#888]">Direct contact for work & opportunities</span>
            </div>

            {messageSent ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans flex items-center gap-2.5 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Message dispatched successfully! Duc will review your inquiry and get back to you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSendQuickMessage} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name or Company (e.g. KMS, VNG)"
                    className="w-full px-3 py-1.5 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="Email / Phone / LinkedIn"
                    className="w-full px-3 py-1.5 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white transition-all"
                  />
                </div>

                <div className="relative">
                  <textarea
                    rows={2}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder="Brief message, job opportunity, or technical inquiry..."
                    className="w-full px-3 py-1.5 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white transition-all resize-none"
                  />
                </div>

                {messageError && (
                  <p className="text-[10px] text-rose-600 font-mono">{messageError}</p>
                )}

                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[9.5px] text-[#888] font-mono">End-to-end encrypted dispatch</span>
                  <button
                    type="submit"
                    disabled={messageSending}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#111113] hover:bg-black text-white font-mono font-bold text-xs transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <Send className="w-3 h-3 text-[#d8c8a8]" />
                    <span>{messageSending ? 'Sending...' : 'Contact for Work'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Email Copy Box */}
          <div className="w-full max-w-lg p-3 rounded-2xl bg-white/90 border border-black/[0.08] backdrop-blur-xl mb-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <span className="text-[10px] font-mono text-[#888] block mb-0.5 font-semibold">DIRECT INBOX</span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#111113] selection:bg-[#d8c8a8]">
                {personalInfo.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/[0.05] hover:bg-black/10 text-[#111113] text-xs font-mono font-bold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Links & Resume Download */}
          <div className="flex flex-wrap items-center gap-3.5 text-xs font-mono text-[#666] mb-5 font-medium">
            <a href="tel:0788551709" className="hover:text-black transition-colors">078.855.1709</a>
            <span>•</span>
            <a 
              href={personalInfo.resumeUrl} 
              download 
              onClick={() => analyticsService.trackEvent('cv_download')}
              className="text-[#8c7355] hover:text-black transition-colors underline font-bold"
            >
              CV (PDF)
            </a>
            <span>•</span>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              GitHub
            </a>
            <span>•</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              LinkedIn
            </a>
          </div>

          {/* Bottom Controls: Replay Journey */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-black text-white font-mono font-bold text-xs transition-all shadow-xl cursor-pointer hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#d8c8a8]" />
              <span>REPLAY JOURNEY (SCROLL TO TOP)</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE MODAL 1: PROJECT SPOTLIGHT MODAL
          With Dedicated Project Image Carousel / Gallery Slider!
      ========================================================================= */}
      {inspectedProject && typeof document !== 'undefined' && createPortal(
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-8 pt-8 sm:pt-12 pb-20 pointer-events-auto overflow-y-auto animate-fadeIn"
          onClick={handleCloseProjectModal}
        >
          <div 
            className="relative w-full max-w-3xl bg-white border border-black/10 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl text-[#111113] my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar: Category, Status & Safe Dedicated Close Button */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-black/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[#8c7355] font-bold">
                  {inspectedProject.category}
                </span>
                {inspectedProject.liveDemo && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {inspectedProject.id === 5 ? 'SHAREPOINT' : 'LIVE DEMO'}
                  </span>
                )}
              </div>

              <button
                onClick={handleCloseProjectModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/15 text-[#444] hover:text-black transition-all cursor-pointer font-mono text-xs font-bold"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Interactive Image Carousel / Gallery Slider */}
            {projectGallery.length > 0 && (
              <div className="relative w-full mb-6 select-none">
                {/* Main Slide Screen (object-contain ensures zero edge clipping!) */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-black/10 bg-[#161618] shadow-md group flex items-center justify-center p-1 sm:p-2">
                  <img 
                    src={projectGallery[activeImgIndex]?.url || inspectedProject.image} 
                    alt={projectGallery[activeImgIndex]?.caption || inspectedProject.title} 
                    className="w-full h-full object-contain transition-opacity duration-300" 
                  />

                  {/* Previous / Next Arrows (if > 1 image) */}
                  {projectGallery.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : projectGallery.length - 1));
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-lg"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex((prev) => (prev < projectGallery.length - 1 ? prev + 1 : 0));
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-lg"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Caption & Clean Counter Below Slide Screen (Never obscures the image) */}
                {projectGallery[activeImgIndex]?.caption && (
                  <div className="mt-2.5 px-1 flex items-start justify-between gap-3 text-xs text-[#555] font-sans">
                    <p className="line-clamp-2 leading-relaxed text-[#444] font-medium">
                      {projectGallery[activeImgIndex].caption}
                    </p>
                    {projectGallery.length > 1 && (
                      <span className="shrink-0 text-[11px] font-mono text-[#8c7355] font-bold">
                        {activeImgIndex + 1} / {projectGallery.length}
                      </span>
                    )}
                  </div>
                )}

                {/* Thumbnails Bar (Click to swipe / switch) */}
                {projectGallery.length > 1 && (
                  <div className="flex items-center gap-2.5 mt-3 overflow-x-auto no-scrollbar py-1">
                    {projectGallery.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`relative aspect-[16/9] h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-neutral-900 ${
                          activeImgIndex === idx
                            ? 'border-[#bfa074] ring-2 ring-[#bfa074]/30 scale-105 shadow-md'
                            : 'border-black/10 opacity-60 hover:opacity-100 hover:border-black/30'
                        }`}
                      >
                        <img src={item.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111113] font-sans uppercase tracking-tight">
                {inspectedProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#555] font-sans mt-2">
                {inspectedProject.tagline || inspectedProject.description}
              </p>
            </div>

            {/* Access Disclaimer / Expiration Notice */}
            {inspectedProject.accessNote && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 mb-6 flex items-start gap-3 shadow-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-xs font-sans leading-relaxed">
                  <span className="font-bold font-mono uppercase text-[10px] tracking-wider block text-amber-800 mb-0.5">
                    INSTITUTIONAL ACCESS NOTICE
                  </span>
                  {inspectedProject.accessNote}
                </div>
              </div>
            )}

            {/* Problem & Solution */}
            {inspectedProject.problem && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <span className="text-[11px] font-mono text-amber-800 font-bold block mb-1">
                    PROBLEM STATEMENT
                  </span>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {inspectedProject.problem}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <span className="text-[11px] font-mono text-emerald-800 font-bold block mb-1">
                    ARCHITECTURAL SOLUTION
                  </span>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    {inspectedProject.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Highlights */}
            {inspectedProject.highlights && (
              <div className="mb-6">
                <span className="text-xs font-mono text-[#111113] font-bold block mb-2">
                  TECHNICAL HIGHLIGHTS:
                </span>
                <ul className="space-y-2">
                  {inspectedProject.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-[#444] flex items-start gap-2">
                      <span className="text-[#8c7355] mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Badges */}
            <div className="mb-6">
              <span className="text-xs font-mono text-[#888] block mb-2 font-semibold">TECHNOLOGY STACK:</span>
              <div className="flex flex-wrap gap-1.5">
                {inspectedProject.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-black/5 border border-black/10 text-xs font-mono text-[#111113] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/10">
              {inspectedProject.liveDemo && (
                <a
                  href={inspectedProject.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-black text-white font-mono font-bold text-xs transition-all shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#d8c8a8]" />
                  <span>
                    {inspectedProject.id === 5 ? 'OPEN SHAREPOINT PORTAL ↗' : 'VISIT LIVE DEMO'}
                  </span>
                </a>
              )}

              {inspectedProject.githubUrl && (
                <a
                  href={inspectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#111113] font-mono font-bold text-xs transition-all border border-black/10"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>VIEW GITHUB REPO</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleCloseProjectModal}
                className="ml-auto px-4 py-2 rounded-full text-xs font-mono text-[#777] hover:text-black transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* =========================================================================
          INTERACTIVE MODAL 2: CERTIFICATE EXHIBITION LIGHTBOX
      ========================================================================= */}
      {inspectedCert && typeof document !== 'undefined' && createPortal(
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-8 pt-8 sm:pt-12 pb-20 pointer-events-auto overflow-y-auto animate-fadeIn"
          onClick={handleCloseCertModal}
        >
          <div 
            className={`relative w-full flex flex-col items-center bg-[#111218] border border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl text-white my-4 sm:my-8 transition-all duration-300 ${
              isCertZoomed ? 'max-w-6xl' : 'max-w-4xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls Bar */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#ffd066] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certificate Lightbox & Verification</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCertZoomed(!isCertZoomed)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 hover:text-white transition-all cursor-pointer"
                  title="Toggle Zoom In / Out"
                >
                  <Maximize2 className="w-3 h-3 text-[#ffd066]" />
                  <span>{isCertZoomed ? 'Fit Screen' : 'Expand'}</span>
                </button>
                <a
                  href={inspectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 hover:text-white transition-all cursor-pointer"
                  title="View full high-resolution certificate"
                >
                  <ExternalLink className="w-3 h-3 text-[#ffd066]" />
                  <span>Raw Image ↗</span>
                </a>
                <button
                  type="button"
                  onClick={handleCloseCertModal}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close certificate lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Archival Museum Matting Frame with Enhanced Sharpness */}
            <div 
              className="w-full flex items-center justify-center p-2 sm:p-3 rounded-2xl bg-black/70 border border-white/10 mb-4 shadow-inner overflow-hidden cursor-zoom-in"
              onClick={() => setIsCertZoomed(!isCertZoomed)}
              title="Click to zoom in / out"
            >
              <img 
                src={inspectedCert.image} 
                alt={inspectedCert.title} 
                className={`w-auto object-contain rounded-lg shadow-2xl transition-all duration-300 ${
                  isCertZoomed ? 'max-h-[82vh] scale-100 sm:scale-102' : 'max-h-[65vh]'
                }`}
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  transform: 'translateZ(0)',
                }}
                decoding="async"
                loading="eager"
              />
            </div>

            <div className="w-full text-left px-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                    inspectedCert.category === 'academic'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {inspectedCert.category === 'academic' ? '🎓 Academic & Honors' : '🎭 Leadership & Extracurricular'}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-full bg-white/5 text-[#dfc58d] border border-white/10">
                    {inspectedCert.badge}
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-400">
                  Year {inspectedCert.year}
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-bold text-white font-sans mb-1">
                {inspectedCert.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-neutral-400 mb-2.5 font-medium">
                <span>Issued by: <strong className="text-neutral-200">{inspectedCert.issuer}</strong></span>
                {inspectedCert.recipient && (
                  <span>Conferred to: <strong className="text-neutral-200">{inspectedCert.recipient}</strong></span>
                )}
                {inspectedCert.verificationRef && (
                  <span className="text-[#dfc58d]">Verification: <strong>{inspectedCert.verificationRef}</strong></span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed bg-white/[0.04] p-3 rounded-2xl border border-white/[0.06]">
                {inspectedCert.description}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default CinematicScenes;
