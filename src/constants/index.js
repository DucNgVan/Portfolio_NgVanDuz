import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "tech",
    title: "Tech",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "honors",
    title: "Honors",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  {
    title: "Full-Stack Web Developer",
    icon: web,
    desc: "React, Next.js 14 App Router, TypeScript, and Tailwind CSS design systems.",
  },
  {
    title: "3D Web & Interactive Engineer",
    icon: creator,
    desc: "Interactive 3D WebGL product customizers, shaders, and dynamic canvas rendering in Three.js.",
  },
  {
    title: "Backend & Database Architect",
    icon: backend,
    desc: "28-table 3NF PostgreSQL schemas, Redis in-memory caching, JWT rotation, and Docker Compose.",
  },
  {
    title: "Mobile App Developer",
    icon: mobile,
    desc: "Native Android (Java SDK), Mapbox GPS tracking, and Cloud Firestore real-time sync.",
  },
];

export const technologies = [
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
];

export const experiences = [
  {
    title: "Top 3 Outstanding Students 2024",
    company_name: "University of Greenwich (Vietnam)",
    icon: "/certificates/cert_top3_2024.jpg",
    iconBg: "#383E56",
    date: "Summer 2024",
    points: [
      "Recognized in the Top 3 highest GPA students across the entire Greenwich International Bachelor cohort (Da Nang Campus).",
      "Specialized in Distributed Software Systems, 3NF Database Modeling, and Interactive Web Applications.",
      "Official Institutional Decision Ref: 157/QĐ-FPTUDN • Student ID: GCD230006.",
    ],
  },
  {
    title: "Top Student — Information & Content Management",
    company_name: "Greenwich International Bachelor Program",
    icon: "/certificates/cert_best_student_icm_2026.jpg",
    iconBg: "#E6DEDD",
    date: "Summer 2026",
    points: [
      "Achieved the highest overall academic score in Information and Content Management (COMP1643).",
      "Engineered automated SharePoint enterprise list schemas and Power Automate workflows.",
      "Certified by Campus Director Dr. Nguyen Duy Nghiem (Decision: 181 QH-PPTUDN).",
    ],
  },
  {
    title: "2nd Prize Winner — Impact Innovation Bootcamp",
    company_name: "199 Hospital (Ministry of Public Security)",
    icon: "/certificates/cert_bootcamp_innovation_2025.jpg",
    iconBg: "#383E56",
    date: "2025",
    points: [
      "Achieved Second Place at the Impact Innovation Bootcamp organized by 199 Hospital and Greenwich Vietnam.",
      "Engineered practical digital transformation and public healthcare tech solutions under rapid hackathon sprints.",
      "Verified by Hospital 199 Innovation Board & Campus Director Dr. Nguyen Duy Nghiem.",
    ],
  },
  {
    title: "The Best Club of 2024 — Club President",
    company_name: "Greenwich Newspaper Group (GNews)",
    icon: "/certificates/cert_gnews_club_2024.jpg",
    iconBg: "#E6DEDD",
    date: "2024",
    points: [
      "Awarded 'The Best Club of 2024' as Club President leading campus media creation and tech event coverage.",
      "Coordinated cross-functional teams, video production, and published technical journalism articles.",
      "Honored by Student Affairs Department: Mai Doan Ngoc Tuyet Oanh.",
    ],
  },
  {
    title: "Outstanding Mentor — Peer Mentoring Club",
    company_name: "Greenwich Peer Mentoring (GPM)",
    icon: "/certificates/cert_peer_mentoring_2024.jpg",
    iconBg: "#383E56",
    date: "Fall 2024",
    points: [
      "Coached and guided incoming engineering students in academic coursework and algorithms.",
      "Conducted 7 weeks of structured code reviews and peer learning sessions.",
    ],
  },
];

export const testimonials = [
  {
    testimonial:
      "Awarded for exceptional academic excellence ranking in Top 3 highest GPA students across Greenwich International Bachelor cohort.",
    name: "Dr. Nguyen Duy Nghiem",
    designation: "Campus Director",
    company: "University of Greenwich (Vietnam)",
    image: "/certificates/cert_top3_2024.jpg",
    ref: "Decision: 157/QĐ-FPTUDN",
  },
  {
    testimonial:
      "Highest academic score in Information and Content Management (COMP1643) for outstanding SharePoint enterprise content architecture.",
    name: "Dr. Nguyen Duy Nghiem",
    designation: "Campus Director",
    company: "Greenwich International Bachelor",
    image: "/certificates/cert_best_student_icm_2026.jpg",
    ref: "Decision: 181 QH-PPTUDN",
  },
  {
    testimonial:
      "Second Place Winner at Impact Innovation Bootcamp 2025 for engineering practical digital solutions and healthcare technologies.",
    name: "Innovation Board",
    designation: "Evaluation Committee",
    company: "199 Hospital & Greenwich Vietnam",
    image: "/certificates/cert_bootcamp_innovation_2025.jpg",
    ref: "Bootcamp Certificate 2025",
  },
];

export const projects = [
  {
    name: "NÉT STUDIO",
    description:
      "Eco-commerce platform transforming marine ghost nets into bespoke products with real-time 3D model customization in Three.js and an AI story studio pipeline.",
    tags: [
      {
        name: "nextjs14",
        color: "blue-text-gradient",
      },
      {
        name: "threejs3D",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: "/projects/net-s-1.jpg",
    source_code_link: "https://github.com/DucNgVan/VecomNet-s_Tsunami_Team",
    live_demo_link: "https://www.net-s.id.vn/",
  },
  {
    name: "Nomadix Travel Platform",
    description:
      "Full-featured travel platform backend engineered with a 28-table 3NF PostgreSQL schema, Redis caching layer (sub-ms lookup), JWT token rotation & Docker Compose.",
    tags: [
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "postgresql3NF",
        color: "blue-text-gradient",
      },
      {
        name: "docker",
        color: "pink-text-gradient",
      },
    ],
    image: "/projects/nomadix-1.png",
    source_code_link: "https://github.com/DucNgVan/nomadix-travel-platform",
    live_demo_link: null,
  },
  {
    name: "VAVA CMS SharePoint Portal",
    description:
      "Enterprise content management platform on Microsoft SharePoint Online with Power Automate multi-stage workflows, goods donation schedules, and 650M+ VND tracked.",
    tags: [
      {
        name: "sharepoint",
        color: "blue-text-gradient",
      },
      {
        name: "powerautomate",
        color: "orange-text-gradient",
      },
      {
        name: "m365",
        color: "pink-text-gradient",
      },
    ],
    image: "/projects/vava-cms-1.jpg",
    source_code_link: null,
    live_demo_link: "https://uogcloud.sharepoint.com/:u:/r/sites/Coursework_SharePoint_Greenwich_VavaDN-S-CAM/SitePages/HomePage.aspx?d=weaf2501dab044352939bae04571f1104&csf=1&web=1&e=nVycl5",
  },
  {
    name: "IT Helpdesk Response Library",
    description:
      "Component-based dynamic web application engineered for enterprise IT support with 8 RESTful endpoints, MongoDB/Mongoose schemas, and reactive Vue 3 dashboard.",
    tags: [
      {
        name: "vue3",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "pink-text-gradient",
      },
    ],
    image: "/projects/helpdesk-1.jpg",
    source_code_link: "https://github.com/DucNgVan/helpdesk-response-library-mevn",
    live_demo_link: null,
  },
  {
    name: "M-Hike Outdoor Journal",
    description:
      "Native Android mobile hiking tracker with real-time GPS tracking (±5m precision), 3-tier geocoding, Mapbox integration, and persistent Cloud Firestore synchronization.",
    tags: [
      {
        name: "androidJava",
        color: "green-text-gradient",
      },
      {
        name: "mapboxGPS",
        color: "blue-text-gradient",
      },
      {
        name: "firestore",
        color: "orange-text-gradient",
      },
    ],
    image: "/projects/mhike-1.jpg",
    source_code_link: "https://github.com/DucNgVan/mhike-android-trail-tracker",
    live_demo_link: null,
  },
];
