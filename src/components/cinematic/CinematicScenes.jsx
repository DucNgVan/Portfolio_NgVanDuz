import React, { useState, useEffect } from 'react';
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
  const [projectPage, setProjectPage] = useState(0);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
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

  const handleOpenCert = (cert) => {
    setInspectedCert(cert);
    analyticsService.trackEvent('cert_inspect', { certId: cert.id, title: cert.title });
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

  const filterCategories = [
    { id: 'all', label: 'ALL (5)' },
    { id: 'cms', label: 'SHAREPOINT CMS' },
    { id: 'web', label: 'WEB & 3D' },
    { id: 'backend', label: 'BACKEND' },
    { id: 'mobile', label: 'MOBILE' },
  ];

  const filteredProjects = githubProjects.filter((proj) => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'cms') return proj.id === 5;
    if (projectFilter === 'web') return proj.id === 1;
    if (projectFilter === 'backend') return proj.id === 2 || proj.id === 3;
    if (projectFilter === 'mobile') return proj.id === 4;
    return true;
  });

  const PAGE_SIZE = 4;
  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
  const currentProjects = filteredProjects.slice(projectPage * PAGE_SIZE, (projectPage + 1) * PAGE_SIZE);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      analyticsService.trackEvent('email_copy');
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  // Generous plateau visibility windows across the extended 900vh scroll
  const s1 = getScenePlateau(scrollProgress, 0.00, 0.00, 0.16, 0.23);
  const s2 = getScenePlateau(scrollProgress, 0.19, 0.26, 0.38, 0.45);
  const s3 = getScenePlateau(scrollProgress, 0.41, 0.48, 0.61, 0.68);
  const s4 = getScenePlateau(scrollProgress, 0.64, 0.70, 0.82, 0.88);
  const s5 = getScenePlateau(scrollProgress, 0.84, 0.89, 1.00, 1.00);

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
    // NHÓM 1: HỌC TẬP CHUYÊN NGÀNH & ĐỔI MỚI CÔNG NGHỆ
    // ----------------------------------------------------
    {
      id: 'top3_2024',
      category: 'academic',
      categoryLabel: 'Chuyên Ngành & Học Thuật',
      badge: 'TOP 3 TOÀN KHÓA',
      title: 'Top 3 Sinh Viên Xuất Sắc — Summer 2024',
      titleEn: 'Top 3 Outstanding Student — Summer 2024',
      issuer: 'University of Greenwich (Vietnam)',
      recipient: 'Nguyen Van Duc (GCD230006)',
      image: '/certificates/cert_top3_2024.jpg',
      year: '2024',
      verificationRef: 'GKDN240149 • QĐ: 157/QĐ-FPTUDN',
      description: 'Vinh danh thành tích học tập vượt trội, đứng trong Top 3 sinh viên có điểm GPA cao nhất toàn khóa cử nhân Quốc tế Greenwich (Đà Nẵng Campus).'
    },
    {
      id: 'best_student_icm_2026',
      category: 'academic',
      categoryLabel: 'Chuyên Ngành & Học Thuật',
      badge: 'THỦ KHOA MÔN HỌC',
      title: 'Thủ Khoa Môn Quản Trị Thông Tin & Nội Dung',
      titleEn: 'Best Student: Information & Content Management',
      issuer: 'Greenwich International Bachelor Program',
      recipient: 'Nguyen Van Duc (GCD230006)',
      image: '/certificates/cert_best_student_icm_2026.jpg',
      year: '2026',
      verificationRef: 'QĐ: 181 QH-PPTUDN • GKD2300025',
      description: 'Thủ khoa đạt điểm số xuất sắc nhất bộ môn Information and Content Management (COMP1643) kỳ Summer Trimester 2026, chứng nhận bởi Giám đốc Phân hiệu TS. Nguyễn Duy Nghiêm.'
    },
    {
      id: 'bootcamp_innovation_2025',
      category: 'academic',
      categoryLabel: 'Chuyên Ngành & Học Thuật',
      badge: 'GIẢI NHÌ TOÀN QUỐC',
      title: 'Giải Nhì Toàn Quốc — Impact Innovation Bootcamp 2025',
      titleEn: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
      issuer: 'Greenwich Vietnam & Đổi Mới Sáng Tạo Bệnh Viện',
      recipient: 'Nguyen Van Duc (GCD230006)',
      image: '/certificates/cert_bootcamp_innovation_2025.jpg',
      year: '2025',
      verificationRef: 'Director of Da Nang Campus: Dr. Nguyen Duy Nghiem',
      description: 'Giải Nhì cuộc thi Đổi mới Sáng tạo Công nghệ (Impact Innovation Bootcamp 2025) với giải pháp số hóa và chuyển đổi số quy trình y tế cộng đồng.'
    },

    // ----------------------------------------------------
    // NHÓM 2: CLB & KỸ NĂNG MỀM / CỐ VẤN
    // ----------------------------------------------------
    {
      id: 'peer_mentoring_2024',
      category: 'club_skill',
      categoryLabel: 'CLB & Cố Vấn Học Thuật',
      badge: 'MENTOR XUẤT SẮC',
      title: 'Chứng Nhận Mentor Xuất Sắc — Greenwich Peer Mentoring',
      titleEn: 'Certificate of Recognition — Peer Mentoring Club (GPM)',
      issuer: 'Greenwich Peer Mentoring Club & Ban CTSV',
      recipient: 'Nguyen Van Duc',
      image: '/certificates/cert_peer_mentoring_2024.jpg',
      year: '2024',
      verificationRef: 'Trưởng ngành QTKD: ThS. Nguyễn Minh Hải & Chủ nhiệm GPM: Đinh Văn Thanh Khởi',
      description: 'Vinh danh đóng góp nổi bật và tích cực với vai trò Mentor hướng dẫn, hỗ trợ học tập và phát triển kỹ năng cho sinh viên khóa mới trong suốt 7 tuần Fall 2024.'
    },
    {
      id: 'gnews_club_2024',
      category: 'club_skill',
      categoryLabel: 'CLB & Kỹ Năng Mềm',
      badge: 'CLB BÁO CHÍ',
      title: 'Thành Viên Tích Cực — CLB Báo Chí GNews 2024',
      titleEn: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
      issuer: 'Ban Công Tác Sinh Viên & CLB GNews',
      recipient: 'Nguyen Van Duc',
      image: '/certificates/cert_gnews_club_2024.jpg',
      year: '2024',
      verificationRef: 'Trưởng Ban CTSV Mai Đoàn Ngọc Tuyết Oanh & Ban Chủ Nhiệm GNews',
      description: 'Chứng nhận đóng góp tích cực và nổi bật trong ban kỹ thuật và truyền thông báo chí đại học, tham gia biên tập ấn phẩm và truyền thông sự kiện công nghệ sinh viên.'
    },
    {
      id: 'gmc_music_club',
      category: 'club_skill',
      categoryLabel: 'CLB & Kỹ Năng Mềm',
      badge: 'CLB ÂM NHẠC',
      title: 'Thành Tích Xuất Sắc — Đêm Nhạc "Under the Baubles"',
      titleEn: 'Outstanding Participation — "Under the Baubles" Musical Night',
      issuer: 'Greenwich Music Club (GMC) & Ban CTSV',
      recipient: 'Nguyen Van Duc',
      image: '/certificates/cert_gmc_music_club.jpg',
      year: '2024',
      verificationRef: 'Chủ nhiệm CLB Lê Tất Chương & Trưởng Ban CTSV Mai Đoàn Ngọc Tuyết Oanh',
      description: 'Vinh danh đóng góp nổi bật trong ban tổ chức và tham gia biểu diễn tại đêm đại nhạc hội "Under the Baubles", khẳng định kỹ năng tổ chức sự kiện, gắn kết đội ngũ và kỹ năng mềm.'
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
            <h2 
              style={largeTitleParallax}
              className="text-2xl sm:text-4xl lg:text-[40px] font-black font-sans uppercase tracking-tight text-[#111113] leading-none mb-1.5 select-none cursor-default"
            >
              Engineering Workflow & <br />
              <span 
                style={{
                  backgroundImage: `linear-gradient(${gradientAngle}deg, #0284c7 0%, #8c7355 50%, #c5a880 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Tech Stack
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
          Layout: Model glides to RIGHT (ZOOMED OUT), UI on the LEFT (Interleaved!)
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-16 sm:pt-20 pb-6 transition-opacity duration-300"
        style={{ opacity: s3.opacity, pointerEvents: s3.pointerEvents }}
      >
        <div className="w-full max-w-lg lg:max-w-[34rem] xl:max-w-[36rem] flex flex-col items-start text-left">
          
          {/* Dynamic Interactive Large Headline */}
          <h2 
            style={largeTitleParallax}
            className="text-xl sm:text-2xl lg:text-3xl font-black font-sans uppercase tracking-tight text-[#111113] mb-1 select-none cursor-default"
          >
            System Vault Releases
          </h2>

          <p className="text-[11px] sm:text-xs text-[#66625d] font-sans mb-2">
            Click any project card to inspect screenshots, system architecture, and live links:
          </p>

          {/* Project Category & Pagination Controls */}
          <div className="w-full flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setProjectFilter(cat.id);
                    setProjectPage(0);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
                    projectFilter === cat.id
                      ? 'bg-[#111113] text-white shadow-sm'
                      : 'bg-black/5 hover:bg-black/10 text-[#666]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setProjectPage((prev) => Math.max(0, prev - 1))}
                  disabled={projectPage === 0}
                  className="p-1 rounded-lg bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  title="Previous page"
                >
                  <ChevronLeft className="w-3 h-3 text-[#111113]" />
                </button>
                <span className="text-[9px] font-mono font-bold text-[#8c7355] px-1">
                  {projectPage + 1}/{totalPages}
                </span>
                <button
                  onClick={() => setProjectPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={projectPage === totalPages - 1}
                  className="p-1 rounded-lg bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  title="Next page"
                >
                  <ChevronRight className="w-3 h-3 text-[#111113]" />
                </button>
              </div>
            )}
          </div>

          {/* Project 2x2 Grid on Left Side with Dedicated Demo Image Frame */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {currentProjects.map((proj, idx) => {
              const displayIndex = projectPage * PAGE_SIZE + idx + 1;
              return (
                <div 
                  key={proj.id}
                  onClick={() => handleOpenProject(proj)}
                  className="w-full rounded-2xl bg-white/95 border border-black/[0.08] hover:border-[#bfa074] p-2.5 sm:p-3 transition-all duration-300 backdrop-blur-xl group hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] cursor-pointer flex flex-col justify-between hover:scale-[1.01]"
                >
                  <div>
                    {/* Dedicated Project Demo Image Preview Area */}
                    <div className="relative aspect-[16/8] max-h-24 sm:max-h-26 w-full rounded-xl overflow-hidden mb-1.5 border border-black/[0.08] bg-neutral-100 group">
                      {proj.image ? (
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#888] p-2 text-center">
                          <ImageIcon className="w-5 h-5 mb-0.5 text-[#bfa074]" />
                          <span className="text-[9px] font-mono font-bold tracking-wider">DEMO PREVIEW</span>
                        </div>
                      )}
                      
                      {proj.liveDemo && (
                        <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[8px] font-mono font-bold shadow-sm">
                          {proj.id === 5 ? 'SHAREPOINT' : 'LIVE'}
                        </span>
                      )}
                    </div>

                    <span className="text-[9px] font-mono text-[#8c7355] font-semibold block mb-0.5">
                      0{displayIndex} // {proj.category.split('·')[0].trim()}
                    </span>

                    <h3 className="text-xs sm:text-sm font-bold text-[#111113] group-hover:text-[#8c7355] transition-colors line-clamp-1 mb-0.5">
                      {proj.title.split('—')[0].trim()}
                    </h3>

                    <p className="text-[10px] sm:text-[11px] text-[#555] font-sans line-clamp-1 leading-snug mb-1">
                      {proj.tagline || proj.description}
                    </p>

                    {proj.accessNote && (
                      <div className="mb-1 flex items-center gap-1 text-[8.5px] font-mono text-amber-800 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded">
                        <span>⚠️ Institutional Link (May Expire)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-black/[0.05]">
                    <span className="text-[9px] font-mono text-[#888] line-clamp-1 max-w-[120px]">
                      {proj.tech[0]} • {proj.tech[1]}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProject(proj);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1a1a1a] hover:bg-black text-white font-mono font-bold text-[9px] transition-all shadow-sm cursor-pointer hover:scale-105 shrink-0"
                    >
                      <Eye className="w-2.5 h-2.5 text-[#d8c8a8]" />
                      <span>Details ➔</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCENE 04: HALL OF HONORS (3D EXHIBITION GALLERY - SPOTLIGHT AMPHITHEATER)
          Layout: 
          - Model in FOREGROUND CENTER, squarely admiring certificates
          - 6 Exhibition Pedestals in deep background crescent amphitheater
          - Overhead theatrical spotlights shining down over each plinth
          - 100% clean, unobstructed 3D view (direct click on 3D pedestals)
      ========================================================================= */}
      <section 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: s4.opacity }}
      />

      {/* =========================================================================
          SCENE 05: FINAL TRANSMISSION (CONTACT & QUICK ADMIN DISPATCH)
          Layout: Model glides to RIGHT (Normal Zoom), UI on the LEFT (Interleaved!)
      ========================================================================= */}
      <section 
        className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-20 xl:px-24 pt-20 sm:pt-24 pb-12 transition-opacity duration-300 overflow-y-auto"
        style={{ opacity: s5.opacity, pointerEvents: s5.pointerEvents }}
      >
        <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-start text-left my-auto">
          
          {/* Dynamic Interactive Large Headline */}
          <h2 
            style={largeTitleParallax}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-[#111113] mb-3 select-none cursor-default"
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
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-8 pt-8 sm:pt-12 pb-20 pointer-events-auto overflow-y-auto animate-fadeIn"
          onClick={() => setInspectedProject(null)}
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
                onClick={() => setInspectedProject(null)}
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
                onClick={() => setInspectedProject(null)}
                className="ml-auto px-4 py-2 rounded-full text-xs font-mono text-[#777] hover:text-black transition-colors"
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
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-8 pt-8 sm:pt-12 pb-20 pointer-events-auto overflow-y-auto animate-fadeIn"
          onClick={() => setInspectedCert(null)}
        >
          <div 
            className="relative w-full max-w-4xl flex flex-col items-center bg-[#111218] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl text-white my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Archival Museum Matting Frame (No extra white padding) */}
            <div className="w-full flex items-center justify-center p-2 sm:p-3 rounded-2xl bg-black/60 border border-white/10 mb-4 shadow-inner">
              <img 
                src={inspectedCert.image} 
                alt={inspectedCert.title} 
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl" 
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
                    {inspectedCert.category === 'academic' ? '🎓 Chuyên Ngành & Học Thuật' : '🎭 CLB & Kỹ Năng Mềm'}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-full bg-white/5 text-[#dfc58d] border border-white/10">
                    {inspectedCert.badge}
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-400">
                  Năm {inspectedCert.year}
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-bold text-white font-sans mb-1">
                {inspectedCert.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-neutral-400 mb-2.5 font-medium">
                <span>Cấp bởi: <strong className="text-neutral-200">{inspectedCert.issuer}</strong></span>
                {inspectedCert.recipient && (
                  <span>Khen tặng: <strong className="text-neutral-200">{inspectedCert.recipient}</strong></span>
                )}
                {inspectedCert.verificationRef && (
                  <span className="text-[#dfc58d]">Xác thực: <strong>{inspectedCert.verificationRef}</strong></span>
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
