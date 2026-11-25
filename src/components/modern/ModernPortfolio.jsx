import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Copy, 
  Check, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  Layers, 
  Database, 
  Terminal, 
  Award, 
  ShieldCheck, 
  Code2, 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  Eye, 
  FileText 
} from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';

import Navbar from '@/components/layout/Navbar';
import KineticCanvas from './KineticCanvas';
import HeroTerminal from './HeroTerminal';
import OrbitProjectStage from './OrbitProjectStage';
import ProjectModal from './ProjectModal';
import CertificateModal from './CertificateModal';

import { personalInfo, techSkills, githubProjects, achievements } from '@/data/portfolioData';
import { analyticsService } from '@/services/analyticsService';
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

export const ModernPortfolio = () => {
  // Scroll progress for top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Filter states
  const [techCategory, setTechCategory] = useState('all');
  const [projectCategory, setProjectCategory] = useState('all');
  const [certCategory, setCertCategory] = useState('all');
  const [activeWorkflowPhase, setActiveWorkflowPhase] = useState(0);

  // Recruiter Quick Dispatch State
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');

  // Email Copy State
  const [emailCopied, setEmailCopied] = useState(false);

  // Live Da Nang Clock
  const [daNangTime, setDaNangTime] = useState('');

  useEffect(() => {
    analyticsService.trackVisit();

    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setDaNangTime(now.toLocaleTimeString('en-US', options) + ' ICT');
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ducnv179.wk@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!quickMessage.trim()) {
      setSendError('Please enter a brief inquiry or message.');
      return;
    }

    setIsSending(true);
    setSendError('');

    try {
      await analyticsService.addMessage({
        senderName: senderName.trim() || 'Recruiter / Engineering Lead',
        senderContact: senderContact.trim() || 'Not specified',
        message: quickMessage.trim()
      });

      setIsSending(false);
      setSendSuccess(true);
      setSenderName('');
      setSenderContact('');
      setQuickMessage('');

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#d8c8a8', '#38bdf8', '#34d399', '#ffffff']
      });

      setTimeout(() => setSendSuccess(false), 6000);
    } catch (err) {
      setIsSending(false);
      setSendError('Could not send message. Please email directly to ducnv179.wk@gmail.com.');
    }
  };

  // 4-Phase Engineering Architecture Lifecycle
  const workflowPhases = [
    {
      step: '01',
      title: 'Architecture & Schema Blueprint',
      subtitle: '3NF Data Modeling & API Contracts',
      provenIn: 'Nomadix (28 Tables), Helpdesk, VAVA CMS',
      description: 'Designing normalized database schemas and API contracts before writing code. Eliminating data redundancy and establishing migration rollback safety.',
      deliverables: ['28-Table 3NF PostgreSQL Schema', 'Knex Migrations & Rollbacks', 'Mongoose Collections', 'OpenAPI / Postman Contracts'],
      tags: ['PostgreSQL', 'MongoDB', 'Knex.js', 'Postman']
    },
    {
      step: '02',
      title: 'Modular Core & Modern UI / 3D',
      subtitle: 'Decoupled Services & Reactive 3D Web',
      provenIn: 'NÉT Studio (3D WebGL), Helpdesk (Vue 3), M-Hike',
      description: 'Constructing decoupled service layers with Express/Node.js paired with reactive client UIs and WebGL. Built interactive 360° product visualizers embedded in Next.js 14.',
      deliverables: ['Real-Time 3D Product Visualizer', 'Next.js 14 App Router', 'Vue 3 Reactive SPAs', 'Android Java SDK & Mapbox'],
      tags: ['Next.js 14', 'Three.js 3D', 'TypeScript', 'Tailwind', 'Vue 3']
    },
    {
      step: '03',
      title: 'Performance Tuning & Security Hardening',
      subtitle: 'Sub-ms Caching & Defensive Auth',
      provenIn: 'Nomadix (Redis Cache), VAVA CMS (RBAC)',
      description: 'Engineered Redis Cache-Aside layer with 15-min TTL, reducing database read load by 68%. Tuned composite B-Tree indexes and hardened JWT refresh token rotation.',
      deliverables: ['Redis In-Memory Cache (Sub-ms)', 'Composite B-Tree Indexes', 'JWT Refresh Token Rotation', 'Role-Based Access Control (RBAC)'],
      tags: ['Redis', 'PostgreSQL', 'JWT Auth', 'Security']
    },
    {
      step: '04',
      title: 'Containerization, Testing & Live Delivery',
      subtitle: 'Isolated Environments & Live Production',
      provenIn: 'net-s.id.vn (Live Domain), Nomadix Docker Cluster',
      description: 'Orchestrating multi-container local environments with Docker Compose (Node API + PostgreSQL + Redis) and shipping production releases to live domains.',
      deliverables: ['Multi-Service Docker Compose', 'Automated HTTP Test Suites', 'Production Domain net-s.id.vn', 'Git Flow & Branch Strategy'],
      tags: ['Docker', 'Git Flow', 'HTTP Testing', 'Custom Domains']
    }
  ];

  // Tech items with real brand SVGs
  const techItems = [
    { name: 'Node.js', icon: NodejsIcon, category: 'backend', tag: 'Server Runtime', tier: 'Core / Production' },
    { name: 'Express.js', icon: ExpressIcon, category: 'backend', tag: 'RESTful APIs', tier: 'Core / Production' },
    { name: 'PostgreSQL', icon: PostgresIcon, category: 'backend', tag: '3NF Relational SQL', tier: 'Core / Production' },
    { name: 'MongoDB', icon: MongodbIcon, category: 'backend', tag: 'Document NoSQL', tier: 'Applied Project' },
    { name: 'Redis', icon: RedisIcon, category: 'backend', tag: 'In-Memory Cache', tier: 'Applied Project' },
    { name: 'Docker', icon: DockerIcon, category: 'tools', tag: 'Containers & Compose', tier: 'Applied Project' },

    { name: 'Next.js 14', icon: NextjsIcon, category: 'frontend', tag: 'App Router & SSR', tier: 'Core / Production' },
    { name: 'React', icon: ReactIcon, category: 'frontend', tag: 'Component UI', tier: 'Core / Production' },
    { name: 'TypeScript', icon: TypescriptIcon, category: 'frontend', tag: 'Type-Safe Code', tier: 'Core / Production' },
    { name: 'Three.js', icon: ThreejsIcon, category: 'frontend', tag: '3D WebGL Graphics', tier: 'Applied Project' },
    { name: 'Tailwind CSS', icon: TailwindIcon, category: 'frontend', tag: 'Design Systems', tier: 'Core / Production' },
    { name: 'Vue.js 3', icon: VueIcon, category: 'frontend', tag: 'Reactive SPAs', tier: 'Applied Project' },

    { name: 'Git & GitHub', icon: GitIcon, category: 'tools', tag: 'Git Flow & VCS', tier: 'Core / Production' },
    { name: 'Postman', icon: PostmanIcon, category: 'tools', tag: 'API Contract Tests', tier: 'Core / Production' },
    { name: 'Firebase', icon: FirebaseIcon, category: 'tools', tag: 'Cloud Firestore & Auth', tier: 'Applied Project' },
    { name: 'Java / Android', icon: JavaIcon, category: 'tools', tag: 'Mobile & Mapbox SDK', tier: 'Applied Project' },
  ];

  const filteredTech = techCategory === 'all' 
    ? techItems 
    : techItems.filter(item => item.category === techCategory);

  // Projects filter
  const filteredProjects = projectCategory === 'all'
    ? githubProjects
    : githubProjects.filter(p => {
        if (projectCategory === 'competition') return p.projectType === 'competition';
        if (projectCategory === 'capstone') return p.projectType === 'final_year';
        if (projectCategory === 'enterprise') return p.projectType === 'university';
        return true;
      });

  // Certificates list
  const certificates = [
    {
      id: 'top3_2024',
      category: 'academic',
      categoryLabel: 'Academic & Honors',
      badge: 'TOP 3 IN COHORT',
      title: 'Top 3 Outstanding Students — Summer 2024',
      issuer: 'University of Greenwich (Vietnam)',
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
      issuer: 'Greenwich International Bachelor Program',
      image: '/certificates/cert_best_student_icm_2026.jpg',
      year: '2026',
      verificationRef: 'Decision: 181 QH-PPTUDN • GKD2300025',
      description: 'Achieved the highest overall academic score in Information and Content Management (COMP1643), certified by Campus Director Dr. Nguyen Duy Nghiem.'
    },
    {
      id: 'bootcamp_innovation_2025',
      category: 'academic',
      categoryLabel: 'Academic & Innovation',
      badge: '2ND PRIZE WINNER',
      title: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
      issuer: 'Greenwich Vietnam & Hospital 199 Innovation Hub',
      image: '/certificates/cert_bootcamp_innovation_2025.jpg',
      year: '2025',
      verificationRef: 'Da Nang Campus Director: Dr. Nguyen Duy Nghiem',
      description: 'Awarded 2nd Prize at the Impact Innovation Bootcamp 2025 for engineering practical digital transformation and healthcare technology solutions.'
    },
    {
      id: 'peer_mentoring_2024',
      category: 'leadership',
      categoryLabel: 'Leadership & Mentorship',
      badge: 'OUTSTANDING MENTOR',
      title: 'Outstanding Mentor — Greenwich Peer Mentoring Club',
      issuer: 'Greenwich Peer Mentoring Club & Student Affairs Dept',
      image: '/certificates/cert_peer_mentoring_2024.jpg',
      year: '2024',
      verificationRef: 'Head of Business: MSc. Nguyen Minh Hai',
      description: 'Recognized for outstanding mentorship, coaching incoming students in academic coursework and technical skills throughout Fall 2024.'
    },
    {
      id: 'gnews_club_2024',
      category: 'leadership',
      categoryLabel: 'Clubs & Communication',
      badge: 'MEDIA & PRESS',
      title: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
      issuer: 'Student Affairs Department & GNews Editorial Board',
      image: '/certificates/cert_gnews_club_2024.jpg',
      year: '2024',
      verificationRef: 'Head of Student Affairs: Mai Doan Ngoc Tuyet Oanh',
      description: 'Certified for active leadership in the university technical journalism board, leading content publishing and student tech event coverage.'
    },
    {
      id: 'gmc_music_club',
      category: 'leadership',
      categoryLabel: 'Campus Culture',
      badge: 'ARTS & COMMUNITY',
      title: "Outstanding Performance — 'Under the Baubles' Gala",
      issuer: 'Greenwich Music Club (GMC) & Student Affairs',
      image: '/certificates/cert_gmc_music_club.jpg',
      year: '2024',
      verificationRef: 'Club President: Le Tat Chuong',
      description: "Honored for distinguished contributions to event coordination and performance at the annual 'Under the Baubles' gala."
    }
  ];

  const filteredCerts = certCategory === 'all'
    ? certificates
    : certificates.filter(c => c.category === certCategory);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-[#ededed] font-sans overflow-x-hidden selection:bg-[#d8c8a8] selection:text-black">
      
      {/* 1. Slim Silk Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-[#d8c8a8] to-cyan-400 origin-left z-60 shadow-[0_0_8px_rgba(216,200,168,0.8)]"
        style={{ scaleX }}
      />

      {/* 2. Kinetic Starfield & Ambient Glow Canvas (0 Three.js lag, 120 FPS) */}
      <KineticCanvas />

      {/* 3. Luxury Dark Glassmorphism Navbar */}
      <Navbar />

      {/* =========================================================================
          SECTION 1: HERO / ABOUT
      ========================================================================= */}
      <section id="about" className="relative min-h-[95vh] pt-32 sm:pt-40 pb-20 px-4 sm:px-8 lg:px-14 flex flex-col justify-center max-w-7xl mx-auto z-10">
        
        {/* Availability Status Beacon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-8 self-start shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>OPEN TO SOFTWARE ENGINEERING INTERNSHIPS · DA NANG & REMOTE</span>
        </motion.div>

        {/* Main Grid: Left Identity & Right Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Monumental Identity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#d8c8a8] font-semibold mb-2">
                Full-Stack Software Engineering Intern
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-syne">
                Nguyen Van <span className="bg-gradient-to-r from-[#d8c8a8] via-white to-[#d8c8a8] bg-clip-text text-transparent">Duc</span>
              </h1>
              <p className="text-sm sm:text-base font-mono text-neutral-400 mt-2">
                BSc (Hons) in Software Engineering · University of Greenwich
              </p>
            </div>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans max-w-2xl font-light">
              Final-year Software Engineering student recognized in the <span className="text-[#d8c8a8] font-semibold">Top 3 Students 2024</span> at the University of Greenwich. Experienced in engineering full-stack platforms — ranging from <span className="text-white font-medium">interactive 3D web applications with Next.js and Three.js</span> to modular backend architectures with <span className="text-white font-medium">28-table 3NF PostgreSQL, Redis caching, and Docker Compose</span>.
            </p>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-bold font-syne text-[#d8c8a8]">BSc (Hons)</div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase mt-0.5">Greenwich UK</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-bold font-syne text-emerald-400">Top 3</div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase mt-0.5">Student 2024</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-bold font-syne text-cyan-400">05</div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase mt-0.5">Shipped Projects</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-bold font-syne text-amber-400">04</div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase mt-0.5">Major Honors</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-[#d8c8a8] to-amber-300 text-black font-semibold text-xs font-mono tracking-wider uppercase hover:shadow-[0_0_20px_rgba(216,200,168,0.4)] transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Explore Featured Work</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <a
                href="/NguyenVanDuc_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-white text-xs font-mono tracking-wider uppercase hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <span>Official CV (PDF)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-neutral-400 hover:text-[#d8c8a8] text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>Direct Contact</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-5 pt-3 text-neutral-400">
              <a
                href="https://github.com/DucNgVan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <GithubIcon className="w-4 h-4" />
                <span>github.com/DucNgVan</span>
              </a>
              <span className="text-neutral-700">•</span>
              <a
                href="https://linkedin.com/in/ducngvan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Linkedin className="w-4 h-4" />
                <span>linkedin.com/in/ducngvan</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Live Interactive Developer CLI Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <HeroTerminal />
          </motion.div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 2: ENGINEERING METHODOLOGY & ARCHITECTURE LIFECYCLE
      ========================================================================= */}
      <section id="expertise" className="relative py-24 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto z-10 border-t border-white/[0.06]">
        
        <div className="text-left mb-12 sm:mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#d8c8a8] mb-2">
            // 02 · ENGINEERING METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-syne">
            From Relational Schema to Production Domain
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            A systematic 4-phase engineering lifecycle practiced across capstone systems, hackathon-winning solutions, and deployed production web applications.
          </p>
        </div>

        {/* Interactive 4-Phase Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Phase Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {workflowPhases.map((phase, idx) => {
              const isActive = activeWorkflowPhase === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveWorkflowPhase(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.06] border-[#d8c8a8] shadow-[0_0_25px_rgba(216,200,168,0.15)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold tracking-widest ${isActive ? 'text-[#d8c8a8]' : 'text-neutral-500'}`}>
                      PHASE {phase.step}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {phase.provenIn.split(',')[0]}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    {phase.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8c8a8]/[0.05] rounded-full blur-3xl pointer-events-none" />

            {(() => {
              const current = workflowPhases[activeWorkflowPhase];
              return (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#d8c8a8]">
                        PHASE {current.step} ARCHITECTURE
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-syne mt-1">
                        {current.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      Production Verified
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    {current.description}
                  </p>

                  {/* Proven In Badge */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#d8c8a8] mb-1">
                      Engineered & Proven In:
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {current.provenIn}
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      Architectural Deliverables:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/10 text-xs text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {current.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#d8c8a8]">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })()}

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 3: TECHNICAL TOOLKIT & STACK MATRIX
      ========================================================================= */}
      <section id="skills" className="relative py-24 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto z-10 border-t border-white/[0.06]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#d8c8a8] mb-2">
              // 03 · TECHNICAL TOOLKIT
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-syne">
              Core Technologies & Tools
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mt-3 font-light">
              Technologies leveraged across production deployments, university research capstones, and modern engineering tracks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 self-start overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Stack' },
              { id: 'backend', label: 'Backend & Data' },
              { id: 'frontend', label: 'Frontend & 3D' },
              { id: 'tools', label: 'DevOps & Tools' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTechCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  techCategory === tab.id
                    ? 'bg-[#d8c8a8] text-black font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredTech.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-[#d8c8a8]/40 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                    tech.tier.includes('Production')
                      ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
                      : 'border-white/15 text-neutral-400 bg-white/[0.04]'
                  }`}>
                    {tech.tier}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#d8c8a8] transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    {tech.tag}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 4: FEATURED PRODUCTION PROJECTS (3D CYLINDRICAL ORBIT CAROUSEL)
      ========================================================================= */}
      <section id="projects" className="relative z-10 border-t border-white/[0.06]">
        <OrbitProjectStage onSelectProject={(proj) => setSelectedProject(proj)} />
      </section>

      {/* =========================================================================
          SECTION 5: HALL OF HONORS & VERIFIED MILESTONES
      ========================================================================= */}
      <section id="honors" className="relative py-24 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto z-10 border-t border-white/[0.06]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#d8c8a8] mb-2">
              // 05 · HALL OF HONORS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-syne">
              Academic Honors & Verified Milestones
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mt-3 font-light">
              Official institutional recognition, university director decisions, and competitive engineering awards.
            </p>
          </div>

          {/* Certificate Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 self-start">
            {[
              { id: 'all', label: 'All Honors (06)' },
              { id: 'academic', label: 'Academic & Tech' },
              { id: 'leadership', label: 'Leadership & Mentorship' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCertCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  certCategory === tab.id
                    ? 'bg-[#d8c8a8] text-black font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-[#d8c8a8]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <div>
                {/* Certificate Image Thumbnail */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 border border-white/10 mb-5 relative">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#d8c8a8] border border-[#d8c8a8]/40">
                      {cert.badge}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-neutral-400 mb-1">
                  {cert.issuer} · {cert.year}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#d8c8a8] transition-colors leading-snug mb-2 font-syne">
                  {cert.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-3">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Decision</span>
                </span>
                <span className="text-xs font-mono text-[#d8c8a8] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: DIRECT DISPATCH & RECRUITER CONTACT HUB
      ========================================================================= */}
      <section id="contact" className="relative py-24 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto z-10 border-t border-white/[0.06]">
        
        <div className="text-left mb-12 sm:mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#d8c8a8] mb-2">
            // 06 · INITIATE CONTACT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-syne">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
            I am actively interviewing for <span className="text-white font-medium">Software Engineering & Full-Stack Internship</span> roles in Da Nang or Remote. Whether you have an open engineering role, a technical inquiry, or want to discuss architecture, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Credentials */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1-Click Copy Email Card */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center justify-between">
                <span>Direct Email Contact</span>
                <span className="text-emerald-400 font-bold">1-Click Copy</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-sm font-mono text-white select-all">
                  ducnv179.wk@gmail.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/[0.08] hover:bg-[#d8c8a8] hover:text-black text-white transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {emailCopied && (
                <p className="text-xs font-mono text-emerald-400 animate-fadeIn">
                  ✓ Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Direct Information List */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl space-y-4 font-mono text-xs">
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone className="w-4 h-4 text-[#d8c8a8]" />
                <span>078.855.1709</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#d8c8a8]" />
                <span>Da Nang, Viet Nam (Hybrid / Remote Ready)</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Award className="w-4 h-4 text-[#d8c8a8]" />
                <span>University of Greenwich (Vietnam Campus)</span>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/NguyenVanDuc_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-center transition-all group"
              >
                <FileText className="w-5 h-5 mx-auto text-[#d8c8a8] mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-mono font-bold text-white">Download CV</div>
                <div className="text-[10px] font-mono text-neutral-400">PDF Document</div>
              </a>

              <a
                href="https://linkedin.com/in/ducngvan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-center transition-all group"
              >
                <Linkedin className="w-5 h-5 mx-auto text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-mono font-bold text-white">LinkedIn</div>
                <div className="text-[10px] font-mono text-neutral-400">Connect with Duc</div>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Recruiter Message Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#d8c8a8]">
                  ADMIN TELEMETRY & INBOX
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-syne mt-0.5">
                  Send a Direct Inquiry
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline-block">
                Delivered straight to Duc
              </span>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins (Engineering Recruiter)"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#d8c8a8] focus:outline-none text-white text-sm font-sans placeholder-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Contact Email / Phone / LinkedIn
                </label>
                <input
                  type="text"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder="e.g. sarah@techcorp.com or linkedin.com/in/sarah"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#d8c8a8] focus:outline-none text-white text-sm font-sans placeholder-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Message / Role Details *
                </label>
                <textarea
                  rows={4}
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  placeholder="Describe the opportunity, internship track, tech stack, or questions..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#d8c8a8] focus:outline-none text-white text-sm font-sans placeholder-neutral-500 transition-colors resize-none"
                  required
                />
              </div>

              {sendError && (
                <p className="text-xs font-mono text-red-400">
                  {sendError}
                </p>
              )}

              {sendSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  ✓ Inquiry dispatched successfully! Your message has been routed to Nguyen Van Duc's verified inbox.
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-[#d8c8a8] to-amber-300 hover:brightness-110 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Direct Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 7: ARCHITECTURAL FOOTER
      ========================================================================= */}
      <footer className="relative py-12 px-4 sm:px-8 lg:px-14 border-t border-white/[0.08] bg-[#050608] z-10 font-mono text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="font-hand font-bold text-2xl text-white">
              nguyenvanduc
            </span>
            <span className="hidden sm:inline-block text-neutral-600">|</span>
            <span className="text-neutral-400">
              Da Nang, Viet Nam · {daNangTime}
            </span>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="text-neutral-400">
              mTLS Protected · Built with React, Tailwind CSS & Framer Motion
            </div>
            <div className="text-neutral-600 text-[11px]">
              © 2026 Nguyen Van Duc. All verified rights reserved.
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#d8c8a8] hover:text-[#d8c8a8] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowDown className="w-3.5 h-3.5 rotate-180" />
          </button>

        </div>
      </footer>

      {/* =========================================================================
          PORTAL MODALS
      ========================================================================= */}
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

export default ModernPortfolio;
