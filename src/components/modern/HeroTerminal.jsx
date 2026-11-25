import React, { useState } from 'react';
import { Copy, Check, Terminal, Sparkles } from 'lucide-react';

const COMMANDS = [
  {
    id: 'whoami',
    label: 'whoami',
    cmd: 'whoami',
    output: `Nguyen Van Duc
Role: Full-Stack Software Engineering Intern
Standing: Final-Year BSc (Hons) Software Engineering
Campus: University of Greenwich (Vietnam)
Status: Active candidate for Full-Stack / Software Engineering Internship
Location: Da Nang, Viet Nam · Hybrid & Remote Ready
Contact: ducnv179.wk@gmail.com · 078.855.1709`
  },
  {
    id: 'education',
    label: 'education.txt',
    cmd: 'cat education.txt',
    output: `[DEGREE]
  BSc (Hons) Software Engineering · British Standard
  University of Greenwich (Vietnam Campus) · 2023 - 2026

[ACADEMIC HIGHLIGHTS]
  • Top 3 Outstanding Students of University of Greenwich (Summer 2024)
  • Top Student in Information & Content Management (Highest Score COMP1643)
  • Specialized in Distributed Systems, Relational Database Modeling (3NF),
    and Interactive 3D Web Application Architectures`
  },
  {
    id: 'honors',
    label: 'honors.txt',
    cmd: 'cat honors.txt',
    output: `[OFFICIAL HONORS & AWARDS]
  ★ 2024: Top 3 Outstanding Students · Univ of Greenwich (Decision: 157/QĐ-FPTUDN)
  ★ 2025: 2nd Prize Winner · Impact Innovation Bootcamp (Hospital 199 & Greenwich)
  ★ 2024: The Best Club of 2024 · Greenwich Newspaper Group (Club President)
  ★ 2024: Outstanding Peer Mentor · Greenwich Peer Mentoring Club (GPM)
  ★ 2024: National Finalist · LG Dream Code Challenge`
  },
  {
    id: 'status',
    label: 'git status',
    cmd: 'git status',
    output: `On branch main
Your branch is up to date with 'origin/main'.

Changes ready for production:
  (internship track: full-stack-engineer)
  + Next.js 14 & Three.js 3D WebGL (Live: https://www.net-s.id.vn/)
  + PostgreSQL 28-Table 3NF Normalized Schema + Redis Cache (Nomadix FYP)
  + Enterprise SharePoint Online Portal (VAVA CMS · 650M+ VND tracked)
  + Multi-Service Docker Compose & Automated HTTP Test Suites

Ready for immediate hire: DA NANG / REMOTE INTERNSHIP 2025-2026`
  },
  {
    id: 'stack',
    label: 'architecture.json',
    cmd: 'cat architecture.json',
    output: `{
  "engineer": "Nguyen Van Duc",
  "core_stack": {
    "backend": ["Node.js", "Express", "PostgreSQL (3NF)", "MongoDB", "Redis"],
    "frontend": ["Next.js 14", "React", "TypeScript", "Three.js (3D)", "Tailwind CSS", "Vue 3"],
    "devops_tools": ["Docker Compose", "Git Flow", "Postman", "Firebase"]
  },
  "deployment": "CI/CD & Custom Domains (net-s.id.vn)",
  "mTLS_security": "Active stealth authentication layer"
}`
  }
];

export const HeroTerminal = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = COMMANDS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/[0.12] bg-[#0c0d14]/90 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs select-text">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]" />
          <span className="ml-2 text-[11px] text-neutral-400 font-sans font-medium flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#d8c8a8]" />
            duc@greenwich:~ (zsh)
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-neutral-400 hover:text-[#d8c8a8] transition-colors px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] cursor-pointer"
          title="Copy command output"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Command Tabs */}
      <div className="flex items-center gap-1 px-3 py-2 bg-black/40 border-b border-white/[0.06] overflow-x-auto scrollbar-none">
        {COMMANDS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1 rounded-md text-[11px] whitespace-nowrap transition-all cursor-pointer ${
              activeTab === idx
                ? 'bg-white/[0.12] text-[#d8c8a8] font-semibold border border-white/[0.15]'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 max-h-[290px] overflow-y-auto font-mono text-[11px] sm:text-[12px] leading-relaxed text-neutral-300">
        <div className="flex items-center gap-2 text-[#d8c8a8] mb-3">
          <span className="text-emerald-400">➜</span>
          <span className="text-cyan-400">portfolio</span>
          <span className="text-neutral-500">git:(</span>
          <span className="text-amber-400">main</span>
          <span className="text-neutral-500">)</span>
          <span className="text-white font-semibold">{current.cmd}</span>
        </div>

        <pre className="whitespace-pre-wrap font-mono text-neutral-300/90 selection:bg-[#d8c8a8] selection:text-black">
          {current.output}
        </pre>

        <div className="mt-3 flex items-center gap-2 text-neutral-500">
          <span className="text-emerald-400">➜</span>
          <span className="inline-block w-2 h-4 bg-[#d8c8a8] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HeroTerminal;
