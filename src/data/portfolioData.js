export const personalInfo = {
  name: "Nguyen Van Duc",
  role: "Software Engineering & Creative Coder",
  status: "Available for new opportunities & freelance projects",
  location: "Hanoi / Ho Chi Minh City, Vietnam",
  email: "contact.developer@example.com",
  phone: "+84 987 654 321",
  github: "https://github.com/DucNgVan",
  linkedin: "https://linkedin.com/in/ducngvan",
  bio: "A passionate software engineer dedicated to building high-performance, interactive, and beautifully crafted web applications. Combining robust engineering fundamentals with refined UI/UX sensibilities.",
  stats: [
    { label: "Experience & Education", value: "3+", suffix: " yrs" },
    { label: "Completed Projects", value: "15+", suffix: " repos" },
    { label: "University GPA", value: "3.75", suffix: "/4.0" },
    { label: "Honors & Awards", value: "05", suffix: " awards" }
  ],
  terminalCommands: [
    { cmd: "whoami", output: "Full-Stack Engineer & Creative Coder" },
    { cmd: "cat passion.txt", output: "Clean Code, High-Performance Systems, Cyber UI/UX" },
    { cmd: "git status", output: "On branch main. Ready to ship innovative solutions!" }
  ]
};

export const techSkills = {
  frontend: [
    { name: "React.js / Next.js", level: 90, experience: "2+ yrs", color: "from-cyan-500 to-blue-500", highlight: "Core Frontend" },
    { name: "JavaScript (ES6+) / TypeScript", level: 92, experience: "3 yrs", color: "from-yellow-400 to-amber-500", highlight: "Language" },
    { name: "Tailwind CSS & Modern UI", level: 95, experience: "2.5 yrs", color: "from-teal-400 to-cyan-500", highlight: "Styling" },
    { name: "HTML5 / CSS3 / Web Animations", level: 92, experience: "3 yrs", color: "from-orange-500 to-rose-500", highlight: "Foundation" },
    { name: "Redux Toolkit / Zustand", level: 85, experience: "2 yrs", color: "from-purple-500 to-indigo-500", highlight: "State Mgmt" },
  ],
  backend: [
    { name: "Node.js & Express", level: 88, experience: "2+ yrs", color: "from-emerald-500 to-green-600", highlight: "Server Runtime" },
    { name: "RESTful APIs & GraphQL", level: 86, experience: "2 yrs", color: "from-pink-500 to-rose-600", highlight: "API Design" },
    { name: "PostgreSQL & MongoDB", level: 82, experience: "2 yrs", color: "from-blue-600 to-indigo-700", highlight: "Databases" },
    { name: "Python / FastAPI", level: 80, experience: "1.5 yrs", color: "from-yellow-500 to-emerald-500", highlight: "Backend & AI" },
    { name: "Redis & Caching", level: 75, experience: "1 yr", color: "from-red-500 to-amber-600", highlight: "Performance" },
  ],
  devopsAndTools: [
    { name: "Git & GitHub CI/CD", level: 90, experience: "3 yrs", color: "from-orange-600 to-red-500", highlight: "VCS & Workflows" },
    { name: "Docker & Containerization", level: 78, experience: "1.5 yrs", color: "from-blue-500 to-cyan-600", highlight: "DevOps" },
    { name: "Linux & Shell Scripting", level: 82, experience: "2 yrs", color: "from-slate-400 to-slate-200", highlight: "OS" },
    { name: "Vite, Webpack & Build Tools", level: 88, experience: "2 yrs", color: "from-violet-500 to-purple-600", highlight: "Tooling" },
    { name: "Postman & API Testing", level: 85, experience: "2.5 yrs", color: "from-amber-500 to-orange-500", highlight: "Testing" }
  ]
};

export const softSkills = [
  {
    id: "lang",
    title: "English Proficiency",
    badge: "IELTS 7.0 / Professional Working",
    score: 88,
    description: "In-depth technical reading, architecture documentation, and seamless communication with international clients and teammates.",
    tags: ["Technical Reading", "Fluency", "Documentation"],
    icon: "Globe"
  },
  {
    id: "teamwork",
    title: "Teamwork & Communication",
    badge: "Cross-functional Collaboration",
    score: 95,
    description: "Active listener and team contributor, coordinating smoothly across design, backend, and product teams via Git workflows and agile ceremonies.",
    tags: ["Peer Review", "Conflict Resolution", "Active Listening"],
    icon: "Users"
  },
  {
    id: "project-mgmt",
    title: "Project Management & Agile/Scrum",
    badge: "Sprint & Kanban Planning",
    score: 90,
    description: "Sprint planning, task breakdown (WBS), accurate time estimation, and workflow tracking with Jira, Trello, and GitHub Projects.",
    tags: ["Agile/Scrum", "Time Estimation", "Sprint Planning"],
    icon: "Kanban"
  },
  {
    id: "problem-solving",
    title: "Problem Solving & Critical Thinking",
    badge: "Root-Cause Analysis",
    score: 92,
    description: "Systematic debugging mindset, algorithmic optimization, and tackling architectural bottlenecks with clean, sustainable solutions.",
    tags: ["Algorithmic Thinking", "Optimization", "Debugging"],
    icon: "Cpu"
  },
  {
    id: "adaptability",
    title: "Continuous Learning & Adaptability",
    badge: "Self-driven Learner",
    score: 96,
    description: "Rapidly mastering emerging frameworks, tools, and tech stacks to directly deliver value to real-world projects.",
    tags: ["Self-starter", "Research", "Fast Learning"],
    icon: "Zap"
  }
];

export const githubProjects = [
  {
    id: 1,
    title: "CyberPulse - Realtime Analytics Dashboard",
    category: "Fullstack Web App",
    description: "Real-time system monitoring platform featuring streaming telemetry charts, microservices architecture, and high-performance interactive UI.",
    tech: ["React.js", "Node.js", "WebSocket", "Tailwind CSS", "PostgreSQL", "Docker"],
    stars: 48,
    forks: 14,
    githubUrl: "https://github.com/DucNgVan/cyberpulse-dashboard",
    liveDemo: "https://example.com/demo-cyberpulse",
    highlights: [
      "Streamed real-time data at 1,000+ events/sec via WebSocket connections",
      "Engineered Cyberpunk dark mode with sub-16ms render performance",
      "Reduced bundle size by 42% utilizing code-splitting and dynamic imports"
    ]
  },
  {
    id: 2,
    title: "CodeMorph - AI Powered Code Reviewer",
    category: "AI & Developer Tool",
    description: "Automated source code review suite detecting vulnerabilities, code smells, and proposing clean architecture improvements via LLM APIs.",
    tech: ["React.js", "TypeScript", "FastAPI", "Python", "OpenAI API", "Tailwind"],
    stars: 92,
    forks: 23,
    githubUrl: "https://github.com/DucNgVan/codemorph-ai",
    liveDemo: "https://example.com/demo-codemorph",
    highlights: [
      "Automated code review across 8+ popular programming languages",
      "GitHub Webhooks integration for automated PR scanning and feedback",
      "Custom markdown diff viewer highlighting syntax and performance tips"
    ]
  },
  {
    id: 3,
    title: "NexusShop - Modern E-Commerce Platform",
    category: "E-Commerce System",
    description: "Full-fledged e-commerce platform with persistent cart state, secure payments, multi-stage order tracking, and an administrative dashboard.",
    tech: ["React.js", "Redux Toolkit", "Express", "MongoDB", "Stripe API", "Cloudinary"],
    stars: 35,
    forks: 9,
    githubUrl: "https://github.com/DucNgVan/nexus-shop-fullstack",
    liveDemo: "https://example.com/demo-nexusshop",
    highlights: [
      "Integrated Stripe payments and robust JWT token-based authentication",
      "Multi-facet catalog filter with 300ms debounced search engine",
      "Scored 96/100 on Google Lighthouse for performance and accessibility"
    ]
  },
  {
    id: 4,
    title: "DevSprint - Kanban Team Collaboration App",
    category: "Productivity Tool",
    description: "Real-time collaborative workspace featuring drag-and-drop Kanban boards, embedded live chat, and role-based access control.",
    tech: ["React.js", "Firebase", "Framer Motion", "Tailwind CSS"],
    stars: 29,
    forks: 7,
    githubUrl: "https://github.com/DucNgVan/devsprint-kanban",
    liveDemo: "https://example.com/demo-devsprint",
    highlights: [
      "Smooth fluid drag-and-drop powered by dnd-kit and Firestore synchronization",
      "Real-time cross-platform notifications for assignments and updates",
      "Granular security rules safeguarding role-based team access"
    ]
  }
];

export const achievements = [
  {
    year: "2024 - 2025",
    title: "Academic Excellence Scholarship",
    organization: "National University / Faculty of Computer Science",
    description: "Awarded to the top 3% students for highest academic standing and student merit for 3 consecutive semesters.",
    category: "Academic",
    badge: "Excellence",
    color: "from-amber-400 to-yellow-600",
    icon: "Award"
  },
  {
    year: "2024",
    title: "3rd Place — Student Scientific Research Award",
    organization: "University & City Level Conference",
    description: "Research topic: Applying AI and Modern Web Technologies for automated text classification in enterprise workflows.",
    category: "Research",
    badge: "Top 3",
    color: "from-cyan-400 to-blue-600",
    icon: "Flame"
  },
  {
    year: "2023",
    title: "Top 5 Finalist — National Tech Hackathon",
    organization: "Tech Developers Club & Corporate Sponsors",
    description: "Architected and deployed an IoT & Web application for smart green energy monitoring within a 36-hour sprint.",
    category: "Hackathon",
    badge: "Top 5",
    color: "from-violet-400 to-purple-600",
    icon: "Trophy"
  },
  {
    year: "2023",
    title: "Outstanding Youth Leadership Award",
    organization: "Youth Union & Student Association",
    description: "President / Technical Lead of the University Developer Club, organizing hands-on coding workshops for 200+ freshmen.",
    category: "Leadership",
    badge: "Distinction",
    color: "from-emerald-400 to-teal-600",
    icon: "Star"
  }
];
