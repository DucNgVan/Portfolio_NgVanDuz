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
  Copy, 
  ExternalLink, 
  Eye, 
  Lock, 
  Mail, 
  Menu, 
  MessageSquare, 
  Phone, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Trophy, 
  X, 
  Zap, 
  Code2, 
  Layers, 
  Database 
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
import Mobile3DHero from './Mobile3DHero';

export const MobilePortfolio = () => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inspectedCert, setInspectedCert] = useState(null);
  const [inspectedProject, setInspectedProject] = useState(null);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [techCategoryFilter, setTechCategoryFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [certCategoryFilter, setCertCategoryFilter] = useState('all'); // 'all', 'academic', 'club_skill'

  // Quick Message state
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [messageSending, setMessageSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [messageError, setMessageError] = useState('');

  // Lock background scroll when modal is open
  useEffect(() => {
    if (inspectedProject || inspectedCert || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [inspectedProject, inspectedCert, mobileMenuOpen]);

  // Track visit on mobile mount
  useEffect(() => {
    analyticsService.trackVisit();
  }, []);

  const handleOpenProject = (proj) => {
    setActiveImgIndex(0);
    setInspectedProject(proj);
    analyticsService.trackEvent('project_inspect', { projectId: proj.id, title: proj.title });
  };

  const handleOpenCert = (cert) => {
    setInspectedCert(cert);
    analyticsService.trackEvent('cert_inspect', { certId: cert.id, title: cert.title });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      analyticsService.trackEvent('email_copy');
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  const handleSendQuickMessage = (e) => {
    e.preventDefault();
    if (!quickMessage.trim()) {
      setMessageError('Please enter a brief note or proposal.');
      return;
    }
    setMessageSending(true);
    setMessageError('');

    setTimeout(() => {
      analyticsService.addMessage({
        senderName: senderName.trim() || 'Mobile Recruiter / Visitor',
        senderContact: senderContact.trim() || 'Mobile Direct Message',
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

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filterCategories = [
    { id: 'all', label: 'ALL (5)' },
    { id: 'cms', label: 'SHAREPOINT' },
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

  const techStackList = [
    { name: 'Node.js', category: 'backend', icon: NodejsIcon },
    { name: 'Express.js', category: 'backend', icon: ExpressIcon },
    { name: 'PostgreSQL', category: 'backend', icon: PostgresIcon },
    { name: 'MongoDB', category: 'backend', icon: MongodbIcon },
    { name: 'Redis', category: 'backend', icon: RedisIcon },
    { name: 'Docker', category: 'backend', icon: DockerIcon },
    { name: 'React', category: 'frontend', icon: ReactIcon },
    { name: 'Next.js 14', category: 'frontend', icon: NextjsIcon },
    { name: 'TypeScript', category: 'frontend', icon: TypescriptIcon },
    { name: 'Tailwind CSS', category: 'frontend', icon: TailwindIcon },
    { name: 'Three.js', category: 'frontend', icon: ThreejsIcon },
    { name: 'Vue.js', category: 'frontend', icon: VueIcon },
    { name: 'Java', category: 'backend', icon: JavaIcon },
    { name: 'Git & GitHub', category: 'tools', icon: GitIcon },
    { name: 'Postman', category: 'tools', icon: PostmanIcon },
    { name: 'Firebase', category: 'tools', icon: FirebaseIcon },
  ];

  const filteredTech = techStackList.filter((item) => {
    if (techCategoryFilter === 'all') return true;
    return item.category === techCategoryFilter;
  });

  const workflowSteps = [
    {
      num: '01',
      title: 'Architecture & Schema Blueprint',
      deliverables: ['28-Table 3NF PostgreSQL', 'Knex Migrations & Rollbacks', 'Mongoose Schemas', 'OpenAPI / Postman Contracts'],
      provenIn: 'Nomadix (28 Tables), Helpdesk, VAVA CMS',
      desc: 'Engineered a normalized 28-table 3NF relational schema for Nomadix eliminating data redundancy with Knex migration rollbacks.'
    },
    {
      num: '02',
      title: 'Core Execution & 3D Web',
      deliverables: ['Express REST APIs', 'Three.js 60fps Optimization', 'Vue 3 & React Portals', 'SharePoint REST Lists'],
      provenIn: 'NÉT STUDIO (3D Web), Nomadix, Helpdesk',
      desc: 'Architected high-throughput REST APIs and immersive WebGL 3D model visualizer running at silky 60fps.'
    },
    {
      num: '03',
      title: 'Optimization, Cache & Auth',
      deliverables: ['Redis In-Memory Sub-ms Cache', 'JWT Dual-Token Rotation', 'bcrypt Password Hashing', 'Rate Limiting Guard'],
      provenIn: 'Nomadix (Redis Cache), M-Hike',
      desc: 'Implemented Redis in-memory caching cutting endpoint latency by 68%. Secured routes with JWT access/refresh token rotation.'
    },
    {
      num: '04',
      title: 'Containerization & Delivery',
      deliverables: ['Multi-Stage Dockerfiles', 'Docker Compose Network', 'Automated GitHub Actions', 'PM2 Cluster Monitoring'],
      provenIn: 'Nomadix, Nét Studio Production',
      desc: 'Containerized microservices into lightweight Docker images. Configured automated build, test, and zero-downtime deployment.'
    }
  ];

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
      year: '2024',
      image: '/certificates/cert_top3_2024.jpg',
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
      year: '2026',
      image: '/certificates/cert_best_student_icm_2026.jpg',
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
      year: '2025',
      image: '/certificates/cert_bootcamp_innovation_2025.jpg',
      verificationRef: 'Director of Da Nang Campus: Dr. Nguyen Duy Nghiem',
      description: 'Giải Nhì cuộc thi Đổi mới Sáng tạo Công nghệ (Impact Innovation Bootcamp 2025) với giải pháp số hóa và chuyển đổi số quy trình y tế cộng đồng.'
    },

    // ----------------------------------------------------
    // NHÓM 2: CLB & KỸ NĂNG MỀM
    // ----------------------------------------------------
    {
      id: 'gnews_club_2024',
      category: 'club_skill',
      categoryLabel: 'CLB & Kỹ Năng Mềm',
      badge: 'CLB BÁO CHÍ',
      title: 'Thành Viên Tích Cực — CLB Báo Chí GNews 2024',
      titleEn: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
      issuer: 'Ban Công Tác Sinh Viên & CLB GNews',
      recipient: 'Nguyen Van Duc',
      year: '2024',
      image: '/certificates/cert_gnews_club_2024.jpg',
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
      year: '2024',
      image: '/certificates/cert_gmc_music_club.jpg',
      verificationRef: 'Chủ nhiệm CLB Lê Tất Chương & Trưởng Ban CTSV Mai Đoàn Ngọc Tuyết Oanh',
      description: 'Vinh danh đóng góp nổi bật trong ban tổ chức và tham gia biểu diễn tại đêm đại nhạc hội "Under the Baubles", khẳng định kỹ năng tổ chức sự kiện, gắn kết đội ngũ và kỹ năng mềm.'
    },
  ];

  const filteredCertificates = certCategoryFilter === 'all'
    ? certificates
    : certificates.filter((c) => c.category === certCategoryFilter);

  const projectGallery = inspectedProject?.images && inspectedProject.images.length > 0
    ? inspectedProject.images
    : inspectedProject?.image 
      ? [{ url: inspectedProject.image, title: inspectedProject.title, caption: inspectedProject.tagline || inspectedProject.description }]
      : [];

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#111113] font-sans selection:bg-[#d8c8a8] selection:text-black pb-16">
      
      {/* 1. Mobile Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-[#f8f7f4]/90 backdrop-blur-md border-b border-black/[0.06] px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-sans font-black text-sm tracking-tight text-[#111113]">
          nguyenvanduc
        </a>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open for Internship
          </span>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl bg-black/[0.04] text-[#111113] active:bg-black/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 2. Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[49px] z-30 bg-[#f8f7f4]/98 backdrop-blur-xl p-6 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-4 pt-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="w-full text-left py-2.5 text-lg font-black font-sans tracking-tight border-b border-black/[0.06]"
            >
              01 // Introduction
            </button>
            <button
              onClick={() => scrollToSection('workflow')}
              className="w-full text-left py-2.5 text-lg font-black font-sans tracking-tight border-b border-black/[0.06]"
            >
              02 // Engineering Workflow
            </button>
            <button
              onClick={() => scrollToSection('techstack')}
              className="w-full text-left py-2.5 text-lg font-black font-sans tracking-tight border-b border-black/[0.06]"
            >
              03 // Tech Stack Toolkit
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full text-left py-2.5 text-lg font-black font-sans tracking-tight border-b border-black/[0.06]"
            >
              04 // Featured Projects
            </button>
            <button
              onClick={() => scrollToSection('honors')}
              className="w-full text-left py-2.5 text-lg font-black font-sans tracking-tight border-b border-black/[0.06]"
            >
              05 // Verified Honors
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-left py-2.5 text-lg font-black font-sans tracking-tight border-b border-black/[0.06] text-[#8c7355]"
            >
              06 // Contact & Quick Message
            </button>
          </div>

          <div className="pt-6 border-t border-black/10 flex items-center justify-between text-xs font-mono text-[#666]">
            <a href="tel:0788551709" className="flex items-center gap-1 font-bold text-[#111113]">
              <Phone className="w-3.5 h-3.5" />
              <span>078.855.1709</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.hash = '#admin';
              }}
              className="flex items-center gap-1 text-[#8c7355]"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}

      {/* =======================================================================
          SECTION 1: HERO & INTERACTIVE 3D CHARACTER
      ======================================================================= */}
      <section id="hero" className="px-4 pt-4 pb-8 max-w-lg mx-auto">
        
        {/* Dedicated Touch-Interactive 3D Canvas */}
        <div className="mb-5">
          <Mobile3DHero />
        </div>

        {/* Hero Title & Identity */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#8c7355]">
              // NGUYEN VAN DUC
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c7355]" />
            <span className="text-[10px] font-mono text-[#666]">Da Nang, Vietnam</span>
          </div>

          <h1 className="text-3xl font-black font-sans uppercase tracking-tight text-[#111113] leading-none mb-3">
            Software <br />
            <span className="bg-gradient-to-r from-[#111113] via-[#8c7355] to-[#c5a880] bg-clip-text text-transparent">
              Engineer.
            </span>
          </h1>

          <p className="text-xs text-[#555] font-sans leading-relaxed mb-4">
            Specializing in high-concurrency Node.js/PostgreSQL backends, normalized 3NF schemas, and immersive WebGL 3D web applications.
          </p>

          {/* Quick Stats Pills */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="p-3 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
              <span className="text-[9.5px] font-mono text-[#888] block uppercase">ACADEMIC RANK</span>
              <span className="text-xs font-bold text-[#111113] block mt-0.5">Top 3 Student</span>
              <span className="text-[9.5px] font-mono text-[#8c7355]">Greenwich VN 2024</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
              <span className="text-[9.5px] font-mono text-[#888] block uppercase">PRODUCTION CAPSTONES</span>
              <span className="text-xs font-bold text-[#111113] block mt-0.5">5+ Core Systems</span>
              <span className="text-[9.5px] font-mono text-[#8c7355]">Full-Stack & 3D</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <a
              href={personalInfo.resumeUrl}
              download
              onClick={() => analyticsService.trackEvent('cv_download')}
              className="flex-1 py-3 rounded-2xl bg-[#111113] text-white font-mono font-bold text-xs text-center shadow-lg active:scale-95 transition-transform"
            >
              Get Resume (PDF) ↗
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex-1 py-3 rounded-2xl bg-white border border-black/10 text-[#111113] font-mono font-bold text-xs shadow-sm active:scale-95 transition-transform"
            >
              Quick Message
            </button>
          </div>
        </div>

      </section>

      {/* =======================================================================
          SECTION 2: ENGINEERING WORKFLOW
      ======================================================================= */}
      <section id="workflow" className="px-4 py-8 max-w-lg mx-auto">
        <div className="text-left mb-4">
          <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8c7355] mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>4-Stage Lifecycle</span>
          </div>
          <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-[#111113]">
            Engineering Workflow
          </h2>
          <p className="text-xs text-[#666] font-sans mt-1">
            Proven methodologies synthesized from 5 production & capstone systems:
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mb-3 bg-black/[0.03] p-1.5 rounded-2xl border border-black/[0.06]">
          {workflowSteps.map((step, idx) => (
            <button
              key={step.num}
              onClick={() => setActiveWorkflowStep(idx)}
              className={`py-2 rounded-xl text-center transition-all ${
                activeWorkflowStep === idx
                  ? 'bg-white text-[#111113] font-bold shadow-sm'
                  : 'text-[#777]'
              }`}
            >
              <span className="block text-[10px] font-mono font-bold">{step.num}</span>
              <span className="block text-[8.5px] font-mono uppercase truncate px-0.5">
                {idx === 0 ? 'Blueprint' : idx === 1 ? '3D Web' : idx === 2 ? 'Cache' : 'Deploy'}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Card */}
        <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm text-left animate-fadeIn">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-black/[0.06]">
            <span className="text-[10px] font-mono font-bold text-[#8c7355] uppercase">
              PHASE {workflowSteps[activeWorkflowStep].num} // ARCHITECTURE
            </span>
            <span className="text-[9.5px] font-mono text-[#888]">
              {workflowSteps[activeWorkflowStep].provenIn}
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#111113] font-sans mb-1.5">
            {workflowSteps[activeWorkflowStep].title}
          </h3>

          <p className="text-xs text-[#555] font-sans leading-relaxed mb-3">
            {workflowSteps[activeWorkflowStep].desc}
          </p>

          <span className="text-[10px] font-mono font-bold text-[#888] uppercase block mb-1.5">
            KEY DELIVERABLES:
          </span>
          <div className="space-y-1">
            {workflowSteps[activeWorkflowStep].deliverables.map((del, dIdx) => (
              <div key={dIdx} className="flex items-center gap-2 text-xs text-[#333] font-sans">
                <span className="text-[#8c7355] font-bold text-[11px]">✓</span>
                <span>{del}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 3: TECH STACK TOOLKIT
      ======================================================================= */}
      <section id="techstack" className="px-4 py-8 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-3 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8c7355] mb-0.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Production Stack</span>
            </div>
            <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-[#111113]">
              Tech Toolkit
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 text-[10.5px] font-mono">
            {['all', 'backend', 'frontend', 'tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setTechCategoryFilter(cat)}
                className={`px-2 py-1 rounded-lg capitalize transition-colors ${
                  techCategoryFilter === cat
                    ? 'bg-[#111113] text-white font-bold'
                    : 'bg-black/[0.04] text-[#666]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 16 Technologies Grid */}
        <div className="grid grid-cols-2 gap-2 text-left">
          {filteredTech.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="p-2.5 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-[#111113] font-mono block truncate">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#888] uppercase block">
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =======================================================================
          SECTION 4: FEATURED PROJECTS
      ======================================================================= */}
      <section id="projects" className="px-4 py-8 max-w-lg mx-auto">
        <div className="text-left mb-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8c7355] mb-0.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>5 Core Systems</span>
          </div>
          <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-[#111113]">
            Featured Projects
          </h2>
        </div>

        {/* Project Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-4 pb-1">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setProjectFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                projectFilter === cat.id
                  ? 'bg-[#111113] text-white shadow-sm'
                  : 'bg-white border border-black/10 text-[#666]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-4">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-3xl bg-white border border-black/[0.08] shadow-sm text-left flex flex-col justify-between"
            >
              <div>
                {/* Mockup Preview Image (Clean, no floating badges) */}
                <div 
                  onClick={() => handleOpenProject(proj)}
                  className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-3 border border-black/10 cursor-pointer group shadow-sm"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono text-[#8c7355] font-semibold uppercase tracking-wider line-clamp-1">
                    {proj.category}
                  </span>
                  {proj.liveDemo && (
                    <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-base font-black font-sans uppercase tracking-tight text-[#111113] mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#555] font-sans leading-relaxed mb-3">
                  {proj.tagline || proj.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-black/[0.04] text-[9.5px] font-mono text-[#444]">
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-black/[0.04] text-[9.5px] font-mono text-[#888]">
                      +{proj.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-black/[0.06]">
                <button
                  onClick={() => handleOpenProject(proj)}
                  className="flex-1 py-2.5 rounded-xl bg-[#111113] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <span>Inspect Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#d8c8a8]" />
                </button>
                {proj.liveDemo && (
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/[0.05] text-[#111113] hover:bg-black/10 active:scale-95 transition-transform"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/[0.05] text-[#111113] hover:bg-black/10 active:scale-95 transition-transform"
                    title="GitHub"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* =======================================================================
          SECTION 5: VERIFIED HONORS & MILESTONES
      ======================================================================= */}
      <section id="honors" className="px-4 py-8 max-w-lg mx-auto">
        <div className="text-left mb-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8c7355] mb-0.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>Academic & Competitions</span>
          </div>
          <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-[#111113]">
            Verified Honors
          </h2>
          <p className="text-xs text-[#666] font-sans mt-0.5 mb-2.5">
            Tap any credential to view verified official certificate:
          </p>

          {/* Category Filter Pills on Mobile */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.04] border border-black/[0.06] w-full">
            <button
              onClick={() => setCertCategoryFilter('all')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[9.5px] font-mono font-bold transition-all text-center ${
                certCategoryFilter === 'all'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-[#666]'
              }`}
            >
              Tất cả (5)
            </button>
            <button
              onClick={() => setCertCategoryFilter('academic')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[9.5px] font-mono font-bold transition-all flex items-center justify-center gap-0.5 ${
                certCategoryFilter === 'academic'
                  ? 'bg-white text-[#9a6728] shadow-xs'
                  : 'text-[#666]'
              }`}
            >
              <span>🎓</span>
              <span>Chuyên Ngành (3)</span>
            </button>
            <button
              onClick={() => setCertCategoryFilter('club_skill')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[9.5px] font-mono font-bold transition-all flex items-center justify-center gap-0.5 ${
                certCategoryFilter === 'club_skill'
                  ? 'bg-white text-[#4f46e5] shadow-xs'
                  : 'text-[#666]'
              }`}
            >
              <span>🎭</span>
              <span>CLB & Kỹ Năng (2)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => handleOpenCert(cert)}
              className="p-2.5 rounded-2xl bg-white border border-black/[0.08] shadow-sm text-left flex flex-col justify-between active:scale-98 transition-transform cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-2 bg-neutral-900 border border-black/10">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-1 left-1 flex flex-col gap-1">
                    <span className="text-[7px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/80 text-white">
                      {cert.badge}
                    </span>
                  </div>
                  <div className="absolute top-1 right-1">
                    <span className={`text-[7px] font-mono font-bold px-1 py-0.5 rounded ${
                      cert.category === 'academic' ? 'bg-[#c5a880] text-black' : 'bg-[#6366f1] text-white'
                    }`}>
                      {cert.category === 'academic' ? '🎓 Ngành' : '🎭 CLB'}
                    </span>
                  </div>
                </div>

                <h3 className="text-xs font-bold text-[#111113] line-clamp-2 mb-1">
                  {cert.title}
                </h3>
                <span className="text-[9.5px] font-mono text-[#777] block line-clamp-1">
                  {cert.issuer}
                </span>
              </div>

              <div className="mt-2 pt-1.5 border-t border-black/[0.06] flex items-center justify-between text-[9px] font-mono text-[#8c7355]">
                <span>{cert.year}</span>
                <span className="font-bold flex items-center gap-0.5">View ↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================================================================
          SECTION 6: CONTACT & DIRECT DISPATCH
      ======================================================================= */}
      <section id="contact" className="px-4 py-8 max-w-lg mx-auto">
        <div className="text-left mb-4">
          <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8c7355] mb-0.5">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inbox</span>
          </div>
          <h2 className="text-3xl font-black font-sans uppercase tracking-tight text-[#111113] leading-none mb-2">
            Let's Build <br />
            <span className="bg-gradient-to-r from-[#111113] via-[#8c7355] to-[#c5a880] bg-clip-text text-transparent">
              Together.
            </span>
          </h2>
          <p className="text-xs text-[#555] font-sans">
            Ready for software engineering internships, backend challenges, and creative collaborations.
          </p>
        </div>

        {/* Quick Message Card */}
        <div className="p-4 rounded-3xl bg-white border border-black/[0.08] shadow-sm mb-4 text-left">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/[0.06]">
            <span className="text-[10px] font-mono font-bold uppercase text-[#111113] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Recruiter Dispatch</span>
            </span>
            <span className="text-[9px] font-mono text-[#888]">To Duc's Admin</span>
          </div>

          {messageSent ? (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Message dispatched to Admin Portal! Duc will reply soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSendQuickMessage} className="space-y-2.5">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your Name or Company"
                className="w-full px-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white"
              />
              <input
                type="text"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                placeholder="Email / Phone / LinkedIn"
                className="w-full px-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white"
              />
              <textarea
                rows={2}
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="Brief message, job opportunity, or technical inquiry..."
                className="w-full px-3 py-2 rounded-xl bg-black/[0.03] border border-black/[0.08] text-xs font-sans text-[#111113] placeholder-[#888] focus:outline-none focus:border-[#8c7355] focus:bg-white resize-none"
              />

              {messageError && (
                <p className="text-[10px] text-rose-600 font-mono">{messageError}</p>
              )}

              <button
                type="submit"
                disabled={messageSending}
                className="w-full py-2.5 rounded-xl bg-[#111113] text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-transform disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#d8c8a8]" />
                <span>{messageSending ? 'Sending...' : 'Send to Admin Inbox'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Email Copy Card */}
        <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-sm mb-4 text-left">
          <span className="text-[9.5px] font-mono text-[#888] block uppercase mb-1">DIRECT INBOX</span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-[#111113] truncate">
              {personalInfo.email}
            </span>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-xl bg-black/[0.05] text-[#111113] text-xs font-mono font-bold flex items-center gap-1 shrink-0"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Social Link Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#666] mb-8 font-medium">
          <a href="tel:0788551709" className="text-[#111113] font-bold">078.855.1709</a>
          <span>•</span>
          <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
          <span>•</span>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        {/* Footer info & Admin Gateway */}
        <div className="pt-6 border-t border-black/[0.08] text-center text-[10px] font-mono text-[#888] space-y-2">
          <p>© 2025 Nguyen Van Duc. Engineered with React, Three.js & Tailwind.</p>
          <button
            onClick={() => { window.location.hash = '#admin'; }}
            className="inline-flex items-center gap-1 text-[#8c7355] hover:text-black transition-colors"
          >
            <Lock className="w-2.5 h-2.5" />
            <span>Admin Console</span>
          </button>
        </div>

      </section>

      {/* =======================================================================
          INTERACTIVE MODAL 1: PROJECT SPOTLIGHT MODAL
      ======================================================================= */}
      {inspectedProject && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-start justify-center p-3 pt-6 pb-16 pointer-events-auto overflow-y-auto animate-fadeIn"
          onClick={() => setInspectedProject(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-white border border-black/10 rounded-3xl p-4 sm:p-6 shadow-2xl text-[#111113] my-2 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.08]">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-black/5 text-[#8c7355] font-bold">
                {inspectedProject.category}
              </span>
              <button
                onClick={() => setInspectedProject(null)}
                className="p-1 rounded-full bg-black/5 text-[#444] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery Slide */}
            {projectGallery.length > 0 && (
              <div className="relative w-full mb-4 select-none">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-black/10 flex items-center justify-center p-1">
                  <img
                    src={projectGallery[activeImgIndex]?.url || inspectedProject.image}
                    alt={projectGallery[activeImgIndex]?.caption || inspectedProject.title}
                    className="w-full h-full object-contain"
                  />
                  {projectGallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : projectGallery.length - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveImgIndex((prev) => (prev < projectGallery.length - 1 ? prev + 1 : 0))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {projectGallery.length > 1 && (
                  <div className="flex items-center justify-between mt-1 px-1 text-[10px] font-mono text-[#888]">
                    <span>{projectGallery[activeImgIndex]?.caption}</span>
                    <span>{activeImgIndex + 1} / {projectGallery.length}</span>
                  </div>
                )}
              </div>
            )}

            {/* Title */}
            <h2 className="text-xl font-black font-sans uppercase tracking-tight text-[#111113] mb-1">
              {inspectedProject.title}
            </h2>
            <p className="text-xs text-[#555] font-sans mb-3">
              {inspectedProject.tagline || inspectedProject.description}
            </p>

            {/* Problem & Solution */}
            {inspectedProject.problem && (
              <div className="space-y-2 mb-3">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-mono text-amber-800 font-bold block mb-0.5">PROBLEM</span>
                  <p className="text-xs text-amber-950 leading-relaxed">{inspectedProject.problem}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-mono text-emerald-800 font-bold block mb-0.5">SOLUTION</span>
                  <p className="text-xs text-emerald-950 leading-relaxed">{inspectedProject.solution}</p>
                </div>
              </div>
            )}

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1 mb-4">
              {inspectedProject.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md bg-black/5 text-[10px] font-mono text-[#333]">
                  {t}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-black/10">
              {inspectedProject.liveDemo && (
                <a
                  href={inspectedProject.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#111113] text-white font-mono font-bold text-xs text-center"
                >
                  Visit Demo ↗
                </a>
              )}
              {inspectedProject.githubUrl && (
                <a
                  href={inspectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-black/5 text-[#111113] font-mono font-bold text-xs text-center border border-black/10"
                >
                  GitHub
                </a>
              )}
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* =======================================================================
          INTERACTIVE MODAL 2: CERTIFICATE LIGHTBOX
      ======================================================================= */}
      {inspectedCert && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 pointer-events-auto overflow-y-auto animate-fadeIn"
          onClick={() => setInspectedCert(null)}
        >
          <div 
            className="relative w-full max-w-md bg-white border border-black/10 rounded-3xl p-4 shadow-2xl text-[#111113] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectedCert(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/5 text-[#555]"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={inspectedCert.image}
              alt={inspectedCert.title}
              className="w-full max-h-[50vh] object-contain rounded-2xl border border-black/10 shadow-sm mb-3"
            />

            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                inspectedCert.category === 'academic'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
              }`}>
                {inspectedCert.category === 'academic' ? '🎓 Chuyên Ngành' : '🎭 CLB & Kỹ Năng'}
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/5 text-[#8c7355] border border-black/10">
                {inspectedCert.badge}
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#111113] font-sans mb-1">
              {inspectedCert.title}
            </h3>
            
            <div className="text-[10px] font-mono text-[#666] mb-2 space-y-0.5">
              <p>Cấp bởi: <strong className="text-black">{inspectedCert.issuer}</strong> ({inspectedCert.year})</p>
              {inspectedCert.verificationRef && (
                <p className="text-[#8c7355]">Xác thực: {inspectedCert.verificationRef}</p>
              )}
            </div>

            <p className="text-xs text-[#555] font-sans leading-relaxed bg-black/[0.02] p-2.5 rounded-xl border border-black/5">
              {inspectedCert.description}
            </p>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

function certIssuerBadge(cert) {
  return `${cert.issuer} • ${cert.year} [${cert.badge}]`;
}

export default MobilePortfolio;
