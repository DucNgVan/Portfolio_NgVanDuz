import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ExternalLink, Eye, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/TechIcons';
import { githubProjects } from '@/data/portfolioData';

export const ORBIT_ITEMS = [
  {
    id: 1,
    title: "NÉT STUDIO — Sustainable Ocean Net & 3D Interactive Craft",
    cat: "Competition Project",
    year: "2026",
    tagline: "Eco-commerce platform transforming marine ghost nets into bespoke products with real-time 3D preview & AI studio.",
    img: "/projects/net-s-1.jpg",
    liveDemo: "https://www.net-s.id.vn/",
    githubUrl: "https://github.com/DucNgVan/VecomNet-s_Tsunami_Team",
    projectRef: githubProjects.find(p => p.id === 1) || githubProjects[0]
  },
  {
    id: 2,
    title: "Nomadix — Travel Platform & Scalable Backend Architecture",
    cat: "Final Year Capstone (FYP)",
    year: "2025",
    tagline: "Modular backend architecture with 28 relational tables (3NF), Redis caching layer & Docker Compose.",
    img: "/projects/nomadix-1.png",
    liveDemo: null,
    githubUrl: "https://github.com/DucNgVan/nomadix-travel-platform",
    projectRef: githubProjects.find(p => p.id === 2) || githubProjects[1]
  },
  {
    id: 3,
    title: "VAVA CMS — SharePoint Information & Content Management",
    cat: "Enterprise CMS · Coursework",
    year: "2026",
    tagline: "Enterprise content management portal for donation scheduling, volunteer intake & 650M+ VND tracked.",
    img: "/projects/vava-cms-1.jpg",
    liveDemo: "https://uogcloud.sharepoint.com/:u:/r/sites/Coursework_SharePoint_Greenwich_VavaDN-S-CAM/SitePages/HomePage.aspx?d=weaf2501dab044352939bae04571f1104&csf=1&web=1&e=nVycl5",
    githubUrl: null,
    projectRef: githubProjects.find(p => p.id === 5) || githubProjects[2]
  },
  {
    id: 4,
    title: "IT Helpdesk Response Library (MEVN Stack)",
    cat: "Enterprise Support Platform",
    year: "2025",
    tagline: "Enterprise incident resolution platform with 8 RESTful endpoints, MongoDB & Vue 3 reactive dashboard.",
    img: "/projects/helpdesk-1.jpg",
    liveDemo: null,
    githubUrl: "https://github.com/DucNgVan/helpdesk-response-library-mevn",
    projectRef: githubProjects.find(p => p.id === 3) || githubProjects[3]
  },
  {
    id: 5,
    title: "M-Hike — Trail Tracker & Outdoor Journal",
    cat: "Native Android & Cross-Platform",
    year: "2025",
    tagline: "Native mobile app with real-time GPS tracking (±5m), Mapbox integration & Cloud Firestore sync.",
    img: "/projects/mhike-1.jpg",
    liveDemo: null,
    githubUrl: "https://github.com/DucNgVan/mhike-android-trail-tracker",
    projectRef: githubProjects.find(p => p.id === 4) || githubProjects[4]
  },
  {
    id: 6,
    title: "NÉT STUDIO — Order Tracking & Verifiable Eco-Passport",
    cat: "Digital Eco-Passport & GPS",
    year: "2026",
    tagline: "Unique product identity passport verifying ocean ghost net recovery coordinates and recycling metrics.",
    img: "/projects/net-s-2.jpg",
    liveDemo: "https://www.net-s.id.vn/",
    githubUrl: "https://github.com/DucNgVan/VecomNet-s_Tsunami_Team",
    projectRef: githubProjects.find(p => p.id === 1) || githubProjects[0]
  },
  {
    id: 7,
    title: "Nomadix — Collaborative Itinerary Co-Creation",
    cat: "Real-Time Group Travel Sync",
    year: "2025",
    tagline: "Real-time collaborative itinerary planning, group destination voting, and automated debt simplification.",
    img: "/projects/nomadix-2.png",
    liveDemo: null,
    githubUrl: "https://github.com/DucNgVan/nomadix-travel-platform",
    projectRef: githubProjects.find(p => p.id === 2) || githubProjects[1]
  },
  {
    id: 8,
    title: "VAVA CMS — Smart Automation & Multi-Stage Approval",
    cat: "Power Automate Workflows",
    year: "2026",
    tagline: "Automated multi-stage approval workflows and instant donor email dispatch system.",
    img: "/projects/vava-cms-4.jpg",
    liveDemo: "https://uogcloud.sharepoint.com/:u:/r/sites/Coursework_SharePoint_Greenwich_VavaDN-S-CAM/SitePages/HomePage.aspx?d=weaf2501dab044352939bae04571f1104&csf=1&web=1&e=nVycl5",
    githubUrl: null,
    projectRef: githubProjects.find(p => p.id === 5) || githubProjects[2]
  }
];

export const OrbitProjectStage = ({ onSelectProject }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [frontIndex, setFrontIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [rotationProgress, setRotationProgress] = useState(0);

  // Manual rotation step dispatcher
  const rotateStepRef = useRef(null);

  const frontItem = ORBIT_ITEMS[frontIndex] || ORBIT_ITEMS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = containerRef.current;
    if (!canvas || !stage) return;

    const N = ORBIT_ITEMS.length;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const R = 3.4; // Cylinder radius matching folio.id.vn
    const W = (Math.PI * 2 * R / N) * 0.78;
    const H = W * 1.33; // 4:3 aspect ratio card
    const group = new THREE.Group();
    group.rotation.set(0.08, 0, -0.04);
    scene.add(group);

    // Curved plane vertex shader (bends each flat plane along cylinder surface)
    const vert = `
      uniform float uR;
      uniform float uHover;
      varying vec2 vUv;
      varying float vFace;
      void main(){
        vUv = uv;
        vec3 p = position;
        float th = p.x / uR;
        p.x = sin(th) * uR;
        p.z = (cos(th) - 1.0) * uR + uHover * 0.22;
        vec4 world = modelMatrix * vec4(p, 1.0);
        vec3 n = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
        vFace = dot(n, normalize(cameraPosition - world.xyz));
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `;

    // Fragment shader: high fidelity, dims back-facing cards, enriches front-facing ones
    const frag = `
      uniform sampler2D uTex;
      uniform float uHover;
      uniform float uLoaded;
      uniform vec3 uPh;
      varying vec2 vUv;
      varying float vFace;
      void main(){
        vec4 c = texture2D(uTex, vUv);
        float g = dot(c.rgb, vec3(0.299, 0.587, 0.114));
        vec3 col = mix(vec3(g), c.rgb, 0.75 + uHover * 0.25);
        col = mix(uPh, col, uLoaded);
        float back = smoothstep(-0.25, 0.35, vFace);
        col = mix(col * 0.35, col, back);
        gl_FragColor = vec4(col, mix(0.25, 1.0, back));
      }
    `;

    const phColor = new THREE.Color('#141720');
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const geometry = new THREE.PlaneGeometry(W, H, 24, 1);
    const meshes = ORBIT_ITEMS.map((item, i) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTex: { value: null },
          uR: { value: R },
          uHover: { value: 0 },
          uLoaded: { value: 0 },
          uPh: { value: phColor }
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: THREE.DoubleSide,
        transparent: true
      });

      loader.load(item.img, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        mat.uniforms.uTex.value = tex;
        mat.uniforms.uLoaded.value = 1;
      });

      const m = new THREE.Mesh(geometry, mat);
      const a = (i / N) * Math.PI * 2;
      // Stagger vertical offsets slightly for organic editorial layout
      m.position.set(Math.sin(a) * R, (i % 2 ? 0.16 : -0.16), Math.cos(a) * R);
      m.rotation.y = a;
      m.userData = { i, a, item };
      group.add(m);
      return m;
    });

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.set(0, 0.35, w < 768 ? 12.0 : 9.2);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Interaction State
    let scrollRot = 0;
    let drag = 0;
    let dragVel = 0;
    let rot = 1.2; // Initial rotation angle
    let idle = 0;
    let isDown = false;
    let lastX = 0;
    let movedDist = 0;

    // Connect manual arrow navigation
    rotateStepRef.current = (direction) => {
      const anglePerCard = (Math.PI * 2) / N;
      dragVel = direction * anglePerCard * 0.15;
      drag += direction * anglePerCard;
    };

    // Scroll listener for sticky 3D stage rotation
    const onScroll = () => {
      const rect = stage.getBoundingClientRect();
      const totalScrollable = stage.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      scrollRot = progress * Math.PI * 2 * (N - 1) / N;
      setRotationProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Pointer events for drag rotation
    const onPointerDown = (e) => {
      isDown = true;
      lastX = e.clientX;
      movedDist = 0;
      canvas.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      isDown = false;
      canvas.style.cursor = 'grab';
    };

    const onPointerMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (!isDown) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      movedDist += Math.abs(dx);
      dragVel = dx * 0.005;
      drag += dragVel;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);

    // Raycaster for hover & click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-99, -99);
    let activeHoveredMesh = null;

    const onCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onCanvasMouseLeave = () => {
      mouse.x = -99;
      mouse.y = -99;
      setIsHovered(false);
    };

    const onCanvasClick = () => {
      if (movedDist < 6 && activeHoveredMesh) {
        const item = activeHoveredMesh.userData.item;
        if (onSelectProject && item.projectRef) {
          onSelectProject(item.projectRef);
        }
      }
    };

    canvas.addEventListener('pointermove', onCanvasMouseMove);
    canvas.addEventListener('pointerleave', onCanvasMouseLeave);
    canvas.addEventListener('click', onCanvasClick);

    // Animation Render Loop
    let animationId = null;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);

      const dt = Math.min(clock.getDelta(), 0.05);

      if (!isDown) {
        dragVel *= 0.94;
        drag += dragVel;
      }

      // Gentle continuous idle spin
      idle += dt * 0.035;

      const targetRot = -(scrollRot + drag + idle);
      rot += (targetRot - rot) * 0.08;
      group.rotation.y = rot;

      // Find which card is currently front-facing
      let bestIdx = 0;
      let bestCos = -2;
      meshes.forEach((m) => {
        const c = Math.cos(m.userData.a + rot);
        if (c > bestCos) {
          bestCos = c;
          bestIdx = m.userData.i;
        }
      });

      setFrontIndex((prev) => (prev !== bestIdx ? bestIdx : prev));

      // Raycast hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);
      activeHoveredMesh =
        intersects.length > 0 &&
        intersects[0].face &&
        Math.cos(intersects[0].object.userData.a + rot) > 0
          ? intersects[0].object
          : null;

      setIsHovered(!!activeHoveredMesh && !isDown);

      // Smooth hover scale in shader
      meshes.forEach((m) => {
        const uHover = m.material.uniforms.uHover;
        const targetHover = m === activeHoveredMesh ? 1.0 : 0.0;
        uHover.value += (targetHover - uHover.value) * 0.12;
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onCanvasMouseMove);
      canvas.removeEventListener('pointerleave', onCanvasMouseLeave);
      canvas.removeEventListener('click', onCanvasClick);

      geometry.dispose();
      meshes.forEach((m) => {
        if (m.material.uniforms.uTex.value) {
          m.material.uniforms.uTex.value.dispose();
        }
        m.material.dispose();
      });
      renderer.dispose();
    };
  }, [onSelectProject]);

  const handleStep = useCallback((dir) => {
    if (rotateStepRef.current) {
      rotateStepRef.current(dir);
    }
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className="relative h-[250vh] bg-transparent text-white select-none"
    >
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pointer-events-none">
        
        {/* Giant Watermark Typography behind 3D Orbit */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="font-syne font-bold italic text-[clamp(80px,18vw,280px)] text-white/[0.035] tracking-tight whitespace-nowrap select-none">
            ENGINEERING
          </span>
        </div>

        {/* Top-Left Category & Section Brand */}
        <div className="relative z-10 pt-24 sm:pt-28 px-4 sm:px-10 lg:px-14 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d8c8a8]">
              // 04 · FEATURED WORK & ARCHITECTURE
            </span>
            <div className="text-sm font-sans font-light text-neutral-400">
              Interactive 3D Orbit Carousel · Drag or scroll to explore
            </div>
          </div>

          {/* Orbit Navigation Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => handleStep(1)}
              className="p-2 rounded-full border border-white/10 hover:border-[#d8c8a8] bg-black/40 hover:bg-[#d8c8a8] hover:text-black text-neutral-300 transition-all cursor-pointer"
              title="Rotate Left"
              aria-label="Rotate Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStep(-1)}
              className="p-2 rounded-full border border-white/10 hover:border-[#d8c8a8] bg-black/40 hover:bg-[#d8c8a8] hover:text-black text-neutral-300 transition-all cursor-pointer"
              title="Rotate Right"
              aria-label="Rotate Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab touch-pan-y z-5"
          style={{ cursor: 'grab' }}
        />

        {/* Bottom HUD Bar (matching user screenshot) */}
        <div className="relative z-10 pb-8 sm:pb-12 px-4 sm:px-10 lg:px-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          
          {/* Left: Giant Index, Title & Dynamic Metadata */}
          <div className="flex items-end gap-5 max-w-2xl">
            <div className="font-syne text-5xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight flex items-start">
              <span>{pad(frontIndex + 1)}</span>
              <sup className="text-xs sm:text-sm font-mono text-[#d8c8a8] mt-2 sm:mt-4 ml-1">
                /{pad(ORBIT_ITEMS.length)}
              </sup>
            </div>

            <div className="space-y-2 pb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#d8c8a8] px-2.5 py-0.5 rounded-full bg-[#d8c8a8]/10 border border-[#d8c8a8]/30">
                  {frontItem.cat}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {frontItem.year}
                </span>
              </div>

              <h3
                onClick={() => onSelectProject && onSelectProject(frontItem.projectRef)}
                className="text-lg sm:text-2xl lg:text-3xl font-bold text-white hover:text-[#d8c8a8] transition-colors cursor-pointer pointer-events-auto font-syne line-clamp-1"
                title={frontItem.title}
              >
                {frontItem.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 max-w-xl font-light">
                {frontItem.tagline}
              </p>

              {/* Action Buttons for Centered Project */}
              <div className="flex items-center gap-3 pt-2 pointer-events-auto">
                <button
                  onClick={() => onSelectProject && onSelectProject(frontItem.projectRef)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-[#d8c8a8] hover:text-black text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                </button>

                {frontItem.liveDemo && (
                  <a
                    href={frontItem.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-[#d8c8a8] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {frontItem.githubUrl && (
                  <a
                    href={frontItem.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/20 hover:border-white text-neutral-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Interaction Hint & Rotation Progress Bar */}
          <div className="text-left md:text-right space-y-2 pointer-events-none self-end">
            <div className="text-xs font-mono text-neutral-400">
              Cuộn để xoay · Kéo để quay · Bấm để xem
            </div>

            <div className="w-40 md:w-52 h-[2px] bg-white/10 ml-0 md:ml-auto rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#d8c8a8] transition-transform duration-100 origin-left"
                style={{
                  transform: `scaleX(${Math.max(0.08, (frontIndex + 1) / ORBIT_ITEMS.length)})`
                }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Floating Cursor Tooltip (Follows mouse on hover) */}
      {isHovered && (
        <div
          className="fixed pointer-events-none z-50 px-3.5 py-1.5 rounded-full bg-[#d8c8a8] text-black font-mono font-bold text-xs shadow-2xl flex items-center gap-1.5 -translate-x-1/2 -translate-y-12 animate-fadeIn"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`
          }}
        >
          <span>Xem dự án</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      )}

    </div>
  );
};

export default OrbitProjectStage;
