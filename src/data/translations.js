export const translations = {
  en: {
    nav: {
      about: "ABOUT",
      expertise: "EXPERTISE",
      work: "WORK",
      achievements: "ACHIEVEMENTS",
      contact: "CONTACT",
    },
    hero: {
      titleWord1: "SOFTWARE",
      titleWord2: "ENGINEERING",
      subtitleVisuals: "VISUALS",
      subtitleCode: "CODE",
      subtitleArch: "ARCHITECTURE",
      scrollExplore: "SCROLL TO EXPLORE",
      rotatingBadge: "LET'S WORK TOGETHER • LET'S WORK TOGETHER •",
      basedIn: "BASED IN VIETNAM",
    },
    about: {
      sectionTitle: "ABOUT ME",
      eyebrow: "—— WHO AM I ?",
      headlinePart1: "I BUILD",
      headlinePart2: "DIGITAL WORLDS",
      headlinePart3: "WHERE",
      headlinePart4: "DESIGN MEETS CODE.",
      bioP1: "I'm Nguyen Van Duc — a fresh Software Engineering graduate from the University of Greenwich. I have a genuine passion for turning architectural designs and algorithms into clean, robust web and mobile applications.",
      bioP2: "Recognized as a Top 3 Student of Greenwich 2024, 2nd Prize winner at the Impact Innovation Bootcamp (199 Hospital), and Finalist in the LG Dream Code Challenge, I combine academic excellence with practical full-stack development using React, Next.js, Node.js, and Java.",
      badgeGrad: "GREENWICH GRADUATE",
      badgeAvailable: "AVAILABLE",
      metadata: [
        { label: "BASED", value: "DA NANG, VIETNAM" },
        { label: "DEGREE", value: "BSC (HONS) SOFTWARE ENG" },
        { label: "ALMA MATER", value: "UNIVERSITY OF GREENWICH" },
        { label: "HONOR", value: "TOP 3 STUDENT (2024)" },
        { label: "SPECIALIZATION", value: "FULL-STACK & SOFTWARE" },
        { label: "CORE STACK", value: "REACT / NEXT / NODE / JAVA" },
      ],
    },
    expertise: {
      eyebrow: "SKILLS & EXPERTISE",
      title: "SKILLS & COMPETENCY MATRIX",
      subtitle: "Tailored for a Software Engineering Graduate — combining practical full-stack fundamentals with strong teamwork, adaptability, and analytical problem-solving.",
      tabAll: "All Overview",
      tabTech: "Technical Stack",
      tabSoft: "Soft Skills",
      techHeading: "Technical Foundations (Curated for Junior Software Engineer)",
      softHeading: "Professional Soft Skills & Engineering Mindset",
      softCount: "[ 5 Core Competencies ]",
      domains: [
        {
          id: '01',
          title: 'Frontend Engineering',
          category: 'CLIENT-SIDE',
          description: 'Developing responsive, clean, and accessible user interfaces with React, Next.js, and modern CSS utility workflows.',
        },
        {
          id: '02',
          title: 'Backend & Data Foundations',
          category: 'SERVER & DATABASE',
          description: 'Building modular RESTful APIs with Node.js/Express, applying OOP principles with Java, and modeling relational databases with SQL.',
        },
        {
          id: '03',
          title: 'Tools & Engineering Practices',
          category: 'DEVOPS & WORKFLOW',
          description: 'Maintaining clear version control via Git Flow, managing local containerization with Docker, and verifying endpoints with Postman.',
        },
      ],
      softSkills: [
        {
          id: "teamwork",
          title: "Team Collaboration & Peer Code Review",
          badge: "Agile Team Player",
          description: "Experienced in collaborating across university hackathons and group engineering projects using Git pull requests, code reviews, constructive feedback, and structured task division.",
          tags: ["Git Flow", "Teamwork", "Peer Review", "Active Listening"],
        },
        {
          id: "analytical-problem-solving",
          title: "Analytical Thinking & Problem Solving",
          badge: "Core Engineering Mindset",
          description: "Ability to break down complex architectural requirements into actionable, clean, and testable modules. Strong foundation in logic, data structures, and algorithmic debugging.",
          tags: ["Deductive Logic", "Root Cause Analysis", "Debugging", "Clean Code"],
        },
        {
          id: "adaptability",
          title: "Fast Learner & Growth Mindset",
          badge: "Continuous Evolution",
          description: "Quick to pick up new frameworks, libraries, and design patterns. Enthusiastic about staying current with modern web standards and engineering best practices.",
          tags: ["Self-starter", "Fast Learner", "Graduate Mindset", "Tech Curiosity"],
        },
        {
          id: "agile-project-mgmt",
          title: "Agile & Scrum Workflow",
          badge: "Iterative Delivery",
          description: "Practiced sprint planning, backlog grooming, daily standups, and retrospective workflows in capstone and team competition environments.",
          tags: ["Agile/Scrum", "Sprint Planning", "Task Ownership", "Jira/Trello"],
        },
        {
          id: "academic-english",
          title: "Technical English & Documentation",
          badge: "International Standard",
          description: "Comfortable reading and writing software documentation, architecture blueprints, API specifications (Swagger/Postman), and communicating in international team settings.",
          tags: ["Technical Specs", "English Communication", "Documentation"],
        }
      ],
      ticker: ['FULL-STACK WEB', 'TEAM COLLABORATION', 'AGILE & SCRUM', 'PROBLEM SOLVING', 'TECHNICAL ENGLISH']
    },
    work: {
      eyebrow: "SCROLL TO EXPLORE MY",
      title: "WORK",
      archDetails: "Architecture Details",
      viewGithub: "View on GitHub",
      viewDemo: "View Live Demo",
      bottomTicker: ['UI/UX', 'INTERACTIVE WEB', 'CREATIVE DEVELOPMENT', 'MOTION DESIGN', 'HIGH PERFORMANCE', 'CLEAN CODE'],
      projects: [
        {
          id: 1,
          title: "Nomadix — All-in-One Travel & Community App",
          category: "Final Year Capstone Project",
          description: "Nomadix is a full-featured travel platform developed as the Final Year Project (FYP) at the University of Greenwich. It allows users to compare flights and hotels, build custom personalized itineraries, and exchange real-world travel stories with an active community.",
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
          highlights: [
            "Architected native Android activities and fragments with clean separation of concerns",
            "Implemented local SQLite database caching for offline trail observations and condition logs",
            "Dynamic input validation with customized forms and material design aesthetics"
          ]
        }
      ]
    },
    achievements: {
      eyebrow: "HONORS & RECOGNITION",
      title: "ACADEMIC HONORS & GREENWICH MILESTONES",
      verified: "VERIFIED",
      milestonesHeading: "Honors & Award Milestones",
      certified: "University Certified",
      milestoneBadge: "Academic Milestone",
      credentials: [
        { 
          value: "BSc (Hons)", 
          suffix: "Degree", 
          label: "Software Engineering", 
          desc: "University of Greenwich (British Degree Standard)" 
        },
        { 
          value: "04 Major", 
          suffix: "Honors", 
          label: "Awards & Competitions", 
          desc: "Top 3 Cohort, Innovation Hackathon, LG Finals & Best Club" 
        },
        { 
          value: "10+", 
          suffix: "Repos", 
          label: "Software Projects", 
          desc: "Full-Stack Web, 3D Interactive Apps & Mobile Systems" 
        },
        { 
          value: "100%", 
          suffix: "English", 
          label: "International Standard", 
          desc: "Full English Curriculum, System Specs & Technical Docs" 
        },
      ],
      list: [
        {
          id: 1,
          year: "2024",
          title: "Top 3 Student of University of Greenwich 2024",
          organization: "University of Greenwich",
          description: "Recognized among the Top 3 Students of the University of Greenwich in 2024 for outstanding academic commitment, software engineering capabilities, and active student community contributions.",
          badge: "Top 3 Student 2024"
        },
        {
          id: 2,
          year: "2024",
          title: "Second Place (2nd Prize Winner) — Impact Innovation Bootcamp",
          organization: "199 Hospital (Ministry of Public Security)",
          description: "Achieved Second Place at the Impact Innovation Bootcamp organized by 199 Hospital, innovating practical technology solutions under fast-paced hackathon prototyping sprints.",
          badge: "2nd Prize Winner"
        },
        {
          id: 3,
          year: "2024",
          title: "The Best Club of 2024 — Greenwich Newspaper Group",
          organization: "University of Greenwich Student Community",
          description: "Awarded 'The Best Club of 2024' with Greenwich Newspaper Group, demonstrating strong team leadership, media creation, project organization, and collaborative impact across university initiatives.",
          badge: "Best Club 2024"
        },
        {
          id: 4,
          year: "2024",
          title: "The Final Round Finalist — LG Dream Code Challenge",
          organization: "LG Electronics",
          description: "Advanced to the Final Round of the prestigious LG Dream Code Challenge, competing among top nationwide engineering students in algorithmic problem solving and software programming.",
          badge: "Final Round Finalist"
        }
      ]
    },
    contact: {
      eyebrow: "GET IN TOUCH",
      title: "GET IN TOUCH & CONNECT",
      directHeading: "Direct Contact Information",
      directSub: "Feel free to copy my direct contact details or send a message:",
      emailLabel: "Direct Email",
      phoneLabel: "Phone Number",
      locationLabel: "Location",
      socialLabel: "Social Channels & Profiles",
      formHeading: "Send a Quick Message",
      formSub: "I'll get back to you as soon as possible:",
      nameLabel: "Your Name *",
      emailInputLabel: "Your Email *",
      subjectLabel: "Subject",
      messageLabel: "Message *",
      sendButton: "Send Message",
      successHeading: "Message sent successfully!",
      successSub: "Thank you for reaching out. I will respond to your email promptly!",
      namePlaceholder: "e.g. John Doe",
      emailPlaceholder: "john@example.com",
      subjectPlaceholder: "Job Opportunity / Project Collaboration...",
      messagePlaceholder: "Write your message here...",
    },
    modal: {
      openSource: "Open Source",
      highlightsTitle: "Key Architecture & Engineering Highlights",
      techTitle: "Technologies Used",
      stars: "Stars",
      forks: "Forks"
    },
    footer: {
      portfolioYear: "Portfolio 2026",
      tagline: "CRAFTED WITH PRECISION • REACT & TAILWIND",
      backToTop: "BACK TO TOP",
      copyright: "All rights reserved. Open for new opportunities and collaborations!"
    }
  },

  vi: {
    nav: {
      about: "GIỚI THIỆU",
      expertise: "KỸ NĂNG",
      work: "DỰ ÁN",
      achievements: "THÀNH TÍCH",
      contact: "LIÊN HỆ",
    },
    hero: {
      titleWord1: "KỸ SƯ",
      titleWord2: "PHẦN MỀM",
      subtitleVisuals: "GIAO DIỆN",
      subtitleCode: "MÃ NGUỒN",
      subtitleArch: "KIẾN TRÚC",
      scrollExplore: "CUỘN ĐỂ KHÁM PHÁ",
      rotatingBadge: "HỢP TÁC CÙNG TÔI • HỢP TÁC CÙNG TÔI •",
      basedIn: "ĐÀ NẴNG, VIỆT NAM",
    },
    about: {
      sectionTitle: "GIỚI THIỆU BẢN THÂN",
      eyebrow: "—— TÔI LÀ AI ?",
      headlinePart1: "TÔI XÂY DỰNG",
      headlinePart2: "THẾ GIỚI SỐ",
      headlinePart3: "NƠI",
      headlinePart4: "THIẾT KẾ HÒA CÙNG CODE.",
      bioP1: "Tôi là Nguyễn Văn Đức — Kỹ sư Phần mềm mới tốt nghiệp từ Đại học Greenwich. Tôi luôn mang trong mình niềm đam mê biến các ý tưởng thiết kế kiến trúc và giải thuật thành những ứng dụng web và di động mạnh mẽ, tối ưu và chỉn chu.",
      bioP2: "Được vinh danh Top 3 Sinh viên xuất sắc Đại học Greenwich năm 2024, đạt Giải Nhì cuộc thi Impact Innovation Bootcamp (Bệnh viện 199 - Bộ Công An) và lọt vào Vòng Chung kết toàn quốc LG Dream Code Challenge, tôi kết hợp nền tảng học thuật vững vàng cùng tư duy lập trình thực chiến với React, Next.js, Node.js và Java.",
      badgeGrad: "CỬ NHÂN GREENWICH",
      badgeAvailable: "SẴN SÀNG LÀM VIỆC",
      metadata: [
        { label: "ĐỊA ĐIỂM", value: "ĐÀ NẴNG, VIỆT NAM" },
        { label: "BẰNG CẤP", value: "BSC (HONS) SOFTWARE ENG" },
        { label: "TRƯỜNG ĐÀO TẠO", value: "ĐẠI HỌC GREENWICH" },
        { label: "DANH HIỆU", value: "TOP 3 SINH VIÊN (2024)" },
        { label: "CHUYÊN MÔN", value: "FULL-STACK & PHẦN MỀM" },
        { label: "TECH STACK", value: "REACT / NEXT / NODE / JAVA" },
      ],
    },
    expertise: {
      eyebrow: "KỸ NĂNG & NĂNG LỰC",
      title: "MA TRẬN NĂNG LỰC & KỸ NĂNG",
      subtitle: "Định hình chuẩn mực cho Kỹ sư Phần mềm mới tốt nghiệp — kết hợp nền tảng full-stack thực chiến cùng kỹ năng làm việc nhóm, thích ứng nhanh và tư duy giải quyết vấn đề.",
      tabAll: "Tổng quan",
      tabTech: "Kỹ thuật chuyên môn",
      tabSoft: "Kỹ năng mềm",
      techHeading: "Nền tảng Kỹ thuật Chuyên môn (Chuẩn Kỹ sư Phần mềm)",
      softHeading: "Kỹ Năng Mềm Chuyên Nghiệp & Tư Duy Kỹ Sư",
      softCount: "[ 5 Năng Lực Cốt Lõi ]",
      domains: [
        {
          id: '01',
          title: 'Frontend Engineering',
          category: 'CLIENT-SIDE',
          description: 'Phát triển giao diện web tương tác mượt mà, chuẩn công thái học và chuẩn Responsive với React, Next.js và Tailwind CSS.',
        },
        {
          id: '02',
          title: 'Backend & Data Foundations',
          category: 'SERVER & DATABASE',
          description: 'Xây dựng RESTful API dạng module với Node.js/Express, áp dụng tư duy hướng đối tượng (OOP) với Java và thiết kế cơ sở dữ liệu quan hệ SQL.',
        },
        {
          id: '03',
          title: 'Tools & Engineering Practices',
          category: 'DEVOPS & WORKFLOW',
          description: 'Quản lý phiên bản mã nguồn chặt chẽ với Git Flow, đóng gói dịch vụ độc lập bằng Docker và kiểm thử API tự động với Postman.',
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
      archDetails: "Chi tiết kiến trúc",
      viewGithub: "Xem trên GitHub",
      viewDemo: "Trải nghiệm trực tiếp",
      bottomTicker: ['THIẾT KẾ UI/UX', 'WEB TƯƠNG TÁC 3D', 'LẬP TRÌNH SÁNG TẠO', 'CHUYỂN ĐỘNG MƯỢT MÀ', 'HIỆU NĂNG CAO', 'CLEAN CODE'],
      projects: [
        {
          id: 1,
          title: "Nomadix — Nền Tảng Du Lịch & Cộng Đồng All-in-One",
          category: "Đồ án Tốt Nghiệp Capstone (FYP)",
          description: "Nomadix là nền tảng du lịch toàn diện được phát triển dưới dạng Đồ án Tốt nghiệp (FYP) tại Đại học Greenwich. Cho phép người dùng so sánh vé máy bay & khách sạn, tạo lịch trình cá nhân hóa và chia sẻ trải nghiệm thực tế cùng cộng đồng.",
          highlights: [
            "Đồ án tốt nghiệp tổng hợp kiến thức toàn khóa Kỹ sư Phần mềm tại Greenwich",
            "Công cụ lập lịch trình tương tác kéo thả linh hoạt và trực quan",
            "Tích hợp dịch vụ so sánh chuyến bay và khách sạn đa tiêu chí",
            "Cộng đồng du lịch với tính năng đánh giá, đăng tải hình ảnh và lưu điểm đến"
          ]
        },
        {
          id: 2,
          title: "NÉT — Nền Tảng Thời Trang Tuần Hoàn & Tương Tác 3D",
          category: "Nền Tảng Full-Stack Web & 3D Interactive",
          description: "Nền tảng thương mại điện tử bền vững và thủ công tương tác 3D sáng tạo cho đội thi VecomNet's Tsunami Team. Tái sinh lưới ma đại dương thành túi xách & charm độc bản, tích hợp tùy biến mô hình 3D xoay 360°, studio sáng tạo AI và hải đồ căn cước số minh bạch.",
          highlights: [
            "Xây dựng bộ xem mô hình 3D thực tế xoay 360 độ và chọn màu đại dương thời gian thực",
            "Tích hợp studio thiết kế túi cá nhân hóa ứng dụng AI thông minh",
            "Hệ thống hải đồ căn cước số công khai dữ liệu cứu hộ lưới ma với mã định danh GPS đáy biển",
            "Tối ưu hiệu năng, giao diện chuyển động mượt mà triển khai liền mạch trên Vercel"
          ]
        },
        {
          id: 3,
          title: "Web2 Dynamic Web Application",
          category: "Ứng Dụng Đơn Trang Full-Stack SPA",
          description: "Ứng dụng web đơn trang (SPA) động xây dựng theo kiến trúc component hiện đại cho học phần Lập trình Web tại Đại học Greenwich, ứng dụng quản lý trạng thái phản ứng và liên kết API RESTful.",
          highlights: [
            "Kiến trúc SPA phản ứng nhanh xây dựng với cây component và reactive store Vue 3",
            "Tuân thủ nghiêm ngặt tiêu chuẩn thiết kế giao diện UI/UX và khả năng tiếp cận",
            "Đồng bộ hóa dữ liệu thời gian thực và trải nghiệm người dùng liền mạch"
          ]
        },
        {
          id: 4,
          title: "Ứng Dụng Native Android Theo Dõi Đường Đi Rừng & Leo Núi",
          category: "Ứng Dụng Di Động Native Android",
          description: "Ứng dụng Android thuần xây dựng bằng Java cho môn học Phát triển Ứng dụng Di động, hỗ trợ người yêu dã ngoại lập kế hoạch, ghi chép và lưu trữ hành trình leo núi với cơ sở dữ liệu SQLite ngoại tuyến.",
          highlights: [
            "Kiến trúc Activity và Fragment phân tách trách nhiệm rõ ràng chuẩn Android",
            "Tích hợp cơ sở dữ liệu SQLite cục bộ lưu nhật ký quan sát không cần mạng",
            "Xác thực dữ liệu đầu vào theo thời gian thực với phong cách thiết kế Material Design"
          ]
        }
      ]
    },
    achievements: {
      eyebrow: "DANH HIỆU & GIẢI THƯỞNG",
      title: "DANH HIỆU HỌC THUẬT & CỘT MỐC GREENWICH",
      verified: "XÁC MINH",
      milestonesHeading: "Chi tiết Các Cột mốc & Giải thưởng",
      certified: "Chứng thực chính quy",
      milestoneBadge: "Cột mốc học thuật",
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
          desc: "Top 3 Sinh viên, Giải Nhì Hackathon, Chung kết LG & CLB xuất sắc" 
        },
        { 
          value: "10+", 
          suffix: "Dự án", 
          label: "Mã nguồn Phần mềm", 
          desc: "Ứng dụng Full-Stack Web, 3D Tương tác & Ứng dụng Di động" 
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
          description: "Được vinh danh trong Top 3 Sinh viên xuất sắc của Đại học Greenwich năm 2024 nhờ nỗ lực học tập vượt bậc, năng lực kỹ thuật phần mềm vững vàng và đóng góp tích cực cho cộng đồng sinh viên.",
          badge: "Top 3 Sinh viên 2024"
        },
        {
          id: 2,
          year: "2024",
          title: "Giải Nhì (Second Place) — Impact Innovation Bootcamp",
          organization: "Bệnh viện 199 (Bộ Công An)",
          description: "Đạt Giải Nhì tại cuộc thi Impact Innovation Bootcamp do Bệnh viện 199 tổ chức, sáng tạo giải pháp công nghệ y tế thực tiễn trong các chặng chạy nước rút hackathon cường độ cao.",
          badge: "Giải Nhì Cuộc Thi"
        },
        {
          id: 3,
          year: "2024",
          title: "Câu Lạc Bộ Xuất Sắc Nhất Năm 2024 — Greenwich Newspaper Group",
          organization: "Cộng đồng Sinh viên Đại học Greenwich",
          description: "Được trao tặng danh hiệu 'CLB Xuất Sắc Nhất Năm 2024' cùng Greenwich Newspaper Group, khẳng định năng lực lãnh đạo đội nhóm, tổ chức dự án và lan tỏa giá trị cộng đồng.",
          badge: "CLB Xuất Sắc 2024"
        },
        {
          id: 4,
          year: "2024",
          title: "Vòng Chung Kết Toàn Quốc LG Dream Code Challenge",
          organization: "Tập đoàn LG Electronics",
          description: "Vượt qua các vòng tuyển chọn gắt gao để tiến vào Vòng Chung kết toàn quốc cuộc thi LG Dream Code Challenge, tranh tài giải thuật và lập trình tối ưu cùng các tài năng công nghệ cả nước.",
          badge: "Chung Kết Toàn Quốc"
        }
      ]
    },
    contact: {
      eyebrow: "LIÊN HỆ",
      title: "KẾT NỐI & LIÊN HỆ TRỰC TIẾP",
      directHeading: "Thông Tin Liên Hệ Nhanh",
      directSub: "Sao chép nhanh thông tin liên lạc hoặc gửi tin nhắn trao đổi cơ hội công việc:",
      emailLabel: "Email Trực Tiếp",
      phoneLabel: "Số Điện Thoại",
      locationLabel: "Địa Điểm",
      socialLabel: "Mạng Xã Hội & Hồ Sơ Trực Tuyến",
      formHeading: "Gửi Tin Nhắn Nhanh",
      formSub: "Tôi sẽ phản hồi bạn trong thời gian sớm nhất:",
      nameLabel: "Họ và Tên *",
      emailInputLabel: "Email của bạn *",
      subjectLabel: "Tiêu đề",
      messageLabel: "Nội dung tin nhắn *",
      sendButton: "Gửi Tin Nhắn",
      successHeading: "Tin nhắn đã gửi thành công!",
      successSub: "Cảm ơn bạn đã kết nối. Tôi sẽ phản hồi email của bạn sớm nhất có thể!",
      namePlaceholder: "Ví dụ: Nguyễn Văn A",
      emailPlaceholder: "name@example.com",
      subjectPlaceholder: "Cơ hội việc làm / Trao đổi dự án...",
      messagePlaceholder: "Nhập nội dung tin nhắn của bạn tại đây...",
    },
    modal: {
      openSource: "Mã nguồn mở",
      highlightsTitle: "Điểm Nhấn Kiến Trúc & Kỹ Thuật",
      techTitle: "Công Nghệ Ứng Dụng",
      stars: "Sao",
      forks: "Forks"
    },
    footer: {
      portfolioYear: "Portfolio 2026",
      tagline: "THIẾT KẾ TỐI ƯU • REACT & TAILWIND CSS",
      backToTop: "LÊN ĐẦU TRANG",
      copyright: "Bảo lưu mọi quyền. Sẵn sàng đón nhận cơ hội công việc và hợp tác dự án!"
    }
  }
};
