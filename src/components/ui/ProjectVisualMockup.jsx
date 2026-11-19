import React from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  Globe, 
  Smartphone, 
  Compass, 
  CheckCircle2, 
  Terminal, 
  Activity, 
  Layers, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

/**
 * Creative, High-Fidelity UI Visual Previews for Each Project
 * Replaces ugly empty gray wireframe boxes with rich, custom-styled product illustrations!
 */
export const ProjectVisualMockup = ({ projectId, title }) => {
  switch (projectId) {
    // 1. NÉT: Sustainable Ocean Net & 3D Interactive Craft (Next.js 14 + Three.js)
    case 1:
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-[#07131e] via-[#091825] to-[#04090e] p-5 flex flex-col justify-between overflow-hidden select-none">
          {/* Subtle 3D Grid background */}
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#38bdf815_1px,transparent_1px),linear-gradient(to_bottom,#38bdf815_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          {/* Ambient cyan/gold glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#d8c8a8]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: 3D Viewport Controls */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                Three.js 360° Studio
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#a0b0c0] bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
              <span>FPS: 60</span>
              <span className="text-cyan-400">•</span>
              <span>WebGL 2.0</span>
            </div>
          </div>

          {/* Center 3D Interactive Wireframe Art */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              {/* Rotating outer orbital ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow" />
              
              {/* Secondary tilted ring */}
              <div 
                className="absolute inset-2 rounded-full border border-cyan-300/30"
                style={{ transform: 'rotateX(60deg) rotateY(20deg)' }}
              />

              {/* Glowing Core 3D Mesh Polyhedron */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600/30 via-teal-500/20 to-amber-300/20 border border-cyan-400/60 shadow-[0_0_30px_rgba(56,189,248,0.35)] flex items-center justify-center backdrop-blur-sm transform rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700">
                <Sparkles className="w-7 h-7 text-cyan-300 animate-pulse" />
              </div>

              {/* Orbital node tags */}
              <div className="absolute -top-1 -right-2 px-2 py-0.5 rounded bg-black/80 border border-cyan-400/50 text-[9px] font-mono text-cyan-300 shadow">
                Mesh: 12.4k Tri
              </div>
              <div className="absolute -bottom-1 -left-2 px-2 py-0.5 rounded bg-black/80 border border-amber-400/50 text-[9px] font-mono text-amber-300 shadow">
                PBR Shader
              </div>
            </div>
          </div>

          {/* Bottom Bar: Digital Eco-Passport & Coordinates */}
          <div className="relative z-10 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-cyan-200/90">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>16°04'N 108°14'E · Da Nang Coastal</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold text-[9px]">
              Eco-Passport #0892
            </span>
          </div>
        </div>
      );

    // 2. Nomadix: Travel Platform & Scalable Backend Architecture (FYP)
    case 2:
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-[#0c0e17] via-[#090b12] to-[#05060a] p-5 flex flex-col justify-between overflow-hidden select-none">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#818cf815_1px,transparent_1px),linear-gradient(to_bottom,#818cf815_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          {/* Ambient indigo/gold glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Architecture & Docker status */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-indigo-500/30 backdrop-blur-md">
              <Server className="w-3 h-3 text-indigo-400" />
              <span className="text-[10px] font-mono text-indigo-300 font-semibold uppercase tracking-wider">
                Clean Architecture FYP
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Docker: 3/3 Healthy</span>
            </div>
          </div>

          {/* Center: System Architecture Topology Node Graph */}
          <div className="relative z-10 my-auto py-2">
            <div className="grid grid-cols-3 gap-2 items-center">
              {/* Node 1: REST API */}
              <div className="p-2.5 rounded-xl bg-[#141724] border border-indigo-500/30 text-center flex flex-col items-center">
                <Terminal className="w-4 h-4 text-indigo-400 mb-1" />
                <span className="text-[10px] font-mono font-bold text-[#f4efea] block">Node/Express</span>
                <span className="text-[8.5px] font-mono text-indigo-300/80">JWT & Knex</span>
              </div>

              {/* Arrow Connector with Cache Hit */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center">
                  <div className="h-[1px] w-full bg-gradient-to-r from-indigo-500/40 via-[#d8c8a8] to-emerald-500/40" />
                </div>
                <span className="text-[8px] font-mono text-[#d8c8a8] mt-1 px-1 rounded bg-black/60 border border-white/10 whitespace-nowrap">
                  Redis 98.4% Hit
                </span>
              </div>

              {/* Node 2: PostgreSQL 3NF */}
              <div className="p-2.5 rounded-xl bg-[#141724] border border-emerald-500/30 text-center flex flex-col items-center">
                <Database className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="text-[10px] font-mono font-bold text-[#f4efea] block">PostgreSQL</span>
                <span className="text-[8.5px] font-mono text-emerald-300/80">28 Tables · 3NF</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Latency & Security Spec */}
          <div className="relative z-10 pt-2 border-t border-indigo-500/20 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-indigo-200/90">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Avg Latency: 18ms</span>
            </div>
            <span className="text-[9px] text-[#aaaaaa]">
              JWT Rotation · Bcrypt
            </span>
          </div>
        </div>
      );

    // 3. IT Helpdesk Response Library (MEVN Stack)
    case 3:
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-[#0f111a] via-[#0a0d14] to-[#06070a] p-5 flex flex-col justify-between overflow-hidden select-none">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          {/* Ambient glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: MEVN Enterprise Suite */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-emerald-500/30 backdrop-blur-md">
              <Layers className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-300 font-semibold uppercase tracking-wider">
                Vue 3 Reactive Dashboard
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#a0b0c0] bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
              8 REST Endpoints
            </span>
          </div>

          {/* Center: Interactive Ticket Resolution KPI Cards */}
          <div className="relative z-10 my-auto py-2 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-xl bg-[#141824] border border-[#262c3e] text-center">
                <span className="text-[9px] font-mono text-[#8899aa] block">Tickets</span>
                <span className="text-sm font-bold font-mono text-emerald-400">1,280</span>
              </div>
              <div className="p-2 rounded-xl bg-[#141824] border border-[#262c3e] text-center">
                <span className="text-[9px] font-mono text-[#8899aa] block">Resolution</span>
                <span className="text-sm font-bold font-mono text-[#d8c8a8]">94.8%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#141824] border border-[#262c3e] text-center">
                <span className="text-[9px] font-mono text-[#8899aa] block">Avg SLA</span>
                <span className="text-sm font-bold font-mono text-cyan-400">&lt; 15m</span>
              </div>
            </div>

            {/* Mini Ticket Rows */}
            <div className="p-2 rounded-xl bg-black/50 border border-white/5 space-y-1.5 text-[9.5px] font-mono">
              <div className="flex items-center justify-between text-[#cccccc]">
                <span className="truncate max-w-[170px]">• SSO Auth Token Invalidation</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 text-[8px]">RESOLVED</span>
              </div>
              <div className="flex items-center justify-between text-[#999999]">
                <span className="truncate max-w-[170px]">• MongoDB Aggregation Query</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 text-[8px]">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Mongoose & Automated Tests */}
          <div className="relative z-10 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono">
            <span className="text-emerald-300/90">MongoDB Mongoose Schema</span>
            <span className="text-[#888888] font-mono">api_test.http verified</span>
          </div>
        </div>
      );

    // 4. M-Hike: Trail Tracker & Outdoor Journal (Native Android Java + Firebase)
    case 4:
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-[#081512] via-[#06100d] to-[#030806] p-5 flex flex-col justify-between overflow-hidden select-none">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          {/* Ambient amber/emerald glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Native Android & Live Sync */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-emerald-500/30 backdrop-blur-md">
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-300 font-semibold uppercase tracking-wider">
                Native Android Java
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/40 text-[9px] font-mono text-amber-300">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Firestore Live</span>
            </div>
          </div>

          {/* Center: Elevation Curve & Trail Stats */}
          <div className="relative z-10 my-auto py-2">
            <div className="p-3 rounded-2xl bg-[#0e1c17] border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold font-syne text-[#f4efea] block">Ba Na Trail Expedition</span>
                  <span className="text-[9px] font-mono text-emerald-300">Elevation: 1,487m · Da Nang</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#d8c8a8]">14.8 KM</span>
              </div>

              {/* Stylized SVG Elevation Profile */}
              <div className="w-full h-12 relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,35 Q30,30 60,22 T120,8 T160,18 T200,5 L200,40 L0,40 Z"
                    fill="url(#elevationGrad)"
                  />
                  <path
                    d="M0,35 Q30,30 60,22 T120,8 T160,18 T200,5"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                  />
                  {/* Waypoint dots */}
                  <circle cx="60" cy="22" r="3" fill="#d8c8a8" />
                  <circle cx="120" cy="8" r="3" fill="#38bdf8" />
                  <circle cx="200" cy="5" r="3" fill="#f59e0b" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Offline Journal & Firestore Sync */}
          <div className="relative z-10 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono">
            <span className="text-emerald-200/90">Firebase Auth · FirestoreHelper</span>
            <span className="text-[#888888]">Offline-First Sync</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-[#141414] flex items-center justify-center p-6 text-center text-[#888888]">
          <span className="text-xs font-mono">{title}</span>
        </div>
      );
  }
};

export default ProjectVisualMockup;
