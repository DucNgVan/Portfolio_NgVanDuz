export const personalInfo = {
  name: "Nguyen Van Duc",
  role: "Junior Software Engineer",
  degree: "BSc (Hons) in Software Engineering",
  university: "University of Greenwich",
  status: "Open to Junior Software Engineer & Full-Stack Opportunities",
  location: "Da Nang, Viet Nam",
  email: "ducnv179.wk@gmail.com",
  phone: "078.855.1709",
  github: "https://github.com/DucNgVan",
  linkedin: "https://linkedin.com/in/ducngvan",
  bio: "A fresh Software Engineering graduate from the University of Greenwich with a solid foundation in computer science and modern software design. Equipped with hands-on full-stack development experience in React, Next.js, Vue.js, Node.js, and Java/Android through real university capstone projects, hackathons, and an academic IT internship.",
  stats: [
    { label: "Degree Standing", value: "BSc (Hons)", suffix: " Greenwich" },
    { label: "University Honor", value: "Top 3", suffix: " Student 2024" },
    { label: "Completed Projects", value: "10+", suffix: " repos" },
    { label: "Major Awards", value: "4", suffix: " honors" }
  ],
  terminalCommands: [
    { cmd: "whoami", output: "Junior Software Engineer (BSc Hons Graduate, University of Greenwich)" },
    { cmd: "cat education.txt", output: "BSc (Hons) Software Engineering · University of Greenwich · Graduated 2024" },
    { cmd: "cat honors.txt", output: "Top 3 Student Greenwich 2024 · 2nd Prize Impact Innovation 199 Hospital · Best Club 2024 · LG Dream Code Finalist" },
    { cmd: "git status", output: "On branch main. Ready to contribute to engineering teams!" }
  ]
};

export const techSkills = {
  frontend: [
    { name: "React.js & Next.js", level: 82, experience: "Capstone & Team Projects", color: "from-cyan-500 to-blue-500", highlight: "Core Frontend" },
    { name: "JavaScript (ES6+) / TypeScript", level: 80, experience: "Full-Stack Development", color: "from-yellow-400 to-amber-500", highlight: "Languages" },
    { name: "HTML5 / CSS3 / Tailwind CSS", level: 85, experience: "Responsive Web & UI Design", color: "from-teal-400 to-cyan-500", highlight: "Styling & UI" },
    { name: "Vue.js", level: 78, experience: "Coursework Web Apps", color: "from-emerald-400 to-teal-500", highlight: "Frontend Framework" },
  ],
  backend: [
    { name: "Node.js & Express", level: 80, experience: "RESTful Backend APIs", color: "from-emerald-500 to-green-600", highlight: "Server Runtime" },
    { name: "Java & OOP Principles", level: 78, experience: "Academic & Android", color: "from-blue-600 to-indigo-700", highlight: "Core CS" },
    { name: "RESTful APIs & Microservices Basics", level: 78, experience: "Service Integration", color: "from-pink-500 to-rose-600", highlight: "Architecture" },
    { name: "SQL & Databases (PostgreSQL / SQLite)", level: 75, experience: "Data Modeling & Queries", color: "from-yellow-500 to-emerald-500", highlight: "Databases" },
  ],
  devopsAndTools: [
    { name: "Git & GitHub Version Control", level: 85, experience: "Git Flow & Pull Requests", color: "from-orange-600 to-red-500", highlight: "VCS & Git Flow" },
    { name: "Docker (Basics & Containers)", level: 72, experience: "Local Containerization", color: "from-violet-500 to-purple-600", highlight: "DevOps Basics" },
    { name: "Android Studio & Mobile Dev", level: 75, experience: "Coursework Projects", color: "from-blue-500 to-cyan-600", highlight: "Mobile Dev" },
    { name: "Postman & API Testing", level: 80, experience: "API Validation & Debugging", color: "from-amber-500 to-orange-500", highlight: "Testing" }
  ]
};

export const softSkills = [
  {
    id: "teamwork",
    title: "Team Collaboration & Peer Code Review",
    badge: "Agile Team Player",
    score: 92,
    description: "Experienced in collaborating across university hackathons and group engineering projects using Git pull requests, code reviews, constructive feedback, and structured task division.",
    tags: ["Git Flow", "Teamwork", "Peer Review", "Active Listening"],
    icon: "Users"
  },
  {
    id: "analytical-problem-solving",
    title: "Analytical Thinking & Problem Solving",
    badge: "Core Engineering Mindset",
    score: 90,
    description: "Ability to break down complex architectural requirements into actionable, clean, and testable modules. Strong foundation in logic, data structures, and algorithmic debugging.",
    tags: ["Deductive Logic", "Root Cause Analysis", "Debugging", "Clean Code"],
    icon: "Cpu"
  },
  {
    id: "adaptability",
    title: "Fast Learner & Growth Mindset",
    badge: "Continuous Evolution",
    score: 94,
    description: "Quick to pick up new frameworks, libraries, and design patterns. Enthusiastic about staying current with modern web standards and engineering best practices.",
    tags: ["Self-starter", "Fast Learner", "Graduate Mindset", "Tech Curiosity"],
    icon: "Zap"
  },
  {
    id: "agile-project-mgmt",
    title: "Agile & Scrum Workflow",
    badge: "Iterative Delivery",
    score: 85,
    description: "Practiced sprint planning, backlog grooming, daily standups, and retrospective workflows in capstone and team competition environments.",
    tags: ["Agile/Scrum", "Sprint Planning", "Task Ownership", "Jira/Trello"],
    icon: "Kanban"
  },
  {
    id: "academic-english",
    title: "Technical English & Documentation",
    badge: "International Standard",
    score: 88,
    description: "Comfortable reading and writing software documentation, architecture blueprints, API specifications (Swagger/Postman), and communicating in international team settings.",
    tags: ["Technical Specs", "English Communication", "Documentation"],
    icon: "Globe"
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
      "Final Year Project synthesizing Software Engineering study at Greenwich",
      "Interactive itinerary planning engine allowing drag-and-drop schedule creation",
      "Integrated multi-criteria flight and hotel comparison service with responsive UI",
      "Social travel feed with user reviews, image uploads, and destination bookmarks"
    ]
  },
  {
    id: 2,
    title: "NÉT — Sustainable Ocean Net & 3D Interactive Craft",
    category: "Full-Stack Web & 3D Interactive Platform",
    description: "Innovative sustainable e-commerce and interactive 3D craft platform created for VecomNet's Tsunami Team. Transforms discarded ocean ghost nets into bespoke bags & charms, featuring real-time 3D model customization, AI story studio, and a transparent digital eco-passport.",
    tech: ["Next.js", "React", "Three.js / 3D", "Tailwind CSS", "REST APIs", "Vercel"],
    stars: 5,
    forks: 2,
    githubUrl: "https://github.com/DucNgVan/VecomNet-s_Tsunami_Team",
    liveDemo: "https://vecom-net-s-tsunami-team.vercel.app/",
    highlights: [
      "Engineered interactive 3D product visualizer allowing 360-degree rotation and real-time custom color preview",
      "Built an AI-assisted custom bag designer studio with dynamic configuration options",
      "Integrated a verifiable digital eco-passport displaying marine net recovery metrics and GPS batch identification",
      "Optimized responsive UI/UX and smooth animations deployed seamlessly on Vercel"
    ]
  },
  {
    id: 3,
    title: "Web2 Dynamic Web Application",
    category: "Full-Stack Single Page App",
    description: "Modern component-based dynamic single page web application engineered for Web Programming coursework at the University of Greenwich, leveraging reactive state management and seamless RESTful data binding.",
    tech: ["Vue.js", "JavaScript (ES6+)", "HTML5", "CSS3", "REST APIs"],
    stars: 4,
    forks: 1,
    githubUrl: "https://github.com/DucNgVan/Web2_Programming_Gre",
    liveDemo: "https://github.com/DucNgVan/Web2_Programming_Gre",
    highlights: [
      "Reactive single-page architecture built with Vue 3 component tree and reactive stores",
      "Strict compliance with User Interface Design principles and accessibility standards",
      "Robust data synchronization and interactive user workflows"
    ]
  },
  {
    id: 4,
    title: "Native Android Hiking & Trail Tracker App",
    category: "Native Mobile Application",
    description: "Native Android application engineered in Java for mobile application development coursework, helping outdoor enthusiasts plan, record, and log hiking trails with offline SQLite persistence.",
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
    year: "2024",
    title: "Top 3 Student of University of Greenwich 2024",
    organization: "University of Greenwich",
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
    description: "Awarded 'The Best Club of 2024' with Greenwich Newspaper Group, demonstrating strong team leadership, media creation, project organization, and collaborative impact across university initiatives.",
    category: "Leadership & Club",
    badge: "Best Club 2024",
    color: "from-emerald-400 to-teal-600",
    icon: "Star"
  },
  {
    year: "2024",
    title: "The Final Round of LG Dream Code Challenge",
    organization: "LG Electronics",
    description: "Advanced to the Final Round of the prestigious LG Dream Code Challenge, competing among top nationwide engineering students in algorithmic problem solving and software programming.",
    category: "National Competition",
    badge: "Final Round Finalist",
    color: "from-violet-400 to-purple-600",
    icon: "Flame"
  }
];
