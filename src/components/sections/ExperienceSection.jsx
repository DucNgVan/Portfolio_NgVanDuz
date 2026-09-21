import React, { useState } from 'react';
import { 
  Code2, 
  FolderGit2, 
  HeartHandshake, 
  Sparkles, 
  ExternalLink, 
  Star, 
  GitFork, 
  Search, 
  Info, 
  Layers, 
  Terminal, 
  Cpu, 
  Globe, 
  Users, 
  Kanban, 
  Zap,
  CheckCircle,
  TrendingUp,
  Boxes
} from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';
import { techSkills, githubProjects, softSkills } from '@/data/portfolioData';
import ProjectModal from '@/components/ui/ProjectModal';

const iconMap = {
  Globe: Globe,
  Users: Users,
  Kanban: Kanban,
  Cpu: Cpu,
  Zap: Zap,
};

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'projects' | 'softskills'
  const [skillCategory, setSkillCategory] = useState('all'); // 'all' | 'frontend' | 'backend' | 'devops'
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Filter skills
  const getFilteredSkills = () => {
    if (skillCategory === 'frontend') return techSkills.frontend;
    if (skillCategory === 'backend') return techSkills.backend;
    if (skillCategory === 'devops') return techSkills.devopsAndTools;
    return [
      ...techSkills.frontend.map(s => ({ ...s, group: 'Frontend' })),
      ...techSkills.backend.map(s => ({ ...s, group: 'Backend' })),
      ...techSkills.devopsAndTools.map(s => ({ ...s, group: 'DevOps & Tools' }))
    ];
  };

  // Filter projects
  const filteredProjects = githubProjects.filter(p => 
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(projectSearch.toLowerCase())) ||
    p.category.toLowerCase().includes(projectSearch.toLowerCase())
  );

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden border-t border-slate-800/80">
      {/* High-Tech Background Canvas & Grids */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with High-Tech Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4 shadow-sm shadow-cyan-500/20">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Core Competency Matrix</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technical Expertise & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Practical Soft Skills
            </span>
          </h2>
          
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Bridging robust engineering architecture, open-source projects on GitHub, and cross-functional leadership, agile workflows, and critical problem solving.
          </p>
        </div>

        {/* HUD CYBER NAVIGATION CONTROL BAR */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl shadow-cyan-950/40">
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>⚡ Tech Stack ({techSkills.frontend.length + techSkills.backend.length + techSkills.devopsAndTools.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>🚀 GitHub Repos ({githubProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('softskills')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'softskills'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>🧠 Soft Skills ({softSkills.length})</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: TECH STACK MATRIX ================= */}
        {activeTab === 'skills' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Category:</span>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'frontend', label: 'Frontend & UI' },
                  { id: 'backend', label: 'Backend & APIs' },
                  { id: 'devops', label: 'DevOps & Tools' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSkillCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      skillCategory === cat.id
                        ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-500/50 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hover over skills to inspect metrics</span>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {getFilteredSkills().map((skill, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="relative p-5 rounded-2xl glass-panel-interactive border border-slate-800 hover:border-cyan-500/50 group"
                >
                  {/* Glowing header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping"></span>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                      {skill.highlight}
                    </span>
                  </div>

                  {/* Level Percentage & Experience */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>Experience: <span className="text-slate-200">{skill.experience}</span></span>
                    <span className="text-cyan-400 font-bold">{skill.level}%</span>
                  </div>

                  {/* High-tech Neon Progress Bar */}
                  <div className="relative w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    >
                      {/* Laser shine effect on hover */}
                      <div className="w-full h-full bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Hover status hint */}
                  {hoveredSkill === skill.name && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/70 text-[11px] font-mono text-cyan-300/90 flex items-center justify-between animate-in fade-in">
                      <span>✓ Production Verified</span>
                      <span>Ready to Deploy</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: GITHUB REPOSITORIES & PROJECTS ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Search & Filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects, technologies (React, Node...)..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                />
              </div>

              <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-start sm:self-auto">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>Showing <span className="text-white font-bold">{filteredProjects.length}</span> projects</span>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/50"
                >
                  {/* Top bar with category & GitHub metrics */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400/20" /> {project.stars}
                        </span>
                        <span className="flex items-center gap-1 text-cyan-400">
                          <GitFork className="w-3.5 h-3.5" /> {project.forks}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bottom Bar */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group/btn"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span className="underline-offset-4 group-hover/btn:underline">Architecture Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all shadow-sm shadow-cyan-500/20"
                        title="Live Demo Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Detail */}
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </div>
        )}

        {/* ================= TAB 3: SOFT SKILLS ================= */}
        {activeTab === 'softskills' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill) => {
                const Icon = iconMap[skill.icon] || HeartHandshake;
                return (
                  <div
                    key={skill.id}
                    className="p-6 rounded-3xl glass-panel-interactive border border-slate-800 hover:border-indigo-500/40 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-md shadow-indigo-500/20">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                          {skill.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                        {skill.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-5">
                        {skill.description}
                      </p>
                    </div>

                    <div>
                      {/* Proficiency Meter */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                          <span>Proficiency & Confidence:</span>
                          <span className="text-indigo-400 font-bold">{skill.score}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                            style={{ width: `${skill.score}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                        {skill.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ExperienceSection;
