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
    { label: "Featured Projects", value: "05", suffix: " Projects" },
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
    title: "NÉT STUDIO — Sustainable Ocean Net & 3D Interactive Craft",
    category: "Full-Stack Web & 3D Interactive Platform",
    tagline: "Eco-commerce platform transforming marine ghost nets into bespoke products with real-time 3D preview & AI studio.",
    description: "Innovative sustainable e-commerce and interactive 3D craft platform created for VecomNet's Tsunami Team. Transforms discarded ocean ghost nets into bespoke bags & charms, featuring real-time 3D model customization, AI story studio, order tracking, and a transparent digital eco-passport.",
    tech: ["Next.js 14", "TypeScript", "Three.js / 3D", "Tailwind CSS", "AI Studio", "Firebase", "Domain net-s.id.vn"],
    statusBadge: "Live Production Platform",
    statusType: "live",
    image: "/projects/net-s-1.jpg",
    images: [
      {
        url: "/projects/net-s-1.jpg",
        title: "Nét Studio Co-Creation Workspace",
        caption: "Nét Studio — Interactive Bag Customization, Real-Time 3D Product Visualizer & Digital Bag Journey across Desktop, Tablet & Mobile"
      },
      {
        url: "/projects/net-s-2.jpg",
        title: "Order Tracking & Story Passport",
        caption: "Order Tracking & Story Passport — Unique Product Identity, Verifiable Ocean Coordinates & Digital Eco-Passport"
      }
    ],
    githubUrl: "https://github.com/DucNgVan/VecomNet-s_Tsunami_Team",
    liveDemo: "https://www.net-s.id.vn/",
    problem: "Marine ghost nets pollute ocean ecosystems, while sustainable products often lack interactive, engaging digital experiences for modern consumers.",
    solution: "Built a responsive Next.js 14 web platform combining Three.js 3D model customizers, an AI charm studio pipeline, order lifecycle tracking, and a transparent digital eco-passport verifying net recovery coordinates.",
    myRole: "Full-Stack Developer (3D visualizer integration, responsive design, AI studio connection & production domain deployment)",
    highlights: [
      "Engineered interactive 3D product visualizer allowing 360-degree rotation and real-time custom color rendering via Three.js",
      "Integrated AI-assisted custom bag designer studio with dynamic configuration options and live charm pairing",
      "Built a verifiable digital eco-passport showing marine net recovery metrics and GPS batch identification",
      "Deployed to production domain https://www.net-s.id.vn/ with high performance and mobile-first responsiveness"
    ]
  },
  {
    id: 5,
    title: "VAVA CMS — SharePoint Information & Content Management",
    category: "Enterprise CMS & Content Architecture · Coursework",
    tagline: "Centralized SharePoint portal for goods donation scheduling, volunteer registration, and automated content workflows.",
    description: "Enterprise content management platform engineered on Microsoft SharePoint for the 'Information and Content Management' course at the University of Greenwich. Designed to streamline non-profit operations through automated donation scheduling, structured volunteer roster management, and live statistical metrics tracking.",
    tech: ["SharePoint Online", "Microsoft 365", "Power Automate", "Information Architecture", "Content Governance", "Permission Roles"],
    statusBadge: "SharePoint Live Portal",
    statusType: "live",
    image: "/projects/vava-cms-1.jpg",
    images: [
      {
        url: "/projects/vava-cms-1.jpg",
        title: "Platform Ecosystem",
        caption: "VAVA Da Nang Platform — Full Digital Solutions & Automated Workflow Ecosystem across Desktop, Tablet & Mobile"
      },
      {
        url: "/projects/vava-cms-2.jpg",
        title: "Public Portal & Donation",
        caption: "Public Portal & Donation Platform — Multi-Device News, Facilities Map & Public Donation Streams"
      },
      {
        url: "/projects/vava-cms-3.jpg",
        title: "Administration Suite",
        caption: "Administration Suite — Goods Donation Schedules, Volunteer Intake Management & Real-Time Stats"
      },
      {
        url: "/projects/vava-cms-4.jpg",
        title: "Smart Automation Workflows",
        caption: "Smart Automation — Power Automate Multi-Stage Workflows & Instant Automated Email Dispatch System"
      }
    ],
    githubUrl: null,
    liveDemo: "https://uogcloud.sharepoint.com/:u:/r/sites/Coursework_SharePoint_Greenwich_VavaDN-S-CAM/SitePages/HomePage.aspx?d=weaf2501dab044352939bae04571f1104&csf=1&web=1&e=nVycl5",
    accessNote: "Institutional Access Notice: This portal is hosted on the University of Greenwich Microsoft 365 tenant. The link may expire or become inaccessible post-graduation as student institutional email accounts are decommissioned.",
    problem: "Non-profit organizations struggle with unstructured donation spreadsheets, manual volunteer shift coordination, and lack of role-based content access control.",
    solution: "Architected a custom SharePoint site suite featuring relational list schemas for goods donations and volunteer registrations, automated approval workflows, and centralized donation metric dashboards.",
    myRole: "CMS Architect & Site Administrator (SharePoint architecture design, custom list schemas, view permissions, metadata taxonomy & content governance)",
    highlights: [
      "Engineered Goods Donation Scheduling Suite managing donor records, dispatch logistics, and multi-tier fulfillment statuses",
      "Built Volunteer Register Management module with structured intake schemas, role matching, and availability filters",
      "Created centralized Donation Statistics dashboard tracking goods donors (100+), financial donations (650M+ VND), and active volunteers (200+)",
      "Established strict role-based access control (RBAC) and content governance adhering to university academic coursework standards"
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
    image: "/projects/nomadix-1.png",
    images: [
      {
        url: "/projects/nomadix-1.png",
        title: "All-in-One Travel Hub",
        caption: "Nomadix Travel Ecosystem — All-in-One Travel Hub for Flight/Hotel Discovery, Smart Bookings & Dynamic Itineraries"
      },
      {
        url: "/projects/nomadix-2.png",
        title: "Plan Together Collaborative Itinerary",
        caption: "Plan Together — Real-Time Collaborative Itinerary Co-Creation, Group Voting & Schedule Sync"
      },
      {
        url: "/projects/nomadix-3.png",
        title: "Smart Split Group Expenses",
        caption: "Smart Split & Expense Tracking — Multi-Currency Bill Division, Automatic Debt Simplification & Shared Travel Ledger"
      }
    ],
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
    image: "/projects/helpdesk-1.jpg",
    images: [
      {
        url: "/projects/helpdesk-1.jpg",
        title: "Helpdesk Library Ecosystem",
        caption: "Helpdesk Response Library (MEVN Stack) — Central Knowledge Hub, Dynamic Single-Page App & Ticket Resolution Dashboard across Desktop, Tablet & Mobile"
      }
    ],
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
    category: "Native Android & Cross-Platform Mobile Application",
    tagline: "Native mobile app with real-time GPS tracking, Mapbox integration, Cloud Firestore sync & Material Design 3.",
    description: "Full-featured mobile hiking tracker engineered with native Android (Java) and cross-platform React Native parity. Enables outdoor enthusiasts to plan trails with 3-tier geocoding, record GPS waypoints with sub-5m accuracy, log environmental observations, and sync journals via Cloud Firestore.",
    tech: ["Android (Java)", "React Native", "Mapbox GPS", "Cloud Firestore", "Firebase Auth", "Material Design 3"],
    statusBadge: "Mobile Application",
    statusType: "repo",
    image: "/projects/mhike-1.jpg",
    images: [
      {
        url: "/projects/mhike-1.jpg",
        title: "Hiker Management",
        caption: "M-HIKE Home Dashboard — Trail Discovery, Difficulty Filters & Interactive Mapbox Location Pin"
      },
      {
        url: "/projects/mhike-2.jpg",
        title: "Smart Hike Planning",
        caption: "Smart Hike Planning — 3-Tier Geocoding, One-Tap GPS Auto-Fill & Material Design 3 Form"
      },
      {
        url: "/projects/mhike-3.jpg",
        title: "Live GPS Tracking",
        caption: "Live GPS Tracking — Real-Time Coordinate Tracking, ±5m Precision Accuracy & Mapbox Satellite Layer"
      }
    ],
    githubUrl: "https://github.com/DucNgVan/mhike-android-trail-tracker",
    liveDemo: null,
    problem: "Hikers and field researchers need a dedicated mobile journal to record trail conditions and observations reliably during outdoor expeditions.",
    solution: "Engineered a native mobile application integrating Mapbox location pins, 3-tier geocoding, Firebase Authentication, and Cloud Firestore real-time snapshot listeners for persistent cloud sync.",
    myRole: "Mobile Developer (Native Android Java architecture, Mapbox GPS tracking, FirestoreHelper sync & Material Design 3 UI)",
    highlights: [
      "Engineered real-time GPS tracker with live device coordinates and high-precision ±5m tolerance",
      "Built 3-tier geocoding form with native Android Geocoder and interactive Mapbox pin placement",
      "Implemented real-time cloud data synchronization using Cloud Firestore addSnapshotListener for instant updates",
      "Created structured Material Design 3 interface with dynamic input validation and offline caching"
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
