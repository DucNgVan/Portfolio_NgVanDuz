<div align="center">

# ⚡ Nguyen Van Duc — Developer Portfolio

**Software Engineer & Creative Coder**  
*Building modern, high-performance web experiences with clean architecture and cyberpunk aesthetic.*

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Live Demo](https://ducngvan.github.io/Portfolio_NgVanDuz/) · [Report Bug](https://github.com/DucNgVan/Portfolio_NgVanDuz/issues) · [Request Feature](https://github.com/DucNgVan/Portfolio_NgVanDuz/issues)

</div>

---

## 📖 Overview

Personal developer portfolio for **Nguyen Van Duc** — a software engineer passionate about engineering high-performance, interactive, and beautifully designed digital experiences. Built with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**, showcasing a distinctive Cyberpunk & Modern Brutalism aesthetic.

> An interactive developer portfolio highlighting featured projects, full-stack architecture capabilities, academic honors, technical skills matrix, and a celebratory interactive contact experience.

---

## ✨ Features

- 🖥️ **Kinetic Hero & Terminal Simulator**: Eye-catching opening hero section with kinetic typography and an interactive terminal environment (`whoami`, `cat passion.txt`, `git status`).
- 🎨 **Modern Cyberpunk / Brutalism Aesthetic**: Refined dark mode palette balanced with warm champagne gold accents, micro-glows, and crisp technical typography.
- 🎯 **Interactive Project Showcase**: Curated production projects with deep-dive architectural modal view, live metrics, tech tags, and direct demo/GitHub links.
- 📊 **Skills & Competency Matrix**: Visual breakdown of Frontend, Backend, DevOps tools, and practical soft skills with animated proficiency meters.
- 🏆 **Academic Honors & Timeline**: University honors, scientific research accolades, hackathon distinctions, and leadership milestones.
- 🤝 **Interactive Handshake & Confetti**: Tactile collaborative handshake feature triggering multi-stage celebratory confetti physics.
- ⚡ **Lightning Fast & Ultra Smooth**: Highly optimized bundle size, lazy-loaded components, and 60 FPS motion powered by Framer Motion and Vite.
- 📱 **Fully Responsive**: Seamlessly adapted for mobile devices, tablets, laptops, and ultra-wide displays.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Core Framework** | [React 18](https://react.dev/), [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/), [PostCSS](https://postcss.org/), [Autoprefixer](https://github.com/postcss/autoprefixer) |
| **Animation & Motion** | [Framer Motion 12](https://www.framer.com/motion/), [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) |
| **Icons & UI Utilities**| [Lucide React](https://lucide.dev/), `clsx`, `tailwind-merge` |
| **Typography** | Google Fonts (*Syne*, *Anton*, *Bebas Neue*, *Plus Jakarta Sans*, *JetBrains Mono*) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher)
- Package manager: `npm`, `pnpm`, or `yarn`

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DucNgVan/Portfolio_NgVanDuz.git
   cd Portfolio_NgVanDuz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   *Open your browser and navigate to: `http://localhost:5173`*

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```text
Portfolio_NgVanDuz/
├── public/                 # Static public assets
├── src/
│   ├── components/         # Modular Component Architecture
│   │   ├── layout/         # Shell & Global Layout components
│   │   │   ├── Navbar.jsx            # Floating glassmorphism navbar
│   │   │   ├── Footer.jsx            # Site footer & back-to-top button
│   │   │   └── index.js              # Layout barrel export
│   │   ├── sections/       # Page Section components
│   │   │   ├── HeroSection.jsx       # Kinetic typography hero & interactive header
│   │   │   ├── AboutSection.jsx      # Bio statement & metadata metrics grid
│   │   │   ├── WorkSection.jsx       # Featured project showcase & live cards
│   │   │   ├── ExpertiseSection.jsx  # Core competencies & interactive hover card
│   │   │   ├── AchievementsSection.jsx # Academic honors, awards & scholarships
│   │   │   ├── ExperienceSection.jsx # Technical skills matrix & project filters
│   │   │   ├── ContactSection.jsx    # Contact cards & quick message form
│   │   │   └── index.js              # Sections barrel export
│   │   ├── ui/             # Reusable UI & Interactive widgets
│   │   │   ├── BrandIcons.jsx        # SVG brand marks (GitHub, LinkedIn)
│   │   │   ├── CustomCursor.jsx      # Fluid difference blend-mode cursor
│   │   │   ├── HandshakeInteractive.jsx # Interactive handshake & confetti physics
│   │   │   ├── ParticleBackground.jsx# Canvas interactive node constellation
│   │   │   ├── Preloader.jsx         # Apple-inspired cursive handwriting intro
│   │   │   ├── ProjectModal.jsx      # Deep-dive architecture modal
│   │   │   ├── ScrollReveal.jsx      # Viewport motion and stagger wrappers
│   │   │   └── index.js              # UI barrel export
│   │   └── index.js        # Root components barrel export
│   ├── data/
│   │   └── portfolioData.js          # Centralized data store (profile, skills, projects)
│   ├── lib/
│   │   └── utils.js                  # Tailwind class merge utility (cn)
│   ├── styles/                       # Global design system & keyframe styles
│   │   └── index.css
│   ├── App.jsx                       # Master page composition
│   └── main.jsx                      # Application entry point
├── jsconfig.json           # IDE path alias configuration (@/*)
├── index.html              # HTML entry with SEO & typography CDN
├── package.json            # Dependencies & scripts
├── postcss.config.js       # PostCSS plugins
├── tailwind.config.js      # Tailwind design system configuration
├── vite.config.js          # Vite configuration with path aliases
└── README.md               # Technical project documentation
```

---

## ⚙️ Customization

All portfolio content is structured and centralized in a single configuration file:  
👉 `src/data/portfolioData.js`

You can customize:
- **Personal Information**: `personalInfo` (Name, role, bio, location, email, social links)
- **Technical Skills**: `techSkills` (Frontend, Backend, DevOps, Tools)
- **Soft Skills**: `softSkills` (Proficiency scores, tags, descriptions)
- **Featured Projects**: `githubProjects` (Titles, descriptions, tech stack, metrics, live links)
- **Academic Honors**: `achievements` (Scholarships, awards, hackathons)

---

## 📬 Contact

- **Author**: Nguyen Van Duc (DucNgVan)
- **GitHub**: [@DucNgVan](https://github.com/DucNgVan)
- **Email**: contact.developer@example.com
- **LinkedIn**: [Nguyen Van Duc](https://linkedin.com/in/ducngvan)

---

<div align="center">
  <sub>Designed & developed with ❤️ by <b>Nguyen Van Duc</b>. Licensed under the <a href="./LICENSE">MIT License</a>.</sub>
</div>
