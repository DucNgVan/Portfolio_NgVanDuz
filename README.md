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
│   ├── components/         # React UI Components
│   │   ├── AboutSection.jsx          # Bio, editorial portrait card & metadata
│   │   ├── AchievementsSection.jsx   # Academic honors, scholarships & awards
│   │   ├── BrandIcons.jsx            # Custom SVG brand icons (GitHub, LinkedIn)
│   │   ├── ContactSection.jsx        # Direct contact cards, quick message form
│   │   ├── CustomCursor.jsx          # Difference blend-mode custom cursor
│   │   ├── ExperienceSection.jsx     # Technical matrix & tabbed skill explorer
│   │   ├── ExpertiseSection.jsx      # Core services with interactive hover card
│   │   ├── Footer.jsx                # Page footer & back-to-top button
│   │   ├── HandshakeInteractive.jsx  # Interactive handshake with canvas confetti
│   │   ├── HeroSection.jsx           # Kinetic typography & hero header
│   │   ├── Navbar.jsx                # Floating glassmorphism navbar
│   │   ├── ParticleBackground.jsx    # Interactive background canvas
│   │   ├── Preloader.jsx             # Apple-inspired cursive handwriting loader
│   │   ├── ProjectModal.jsx          # Architectural detail project modal
│   │   ├── ScrollReveal.jsx          # Viewport scroll animation wrappers
│   │   └── WorkSection.jsx           # Colossal work section & GitHub cards
│   ├── data/
│   │   └── portfolioData.js          # Centralized data model (profile, projects, skills)
│   ├── styles/                       # Global stylesheet & custom CSS utilities
│   ├── App.jsx                       # Root application component
│   └── main.jsx                      # Application entry point
├── index.html              # HTML shell with SEO & font imports
├── package.json            # Project configuration and dependencies
├── tailwind.config.js      # Tailwind theme configuration
├── vite.config.js          # Vite build pipeline setup
└── README.md               # Project documentation
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
