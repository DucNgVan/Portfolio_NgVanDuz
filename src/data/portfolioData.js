export const personalInfo = {
  name: "Nguyen Van Duc",
  role: "Full-Stack Software Engineering Intern",
  headline: "Software Engineering Student · Full-Stack Developer",
  degree: "BSc (Hons) in Software Engineering",
  university: "University of Greenwich (Vietnam Campus)",
  status: "Open to Full-Stack / Software Engineering Internship Opportunities",
  location: "Da Nang, Viet Nam (Hybrid / Remote Ready)",
  email: "ducnv179.wk@gmail.com",
  phone: "078.855.1709",
  github: "https://github.com/DucNgVan",
  linkedin: "https://linkedin.com/in/ducngvan",
  resumeUrl: "/NguyenVanDuc_CV.pdf",
  avatar: "/avatar.jpg",
  bio: "Final-year Software Engineering student at the University of Greenwich with a strong foundation in modern web and application development. Experienced in engineering full-stack platforms — ranging from interactive 3D web applications with Next.js and Three.js to modular backend architectures featuring PostgreSQL, Redis, and Docker. Seeking a Full-Stack / Software Engineer Internship to deliver reliable code, contribute to production products, and grow with an engineering team.",
  stats: [
    { label: "Degree Standing", value: "BSc (Hons)", suffix: " Greenwich" },
    { label: "Academic Standing", value: "Top 3", suffix: " Student 2024" },
    { label: "Featured Projects", value: "04", suffix: " Key Repos" },
    { label: "Major Honors", value: "04", suffix: " Awards" }
  ],
  terminalCommands: [
    { cmd: "whoami", output: "Nguyen Van Duc · Full-Stack Software Engineering Intern" },
    { cmd: "cat education.txt", output: "BSc (Hons) Software Engineering · University of Greenwich" },
    { cmd: "cat honors.txt", output: "Top 3 Student Greenwich 2024 · 2nd Prize Impact Innovation 199 Hospital · LG Dream Code Finalist · Best Club President 2024" },
    { cmd: "git status", output: "On branch main. Ready for Full-Stack Internship in Da Nang & Remote!" }
  ]
};

export const techSkills = {
  frontend: [
    { 
      name: "React.js & Next.js 14", 
      tier: "Core / Production", 
      experience: "App Router, SSR/CSR, Hooks & State Management in NÉT and Nomadix", 
      highlight: "Core Frontend" 
    },
    { 
      name: "TypeScript & Modern JavaScript (ES6+)", 
      tier: "Core / Production", 
      experience: "Type-safe interfaces, async patterns, and clean modular codebases", 
      highlight: "Languages" 
    },
    { 
      name: "Tailwind CSS & Responsive UI", 
      tier: "Core / Production", 
      experience: "Component-driven design, responsive layouts, and accessibility standards", 
      highlight: "Styling & UI" 
    },
    { 
      name: "Three.js / 3D Web Graphics", 
      tier: "Applied Project", 
      experience: "Interactive 360° product visualizer and dynamic material rendering (NÉT)", 
      highlight: "Creative Dev" 
    },
    { 
      name: "Vue.js 3", 
      tier: "Applied Project", 
      experience: "Reactivity system, Single File Components in IT Helpdesk Library", 
      highlight: "Frontend Framework" 
    },
  ],
  backend: [
    { 
      name: "Node.js & Express", 
      tier: "Core / Production", 
      experience: "Modular RESTful APIs, middleware architecture, validation and error handling", 
      highlight: "Server Runtime" 
    },
    { 
      name: "PostgreSQL & Relational SQL", 
      tier: "Core / Production", 
      experience: "28-table 3NF relational schema, Knex migrations, indexes & query tuning", 
      highlight: "Relational DB" 
    },
    { 
      name: "MongoDB & Mongoose", 
      tier: "Applied Project", 
      experience: "Document data modeling, schema indexing & aggregation pipelines (Helpdesk)", 
      highlight: "NoSQL DB" 
    },
    { 
      name: "Redis Caching & Session Store", 
      tier: "Applied Project", 
      experience: "In-memory query caching, token storage and rate-limiting patterns", 
      highlight: "In-Memory Cache" 
    },
    { 
      name: "Java & Android SDK", 
      tier: "Applied Project", 
      experience: "OOP principles, Activities, Fragments, and Firebase sync (M-Hike App)", 
      highlight: "Mobile Dev" 
    },
  ],
  devopsAndTools: [
    { 
      name: "Git & GitHub Version Control", 
      tier: "Core / Production", 
      experience: "Git Flow, structured branch strategies, pull request reviews and clean commits", 
      highlight: "VCS & Git Flow" 
    },
    { 
      name: "Docker & Docker Compose", 
      tier: "Applied Project", 
      experience: "Multi-container local environments (Node API + PostgreSQL + Redis)", 
      highlight: "DevOps & Containers" 
    },
    { 
      name: "Postman & HTTP Testing", 
      tier: "Core / Production", 
      experience: "API contract testing, automated test collections and environment variables", 
      highlight: "API Testing" 
    },
    { 
      name: "Firebase (Auth & Cloud Firestore)", 
      tier: "Applied Project", 
      experience: "Real-time snapshot listeners, NoSQL rules, and authentication flows", 
      highlight: "Cloud & BaaS" 
    }
  ]
};

export const softSkills = [
  {
    id: "teamwork",
    title: "Team Collaboration & Peer Code Review",
    badge: "Agile Team Player",
    description: "Experienced in collaborating across university hackathons and group engineering projects using Git pull requests, constructive code reviews, structured task breakdowns, and active communication.",
    tags: ["Git Flow", "Teamwork", "Peer Review", "Active Communication"],
    icon: "Users"
  },
  {
    id: "analytical-problem-solving",
    title: "Analytical Thinking & Problem Solving",
    badge: "Core Engineering Mindset",
    description: "Ability to dissect complex application requirements into decoupled, testable modules. Strong foundation in data structures, algorithms, and systematic root-cause debugging.",
    tags: ["Root Cause Analysis", "Modular Design", "Debugging", "Clean Code"],
    icon: "Cpu"
  },
  {
    id: "adaptability",
    title: "Fast Learner & Growth Mindset",
    badge: "Continuous Evolution",
    description: "Rapidly grasps new frameworks, design patterns, and SDKs through hands-on implementation. Passionate about modern web standards, software architecture, and iterative improvements.",
    tags: ["Quick Learner", "Continuous Growth", "Curiosity", "Self-starter"],
    icon: "Zap"
  },
  {
    id: "agile-project-mgmt",
    title: "Agile & Scrum Workflow",
    badge: "Iterative Delivery",
    description: "Practiced sprint planning, backlog grooming, daily standups, and retrospective workflows during capstone development and hackathon prototyping sprints.",
    tags: ["Agile/Scrum", "Sprint Planning", "Task Ownership", "Jira/Trello"],
    icon: "Kanban"
  },
  {
    id: "academic-english",
    title: "Technical English & Documentation",
    badge: "British Standard",
    description: "Comfortable writing clear software documentation, architecture blueprints, API specifications (Postman/OpenAPI), and collaborating in international English-medium environments.",
    tags: ["Technical Specs", "English Communication", "Architecture Docs"],
    icon: "Globe"
  }
];

export const githubProjects = [
  {
    id: 1,
    title: "NÉT — Sustainable Ocean Net & 3D Interactive Craft",
    category: "Full-Stack Web & 3D Interactive Platform",
    tagline: "Eco-commerce platform transforming marine ghost nets into bespoke products with real-time 3D preview & AI studio.",
    description: "Innovative sustainable e-commerce and interactive 3D craft platform created for VecomNet's Tsunami Team. Transforms discarded ocean ghost nets into bespoke bags & charms, featuring real-time 3D model customization, AI story studio, and a transparent digital eco-passport.",
    tech: ["Next.js 14", "TypeScript", "Three.js / 3D", "Tailwind CSS", "AI Studio", "Firebase", "Vercel"],
    statusBadge: "Live Production Demo",
    statusType: "live",
    githubUrl: "https://github.com/DucNgVan/VecomNet-s_Tsunami_Team",
    liveDemo: "https://vecom-net-s-tsunami-team.vercel.app/",
    problem: "Marine ghost nets pollute ocean ecosystems, while sustainable products often lack interactive, engaging digital experiences for modern consumers.",
    solution: "Built a responsive Next.js 14 web platform combining Three.js 3D model customizers, an AI charm studio pipeline, and a transparent digital eco-passport verifying net recovery coordinates.",
    myRole: "Full-Stack Developer (3D visualizer integration, responsive design, AI studio connection & Vercel deployment)",
    highlights: [
      "Engineered interactive 3D product visualizer allowing 360-degree rotation and real-time custom color rendering via Three.js",
      "Integrated AI-assisted custom bag designer studio with dynamic configuration options",
      "Built a verifiable digital eco-passport showing marine net recovery metrics and GPS batch identification",
      "Optimized responsive UI/UX and smooth animations deployed seamlessly on Vercel"
    ]
  },
  {
    id: 2,
    title: "Nomadix — Travel Platform & Scalable Backend Architecture",
    category: "Final Year Capstone (FYP) · Backend Architecture",
    tagline: "Scalable backend architecture with 28 relational tables, Redis caching, JWT auth & Docker containerization.",
    description: "Full-featured travel platform backend engineered as the Final Year Project (FYP) at the University of Greenwich. Features a modular RESTful API architecture handling itinerary planning, flight/hotel comparison services, user communities, and secure session management.",
    tech: ["Node.js", "Express", "PostgreSQL (3NF)", "Redis", "Docker Compose", "JWT Auth", "RESTful APIs"],
    statusBadge: "Backend Complete · Mobile in Progress",
    statusType: "repo",
    githubUrl: "https://github.com/DucNgVan/nomadix-travel-platform",
    liveDemo: null,
    problem: "Travelers struggle with fragmented tools for itineraries, bookings, and community reviews, demanding a unified and resilient data service.",
    solution: "Architected a modular Node.js/Express REST backend backed by a 28-table 3NF PostgreSQL database, Redis caching layer, and Dockerized multi-service setup.",
    myRole: "Backend & Data Architect (Database 3NF modeling, migration scripts, JWT refresh token rotation, Redis caching & integration tests)",
    highlights: [
      "Designed a normalized 28-table 3NF PostgreSQL schema with Knex migrations and relational indexing",
      "Implemented secure JWT authentication with refresh token rotation and role-based access control",
      "Integrated Redis in-memory caching layer to optimize high-frequency itinerary and lookup queries",
      "Orchestrated 3-service local environment with Docker Compose and automated API integration test suites"
    ]
  },
  {
    id: 3,
    title: "IT Helpdesk Response Library (MEVN Stack)",
    category: "Full-Stack Enterprise Support Platform",
    tagline: "Enterprise ticket resolution platform with 8 RESTful endpoints, MongoDB schema, and Vue 3 reactive dashboard.",
    description: "Component-based dynamic web application engineered for enterprise IT support workflows. Enables support technicians to manage incident tickets, query an organized solution response knowledge base, and track resolution metrics.",
    tech: ["Vue.js 3", "Node.js", "Express", "MongoDB", "Mongoose", "RESTful APIs"],
    statusBadge: "REST APIs & Single Page App",
    statusType: "repo",
    githubUrl: "https://github.com/DucNgVan/helpdesk-response-library-mevn",
    liveDemo: null,
    problem: "IT helpdesk teams face repetitive incident inquiries without an organized, searchable response repository and structured resolution workflows.",
    solution: "Developed a reactive single-page dashboard with Vue 3 communicating with an Express/MongoDB backend providing 8 RESTful endpoints for ticket and response management.",
    myRole: "Full-Stack Developer (Vue 3 frontend state management, Express API routes, MongoDB schema & automated HTTP tests)",
    highlights: [
      "Engineered 8 RESTful API endpoints for ticket lifecycle, category indexing, and response library searches",
      "Designed MongoDB data schema with Mongoose models, validation, and query filtering",
      "Built reactive Vue 3 dashboard adhering to accessibility guidelines and responsive UI patterns",
      "Created automated API test collections (api_test.http) for rapid endpoint verification"
    ]
  },
  {
    id: 4,
    title: "M-Hike — Trail Tracker & Outdoor Journal",
    category: "Native Android Mobile Application",
    tagline: "Native Android mobile app with real-time Cloud Firestore sync, Firebase Auth, and offline trail observation logging.",
    description: "Native Android mobile application engineered in Java for outdoor enthusiasts to plan hiking trails, record GPS waypoints, log environmental observations, and synchronize expedition journals in real time.",
    tech: ["Java", "Android SDK", "Cloud Firestore", "Firebase Auth", "Real-time Sync", "Material Design"],
    statusBadge: "Native Mobile App",
    statusType: "repo",
    githubUrl: "https://github.com/DucNgVan/mhike-android-trail-tracker",
    liveDemo: null,
    problem: "Hikers and field researchers need a dedicated mobile journal to record trail conditions and observations reliably during outdoor expeditions.",
    solution: "Engineered a native Java Android application integrating Firebase Authentication and Cloud Firestore real-time snapshot listeners for persistent cloud sync.",
    myRole: "Android Developer (Java activities/fragments architecture, FirestoreHelper sync, dynamic form validation & UI)",
    highlights: [
      "Implemented real-time cloud data synchronization using Cloud Firestore addSnapshotListener for instant updates",
      "Built secure authentication workflows and profile management with Firebase Authentication",
      "Structured clean Android Activity/Fragment architecture with custom input validation for trail logs",
      "Implemented graceful empty states and sample dataset upload handlers for seamless onboarding"
    ]
  }
];

export const achievements = [
  {
    year: "2024",
    title: "Top 3 Student of University of Greenwich 2024",
    organization: "University of Greenwich",
    verificationLabel: "University Certified",
    description: "Recognized among the Top 3 Students of the University of Greenwich in 2024 for outstanding academic commitment, software engineering capabilities, and active student community contributions.",
    category: "Academic Honor",
    badge: "Top 3 Student 2024",
    color: "from-amber-400 to-yellow-600",
    icon: "Trophy"
  },
  {
    year: "2024",
    title: "Second Place (2nd Prize Winner) — Impact Innovation Bootcamp",
    organization: "199 Hospital (Ministry of Public Security)",
    verificationLabel: "Competition Verified",
    description: "Achieved Second Place at the Impact Innovation Bootcamp organized by 199 Hospital, innovating practical technology solutions under fast-paced hackathon prototyping sprints.",
    category: "Hackathon & Innovation",
    badge: "2nd Prize Winner",
    color: "from-cyan-400 to-blue-600",
    icon: "Medal"
  },
  {
    year: "2024",
    title: "The Best Club of 2024 — Greenwich Newspaper Group",
    organization: "University of Greenwich Student Community",
    verificationLabel: "Campus Leadership",
    description: "Awarded 'The Best Club of 2024' as Club President with Greenwich Newspaper Group, demonstrating strong team leadership, media creation, project organization, and collaborative impact.",
    category: "Leadership & Club",
    badge: "Best Club 2024",
    color: "from-emerald-400 to-teal-600",
    icon: "Star"
  },
  {
    year: "2024",
    title: "National Finalist — LG Dream Code Challenge",
    organization: "LG Electronics",
    verificationLabel: "National Finalist",
    description: "Advanced to the Final Round of the prestigious LG Dream Code Challenge, competing among top nationwide engineering students in algorithmic problem solving and software programming.",
    category: "National Competition",
    badge: "National Finalist",
    color: "from-violet-400 to-purple-600",
    icon: "Flame"
  }
];
