export const personalInfo = {
  name: "Nguyen Van Duc",
  role: "Software Engineering & Creative Coder",
  status: "Sẵn sàng nhận dự án mới & Cơ hội việc làm",
  location: "Hà Nội / TP. Hồ Chí Minh, Việt Nam",
  email: "contact.developer@example.com",
  phone: "+84 987 654 321",
  github: "https://github.com/DucNgVan",
  linkedin: "https://linkedin.com/in/ducngvan",
  bio: "Tôi là một kỹ sư phần mềm trẻ đầy đam mê với việc kiến tạo các trải nghiệm web hiện đại, hiệu năng cao và giàu tính tương tác. Kết hợp giữa tư duy kỹ thuật vững chắc và con mắt thẩm mỹ UI/UX tinh tế.",
  stats: [
    { label: "Năm kinh nghiệm / Học tập", value: "3+", suffix: " năm" },
    { label: "Dự án hoàn thành", value: "15+", suffix: " repo" },
    { label: "Điểm GPA Đại học", value: "3.75", suffix: "/4.0" },
    { label: "Giải thưởng & Học bổng", value: "05", suffix: " danh hiệu" }
  ],
  terminalCommands: [
    { cmd: "whoami", output: "Full-Stack Engineer & Creative Coder" },
    { cmd: "cat passion.txt", output: "Clean Code, High-Performance Systems, Cyber UI/UX" },
    { cmd: "git status", output: "On branch main. Ready to ship innovative solutions!" }
  ]
};

export const techSkills = {
  frontend: [
    { name: "React.js / Next.js", level: 90, experience: "2+ năm", color: "from-cyan-500 to-blue-500", highlight: "Core Frontend" },
    { name: "JavaScript (ES6+) / TypeScript", level: 92, experience: "3 năm", color: "from-yellow-400 to-amber-500", highlight: "Language" },
    { name: "Tailwind CSS & Modern UI", level: 95, experience: "2.5 năm", color: "from-teal-400 to-cyan-500", highlight: "Styling" },
    { name: "HTML5 / CSS3 / Web Animations", level: 92, experience: "3 năm", color: "from-orange-500 to-rose-500", highlight: "Foundation" },
    { name: "Redux Toolkit / Zustand", level: 85, experience: "2 năm", color: "from-purple-500 to-indigo-500", highlight: "State Mgmt" },
  ],
  backend: [
    { name: "Node.js & Express", level: 88, experience: "2+ năm", color: "from-emerald-500 to-green-600", highlight: "Server Runtime" },
    { name: "RESTful APIs & GraphQL", level: 86, experience: "2 năm", color: "from-pink-500 to-rose-600", highlight: "API Design" },
    { name: "PostgreSQL & MongoDB", level: 82, experience: "2 năm", color: "from-blue-600 to-indigo-700", highlight: "Databases" },
    { name: "Python / FastAPI", level: 80, experience: "1.5 năm", color: "from-yellow-500 to-emerald-500", highlight: "Backend & AI" },
    { name: "Redis & Caching", level: 75, experience: "1 năm", color: "from-red-500 to-amber-600", highlight: "Performance" },
  ],
  devopsAndTools: [
    { name: "Git & GitHub CI/CD", level: 90, experience: "3 năm", color: "from-orange-600 to-red-500", highlight: "VCS & Workflows" },
    { name: "Docker & Containerization", level: 78, experience: "1.5 năm", color: "from-blue-500 to-cyan-600", highlight: "DevOps" },
    { name: "Linux & Shell Scripting", level: 82, experience: "2 năm", color: "from-slate-400 to-slate-200", highlight: "OS" },
    { name: "Vite, Webpack & Build Tools", level: 88, experience: "2 năm", color: "from-violet-500 to-purple-600", highlight: "Tooling" },
    { name: "Postman & API Testing", level: 85, experience: "2.5 năm", color: "from-amber-500 to-orange-500", highlight: "Testing" }
  ]
};

export const softSkills = [
  {
    id: "lang",
    title: "Ngoại ngữ (Tiếng Anh)",
    badge: "IELTS 7.0 / Giao tiếp tốt",
    score: 88,
    description: "Đọc hiểu tài liệu kỹ thuật chuyên sâu, viết technical documentation, trao đổi và làm việc hiệu quả với khách hàng / đồng nghiệp quốc tế.",
    tags: ["Technical Reading", "Fluency", "Documentation"],
    icon: "Globe"
  },
  {
    id: "teamwork",
    title: "Làm việc nhóm & Giao tiếp",
    badge: "Cross-functional Collab",
    score: 95,
    description: "Khả năng lắng nghe, tôn trọng quan điểm, phối hợp nhịp nhàng giữa designer, backend và product owner qua Git workflow và daily meeting.",
    tags: ["Peer Review", "Conflict Resolution", "Active Listening"],
    icon: "Users"
  },
  {
    id: "project-mgmt",
    title: "Quản lý dự án & Agile/Scrum",
    badge: "Sprint & Kanban Master",
    score: 90,
    description: "Lập kế hoạch sprint, phân rã công việc nhỏ (WBS), dự toán thời gian chính xác, quản lý tiến độ bằng Jira / Trello / GitHub Projects.",
    tags: ["Agile/Scrum", "Time Estimation", "Sprint Planning"],
    icon: "Kanban"
  },
  {
    id: "problem-solving",
    title: "Tư duy giải quyết vấn đề",
    badge: "Root-Cause Analysis",
    score: 92,
    description: "Phương pháp tiếp cận bài toán logic, debug có hệ thống, tối ưu thuật toán và giải pháp kiến trúc thay vì sửa lỗi tạm thời.",
    tags: ["Algorithmic Thinking", "Optimization", "Debugging"],
    icon: "Cpu"
  },
  {
    id: "adaptability",
    title: "Khả năng tự học & Thích ứng",
    badge: "Continuous Learning",
    score: 96,
    description: "Khả năng làm chủ ngôn ngữ, framework hoặc công nghệ mới trong thời gian ngắn để áp dụng trực tiếp vào nhu cầu thực tế của dự án.",
    tags: ["Self-starter", "Research", "Fast Learning"],
    icon: "Zap"
  }
];

export const githubProjects = [
  {
    id: 1,
    title: "CyberPulse - Realtime Analytics Dashboard",
    category: "Fullstack Web App",
    description: "Nền tảng giám sát hệ thống thời gian thực với đồ thị streaming dữ liệu, kiến trúc Microservices và giao diện tương tác cao cấp.",
    tech: ["React.js", "Node.js", "WebSocket", "Tailwind CSS", "PostgreSQL", "Docker"],
    stars: 48,
    forks: 14,
    githubUrl: "https://github.com/DucNgVan/cyberpulse-dashboard",
    liveDemo: "https://example.com/demo-cyberpulse",
    highlights: [
      "Xử lý truyền tải dữ liệu realtime 1,000+ sự kiện/giây với WebSocket",
      "Giao diện Dark Mode chuẩn Cyberpunk với thời gian render dưới 16ms",
      "Tối ưu bundle size giảm 42% bằng code-splitting"
    ]
  },
  {
    id: 2,
    title: "CodeMorph - AI Powered Code Reviewer",
    category: "AI & Developer Tool",
    description: "Tiện ích tích hợp phân tích mã nguồn tự động, phát hiện lổ hổng bảo mật và đề xuất tối ưu hóa clean code dựa trên LLM API.",
    tech: ["React.js", "TypeScript", "FastAPI", "Python", "OpenAI API", "Tailwind"],
    stars: 92,
    forks: 23,
    githubUrl: "https://github.com/DucNgVan/codemorph-ai",
    liveDemo: "https://example.com/demo-codemorph",
    highlights: [
      "Hỗ trợ review tự động 8+ ngôn ngữ lập trình phổ biến",
      "Tích hợp GitHub Webhooks kiểm tra pull request tự động",
      "Thiết kế markdown parser hiển thị code diff trực quan"
    ]
  },
  {
    id: 3,
    title: "NexusShop - E-Commerce Modern Platform",
    category: "E-Commerce System",
    description: "Hệ thống thương mại điện tử hoàn chỉnh với giỏ hàng tối ưu, thanh toán trực tuyến, quản lý đơn hàng đa trạng thái và dashboard admin.",
    tech: ["React.js", "Redux Toolkit", "Express", "MongoDB", "Stripe API", "Cloudinary"],
    stars: 35,
    forks: 9,
    githubUrl: "https://github.com/DucNgVan/nexus-shop-fullstack",
    liveDemo: "https://example.com/demo-nexusshop",
    highlights: [
      "Tích hợp cổng thanh toán Sandbox và xác thực bảo mật qua JWT",
      "Bộ lọc sản phẩm đa điều kiện với debounce tìm kiếm 300ms",
      "Đạt điểm Google Lighthouse Performance 96/100"
    ]
  },
  {
    id: 4,
    title: "DevSprint - Kanban Team Collaboration App",
    category: "Productivity Tool",
    description: "Ứng dụng cộng tác nhóm thời gian thực hỗ trợ kéo thả Kanban board, chat trao đổi trực tiếp và phân quyền thành viên theo vai trò.",
    tech: ["React.js", "Firebase", "Framer Motion", "Tailwind CSS"],
    stars: 29,
    forks: 7,
    githubUrl: "https://github.com/DucNgVan/devsprint-kanban",
    liveDemo: "https://example.com/demo-devsprint",
    highlights: [
      "Kéo thả mượt mà với dnd-kit và đồng bộ realtime Firestore",
      "Hệ thống thông báo đẩy (Push notification) đa nền tảng",
      "Phân quyền bảo mật Granular Security Rules"
    ]
  }
];

export const achievements = [
  {
    year: "2024 - 2025",
    title: "Học bổng Khuyến khích Học tập Xuất sắc",
    organization: "Trường Đại học (ĐHQG / Bách Khoa / CNTT)",
    description: "Được trao cho top 3% sinh viên có điểm số học tập và rèn luyện cao nhất khoa trong 3 kỳ liên tiếp.",
    category: "Học tập",
    badge: "Xuất sắc",
    color: "from-amber-400 to-yellow-600",
    icon: "Award"
  },
  {
    year: "2024",
    title: "Giải Ba cuộc thi Sinh viên với Nghiên cứu Khoa học",
    organization: "Cấp Trường / Cấp Thành phố",
    description: "Đề tài ứng dụng Trí tuệ nhân tạo và Web App hỗ trợ phân loại văn bản tiếng Việt tự động cho doanh nghiệp.",
    category: "Nghiên cứu",
    badge: "Top 3",
    color: "from-cyan-400 to-blue-600",
    icon: "Flame"
  },
  {
    year: "2023",
    title: "Top 5 Chung kết Cuộc thi Hackathon Công nghệ",
    organization: "CLB Lập trình & Doanh nghiệp Tài trợ",
    description: "Xây dựng sản phẩm Web App giải quyết vấn đề quản lý năng lượng xanh trong vòng 36 giờ liên tục (Hackathon).",
    category: "Hackathon",
    badge: "Top 5",
    color: "from-violet-400 to-purple-600",
    icon: "Trophy"
  },
  {
    year: "2023",
    title: "Thủ lĩnh Sinh viên Tiêu biểu & Hoạt động Đoàn - Hội",
    organization: "Đoàn Thanh niên - Hội Sinh viên",
    description: "Chủ nhiệm / Trưởng ban Kỹ thuật câu lạc bộ lập trình sinh viên, tổ chức workshop đào tạo cho hơn 200+ tân sinh viên.",
    category: "Hoạt động",
    badge: "Tiêu biểu",
    color: "from-emerald-400 to-teal-600",
    icon: "Star"
  }
];
