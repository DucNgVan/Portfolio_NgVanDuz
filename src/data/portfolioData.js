export const personalInfo = {
  name: "Nguyen Van Duc",
  role: "Junior Software Engineer",
  degree: "BSc (Hons) in Software Engineering",
  university: "University of Greenwich",
  status: "Open to Junior Software Engineer & Full-Stack Opportunities",
  location: "Hanoi / Ho Chi Minh City, Vietnam",
  email: "contact.developer@example.com",
  phone: "+84 987 654 321",
  github: "https://github.com/DucNgVan",
  linkedin: "https://linkedin.com/in/ducngvan",
  bio: "A fresh Software Engineering graduate from the University of Greenwich with a solid academic track record (including distinctions of 96/100 in Mathematics for Computer Science and 96/100 in Data & Web Analytics). Equipped with hands-on full-stack development experience in React, Vue.js, Node.js, and Java/Android through real university capstone projects and an academic IT internship.",
  stats: [
    { label: "Graded Credits", value: "240", suffix: " pts" },
    { label: "Highest Module Mark", value: "96", suffix: "/100" },
    { label: "First-Class Modules", value: "11+", suffix: " subjects" },
    { label: "University & Solo Repos", value: "10+", suffix: " repos" }
  ],
  terminalCommands: [
    { cmd: "whoami", output: "Junior Software Engineer (BSc Hons Graduate, University of Greenwich)" },
    { cmd: "cat education.txt", output: "BSc (Hons) Software Engineering · University of Greenwich · 240 Graded Credits" },
    { cmd: "cat top_modules.txt", output: "MATH1179 Maths for CS (96) · COMP1810 Data Analytics (96) · COMP1589 Systems (95) · COMP1753 Foundations (90)" },
    { cmd: "git status", output: "On branch main. Degree completed. Ready to contribute to engineering teams!" }
  ]
};

export const techSkills = {
  frontend: [
    { name: "React.js & Vue.js", level: 88, experience: "Coursework & FYP", color: "from-cyan-500 to-blue-500", highlight: "Core Frontend" },
    { name: "JavaScript (ES6+) / TypeScript", level: 90, experience: "Academic & Projects", color: "from-yellow-400 to-amber-500", highlight: "Languages" },
    { name: "HTML5 / CSS3 / Tailwind CSS", level: 92, experience: "COMP1773 UI Design", color: "from-teal-400 to-cyan-500", highlight: "Styling & UI" },
    { name: "UI/UX & HCI Principles", level: 82, experience: "COMP1773 & COMP1649", color: "from-orange-500 to-rose-500", highlight: "Ergonomics" },
    { name: "Responsive & Interactive Web", level: 88, experience: "Web Prog 1 & 2", color: "from-purple-500 to-indigo-500", highlight: "Frontend Web" },
  ],
  backend: [
    { name: "Node.js & Express", level: 85, experience: "AMD201 & Web 2", color: "from-emerald-500 to-green-600", highlight: "Server Runtime" },
    { name: "RESTful APIs & Microservices", level: 82, experience: "AMD201 Group", color: "from-pink-500 to-rose-600", highlight: "Architecture" },
    { name: "Object-Oriented Programming (OOP)", level: 85, experience: "COMP1752 (Java / C#)", color: "from-blue-600 to-indigo-700", highlight: "Core CS" },
    { name: "SQL & Database Systems", level: 80, experience: "COMP1845 & SQLite", color: "from-yellow-500 to-emerald-500", highlight: "Databases" },
    { name: "Data Structures & Algorithms", level: 84, experience: "1649A DSA (8.0/10)", color: "from-red-500 to-amber-600", highlight: "Foundations" },
  ],
  devopsAndTools: [
    { name: "Git & GitHub Version Control", level: 90, experience: "Coursework Repos", color: "from-orange-600 to-red-500", highlight: "VCS & Git Flow" },
    { name: "Android Studio & Java", level: 80, experience: "COMP1786 Mobile App", color: "from-blue-500 to-cyan-600", highlight: "Mobile Dev" },
    { name: "Docker & Containerization", level: 75, experience: "AMD201 Microservices", color: "from-violet-500 to-purple-600", highlight: "DevOps" },
    { name: "Agile / Scrum Methodologies", level: 85, experience: "COMP1807 & COMP1770", color: "from-amber-500 to-orange-500", highlight: "Process" },
    { name: "Software Security & Testing", level: 80, experience: "COMP1843 Security", color: "from-slate-400 to-slate-200", highlight: "Quality & Security" }
  ]
};

export const softSkills = [
  {
    id: "academic-english",
    title: "Academic & Technical English",
    badge: "University of Greenwich Standard",
    score: 86,
    description: "Completed Academic English modules (AEG116 Grade 7.5). Proficient in comprehending complex software documentation, writing system specifications (SRS), and communicating in English-speaking environments.",
    tags: ["Technical Documentation", "Greenwich Standard", "English Fluency"],
    icon: "Globe"
  },
  {
    id: "analytical-problem-solving",
    title: "Mathematical & Analytical Logic",
    badge: "Distinction: 96/100 in Maths for CS",
    score: 96,
    description: "Demonstrated strong computational thinking and deductive problem solving, achieving top scores of 96/100 in Mathematics for Computer Science (MATH1179) and 96/100 in Data and Web Analytics (COMP1810).",
    tags: ["Discrete Mathematics", "Data Analytics", "Algorithmic Thinking"],
    icon: "Cpu"
  },
  {
    id: "teamwork",
    title: "Team Collaboration & Peer Review",
    badge: "Grade 8.0/10 in Working in Group",
    score: 90,
    description: "Experienced in collaborative teamwork across university group projects (AMD201 Microservices, Logbook Coursework) with Git pull requests, code reviews, and structured task assignments.",
    tags: ["Git Workflow", "Team Projects", "Active Listening"],
    icon: "Users"
  },
  {
    id: "agile-project-mgmt",
    title: "Agile & Requirements Management",
    badge: "COMP1807 & COMP1787 Track",
    score: 84,
    description: "Trained in Agile/SCRUM fundamentals, sprint planning, user story formulation, and requirement lifecycle management (COMP1787 & COMP1770 Professional Project Management).",
    tags: ["Agile/Scrum", "Sprint Planning", "Requirements Engineering"],
    icon: "Kanban"
  },
  {
    id: "adaptability",
    title: "Rapid Learning & Eagerness to Grow",
    badge: "Continuous Evolution",
    score: 95,
    description: "Demonstrated agility by mastering diverse technology stacks required across Greenwich modules: from Java and Python to modern Vue.js, React, Node.js, and Docker microservices.",
    tags: ["Self-starter", "Fast Learner", "Graduate Mindset"],
    icon: "Zap"
  }
];

export const githubProjects = [
  {
    id: 1,
    title: "Nomadix — All-in-One Travel & Community App",
    category: "Final Year Capstone Project",
    description: "Nomadix is a full-featured travel platform developed as the Final Year Project (FYP) at the University of Greenwich. It allows users to compare flights and hotels, build custom personalized itineraries, and exchange real-world travel stories with an active community.",
    tech: ["React.js", "Node.js", "Express", "Tailwind CSS", "MongoDB", "REST APIs"],
    stars: 5,
    forks: 2,
    githubUrl: "https://github.com/DucNgVan/Nomadix_TravelApplication_FYP_UniversityOfGreenwich_NguyenVanDuc",
    liveDemo: "https://github.com/DucNgVan/Nomadix_TravelApplication_FYP_UniversityOfGreenwich_NguyenVanDuc",
    highlights: [
      "Final Year Project (COMP1682) synthesizing 3 years of Software Engineering study at Greenwich",
      "Interactive itinerary planning engine allowing drag-and-drop schedule creation",
      "Integrated multi-criteria flight and hotel comparison service with responsive UI",
      "Social travel feed with user reviews, image uploads, and destination bookmarks"
    ]
  },
  {
    id: 2,
    title: "AMD201 — Advanced Microservices Architecture",
    category: "Microservices & Distributed Systems",
    description: "Collaborative microservices project created for the AMD201 course at Greenwich University. Demonstrates decoupled microservices communication, containerized deployment, API gateway routing, and service isolation.",
    tech: ["Node.js", "Express", "Docker", "REST APIs", "Microservices", "JWT"],
    stars: 3,
    forks: 1,
    githubUrl: "https://github.com/DucNgVan/AMD_201_Group",
    liveDemo: "https://github.com/DucNgVan/AMD_201_Group",
    highlights: [
      "Engineered decoupled microservice modules running in independent Docker containers",
      "Centralized API Gateway managing authentication, routing, and error resilience",
      "Practiced Git branching, team pull requests, and multi-service deployment workflows"
    ]
  },
  {
    id: 3,
    title: "Web2 Programming Dynamic Web Application",
    category: "Full-Stack Single Page App",
    description: "Production-grade dynamic web application engineered for COMP1842 (Web Programming 2) at the University of Greenwich, leveraging modern component-based frontend architecture and seamless RESTful data binding.",
    tech: ["Vue.js", "JavaScript (ES6+)", "HTML5", "CSS3", "REST APIs"],
    stars: 4,
    forks: 1,
    githubUrl: "https://github.com/DucNgVan/Web2_Programming_Gre",
    liveDemo: "https://github.com/DucNgVan/Web2_Programming_Gre",
    highlights: [
      "Earned First-Class distinction grade (72/100) in COMP1842 Web Programming 2",
      "Reactive single-page architecture built with Vue 3 component tree and reactive stores",
      "Strict compliance with User Interface Design (COMP1773) and accessibility guidelines"
    ]
  },
  {
    id: 4,
    title: "Native Android Hiking & Trail Tracker App",
    category: "Native Mobile Application",
    description: "Native Android application engineered in Java for COMP1786 (Mobile Application Design & Development), helping outdoor enthusiasts plan, record, and log hiking trails with offline SQLite persistence.",
    tech: ["Java", "Android Studio", "SQLite Database", "Mobile UI/UX", "XML Layouts"],
    stars: 3,
    forks: 1,
    githubUrl: "https://github.com/DucNgVan/HikingAndroiApplication_COMP1785_GRE",
    liveDemo: "https://github.com/DucNgVan/HikingAndroiApplication_COMP1785_GRE",
    highlights: [
      "Architected native Android activities and fragments with clean separation of concerns",
      "Implemented local SQLite database caching for offline trail observations and condition logs",
      "Dynamic input validation with customized forms and material design aesthetics"
    ]
  }
];

export const achievements = [
  {
    year: "2024 - 2026",
    title: "Exceptional Distinctions in Mathematics & Analytics (96/100)",
    organization: "University of Greenwich",
    description: "Scored remarkable distinction marks of 96/100 in Mathematics for Computer Science (MATH1179) and 96/100 in Data & Web Analytics (COMP1810), placing among the highest marks in the cohort.",
    category: "Academic Excellence",
    badge: "Top 96/100",
    color: "from-amber-400 to-yellow-600",
    icon: "Award"
  },
  {
    year: "2024 - 2026",
    title: "First-Class Honours Track Across 11+ Core Modules",
    organization: "University of Greenwich (240 Graded Credits)",
    description: "Maintained First-Class standing (70+) across major computing subjects including Computer Systems (95), Programming Foundations (90), Systems Development (88), UI Design (78), and Principles of Software Engineering (73).",
    category: "Degree Standing",
    badge: "First Class Track",
    color: "from-cyan-400 to-blue-600",
    icon: "GraduationCap"
  },
  {
    year: "2025 - 2026",
    title: "Software Engineering School IT Internship",
    organization: "Academic Institution / School IT Department",
    description: "Completed practical On-The-Job Training (OJT) within an educational institution, providing hands-on software development support, maintaining digital systems, and collaborating with academic staff.",
    category: "Work Experience",
    badge: "Industry Prep",
    color: "from-emerald-400 to-teal-600",
    icon: "Flame"
  },
  {
    year: "2026",
    title: "LG Dream Code Challenge Participant",
    organization: "LG Electronics Contest 2026",
    description: "Participated in the LG Dream Code competition using Python, focusing on algorithmic challenges, efficient problem solving, and software optimization.",
    category: "Coding Challenge",
    badge: "Competitor",
    color: "from-violet-400 to-purple-600",
    icon: "Trophy"
  }
];
