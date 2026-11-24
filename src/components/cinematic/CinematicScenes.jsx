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
  Cpu, 
  Terminal, 
  Flame, 
  Radio, 
  CheckCircle2,
  HardDrive,
  Workflow
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

  // Dual-view state per project: { [projectId]: 'ui' | 'architecture' }
  const [projectViews, setProjectViews] = useState({});

  // Interactive Architecture Simulation State
  const [simState, setSimState] = useState({
    activeQuery: null, // null | 'cache_hit' | 'db_write'
    statusText: 'System idle. Click buttons below to simulate distributed request routing.',
    latency: '0.0ms',
    cacheStatus: 'IDLE',
    dbStatus: 'STANDBY',
  });

  // Mobile Gyroscope Tilt State (for realistic holographic foil reflections on phone)
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        setDeviceTilt({
          x: Math.max(-1, Math.min(1, e.gamma / 30)),
          y: Math.max(-1, Math.min(1, (e.beta - 45) / 30)),
        });
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // Combined tilt from mouse or mobile gyroscopic sensor
  const tiltX = (mousePos?.x || 0) + (deviceTilt.x * 0.5);
  const tiltY = (mousePos?.y || 0) + (deviceTilt.y * 0.5);

  // Quick Recruiter Message Dispatch State
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
    setInspectedCert(null);
    setIsCertZoomed(false);
  };

  const toggleProjectView = (e, projId) => {
    e.stopPropagation();
    setProjectViews(prev => ({
      ...prev,
      [projId]: prev[projId] === 'architecture' ? 'ui' : 'architecture'
    }));
  };

  // Trigger Interactive System Architecture Simulation
  const handleSimulate = (type) => {
    if (type === 'cache_hit') {
      setSimState({
        activeQuery: 'cache_hit',
        statusText: '⚡ Routing GET /api/v1/workspaces → Cache-Aside Layer...',
        latency: '0.8ms',
        cacheStatus: 'HIT (Sub-ms RAM)',
        dbStatus: 'BYPASSED (-68% Load)',
      });
      setTimeout(() => {
        setSimState(prev => ({
          ...prev,
          statusText: '✅ 200 OK — Delivered in 0.8ms from In-Memory Redis. Database load eliminated.',
        }));
      }, 700);
    } else if (type === 'db_write') {
      setSimState({
        activeQuery: 'db_write',
        statusText: '💾 Executing POST /api/v1/booking → Knex Migration & ACID Transaction...',
        latency: '11.4ms',
        cacheStatus: 'DIRTY INVALIDATE',
        dbStatus: 'COMMITTED (3NF B-Tree)',
      });
      setTimeout(() => {
        setSimState(prev => ({
          ...prev,
          statusText: '✅ 201 Created — Transaction committed in 11.4ms across 28-Table 3NF PostgreSQL schema.',
        }));
      }, 850);
    }
  };

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      analyticsService.trackEvent('email_copy');
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

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

  // Generous plateau visibility windows across the extended 1050vh scroll
  const s1 = getScenePlateau(scrollProgress, 0.00, 0.00, 0.16, 0.23);
  const s2 = getScenePlateau(scrollProgress, 0.19, 0.26, 0.38, 0.45);
  const s3 = getScenePlateau(scrollProgress, 0.41, 0.48, 0.61, 0.68);
  const s4 = getScenePlateau(scrollProgress, 0.62, 0.68, 0.86, 0.92);
  const s5 = getScenePlateau(scrollProgress, 0.88, 0.93, 1.00, 1.00);

  // Parallax & Dynamic Color Shift for large typography
  const largeTitleParallax = {
    transform: `translate3d(${tiltX * 10}px, ${-tiltY * 6}px, 0)`,
    transition: 'transform 0.15s ease-out',
  };
  const gradientAngle = 90 + tiltX * 45;

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

  // Auto-glide effect: smoothly advances projects every 4.0s
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
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isCarouselHovered, filteredProjects.length]);

  const certificates = [
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
      provenIn: 'Nomadix (28 Tables), Helpdesk, VAVA CMS',
      summary: 'Designing normalized database schemas and API contracts before writing code.',
      detail: 'Engineered a normalized 28-table 3NF relational schema for Nomadix eliminating data redundancy with Knex migration rollbacks. Modeled document collections with Mongoose for Helpdesk Library and structured SharePoint relational lists for VAVA CMS.',
      deliverables: ['28-Table 3NF PostgreSQL', 'Knex Migrations & Rollbacks', 'Mongoose Schemas', 'OpenAPI / Postman Contracts'],
      techKeys: ['PostgreSQL', 'MongoDB', 'Postman', 'Node.js']
    },
    {
      id: 1,
      step: '02',
      title: 'Modular Core & Modern UI / 3D',
      short: 'Core & 3D Web',
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
      provenIn: 'net-s.id.vn (Live Domain), Nomadix Docker Cluster',
      summary: 'Packaging multi-service containers, automated testing, and custom domain shipping.',
      detail: 'Orchestrated multi-container local environments with Docker Compose (Node API + PostgreSQL + Redis) using isolated bridge networks. Integrated automated HTTP test collections, and shipped production releases to live custom domain net-s.id.vn.',
      deliverables: ['Multi-Service Docker Compose', 'Automated HTTP Test Suites', 'Production Domain net-s.id.vn', 'Git Flow & Branch Strategy'],
      techKeys: ['Docker', 'Git & GitHub', 'Postman', 'Firebase']
    }
  ];

  const techStackItems = [
    { name: 'Node.js', icon: NodejsIcon, category: 'backend', tag: 'Server Runtime' },
    { name: 'Express.js', icon: ExpressIcon, category: 'backend', tag: 'REST APIs' },
    { name: 'PostgreSQL', icon: PostgresIcon, category: 'backend', tag: '3NF Relational' },
    { name: 'MongoDB', icon: MongodbIcon, category: 'backend', tag: 'Document DB' },
    { name: 'Redis', icon: RedisIcon, category: 'backend', tag: 'Sub-ms Cache' },
    { name: 'Docker', icon: DockerIcon, category: 'backend', tag: 'Containers' },
    { name: 'Next.js 14', icon: NextjsIcon, category: 'frontend', tag: 'App Router / SSR' },
    { name: 'React', icon: ReactIcon, category: 'frontend', tag: 'UI Library' },
    { name: 'TypeScript', icon: TypescriptIcon, category: 'frontend', tag: 'Type Safety' },
    { name: 'Three.js', icon: ThreejsIcon, category: 'frontend', tag: '3D WebGL' },
    { name: 'Tailwind CSS', icon: TailwindIcon, category: 'frontend', tag: 'Design System' },
    { name: 'Vue.js 3', icon: VueIcon, category: 'frontend', tag: 'Reactive SPAs' },
    { name: 'Git & GitHub', icon: GitIcon, category: 'tools', tag: 'Git Flow' },
    { name: 'Postman', icon: PostmanIcon, category: 'tools', tag: 'API Testing' },
    { name: 'Firebase', icon: FirebaseIcon, category: 'tools', tag: 'Cloud / Auth' },
    { name: 'Java / Android', icon: JavaIcon, category: 'tools', tag: 'Native Mobile' },
  ];

  const filteredTechStack = techCategoryFilter === 'all'
    ? techStackItems
    : techStackItems.filter(item => item.category === techCategoryFilter);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden font-sans">
      
      {/* =========================================================================
          SCENE 01: KINETIC BRAND & EDITORIAL HERO
          Layout:
          - Left: Bold Editorial Typography, Bio, Roles & Status
          - Right: Floating Holographic Portrait Card (Gyro & Mouse Parallax Tilt)
          - 100% responsive: Works seamlessly in mobile portrait, landscape, and desktop!
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-14 xl:px-20 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 short:pt-8 short:pb-2 short:px-6 transition-opacity duration-300"
        style={{ opacity: s1.opacity, pointerEvents: s1.pointerEvents }}
      >
        {/* Left Column: Core Identity & Editorial Credentials */}
        <div className="w-full lg:max-w-xl xl:max-w-2xl flex flex-col items-start text-left pointer-events-auto">
          
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2.5 short:mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8c7355] shadow-[0_0_8px_#8c7355]" />
            <span className="text-[10px] sm:text-[11px] short:text-[8.5px] font-mono tracking-[0.22em] uppercase text-[#8c7355] font-bold">
              ENGINEERING PORTFOLIO // 2025
            </span>
          </div>

          {/* Dynamic Interactive Large Headline */}
          <h1 
            style={largeTitleParallax}
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl short:text-2xl font-black font-sans uppercase tracking-tight leading-[0.92] text-[#111113] mb-2 sm:mb-3 short:mb-1 select-none cursor-default"
          >
            Nguyen <br />
            <span 
              style={{
                backgroundImage: `linear-gradient(${gradientAngle}deg, #111113 0%, #8c7355 45%, #c5a880 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Van Duc
            </span>
          </h1>

          {/* Role badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3 short:mb-1">
            <span className="px-3 py-1 rounded-full bg-[#111113] text-white font-mono text-[10px] sm:text-[11px] short:text-[9px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#d8c8a8]" />
              <span>Full-Stack Software Engineer</span>
            </span>
            <span className="text-xs sm:text-[13px] short:text-[9.5px] font-mono text-[#8c7355] font-semibold">
              // Backend &amp; Interactive Web
            </span>
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-sm short:text-[10px] short:leading-snug text-[#4a4845] font-sans font-normal leading-relaxed mb-3.5 short:mb-1.5 max-w-lg line-clamp-3 short:line-clamp-2">
            Final-year Software Engineering student at <strong className="text-[#111113] font-semibold">University of Greenwich</strong>. Specializing in high-concurrency backend architectures (PostgreSQL 3NF, Redis Cache, Docker) and interactive web applications (Next.js 14, TypeScript).
          </p>

          {/* Academic & Architectural Credentials Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-2 sm:py-2.5 my-1 short:py-0.5 short:my-0.5 border-y border-black/[0.08] w-full max-w-lg text-left">
            <div>
              <span className="block text-[8.5px] sm:text-[9.5px] font-mono text-[#8c7355] uppercase tracking-wider font-semibold">Degree</span>
              <span className="text-xs sm:text-sm short:text-[10.5px] font-bold text-[#111113] font-sans">BSc (Hons)</span>
            </div>
            <div>
              <span className="block text-[8.5px] sm:text-[9.5px] font-mono text-[#8c7355] uppercase tracking-wider font-semibold">Standing</span>
              <span className="text-xs sm:text-sm short:text-[10.5px] font-bold text-[#111113] font-sans">Top 3 '24</span>
            </div>
            <div>
              <span className="block text-[8.5px] sm:text-[9.5px] font-mono text-[#8c7355] uppercase tracking-wider font-semibold">Architecture</span>
              <span className="text-xs sm:text-sm short:text-[10.5px] font-bold text-[#111113] font-sans">3NF &amp; Redis</span>
            </div>
          </div>

          {/* Real-time Status Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 short:mt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 short:py-0.5 rounded-full bg-white/90 border border-black/[0.08] text-[10.5px] sm:text-[11.5px] short:text-[9px] font-mono text-[#555] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Da Nang, Vietnam · Hybrid / Remote
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 short:py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[10.5px] sm:text-[11.5px] short:text-[9px] font-mono text-emerald-800 font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Internship (Immediate)
            </span>
          </div>

          {/* Desired Roles Strip */}
          <div className="mt-2.5 short:hidden px-3.5 py-1.5 rounded-xl bg-white/80 border border-black/[0.07] text-[11px] font-mono text-[#555] shadow-sm">
            <span className="text-[#8c7355] font-bold">🎯 Target:</span> Backend Engineer Intern • Full-Stack Intern • Software Engineer
          </div>

        </div>

        {/* Right Column: Floating Holographic Portrait Card (Gyro & Mouse 3D Tilt) */}
        <div 
          className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] short:hidden mt-4 lg:mt-0 pointer-events-auto flex items-center justify-center select-none"
          style={{
            transform: `perspective(1000px) rotateY(${tiltX * 12}deg) rotateX(${-tiltY * 12}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <div className="relative w-full rounded-3xl p-3 sm:p-4 bg-white/85 backdrop-blur-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.10)] group overflow-hidden">
            
            {/* Shimmering Holographic Glass Sheen Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-40 group-hover:opacity-75 transition-opacity"
              style={{
                background: `linear-gradient(${115 + tiltX * 40}deg, transparent 20%, rgba(216, 200, 168, 0.45) 50%, transparent 80%)`,
              }}
            />

            {/* Portrait Image Frame */}
            <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-black/[0.06] shadow-inner mb-3">
              <img 
                src="/avatar.jpg" 
                alt="Nguyen Van Duc" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              {/* Floating Verified Seal */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#d8c8a8]" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase">VERIFIED SE CANDIDATE</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">TOP 3</span>
              </div>
            </div>

            {/* Card Footer Citations */}
            <div className="flex items-center justify-between px-1">
              <div>
                <span className="block text-xs font-bold text-[#111113] font-sans">University of Greenwich</span>
                <span className="text-[10px] font-mono text-[#8c7355]">International Bachelor · Da Nang</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-500/30">
                GCD230006
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SCENE 02: INTERACTIVE SYSTEM ARCHITECTURE VISUALIZER
          Layout: 
          - Live Distributed Architecture Simulation (Next.js → Express → Redis → PostgreSQL)
          - Real-time Query Simulator ("Simulate Query" button with live latency benchmarks)
          - 4-Stage Proven Engineering Lifecycle & 16 Tech Stack Toolkit chips
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex flex-col justify-start px-4 sm:px-10 lg:px-14 xl:px-20 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 short:pt-8 short:pb-2 short:px-6 transition-opacity duration-300 pointer-events-auto overflow-y-auto"
        style={{ opacity: s2.opacity, pointerEvents: s2.pointerEvents }}
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-start text-left">
          
          {/* Header */}
          <div className="mb-3 sm:mb-4 short:mb-1 w-full">
            <div className="flex items-center gap-2 mb-1 sm:mb-2 short:mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[10px] short:text-[8.5px] font-mono tracking-[0.2em] uppercase text-[#10b981] font-bold">
                CORE ARCHITECTURE &amp; CAPABILITIES // 02
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <h2 
                style={largeTitleParallax}
                className="text-2xl sm:text-4xl lg:text-[42px] short:text-xl font-black font-sans uppercase tracking-tight text-[#111113] leading-none select-none cursor-default"
              >
                Distributed Systems &amp; <br className="hidden sm:block short:hidden" />
                <span 
                  style={{
                    backgroundImage: `linear-gradient(${gradientAngle}deg, #111113 0%, #10b981 50%, #059669 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Engineering Core.
                </span>
              </h2>

              <p className="text-xs sm:text-[13px] short:hidden text-[#555] font-sans max-w-md">
                Interactive real-time architecture visualizer demonstrating sub-millisecond query caching, normalized 3NF schemas, and containerized delivery.
              </p>
            </div>
          </div>

          {/* Interactive Live Architecture Terminal & Simulator */}
          <div className="w-full p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0c0d12] text-white border border-white/10 shadow-2xl mb-4 short:mb-2">
            
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono font-bold text-neutral-300 ml-2">
                  topology_visualizer.sh // Nomadix &amp; Nét Studio Architecture
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE · SUB-MS CACHING ACTIVE</span>
              </div>
            </div>

            {/* Architecture Node Graph (Interactive Flow) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-3.5">
              
              {/* Node 1: Client Layer */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono text-[#8c7355] font-bold">LAYER 01</span>
                  <ReactIcon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold font-sans text-white mb-0.5">Client Frontends</h4>
                <p className="text-[10px] text-neutral-400 font-mono">Next.js 14 SSR • Three.js 3D</p>
              </div>

              {/* Node 2: Gateway Layer */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono text-[#8c7355] font-bold">LAYER 02</span>
                  <ExpressIcon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold font-sans text-white mb-0.5">API Gateway</h4>
                <p className="text-[10px] text-neutral-400 font-mono">JWT Rotation • RBAC Security</p>
              </div>

              {/* Node 3: Redis Cache */}
              <div className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                simState.activeQuery === 'cache_hit' 
                  ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                  : 'bg-white/[0.04] border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">CACHE-ASIDE</span>
                  <RedisIcon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold font-sans text-white mb-0.5">Redis Cache</h4>
                <p className="text-[10px] text-neutral-400 font-mono">{simState.cacheStatus}</p>
              </div>

              {/* Node 4: PostgreSQL */}
              <div className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                simState.activeQuery === 'db_write' 
                  ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                  : 'bg-white/[0.04] border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono text-amber-400 font-bold">PERSISTENCE</span>
                  <PostgresIcon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold font-sans text-white mb-0.5">PostgreSQL 3NF</h4>
                <p className="text-[10px] text-neutral-400 font-mono">{simState.dbStatus}</p>
              </div>

            </div>

            {/* Simulation Controls & Status Feedback */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-[#d8c8a8] shrink-0" />
                <span className="text-xs font-mono text-neutral-300 leading-snug">
                  {simState.statusText}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSimulate('cache_hit')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-[10.5px] transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  ⚡ Simulate Cache Hit
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulate('db_write')}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-[10.5px] transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  💾 Simulate 3NF Write
                </button>
              </div>
            </div>

          </div>

          {/* 4-Stage Proven Engineering Lifecycle Tabs */}
          <div className="w-full mb-3.5 short:mb-1.5">
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-1.5 sm:pb-2 mb-2.5 w-full overflow-x-auto no-scrollbar gap-2 sm:gap-0">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowStep === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveWorkflowStep(idx)}
                    className={`shrink-0 sm:shrink relative pb-1 text-xs short:text-[10px] font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive ? 'font-bold text-[#111113]' : 'font-medium text-[#777] hover:text-[#111113]'
                    }`}
                  >
                    <span className={`text-[10px] font-mono ${isActive ? 'text-[#8c7355] font-bold' : 'text-[#999]'}`}>
                      {step.step}
                    </span>
                    <span>{step.short}</span>
                    {isActive && (
                      <span className="absolute bottom-[-7px] sm:bottom-[-9px] left-0 right-0 h-[2px] bg-[#8c7355] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Phase Content */}
            <div className="w-full p-3 sm:p-4 rounded-2xl bg-white/80 border border-black/[0.06] shadow-sm backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-black/[0.05]">
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

              <p className="text-[11.5px] sm:text-xs text-[#444] font-sans leading-relaxed mb-2">
                {workflowSteps[activeWorkflowStep].detail}
              </p>

              {/* Deliverables */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] sm:text-[11px] font-sans text-[#444] pt-1 border-t border-black/[0.04]">
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

          {/* Tech Stack Toolkit (Clean Chips) */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#111113]">
                // Production Tooling &amp; SDKs
              </span>
              <div className="flex items-center gap-2 text-[10.5px] font-mono">
                {['all', 'backend', 'frontend', 'tools'].map((cat, cIdx, arr) => (
                  <React.Fragment key={cat}>
                    <button
                      onClick={() => setTechCategoryFilter(cat)}
                      className={`capitalize cursor-pointer transition-colors ${
                        techCategoryFilter === cat ? 'text-[#111113] font-bold underline decoration-[#8c7355]' : 'text-[#888] hover:text-[#111113]'
                      }`}
                    >
                      {cat}
                    </button>
                    {cIdx < arr.length - 1 && <span className="text-black/20">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
              {filteredTechStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-white/70 hover:bg-white border border-black/[0.06] hover:border-[#8c7355] transition-all shadow-sm"
                    title={`${tech.name} — ${tech.tag}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-[10.5px] font-sans font-medium text-[#222] truncate">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCENE 03: TACTILE PROJECTS HOLO-VAULT
          Layout: 
          - Dual-View Project Showcase (Toggle between UI Preview & Architecture Schema!)
          - Live Demo Ping, GitHub Source & Detailed Inspection Modal
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-start px-4 sm:px-10 lg:px-14 xl:px-16 pt-16 sm:pt-22 lg:pt-26 pb-6 short:pt-8 short:pb-1 short:px-6 transition-opacity duration-300 pointer-events-auto overflow-hidden"
        style={{ opacity: s3.opacity, pointerEvents: s3.pointerEvents }}
      >
        <div className="w-full max-w-xl lg:max-w-[48rem] xl:max-w-[54rem] flex flex-col items-start text-left">
          
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-1 short:mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#8c7355]" />
            <span className="text-[10px] short:text-[8px] font-mono tracking-[0.2em] uppercase text-[#8c7355] font-bold">
              FEATURED ARCHIVE // 03
            </span>
          </div>

          {/* Dynamic Interactive Large Headline */}
          <h2 
            style={largeTitleParallax}
            className="text-xl sm:text-2xl lg:text-3xl short:text-base font-black font-sans uppercase tracking-tight text-[#111113] leading-[1.0] mb-1 select-none cursor-default"
          >
            System Vault <br className="short:hidden" />
            <span 
              style={{
                backgroundImage: `linear-gradient(${gradientAngle}deg, #111113 0%, #8c7355 50%, #c5a880 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Releases &amp; Code.
            </span>
          </h2>

          <p className="text-[10px] sm:text-[11.5px] short:hidden text-[#66625d] font-sans mb-2">
            Inspect live production architectures, database schemas, and interactive demos. Click [Architecture] to inspect backend technical solutions:
          </p>

          {/* Category Filter Chips & Carousel Controls */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 sm:mb-2.5 short:mb-1">
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] short:text-[8px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    projectFilter === cat.id
                      ? 'bg-[#111113] text-white shadow-sm'
                      : 'bg-black/5 hover:bg-black/10 text-[#666]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center gap-1 bg-black/5 p-0.5 rounded-xl border border-black/[0.06]">
                <button
                  onClick={() => scrollProjects(-1)}
                  disabled={!canScrollLeft}
                  className="p-1 rounded-lg hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[#111113]"
                  title="Previous project"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9.5px] short:text-[8.5px] font-mono font-bold text-[#8c7355] px-1.5 tracking-wider">
                  {activeProjectIndex + 1}/{filteredProjects.length}
                </span>
                <button
                  onClick={() => scrollProjects(1)}
                  disabled={!canScrollRight}
                  className="p-1 rounded-lg hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-[#111113]"
                  title="Next project"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Gliding Carousel Track - Dual View Cards */}
          <div 
            ref={projectCarouselRef}
            onScroll={handleCarouselScroll}
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            onTouchStart={() => setIsCarouselHovered(true)}
            onTouchEnd={() => setIsCarouselHovered(false)}
            className="w-full flex items-stretch gap-3 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1.5 sm:py-2 px-0.5 select-none short:py-0.5"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredProjects.map((proj, idx) => {
              const isArchView = projectViews[proj.id] === 'architecture';
              let shortTitle = proj.title.split('—')[0].trim();
              if (proj.id === 3) shortTitle = 'IT Helpdesk';
              if (proj.id === 2) shortTitle = 'Nomadix';
              if (proj.id === 1) shortTitle = 'Nét Studio';
              if (proj.id === 5) shortTitle = 'VAVA CMS';
              if (proj.id === 4) shortTitle = 'M-Hike Mobile';

              const coreTech = proj.tech ? proj.tech.slice(0, 3) : [];

              return (
                <div 
                  key={proj.id}
                  onClick={() => handleOpenProject(proj)}
                  className="w-[88vw] sm:w-[calc(50%-10px)] short:w-[420px] shrink-0 snap-center sm:snap-start flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/95 hover:bg-white border border-black/[0.08] hover:border-[#bfa074] p-3.5 sm:p-4.5 transition-all duration-300 backdrop-blur-xl group hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] cursor-pointer hover:-translate-y-1 select-none"
                >
                  <div>
                    {/* Top Toolbar: Category Badge + Dual-View Switch Button */}
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wide uppercase border ${
                        proj.projectType === 'competition'
                          ? 'bg-amber-500/15 text-amber-800 border-amber-500/30'
                          : proj.projectType === 'final_year'
                            ? 'bg-indigo-500/15 text-indigo-800 border-indigo-500/30'
                            : 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30'
                      }`}>
                        {proj.projectType === 'competition' && '🏆 Competition'}
                        {proj.projectType === 'final_year' && '🎓 Final Year'}
                        {proj.projectType === 'university' && '🏛️ University'}
                      </span>

                      {/* Dual-View Switch Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleProjectView(e, proj.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 hover:bg-black/10 text-[#444] hover:text-black font-mono text-[9px] font-bold border border-black/10 transition-colors"
                        title="Toggle between UI Preview and Architecture Breakdown"
                      >
                        <Workflow className="w-3 h-3 text-[#8c7355]" />
                        <span>{isArchView ? 'View UI Mockup' : 'Architecture'}</span>
                      </button>
                    </div>

                    {/* Dual View Screen: UI Mockup or Architecture Breakdown */}
                    {isArchView ? (
                      <div className="aspect-[16/9.5] w-full rounded-xl sm:rounded-2xl p-3 bg-[#0d0e14] text-white border border-white/10 mb-2.5 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">ARCHITECTURAL SOLUTION</span>
                            <span className="text-[9px] font-mono text-neutral-400">Production Tested</span>
                          </div>
                          <p className="text-[11px] text-neutral-200 font-sans leading-relaxed line-clamp-3">
                            {proj.solution || proj.problem || proj.description}
                          </p>
                        </div>
                        <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                          <span>Db: <strong>{proj.id === 2 ? 'PostgreSQL 3NF (28T)' : proj.id === 3 ? 'MongoDB / Mongoose' : 'SQLite / Mapbox'}</strong></span>
                          <span className="text-[#d8c8a8]">Ready to Inspect →</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[16/9.5] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 border border-black/[0.08] bg-[#f5f3ee] flex items-center justify-center">
                        {proj.image ? (
                          <img 
                            src={proj.image} 
                            alt={proj.title} 
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-[#888]">
                            <ImageIcon className="w-5 h-5 mb-0.5 text-[#bfa074]" />
                            <span className="text-[9px] font-mono font-bold tracking-wider">PREVIEW</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bold Title */}
                    <h3 className="text-sm sm:text-base font-black font-sans uppercase tracking-tight text-[#111113] group-hover:text-[#8c7355] transition-colors truncate mb-1">
                      {shortTitle}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[11px] sm:text-[11.5px] text-[#555] font-sans line-clamp-2 leading-relaxed mb-2.5 min-h-[30px]">
                      {proj.tagline || proj.description}
                    </p>

                    {/* Core Tech Badges */}
                    <div className="flex items-center gap-1.5 overflow-hidden mb-3">
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

                  {/* Bottom Action Bar */}
                  <div className="pt-2 sm:pt-2.5 border-t border-black/[0.06] flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 shrink-0">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-black/[0.05] hover:bg-[#111113] text-[#24292f] hover:text-white transition-all shadow-sm hover:scale-110 flex items-center justify-center"
                          title="View source code on GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5 fill-current" />
                        </a>
                      )}

                      {proj.liveDemo && (
                        <a
                          href={proj.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-mono font-bold transition-all shadow-sm hover:scale-105"
                          title="Open live production platform"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                          <span>Go Live</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#111113] group-hover:bg-[#8c7355] text-white text-[9px] font-mono font-bold transition-all shadow-sm shrink-0">
                      <span>Details</span>
                      <ArrowUpRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCENE 04: HOLOGRAPHIC MILESTONES & HONORS (GYRO TILT GALLERY)
          Layout: 
          - 3D Holographic Tilt Cards reflecting metallic gold sheen with phone gyro or mouse
          - Verifiable decision references and conferred student IDs
          - 100% visible across mobile, tablet, and 4K displays with zero camera clipping!
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex flex-col items-center justify-start pt-16 sm:pt-20 px-4 sm:px-8 short:pt-8 short:px-4 transition-opacity duration-300 pointer-events-auto overflow-y-auto"
        style={{ opacity: s4.opacity, pointerEvents: s4.pointerEvents }}
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Eyebrow Tag */}
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2 select-none">
            <span className="w-2 h-2 rounded-full bg-[#ffd066] shadow-[0_0_10px_#ffd066] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#f7db99] font-bold">
              ACADEMIC &amp; LEADERSHIP ARCHIVE // 04
            </span>
          </div>

          {/* Main Title: VERIFIED MILESTONES */}
          <h2 
            style={largeTitleParallax}
            className="text-2xl sm:text-4xl md:text-5xl font-black font-sans uppercase tracking-[0.08em] leading-none mb-1.5 sm:mb-2 text-center text-white"
          >
            Verified Milestones
          </h2>

          <p className="text-[11px] sm:text-xs font-mono tracking-[0.16em] text-[#dfc58d] uppercase text-center max-w-lg mb-3">
            Honors, Scholarships &amp; Student Leadership • 2024 — 2026
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mb-4">
            {[
              { id: 'all', label: 'All Honors (6)' },
              { id: 'academic', label: 'Academic & Innovation (3)' },
              { id: 'club_skill', label: 'Leadership & Mentoring (3)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCertCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  certCategoryFilter === cat.id
                    ? 'bg-[#ffd066] text-black shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-neutral-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Holographic Cards Grid (Gyroscope & Mouse Responsive Tilt) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full text-left">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => handleOpenCert(cert)}
                className="group relative rounded-2xl p-4 bg-[#111218]/90 hover:bg-[#161722] border border-white/15 hover:border-[#ffd066]/60 transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-1 overflow-hidden"
                style={{
                  transform: `perspective(800px) rotateY(${tiltX * 6}deg) rotateX(${-tiltY * 6}deg)`,
                }}
              >
                {/* Iridescent Metallic Foil Sheen */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-45 transition-opacity"
                  style={{
                    background: `linear-gradient(${125 + tiltX * 50}deg, transparent 25%, rgba(255, 208, 102, 0.45) 50%, rgba(255, 255, 255, 0.6) 55%, transparent 75%)`,
                  }}
                />

                {/* Top Badge & Year */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    cert.category === 'academic'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/35'
                  }`}>
                    {cert.badge}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold">
                    {cert.year}
                  </span>
                </div>

                {/* Certificate Preview Image */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 border border-white/10 bg-black/60 flex items-center justify-center p-1">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold font-sans text-white group-hover:text-[#ffd066] transition-colors line-clamp-2 mb-1.5">
                  {cert.title}
                </h3>

                {/* Issuer & Verification Reference */}
                <div className="text-[10px] font-mono text-neutral-400 mb-2 truncate">
                  <span>Issued: </span>
                  <strong className="text-neutral-200">{cert.issuer}</strong>
                </div>

                {/* Bottom Inspection Indicator */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#ffd066]">
                  <span>{cert.verificationRef.split('•')[0]}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCENE 05: COMMAND DECK & FAST RECRUITER DISPATCH
          Layout: 
          - Linear & Terminal HUD with Instant Dispatch to mTLS Admin Portal
          - 1-Click Email Copy, CV PDF Download, Social Links, Replay Journey
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-center px-4 sm:px-12 lg:px-20 xl:px-24 pt-16 sm:pt-24 pb-8 sm:pb-12 short:pt-8 short:pb-2 short:px-6 transition-opacity duration-300"
        style={{ opacity: s5.opacity, pointerEvents: s5.pointerEvents }}
      >
        <div className="w-full max-w-xl lg:max-w-4xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-6 my-auto pointer-events-auto">
          
          {/* Left Column: Brand, Direct Contacts, CV & Replay */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8c7355]" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8c7355] font-bold">
                GET IN TOUCH // 05
              </span>
            </div>

            {/* Headline */}
            <h2 
              style={largeTitleParallax}
              className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-[#111113] leading-[0.95] mb-2.5 select-none cursor-default"
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
              Available for software engineering internships, backend architecture challenges, and high-performance web products.
            </p>

            {/* Interactive Email Copy Box */}
            <div className="w-full p-3 rounded-2xl bg-white/90 border border-black/[0.08] backdrop-blur-xl mb-3 shadow-sm">
              <span className="text-[9.5px] font-mono text-[#888] block mb-0.5 font-semibold">DIRECT INBOX</span>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#111113]">
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
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#666] mb-4 font-medium">
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

            {/* Replay Journey */}
            <button
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-black text-white font-mono font-bold text-xs transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#d8c8a8]" />
              <span>REPLAY JOURNEY (SCROLL TO TOP)</span>
            </button>
          </div>

          {/* Right Column: Fast Dispatch Box (Delivered to Secured Admin Portal) */}
          <div className="w-full lg:w-[48%] p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 border border-black/[0.08] backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111113] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8c7355]" />
                  <span>Direct Recruiter Dispatch</span>
                </span>
              </div>
              <span className="text-[9.5px] font-mono text-[#888]">Encrypted to Admin</span>
            </div>

            {messageSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans flex items-center gap-2.5 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Message dispatched successfully! Duc will review your inquiry promptly.</span>
              </div>
            ) : (
              <form onSubmit={handleSendQuickMessage} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name / Company (e.g. KMS, VNG)"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="Email / Phone / LinkedIn"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder="Brief message, internship opportunity, or technical inquiry..."
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white transition-all resize-none"
                  />
                </div>

                {messageError && (
                  <p className="text-[10px] text-rose-600 font-mono">{messageError}</p>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[9.5px] text-[#888] font-mono">End-to-end encrypted dispatch</span>
                  <button
                    type="submit"
                    disabled={messageSending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111113] hover:bg-black text-white font-mono font-bold text-xs transition-all shadow-md cursor-pointer hover:scale-102 active:scale-98 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#d8c8a8]" />
                    <span>{messageSending ? 'Dispatching...' : 'Dispatch Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE MODAL 1: PROJECT SPOTLIGHT MODAL
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
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-black/[0.08]">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[#8c7355] font-bold">
                {inspectedProject.category}
              </span>
              <button
                onClick={handleCloseProjectModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/15 text-[#444] hover:text-black transition-all cursor-pointer font-mono text-xs font-bold"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111113] font-sans uppercase tracking-tight">
                {inspectedProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#555] font-sans mt-1.5">
                {inspectedProject.tagline || inspectedProject.description}
              </p>
            </div>

            {/* Problem & Solution */}
            {inspectedProject.problem && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <span className="text-[10.5px] font-mono text-amber-800 font-bold block mb-1">
                    PROBLEM STATEMENT
                  </span>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {inspectedProject.problem}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <span className="text-[10.5px] font-mono text-emerald-800 font-bold block mb-1">
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
              <div className="mb-4">
                <span className="text-xs font-mono text-[#111113] font-bold block mb-2">
                  TECHNICAL HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5">
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
            <div className="mb-4">
              <span className="text-xs font-mono text-[#888] block mb-2 font-semibold">TECHNOLOGY STACK:</span>
              <div className="flex flex-wrap gap-1.5">
                {inspectedProject.tech?.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-black/5 border border-black/10 text-xs font-mono text-[#111113] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/10">
              {inspectedProject.liveDemo && (
                <a
                  href={inspectedProject.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-black text-white font-mono font-bold text-xs transition-all shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#d8c8a8]" />
                  <span>VISIT LIVE DEMO ↗</span>
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
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#ffd066] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certificate Lightbox &amp; Verification</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCertZoomed(!isCertZoomed)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 hover:text-white transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3 text-[#ffd066]" />
                  <span>{isCertZoomed ? 'Fit Screen' : 'Expand'}</span>
                </button>
                <a
                  href={inspectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 hover:text-white transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3 text-[#ffd066]" />
                  <span>Raw Image ↗</span>
                </a>
                <button
                  type="button"
                  onClick={handleCloseCertModal}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              className="w-full flex items-center justify-center p-2 sm:p-3 rounded-2xl bg-black/70 border border-white/10 mb-4 shadow-inner overflow-hidden cursor-zoom-in"
              onClick={() => setIsCertZoomed(!isCertZoomed)}
            >
              <img 
                src={inspectedCert.image} 
                alt={inspectedCert.title} 
                className={`w-auto object-contain rounded-lg shadow-2xl transition-all duration-300 ${
                  isCertZoomed ? 'max-h-[82vh] scale-100 sm:scale-102' : 'max-h-[65vh]'
                }`}
                loading="eager"
              />
            </div>

            <div className="w-full text-left px-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {inspectedCert.badge || 'VERIFIED CREDENTIAL'}
                </span>
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
