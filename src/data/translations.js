export const translations = {
  en: {
    nav: {
      about: "ABOUT",
      expertise: "EXPERTISE",
      work: "PROJECTS",
      achievements: "HONORS",
      contact: "CONTACT",
      resume: "RESUME (PDF)",
    },
    hero: {
      greeting: "Nguyen Van Duc",
      role: "Full-Stack Software Engineering Intern",
      subHeadline: "Final-Year Software Engineering Student at University of Greenwich\nOpen to Internships in Da Nang",
      ctaProjects: "View Projects",
      ctaCv: "Download CV (PDF)",
      titleWord1: "SOFTWARE",
      titleWord2: "ENGINEERING",
      subtitleVisuals: "VISUALS",
      subtitleCode: "CODE",
      subtitleArch: "ARCHITECTURE",
      scrollExplore: "SCROLL TO EXPLORE",
      rotatingBadge: "GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •",
      basedIn: "DA NANG, VIETNAM",
    },
    about: {
      sectionTitle: "ABOUT ME",
      eyebrow: "—— WHO AM I ?",
      headlinePart1: "ENGINEERING RELIABLE",
      headlinePart2: "APPLICATIONS,",
      headlinePart3: "BACKED BY CLEAN ARCHITECTURE &",
      headlinePart4: "REAL PRODUCT IMPACT.",
      bioP1: "I am Nguyen Van Duc — a final-year Software Engineering student at the University of Greenwich (Vietnam). With my current skill set, my priority is always Clean Architecture and database performance optimization. I leverage core technologies such as Node.js/Express, PostgreSQL (3NF), Redis caching, and Docker Compose to engineer robust, scalable backend systems.",
      bioP2: "I am actively seeking an internship in an environment with a structured focus on talent development—a place where I can learn, grow, and directly apply my expertise to contribute to the company's goals. Over the next 5 years, I aim to become at least a Middle Full-Stack Engineer, focusing on architecting and building large-scale systems with high complexity.",
      downloadCvBtn: "Download Resume (PDF)",
      badgeGrad: "GREENWICH VIETNAM • SOFTWARE ENGINEERING",
      badgeAvailable: "READY FOR INTERNSHIP",
      metadata: [
        { label: "LOCATION", value: "DA NANG, VIETNAM (HYBRID / REMOTE READY)" },
        { label: "DEGREE", value: "BSC (HONS) SOFTWARE ENG" },
        { label: "ALMA MATER", value: "UNIVERSITY OF GREENWICH" },
        { label: "TARGET ROLE", value: "FULL-STACK INTERN / JUNIOR ENGINEER" },
        { label: "CORE FOCUS", value: "FULL-STACK WEB & APPLICATION ARCHITECTURE" },
        { label: "TECH STACK", value: "REACT / NEXT.JS / NODE.JS / TYPESCRIPT / POSTGRESQL / MONGODB" },
      ],
    },
    expertise: {
      eyebrow: "SKILLS & EXPERTISE",
      title: "TECHNICAL COMPETENCY MATRIX",
      subtitle: "Curated for a Full-Stack Intern & Junior Software Engineer — combining practical full-stack fundamentals with clean architecture, adaptability, and analytical problem-solving.",
      tabAll: "All Overview",
      tabTech: "Technical Stack",
      tabSoft: "Soft Skills",
      techHeading: "Technical Foundations (Categorized by Production & Project Application)",
      softHeading: "Professional Soft Skills & Engineering Mindset",
      softCount: "[ 5 Core Competencies ]",
      domains: [
        {
          id: '01',
          title: 'Frontend & Interactive Web',
          category: 'CLIENT-SIDE',
          description: 'Building responsive, accessible, and high-performance interfaces with Next.js 14, React, TypeScript, Tailwind CSS, and Three.js 3D rendering.',
        },
        {
          id: '02',
          title: 'Backend & Data Architecture',
          category: 'SERVER & DATABASE',
          description: 'Designing modular RESTful APIs with Node.js/Express, relational database modeling in PostgreSQL (3NF schema), MongoDB, Redis caching, and Java OOP.',
        },
        {
          id: '03',
          title: 'DevOps & Engineering Practices',
          category: 'DEVOPS & WORKFLOW',
          description: 'Managing structured Git Flow version control, containerizing multi-tier services with Docker Compose, and verifying API endpoints with Postman.',
        },
      ],
      softSkills: [
        {
          id: "teamwork",
          title: "Team Collaboration & Peer Code Review",
          badge: "Agile Team Player",
          description: "Experienced in collaborating across university hackathons and group engineering projects using Git pull requests, constructive code reviews, structured task breakdowns, and active communication.",
          tags: ["Git Flow", "Teamwork", "Peer Review", "Active Communication"],
        },
        {
          id: "analytical-problem-solving",
          title: "Analytical Thinking & Problem Solving",
          badge: "Core Engineering Mindset",
          description: "Ability to dissect complex application requirements into decoupled, testable modules. Strong foundation in data structures, algorithms, and systematic root-cause debugging.",
          tags: ["Root Cause Analysis", "Modular Design", "Debugging", "Clean Code"],
        },
        {
          id: "adaptability",
          title: "Fast Learner & Growth Mindset",
          badge: "Continuous Evolution",
          description: "Rapidly grasps new frameworks, design patterns, and SDKs through hands-on implementation. Passionate about modern web standards, software architecture, and iterative improvements.",
          tags: ["Quick Learner", "Continuous Growth", "Curiosity", "Self-starter"],
        },
        {
          id: "agile-project-mgmt",
          title: "Agile & Scrum Workflow",
          badge: "Iterative Delivery",
          description: "Practiced sprint planning, backlog grooming, daily standups, and retrospective workflows during capstone development and hackathon prototyping sprints.",
          tags: ["Agile/Scrum", "Sprint Planning", "Task Ownership", "Jira/Trello"],
        },
        {
          id: "academic-english",
          title: "Technical English & Documentation",
          badge: "British Standard",
          description: "Comfortable writing clear software documentation, architecture blueprints, API specifications (Postman/OpenAPI), and collaborating in international English-medium environments.",
          tags: ["Technical Specs", "English Communication", "Architecture Docs"],
        }
      ],
      ticker: ['FULL-STACK WEB', 'TEAM COLLABORATION & GIT FLOW', 'AGILE & SCRUM', 'PROBLEM SOLVING', 'TECHNICAL ENGLISH']
    },
    work: {
      eyebrow: "SCROLL TO EXPLORE MY",
      title: "PROJECTS",
      view3D: "3D ORBIT VIEW",
      viewGrid: "CURATED GRID",
      dragHint: "DRAG HORIZONTALLY TO ROTATE 3D CYLINDER",
      autoSpinOn: "AUTO-SPIN: ON",
      autoSpinOff: "AUTO-SPIN: OFF",
      activeShowcase: "ACTIVE SHOWCASE",
      archDetails: "Architecture Details",
      viewGithub: "GitHub Repository",
      viewDemo: "Live Demo",
      problemLabel: "Problem Solved",
      solutionLabel: "Technical Solution",
      roleLabel: "My Role & Contributions",
      bottomTicker: ['NEXT.JS 14', 'THREE.JS 3D', 'NODE.JS REST APIS', 'POSTGRESQL 3NF', 'REDIS CACHING', 'DOCKER COMPOSE', 'CLEAN CODE'],
      projects: [
        {
          id: 1,
          title: "NÉT — Sustainable Ocean Net & 3D Interactive Craft",
          category: "Full-Stack Web & 3D Interactive Platform",
          tagline: "Eco-commerce platform transforming marine ghost nets into bespoke products with real-time 3D preview & AI studio.",
          description: "Innovative sustainable e-commerce and interactive 3D craft platform created for VecomNet's Tsunami Team. Transforms discarded ocean ghost nets into bespoke bags & charms, featuring real-time 3D model customization, AI story studio, and a transparent digital eco-passport.",
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
      ]
    },
    achievements: {
      eyebrow: "HONORS & RECOGNITION",
      title: "ACADEMIC HONORS & VERIFIED MILESTONES",
      milestonesHeading: "Honors & Award Milestones",
      credentials: [
        { 
          value: "BSc (Hons)", 
          suffix: "Degree", 
          label: "Software Engineering", 
          desc: "University of Greenwich (British Standard Curriculum)" 
        },
        { 
          value: "04 Major", 
          suffix: "Honors", 
          label: "Awards & Competitions", 
          desc: "Top 3 Student, Hackathon 2nd Prize, LG National Finalist & Best Club" 
        },
        { 
          value: "04 Key", 
          suffix: "Projects", 
          label: "Production & Academic Repos", 
          desc: "Full-Stack Web, 3D Interactive Apps & Scalable Backend Systems" 
        },
        { 
          value: "100%", 
          suffix: "English", 
          label: "International Standard", 
          desc: "Full English Curriculum, Architectural Specs & Technical Docs" 
        },
      ],
      list: [
        {
          id: 1,
          year: "2024",
          title: "Top 3 Student of University of Greenwich 2024",
          organization: "University of Greenwich",
          verificationLabel: "University Certified",
          description: "Recognized among the Top 3 Students of the University of Greenwich in 2024 for outstanding academic commitment, software engineering capabilities, and active student community contributions.",
          badge: "Top 3 Student 2024"
        },
        {
          id: 2,
          year: "2024",
          title: "Second Place (2nd Prize Winner) — Impact Innovation Bootcamp",
          organization: "199 Hospital (Ministry of Public Security)",
          verificationLabel: "Competition Verified",
          description: "Achieved Second Place at the Impact Innovation Bootcamp organized by 199 Hospital, innovating practical technology solutions under fast-paced hackathon prototyping sprints.",
          badge: "2nd Prize Winner"
        },
        {
          id: 3,
          year: "2024",
          title: "The Best Club of 2024 — Greenwich Newspaper Group",
          organization: "University of Greenwich Student Community",
          verificationLabel: "Campus Leadership",
          description: "Awarded 'The Best Club of 2024' as Club President with Greenwich Newspaper Group, demonstrating strong team leadership, media creation, project organization, and collaborative impact.",
          badge: "Best Club 2024"
        },
        {
          id: 4,
          year: "2024",
          title: "National Finalist — LG Dream Code Challenge",
          organization: "LG Electronics",
          verificationLabel: "National Finalist",
          description: "Advanced to the Final Round of the prestigious LG Dream Code Challenge, competing among top nationwide engineering students in algorithmic problem solving and software programming.",
          badge: "National Finalist"
        }
      ]
    },
    contact: {
      eyebrow: "GET IN TOUCH",
      title: "GET IN TOUCH & CONNECT",
      directHeading: "Direct Contact Information",
      directSub: "Feel free to copy my direct contact details, download my CV, or send a message:",
      emailLabel: "Direct Email",
      phoneLabel: "Phone Number",
      locationLabel: "Location",
      cvLabel: "Curriculum Vitae",
      downloadCvAction: "Download ATS Resume (PDF)",
      socialLabel: "Social Channels & Profiles",
      formHeading: "Send a Quick Message",
      formSub: "I will respond to your email as soon as possible:",
      nameLabel: "Your Name *",
      emailInputLabel: "Your Email *",
      subjectLabel: "Subject",
      messageLabel: "Message *",
      sendButton: "Send Message",
      sendingButton: "Sending Message...",
      successHeading: "Message sent successfully!",
      successSub: "Thank you for reaching out. I will respond to your email promptly!",
      errorHeading: "Failed to send message",
      errorSub: "Something went wrong while sending. Please try again or email me directly at ducnv179.wk@gmail.com.",
      sendAnother: "Send Another Message",
      fallbackMail: "Open in Mail Client",
      namePlaceholder: "e.g. John Doe",
      emailPlaceholder: "john@example.com",
      subjectPlaceholder: "Job Opportunity / Project Collaboration...",
      messagePlaceholder: "Write your message here...",
    },
    modal: {
      openSource: "Verified Repository",
      highlightsTitle: "Key Architecture & Engineering Highlights",
      techTitle: "Technologies Applied",
      problemTitle: "Problem Solved",
      solutionTitle: "Technical Solution",
      roleTitle: "My Role & Contributions",
      viewGithub: "View GitHub Repository",
      viewDemo: "Open Live Demo"
    },
    footer: {
      portfolioYear: "Portfolio 2026",
      tagline: "CRAFTED WITH PRECISION • REACT & TAILWIND",
      backToTop: "BACK TO TOP",
      copyright: "All rights reserved. Open for Full-Stack / Software Engineering Internship opportunities!"
    }
  },

  vi: {
    nav: {
      about: "GIỚI THIỆU",
      expertise: "KỸ NĂNG",
      work: "DỰ ÁN",
      achievements: "THÀNH TÍCH",
      contact: "LIÊN HỆ",
      resume: "HỒ SƠ (CV)",
    },
    hero: {
      greeting: "Nguyễn Văn Đức",
      role: "Thực tập sinh Kỹ sư Phần mềm Full-Stack",
      subHeadline: "Sinh viên năm cuối Kỹ thuật Phần mềm · Đại học Greenwich · Sẵn sàng thực tập tại Đà Nẵng & Remote",
      ctaProjects: "Xem Dự Án",
      ctaCv: "Tải CV (PDF)",
      titleWord1: "KỸ SƯ",
      titleWord2: "PHẦN MỀM",
      subtitleVisuals: "GIAO DIỆN",
      subtitleCode: "MÃ NGUỒN",
      subtitleArch: "KIẾN TRÚC",
      scrollExplore: "CUỘN ĐỂ KHÁM PHÁ",
      rotatingBadge: "SẴN SÀNG THỰC TẬP • ĐỒNG HÀNH PHÁT TRIỂN •",
      basedIn: "ĐÀ NẴNG, VIỆT NAM",
    },
    about: {
      sectionTitle: "GIỚI THIỆU BẢN THÂN",
      eyebrow: "—— TÔI LÀ AI ?",
      headlinePart1: "XÂY DỰNG ỨNG DỤNG",
      headlinePart2: "BÀI BẢN,",
      headlinePart3: "DỰA TRÊN KIẾN TRÚC RÕ RÀNG &",
      headlinePart4: "GIÁ TRỊ SẢN PHẨM THỰC.",
      bioP1: "Tôi là Nguyễn Văn Đức — sinh viên năm cuối chuyên ngành Kỹ thuật Phần mềm tại Đại học Greenwich (Việt Nam). Với bộ kỹ năng hiện tại, ưu tiên hàng đầu của tôi luôn là Clean Architecture và tối ưu hóa hiệu năng cơ sở dữ liệu. Tôi sử dụng các công nghệ cốt lõi như Node.js/Express, PostgreSQL (3NF), Redis caching và Docker Compose để xây dựng các hệ thống backend mạnh mẽ, có khả năng mở rộng.",
      bioP2: "Tôi đang tích cực tìm kiếm cơ hội thực tập trong môi trường có định hướng phát triển nhân tài bài bản — nơi tôi có thể học hỏi, phát triển và trực tiếp áp dụng chuyên môn để đóng góp vào mục tiêu của công ty. Trong 5 năm tới, mục tiêu của tôi là trở thành ít nhất một Middle Full-Stack Engineer, tập trung vào thiết kế kiến trúc và xây dựng các hệ thống quy mô lớn với độ phức tạp cao.",
      downloadCvBtn: "Tải Hồ Sơ Năng Lực (CV PDF)",
      badgeGrad: "GREENWICH VIỆT NAM • KỸ THUẬT PHẦN MỀM",
      badgeAvailable: "SẴN SÀNG THỰC TẬP",
      metadata: [
        { label: "ĐỊA ĐIỂM", value: "ĐÀ NẴNG, VIỆT NAM (SẴN SÀNG HYBRID / REMOTE)" },
        { label: "BẰNG CẤP", value: "BSC (HONS) KỸ THUẬT PHẦN MỀM" },
        { label: "TRƯỜNG ĐÀO TẠO", value: "ĐẠI HỌC GREENWICH" },
        { label: "VỊ TRÍ MONG MUỐN", value: "THỰC TẬP SINH FULL-STACK / JUNIOR ENGINEER" },
        { label: "CHUYÊN MÔN CỐT LÕI", value: "KIẾN TRÚC FULL-STACK WEB & APPLICATION" },
        { label: "TECH STACK", value: "REACT / NEXT.JS / NODE.JS / TYPESCRIPT / POSTGRESQL / MONGODB" },
      ],
    },
    expertise: {
      eyebrow: "KỸ NĂNG & NĂNG LỰC",
      title: "MA TRẬN NĂNG LỰC KỸ THUẬT",
      subtitle: "Định hình chuẩn mực cho Thực tập sinh & Kỹ sư Phần mềm mới tốt nghiệp — kết hợp nền tảng full-stack thực chiến cùng tư duy kiến trúc sạch, thích ứng nhanh và tinh thần trách nhiệm.",
      tabAll: "Tổng quan",
      tabTech: "Kỹ thuật chuyên môn",
      tabSoft: "Kỹ năng mềm",
      techHeading: "Nền tảng Kỹ thuật Chuyên môn (Phân loại theo dự án & ứng dụng thực tế)",
      softHeading: "Kỹ Năng Mềm Chuyên Nghiệp & Tư Duy Kỹ Sư",
      softCount: "[ 5 Năng Lực Cốt Lõi ]",
      domains: [
        {
          id: '01',
          title: 'Frontend & Web Tương Tác',
          category: 'CLIENT-SIDE',
          description: 'Phát triển giao diện web mượt mà, chuẩn Responsive và công thái học với Next.js 14, React, TypeScript, Tailwind CSS và đồ họa 3D Three.js.',
        },
        {
          id: '02',
          title: 'Backend & Kiến Trúc Dữ Liệu',
          category: 'SERVER & DATABASE',
          description: 'Thiết kế RESTful API dạng module với Node.js/Express, mô hình hóa dữ liệu quan hệ PostgreSQL (chuẩn 3NF), MongoDB, cache Redis và OOP với Java.',
        },
        {
          id: '03',
          title: 'DevOps & Quy Trình Kỹ Thuật',
          category: 'DEVOPS & WORKFLOW',
          description: 'Quản lý phiên bản chặt chẽ bằng Git Flow, đóng gói hệ thống đa dịch vụ bằng Docker Compose và kiểm thử hợp đồng API tự động bằng Postman.',
        },
      ],
      softSkills: [
        {
          id: "teamwork",
          title: "Làm Việc Nhóm & Đánh Giá Mã Nguồn (Peer Review)",
          badge: "Đồng đội Agile",
          description: "Kinh nghiệm phối hợp trong các dự án đồ án nhóm và hackathon thông qua Git pull requests, phản biện code xây dựng và phân chia module rõ ràng.",
          tags: ["Git Flow", "Teamwork", "Peer Review", "Lắng nghe tích cực"],
        },
        {
          id: "analytical-problem-solving",
          title: "Tư Duy Phân Tích & Giải Quyết Vấn Đề",
          badge: "Tư duy kỹ sư cốt lõi",
          description: "Khả năng phân rã bài toán phức tạp thành các module rõ ràng, độc lập và dễ kiểm thử. Nền tảng tư duy logic, cấu trúc dữ liệu và giải thuật vững vàng.",
          tags: ["Tư duy suy luận", "Phân tích nguyên nhân", "Debug", "Clean Code"],
        },
        {
          id: "adaptability",
          title: "Khả Năng Tự Học & Thích Ứng Nhanh Chóng",
          badge: "Không ngừng phát triển",
          description: "Nắm bắt nhanh các framework, thư viện và mô hình kiến trúc mới. Luôn chủ động cập nhật các tiêu chuẩn web và xu hướng kỹ thuật hiện đại.",
          tags: ["Chủ động", "Tự học nhanh", "Tư duy phát triển", "Đam mê công nghệ"],
        },
        {
          id: "agile-project-mgmt",
          title: "Quy Trình Làm Việc Agile & Scrum",
          badge: "Bàn giao linh hoạt",
          description: "Thực hành quy trình sprint planning, daily standup, quản lý backlog và tổng kết sprint trong đồ án tốt nghiệp và môi trường thi đấu hackathon.",
          tags: ["Agile/Scrum", "Lập kế hoạch Sprint", "Trách nhiệm task", "Jira/Trello"],
        },
        {
          id: "academic-english",
          title: "Tiếng Anh Chuyên Ngành & Tài Liệu Kỹ Thuật",
          badge: "Chuẩn Quốc Tế",
          description: "Thành thạo đọc hiểu và viết tài liệu kỹ thuật, đặc tả kiến trúc phần mềm, tài liệu API (Swagger/Postman) và giao tiếp trong môi trường quốc tế.",
          tags: ["Đặc tả kỹ thuật", "Giao tiếp tiếng Anh", "Tài liệu hệ thống"],
        }
      ],
      ticker: ['LẬP TRÌNH FULL-STACK', 'LÀM VIỆC NHÓM & GIT FLOW', 'QUY TRÌNH AGILE & SCRUM', 'TƯ DUY GIẢI QUYẾT VẤN ĐỀ', 'TIẾNG ANH CHUYÊN NGÀNH']
    },
    work: {
      eyebrow: "CUỘN ĐỂ KHÁM PHÁ",
      title: "DỰ ÁN",
      view3D: "KHÔNG GIAN 3D",
      viewGrid: "DẠNG LƯỚI CHI TIẾT",
      dragHint: "KÉO CHUỘT / VUỐT ĐỂ XOAY VÒNG 3D",
      autoSpinOn: "TỰ ĐỘNG XOAY: BẬT",
      autoSpinOff: "TỰ ĐỘNG XOAY: TẮT",
      activeShowcase: "DỰ ÁN ĐANG XEM",
      archDetails: "Chi tiết kiến trúc",
      viewGithub: "Xem mã nguồn GitHub",
      viewDemo: "Trải nghiệm trực tiếp",
      problemLabel: "Vấn đề giải quyết",
      solutionLabel: "Giải pháp kỹ thuật",
      roleLabel: "Vai trò & Đóng góp",
      bottomTicker: ['NEXT.JS 14', 'THREE.JS 3D', 'NODE.JS REST APIS', 'POSTGRESQL 3NF', 'REDIS CACHING', 'DOCKER COMPOSE', 'CLEAN CODE'],
      projects: [
        {
          id: 1,
          title: "NÉT — Nền Tảng Thời Trang Tuần Hoàn & Tương Tác 3D",
          category: "Nền Tảng Full-Stack Web & 3D Interactive",
          tagline: "Sàn thương mại điện tử tuần hoàn tái sinh lưới ma đại dương với tùy biến 3D xoay 360° & studio sáng tạo AI.",
          description: "Nền tảng thương mại điện tử bền vững và thủ công tương tác 3D sáng tạo cho đội thi VecomNet's Tsunami Team. Tái sinh lưới ma đại dương thành túi xách & charm độc bản, tích hợp tùy biến mô hình 3D xoay 360°, studio sáng tạo AI và hải đồ căn cước số minh bạch.",
          problem: "Lưới ma đại dương gây ô nhiễm nghiêm trọng, trong khi các sản phẩm thời trang tái chế thiếu trải nghiệm tương tác số trực quan để thu hút người tiêu dùng.",
          solution: "Xây dựng web application chuẩn Responsive trên Next.js 14, tích hợp bộ tùy biến mô hình 3D với Three.js, studio thiết kế charm AI và hải đồ căn cước số truy xuất nguồn gốc.",
          myRole: "Lập trình viên Full-Stack (Tích hợp bộ xem 3D Three.js, responsive UI/UX, kết nối luồng AI studio và triển khai Vercel)",
          highlights: [
            "Xây dựng bộ xem mô hình 3D thực tế xoay 360 độ và chọn màu đại dương thời gian thực với Three.js",
            "Tích hợp studio thiết kế túi cá nhân hóa ứng dụng AI thông minh",
            "Hệ thống hải đồ căn cước số công khai dữ liệu cứu hộ lưới ma với mã định danh GPS đáy biển",
            "Tối ưu hiệu năng, giao diện chuyển động mượt mà triển khai liền mạch trên Vercel"
          ]
        },
        {
          id: 2,
          title: "Nomadix — Nền Tảng Du Lịch & Kiến Trúc Backend Đa Dịch Vụ",
          category: "Đồ án Tốt Nghiệp Capstone (FYP) · Kiến Trúc Backend",
          tagline: "Hệ thống backend module với 28 bảng dữ liệu quan hệ chuẩn 3NF, bộ nhớ đệm Redis, xác thực JWT và Docker.",
          description: "Hệ thống backend nền tảng du lịch toàn diện phát triển cho Đồ án Tốt nghiệp (FYP) tại Đại học Greenwich. Cung cấp API RESTful xử lý lập kế hoạch lịch trình, dịch vụ tra cứu so sánh chuyến bay/khách sạn, mạng xã hội chia sẻ trải nghiệm và quản lý phiên người dùng.",
          problem: "Người dùng phải sử dụng nhiều công cụ phân mảnh để lên lịch trình, đặt phòng và đọc đánh giá, đòi hỏi một hệ thống backend xử lý dữ liệu tập trung, ổn định.",
          solution: "Thiết kế kiến trúc REST API dạng module trên nền Node.js/Express, cơ sở dữ liệu PostgreSQL chuẩn hóa 28 bảng 3NF, bộ nhớ đệm Redis và môi trường container hóa với Docker Compose.",
          myRole: "Kỹ sư Backend & Kiến trúc Dữ liệu (Mô hình hóa DB 3NF, viết migration Knex, xác thực JWT token rotation, cache Redis và bộ kiểm thử API)",
          highlights: [
            "Thiết kế cơ sở dữ liệu quan hệ PostgreSQL 28 bảng chuẩn 3NF kèm kịch bản migration và đánh chỉ mục tối ưu",
            "Xây dựng cơ chế xác thực JWT bảo mật với kỹ thuật xoay vòng refresh token và phân quyền người dùng",
            "Tích hợp bộ nhớ đệm Redis tối ưu hóa tốc độ phản hồi cho các truy vấn lịch trình tần suất cao",
            "Điều phối môi trường cục bộ 3 dịch vụ bằng Docker Compose kèm bộ test tự động kiểm thử endpoint"
          ]
        },
        {
          id: 3,
          title: "IT Helpdesk Response Library (MEVN Stack)",
          category: "Nền Tảng Hỗ Trợ Doanh Nghiệp Full-Stack",
          tagline: "Hệ thống quản lý ticket hỗ trợ kỹ thuật và thư viện giải pháp với 8 RESTful endpoints, MongoDB và Vue 3 SPA.",
          description: "Ứng dụng web động xây dựng cho quy trình hỗ trợ kỹ thuật IT nội bộ. Cho phép kỹ thuật viên tiếp nhận, phân loại và xử lý ticket sự cố, tra cứu thư viện giải pháp nhanh và theo dõi chỉ số hỗ trợ.",
          problem: "Đội ngũ IT Helpdesk thường xuyên gặp các sự cố lặp lại nhưng thiếu kho giải pháp chuẩn hóa, gây chậm trễ thời gian phản hồi.",
          solution: "Phát triển bảng điều khiển đơn trang SPA với Vue 3 kết nối backend Express/MongoDB cung cấp 8 endpoint RESTful quản lý vòng đời ticket và tra cứu thư viện giải pháp.",
          myRole: "Lập trình viên Full-Stack (Xây dựng Vue 3 SPA, quản lý trạng thái, thiết kế schema MongoDB và bộ kiểm thử tự động)",
          highlights: [
            "Thiết kế 8 endpoint RESTful API xử lý trọn vẹn vòng đời ticket và tra cứu thư viện giải pháp theo danh mục",
            "Xây dựng Schema cơ sở dữ liệu MongoDB tối ưu bằng Mongoose kèm kiểm tra ràng buộc dữ liệu",
            "Phát triển giao diện phản ứng nhanh Vue 3 tuân thủ nguyên tắc thiết kế công thái học và trợ năng",
            "Tích hợp file kịch bản api_test.http phục vụ kiểm thử và tài liệu hóa endpoint chuẩn mực"
          ]
        },
        {
          id: 4,
          title: "M-Hike — Ứng Dụng Di Động Nhật Ký Leo Núi & Đường Đi Rừng",
          category: "Ứng Dụng Di Động Native Android",
          tagline: "Ứng dụng Android thuần với đồng bộ đám mây thời gian thực Cloud Firestore, Firebase Auth và lưu trữ ngoại tuyến.",
          description: "Ứng dụng di động Android thuần viết bằng ngôn ngữ Java phục vụ cộng đồng dã ngoại lập kế hoạch leo núi, ghi nhận tọa độ GPS, lưu trữ quan sát môi trường và đồng bộ nhật ký hành trình theo thời gian thực.",
          problem: "Người leo núi và khảo sát thực địa cần một ứng dụng nhật ký chuyên dụng để ghi chép địa hình, thời tiết và quan sát ngay cả khi điều kiện kết nối thay đổi.",
          solution: "Lập trình ứng dụng Android thuần bằng Java tích hợp Cloud Firestore với cơ chế addSnapshotListener để đồng bộ dữ liệu hai chiều tức thì cùng Firebase Authentication.",
          myRole: "Lập trình viên Android (Kiến trúc Activity/Fragment, xử lý đồng bộ FirestoreHelper, kiểm tra form nhập liệu động và UI Material)",
          highlights: [
            "Tích hợp đồng bộ dữ liệu đám mây hai chiều thời gian thực với Cloud Firestore addSnapshotListener",
            "Xây dựng quy trình xác thực người dùng và bảo vệ phiên đăng nhập an toàn bằng Firebase Authentication",
            "Thiết kế kiến trúc Activity & Fragment phân tách rõ ràng với bộ kiểm tra dữ liệu đầu vào tùy biến",
            "Tối ưu trải nghiệm với màn hình trạng thái rỗng và hàm nạp dữ liệu mẫu ban đầu trực quan"
          ]
        }
      ]
    },
    achievements: {
      eyebrow: "DANH HIỆU & GIẢI THƯỞNG",
      title: "DANH HIỆU HỌC THUẬT & CỘT MỐC CHỨNG THỰC",
      milestonesHeading: "Chi tiết Các Cột mốc & Giải thưởng",
      credentials: [
        { 
          value: "BSc (Hons)", 
          suffix: "Bằng cấp", 
          label: "Kỹ thuật Phần mềm", 
          desc: "Đại học Greenwich (Bằng Cử nhân Danh dự chuẩn Anh Quốc)" 
        },
        { 
          value: "04 Giải", 
          suffix: "Danh hiệu", 
          label: "Giải thưởng & Cuộc thi", 
          desc: "Top 3 Sinh viên, Giải Nhì Hackathon, Chung kết Toàn quốc LG & CLB xuất sắc" 
        },
        { 
          value: "04 Key", 
          suffix: "Dự án", 
          label: "Dự án Nổi bật", 
          desc: "Full-Stack Web, 3D Tương tác & Hệ thống Backend Mở rộng" 
        },
        { 
          value: "100%", 
          suffix: "Tiếng Anh", 
          label: "Chuẩn Quốc Tế", 
          desc: "Toàn bộ chương trình học, đồ án và tài liệu kỹ thuật bằng Tiếng Anh" 
        },
      ],
      list: [
        {
          id: 1,
          year: "2024",
          title: "Top 3 Sinh Viên Xuất Sắc Đại Học Greenwich 2024",
          organization: "Đại học Greenwich",
          verificationLabel: "Chứng nhận cấp trường",
          description: "Được vinh danh trong Top 3 Sinh viên xuất sắc của Đại học Greenwich năm 2024 nhờ nỗ lực học tập vượt bậc, năng lực kỹ thuật phần mềm vững vàng và đóng góp tích cực cho cộng đồng sinh viên.",
          badge: "Top 3 Sinh viên 2024"
        },
        {
          id: 2,
          year: "2024",
          title: "Giải Nhì (Second Place) — Impact Innovation Bootcamp",
          organization: "Bệnh viện 199 (Bộ Công An)",
          verificationLabel: "Xác nhận cuộc thi",
          description: "Đạt Giải Nhì tại cuộc thi Impact Innovation Bootcamp do Bệnh viện 199 tổ chức, sáng tạo giải pháp công nghệ y tế thực tiễn trong các chặng chạy nước rút hackathon cường độ cao.",
          badge: "Giải Nhì Cuộc Thi"
        },
        {
          id: 3,
          year: "2024",
          title: "Câu Lạc Bộ Xuất Sắc Nhất Năm 2024 — Greenwich Newspaper Group",
          organization: "Cộng đồng Sinh viên Đại học Greenwich",
          verificationLabel: "Cột mốc lãnh đạo",
          description: "Được trao tặng danh hiệu 'CLB Xuất Sắc Nhất Năm 2024' với cương vị Chủ nhiệm CLB Greenwich Newspaper Group, khẳng định năng lực lãnh đạo đội nhóm, tổ chức dự án và lan tỏa giá trị cộng đồng.",
          badge: "CLB Xuất Sắc 2024"
        },
        {
          id: 4,
          year: "2024",
          title: "Vòng Chung Kết Toàn Quốc LG Dream Code Challenge",
          organization: "Tập đoàn LG Electronics",
          verificationLabel: "Chung kết toàn quốc",
          description: "Vượt qua các vòng tuyển chọn gắt gao để tiến vào Vòng Chung kết toàn quốc cuộc thi LG Dream Code Challenge, tranh tài giải thuật và lập trình tối ưu cùng các tài năng công nghệ cả nước.",
          badge: "Chung Kết Toàn Quốc"
        }
      ]
    },
    contact: {
      eyebrow: "LIÊN HỆ",
      title: "KẾT NỐI & LIÊN HỆ TRỰC TIẾP",
      directHeading: "Thông Tin Liên Hệ Nhanh",
      directSub: "Sao chép nhanh thông tin liên lạc, tải hồ sơ CV hoặc gửi tin nhắn trao đổi cơ hội công việc:",
      emailLabel: "Email Trực Tiếp",
      phoneLabel: "Số Điện Thoại",
      locationLabel: "Địa Điểm",
      cvLabel: "Hồ Sơ Năng Lực (CV)",
      downloadCvAction: "Tải bản CV chuẩn ATS (PDF)",
      socialLabel: "Mạng Xã Hội & Hồ Sơ Trực Tuyến",
      formHeading: "Gửi Tin Nhắn Nhanh",
      formSub: "Tôi sẽ phản hồi bạn trong thời gian sớm nhất:",
      nameLabel: "Họ và Tên *",
      emailInputLabel: "Email của bạn *",
      subjectLabel: "Tiêu đề",
      messageLabel: "Nội dung tin nhắn *",
      sendButton: "Gửi Tin Nhắn",
      sendingButton: "Đang gửi tin nhắn...",
      successHeading: "Tin nhắn đã gửi thành công!",
      successSub: "Cảm ơn bạn đã kết nối. Tôi sẽ phản hồi email của bạn sớm nhất có thể!",
      errorHeading: "Gửi tin nhắn không thành công",
      errorSub: "Có lỗi xảy ra trong quá trình gửi. Vui lòng thử lại hoặc gửi trực tiếp vào email ducnv179.wk@gmail.com.",
      sendAnother: "Gửi tin nhắn khác",
      fallbackMail: "Mở ứng dụng Mail",
      namePlaceholder: "Ví dụ: Nguyễn Văn A",
      emailPlaceholder: "name@example.com",
      subjectPlaceholder: "Cơ hội việc làm / Trao đổi dự án...",
      messagePlaceholder: "Nhập nội dung tin nhắn của bạn tại đây...",
    },
    modal: {
      openSource: "Mã nguồn kiểm chứng",
      highlightsTitle: "Điểm Nhấn Kiến Trúc & Kỹ Thuật",
      techTitle: "Công Nghệ Ứng Dụng",
      problemTitle: "Bài Toán Đặt Ra",
      solutionTitle: "Giải Pháp Kỹ Thuật",
      roleTitle: "Vai Trò & Đóng Góp",
      viewGithub: "Xem mã nguồn GitHub",
      viewDemo: "Trải nghiệm trực tiếp"
    },
    footer: {
      portfolioYear: "Portfolio 2026",
      tagline: "THIẾT KẾ TỐI ƯU • REACT & TAILWIND CSS",
      backToTop: "LÊN ĐẦU TRANG",
      copyright: "Bảo lưu mọi quyền. Sẵn sàng đón nhận cơ hội thực tập Full-Stack / Software Engineering!"
    }
  }
};
