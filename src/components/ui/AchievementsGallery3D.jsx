import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Trophy, 
  Award, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Eye,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const certificatesData = [
  // ==========================================
  // NHÓM 1: HỌC TẬP CHUYÊN NGÀNH & ĐỔI MỚI CÔNG NGHỆ
  // ==========================================
  {
    id: 'top3_2024',
    titleVi: 'Top 3 Sinh Viên Xuất Sắc Học Kỳ Summer 2024',
    titleEn: 'Top 3 Outstanding Student — Summer Semester 2024',
    issuerVi: 'Đại Học Greenwich Việt Nam (Greenwich International Bachelor)',
    issuerEn: 'University of Greenwich (Vietnam) & FPT Education',
    recipient: 'Nguyen Van Duc (GCD230006)',
    year: '2024',
    badgeVi: 'TOP 3 TOÀN KHÓA',
    badgeEn: 'TOP 3 HONORS',
    categoryVi: '🎓 Chuyên Ngành & Học Thuật',
    categoryEn: '🎓 Academic & Tech',
    image: '/certificates/cert_top3_2024.jpg',
    isRealPhoto: true,
    descVi: 'Vinh danh thành tích học tập vượt trội, đứng trong Top 3 sinh viên có điểm số cao nhất toàn khóa cử nhân Quốc tế Greenwich (Đà Nẵng Campus).',
    descEn: 'Recognized for superior academic excellence, ranking within the top 3 highest GPA students across Greenwich International Bachelor program.',
    verificationRef: 'GKDN240149 / QĐ: 157/QĐ-FPTUDN',
    accentColor: '#d8c8a8',
  },
  {
    id: 'best_student_icm_2026',
    titleVi: 'Thủ Khoa Môn Quản Trị Thông Tin & Nội Dung',
    titleEn: 'Best Student: Information & Content Management',
    issuerVi: 'Greenwich International Bachelor Program',
    issuerEn: 'University of Greenwich (Vietnam)',
    recipient: 'Nguyen Van Duc (GCD230006)',
    year: '2026',
    badgeVi: 'THỦ KHOA MÔN HỌC',
    badgeEn: 'BEST OF SUBJECT',
    categoryVi: '🎓 Chuyên Ngành & Học Thuật',
    categoryEn: '🎓 Academic & Tech',
    image: '/certificates/cert_best_student_icm_2026.jpg',
    isRealPhoto: true,
    descVi: 'Thủ khoa đạt điểm số xuất sắc nhất toàn phân hiệu môn Information and Content Management (COMP1643) kỳ Summer Trimester 2026, chứng nhận bởi TS. Nguyễn Duy Nghiêm.',
    descEn: 'Valedictorian recognition for achieving the highest grade across the campus in Information and Content Management.',
    verificationRef: 'QĐ: 181 QH-PPTUDN • GKD2300025',
    accentColor: '#c5a880',
  },
  {
    id: 'bootcamp_innovation_2025',
    titleVi: 'Giải Nhì — Impact Innovation Bootcamp 2025',
    titleEn: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
    issuerVi: 'Greenwich Vietnam & Đổi Mới Sáng Tạo Bệnh Viện',
    issuerEn: 'Hospital & Healthcare Innovation Council',
    recipient: 'Nguyen Van Duc (GCD230006)',
    year: '2025',
    badgeVi: 'GIẢI NHÌ',
    badgeEn: '2ND PRIZE',
    categoryVi: '🎓 Chuyên Ngành & Học Thuật',
    categoryEn: '🎓 Academic & Tech',
    image: '/certificates/cert_bootcamp_innovation_2025.jpg',
    isRealPhoto: true,
    descVi: 'Giải pháp chuyển đổi số và công nghệ y tế phục vụ cộng đồng, vinh danh bởi Giám đốc Greenwich ĐN TS. Nguyễn Duy Nghiêm.',
    descEn: 'Awarded 2nd Prize for digital healthcare transformation and innovation, recognized by Dr. Nguyen Duy Nghiem.',
    verificationRef: 'Greenwich VN / IIB-2025',
    accentColor: '#38bdf8',
  },

  // ==========================================
  // NHÓM 2: CLB & KỸ NĂNG MỀM
  // ==========================================
  {
    id: 'gnews_club_2024',
    titleVi: 'Thành Viên Tích Cực — CLB Báo Chí Greenwich (GNews) 2024',
    titleEn: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
    issuerVi: 'Ban Công Tác Sinh Viên & Ban Chủ Nhiệm CLB GNews',
    issuerEn: 'Office of Student Affairs & GNews Club',
    recipient: 'Nguyen Van Duc',
    year: '2024',
    badgeVi: 'CLB BÁO CHÍ',
    badgeEn: 'MEDIA & JOURNALISM',
    categoryVi: '🎭 CLB & Kỹ Năng Mềm',
    categoryEn: '🎭 Club & Soft Skills',
    image: '/certificates/cert_gnews_club_2024.jpg',
    isRealPhoto: true,
    descVi: 'Chứng nhận cống hiến tích cực trong ban kỹ thuật và truyền thông báo chí đại học, tham gia biên tập ấn phẩm công nghệ và sự kiện sinh viên.',
    descEn: 'Recognized for active contributions to university journalism, media tech production, and campus student publications.',
    verificationRef: 'GNews Club / CTSV 2024',
    accentColor: '#ec4899',
  },
  {
    id: 'gmc_music_club',
    titleVi: 'Thành Tích Xuất Sắc — Đêm Nhạc "Under the Baubles" (GMC)',
    titleEn: 'Outstanding Participation — "Under the Baubles" Musical Night',
    issuerVi: 'Greenwich Music Club (GMC) & Ban CTSV',
    issuerEn: 'Greenwich Music Club & Student Affairs',
    recipient: 'Nguyen Van Duc',
    year: '2024',
    badgeVi: 'CLB ÂM NHẠC',
    badgeEn: 'ARTS & LEADERSHIP',
    categoryVi: '🎭 CLB & Kỹ Năng Mềm',
    categoryEn: '🎭 Club & Soft Skills',
    image: '/certificates/cert_gmc_music_club.jpg',
    isRealPhoto: true,
    descVi: 'Vinh danh đóng góp nổi bật trong ban tổ chức và tham gia biểu diễn tại đêm đại nhạc hội "Under the Baubles", khẳng định kỹ năng tổ chức sự kiện và làm việc nhóm.',
    descEn: 'Recognized for stellar organizational and performance contributions to "Under the Baubles" musical night, demonstrating team synergy and event execution.',
    verificationRef: 'GMC-UTB / CTSV 2024',
    accentColor: '#a855f7',
  },
];

export const AchievementsGallery3D = () => {
  const { lang } = useLanguage();
  const mountRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null); // null = overview, 0..3 = zoomed into certificate
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Frame coordinates in 3D museum space (5 frames)
  const framePositions = useMemo(() => [
    { x: -5.0, y: 0.1, z: 0 },
    { x: -2.5, y: 0.1, z: 0 },
    { x: 0, y: 0.1, z: 0 },
    { x: 2.5, y: 0.1, z: 0 },
    { x: 5.0, y: 0.1, z: 0 },
  ], []);

  const activeIdxRef = useRef(activeIdx);
  activeIdxRef.current = activeIdx;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 520;
    let isDisposed = false;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0d11);
    scene.fog = new THREE.FogExp2(0x0c0d11, 0.045);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 40);
    camera.position.set(0, 0.2, 8.4);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. Exhibition Wall & Floor
    // Museum Wall
    const wallGeo = new THREE.PlaneGeometry(36, 12);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x13141a,
      roughness: 0.88,
      metalness: 0.05,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.z = -0.15;
    scene.add(wall);

    // Wall base molding trim (bottom divider)
    const baseMoldingGeo = new THREE.BoxGeometry(36, 0.12, 0.2);
    const baseMoldingMat = new THREE.MeshStandardMaterial({ color: 0x222430, roughness: 0.6, metalness: 0.3 });
    const baseMolding = new THREE.Mesh(baseMoldingGeo, baseMoldingMat);
    baseMolding.position.set(0, -1.8, 0);
    scene.add(baseMolding);

    // Gallery Floor with soft reflection
    const floorGeo = new THREE.PlaneGeometry(36, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x09090d,
      roughness: 0.45,
      metalness: 0.25,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.86;
    scene.add(floor);

    // 4. Lighting System: Ambient + Overhead Gallery Spotlights
    const ambientLight = new THREE.HemisphereLight(0x282a38, 0x08080c, 1.2);
    scene.add(ambientLight);

    const galleryFill = new THREE.DirectionalLight(0xd8c8a8, 0.6);
    galleryFill.position.set(0, 4, 6);
    scene.add(galleryFill);

    const frameGroups = [];
    const spotlights = [];
    const textureLoader = new THREE.TextureLoader();

    // 5. Build 3D Picture Frames for each certificate
    certificatesData.forEach((cert, idx) => {
      const pos = framePositions[idx];
      const frameGroup = new THREE.Group();
      frameGroup.position.set(pos.x, pos.y, pos.z);
      frameGroup.userData = { certIndex: idx, certData: cert };

      // Dimensions (aspect ratio 4:3)
      const fw = 1.95;
      const fh = 1.45;
      const depth = 0.08;

      // A. Outer Wooden/Gold Museum Beveled Frame
      const outerFrameGeo = new THREE.BoxGeometry(fw, fh, depth);
      const outerFrameMat = new THREE.MeshStandardMaterial({
        color: idx < 2 ? 0xc8aa6e : (idx === 2 ? 0x38bdf8 : 0x7c3aed), // Gold for Top 3 & Best Student, cyan for Innovation, violet for Club/Skills
        roughness: 0.35,
        metalness: idx < 3 ? 0.75 : 0.45,
      });
      const outerFrame = new THREE.Mesh(outerFrameGeo, outerFrameMat);
      frameGroup.add(outerFrame);

      // B. Inner Matting Board (Off-white museum mat)
      const matGeo = new THREE.PlaneGeometry(fw - 0.16, fh - 0.16);
      const matMat = new THREE.MeshStandardMaterial({
        color: 0xf7f5f0,
        roughness: 0.95,
      });
      const mat = new THREE.Mesh(matGeo, matMat);
      mat.position.z = depth / 2 + 0.002;
      frameGroup.add(mat);

      // C. Certificate Image Plane
      const certGeo = new THREE.PlaneGeometry(fw - 0.32, fh - 0.3);
      // Default placeholder material
      const certMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.05,
      });

      // Load texture
      textureLoader.load(cert.image, (tex) => {
        if (isDisposed) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.generateMipmaps = true;
        certMat.map = tex;
        certMat.needsUpdate = true;
      });

      const certMesh = new THREE.Mesh(certGeo, certMat);
      certMesh.position.z = depth / 2 + 0.005;
      certMesh.userData = { isClickable: true, certIndex: idx };
      frameGroup.add(certMesh);

      // D. Museum Brass Placard underneath frame
      const placardGeo = new THREE.BoxGeometry(0.9, 0.18, 0.02);
      const placardMat = new THREE.MeshStandardMaterial({
        color: 0xbfa882,
        metalness: 0.85,
        roughness: 0.25,
      });
      const placard = new THREE.Mesh(placardGeo, placardMat);
      placard.position.set(0, -fh / 2 - 0.14, depth / 2);
      frameGroup.add(placard);

      scene.add(frameGroup);
      frameGroups.push(frameGroup);

      // Overhead Spotlight aimed at this frame
      const spot = new THREE.SpotLight(0xfffaed, 2.5, 9, Math.PI / 4.5, 0.45);
      spot.position.set(pos.x, 3.2, 2.2);
      spot.target = frameGroup;
      scene.add(spot);
      scene.add(spot.target);
      spotlights.push(spot);
    });

    setIsLoaded(true);

    // 6. Camera Animation & User Orbit Interaction
    const targetCamera = new THREE.Vector3(0, 0.2, 7.4);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    let isDragging = false;
    let startX = 0;
    let panOffset = 0;
    let targetPanOffset = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX;
    };

    const onPointerMove = (e) => {
      if (isDragging && activeIdxRef.current === null) {
        const delta = (e.clientX - startX) * 0.006;
        targetPanOffset = Math.max(-2.5, Math.min(2.5, targetPanOffset - delta));
        startX = e.clientX;
      }

      // Raycasting for hover cursor
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(frameGroups, true);

      let foundIdx = null;
      for (const hit of intersects) {
        if (hit.object.userData?.certIndex !== undefined) {
          foundIdx = hit.object.userData.certIndex;
          break;
        }
        if (hit.object.parent?.userData?.certIndex !== undefined) {
          foundIdx = hit.object.parent.userData.certIndex;
          break;
        }
      }

      setHoveredIdx(foundIdx);
      renderer.domElement.style.cursor = foundIdx !== null ? 'pointer' : isDragging ? 'grabbing' : 'grab';
    };

    const onPointerUp = (e) => {
      isDragging = false;
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(frameGroups, true);

      for (const hit of intersects) {
        const idx = hit.object.userData?.certIndex ?? hit.object.parent?.userData?.certIndex;
        if (idx !== undefined) {
          // If clicked on current zoomed frame, toggle fullscreen; otherwise zoom in
          if (activeIdxRef.current === idx) {
            setFullscreenImage(certificatesData[idx].image);
          } else {
            setActiveIdx(idx);
          }
          return;
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 7. Render Loop with Smooth Spring Interpolation
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth pan
      panOffset += (targetPanOffset - panOffset) * 0.08;

      const currentActive = activeIdxRef.current;
      if (currentActive !== null) {
        // Zoom close-up directly in front of the active certificate
        const targetPos = framePositions[currentActive];
        targetCamera.set(targetPos.x, targetPos.y + 0.02, 2.5);
        targetLookAt.set(targetPos.x, targetPos.y, 0);
      } else {
        // Overview mode (allows gentle horizontal panning)
        targetCamera.set(panOffset, 0.2, 7.2);
        targetLookAt.set(panOffset, 0, 0);
      }

      // Camera lerp
      camera.position.lerp(targetCamera, 0.075);
      currentLookAt.lerp(targetLookAt, 0.075);
      camera.lookAt(currentLookAt);

      // Spotlight intensities based on focus
      spotlights.forEach((spot, i) => {
        const isFocused = currentActive === i;
        const isHovered = hoveredIdx === i;
        const targetIntensity = currentActive !== null 
          ? (isFocused ? 3.6 : 0.5) 
          : (isHovered ? 3.2 : 2.2);
        spot.intensity += (targetIntensity - spot.intensity) * 0.1;
      });

      // Subtle hover elevation for frames
      frameGroups.forEach((fg, i) => {
        const isHovered = hoveredIdx === i && currentActive === null;
        const targetZ = framePositions[i].z + (isHovered ? 0.12 : 0);
        fg.position.z += (targetZ - fg.position.z) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      // Adjust camera distance for smaller screens so all frames or selected frame fits
      if (w < 640) {
        camera.fov = 48;
      } else {
        camera.fov = 38;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (dom.parentNode) dom.parentNode.removeChild(dom);
    };
  }, [framePositions]);

  const activeCert = activeIdx !== null ? certificatesData[activeIdx] : null;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#0c0d12] border border-[#22242f] shadow-2xl">
      {/* 1. Header Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Gallery Badge */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 border border-[#303342] backdrop-blur-md text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#d8c8a8] animate-pulse" />
          <span className="text-[#f4efea] font-semibold tracking-wider uppercase text-[11px]">
            {lang === 'vi' ? 'TRIỂN LÃM 3D • PHÒNG TRƯNG BÀY DANH HIỆU' : '3D EXHIBITION • ACADEMIC GALLERY'}
          </span>
        </div>

        {/* View mode indicator / reset */}
        <div className="pointer-events-auto flex items-center gap-2">
          {activeIdx !== null ? (
            <button
              onClick={() => setActiveIdx(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e2029]/90 hover:bg-[#282b37] border border-[#d8c8a8]/50 text-[#d8c8a8] text-xs font-mono transition-all shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Xem toàn cảnh phòng tranh' : 'Overview Gallery'}</span>
            </button>
          ) : (
            <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-[#aaaaaa] backdrop-blur-md hidden sm:block">
              {lang === 'vi' ? 'Nhấp vào tranh để phóng to cận cảnh' : 'Click any certificate to zoom & inspect'}
            </div>
          )}
        </div>
      </div>

      {/* 2. WebGL 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-[400px] sm:h-[480px] lg:h-[550px] touch-pan-y" 
      />

      {/* 3. Bottom Exhibition Navigation & Certificate Selector */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        
        {/* Thumbnails / Indicators */}
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md">
          {certificatesData.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeIdx === i
                  ? 'bg-[#d8c8a8] text-black font-bold shadow-md'
                  : 'text-[#8e929e] hover:text-white hover:bg-white/10'
              }`}
            >
              <span>#{i + 1}</span>
              <span className="hidden md:inline text-[11px] font-sans">
                {lang === 'vi' ? c.badgeVi : c.badgeEn}
              </span>
            </button>
          ))}
        </div>

        {/* Stepper Controls when zoomed */}
        {activeIdx !== null && (
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => setActiveIdx((activeIdx - 1 + certificatesData.length) % certificatesData.length)}
              className="p-2 rounded-full bg-black/80 hover:bg-[#1f2028] border border-white/15 text-[#d8c8a8] transition-all"
              title="Previous Certificate"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#d8c8a8] bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
              {activeIdx + 1} / {certificatesData.length}
            </span>
            <button
              onClick={() => setActiveIdx((activeIdx + 1) % certificatesData.length)}
              className="p-2 rounded-full bg-black/80 hover:bg-[#1f2028] border border-white/15 text-[#d8c8a8] transition-all"
              title="Next Certificate"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 4. Active Certificate Detail Card (Exhibition Placard Box) */}
      {activeCert && (
        <div className="relative z-30 p-5 sm:p-6 bg-[#111218]/95 border-t border-[#252733] backdrop-blur-xl animate-fadeIn">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/10 text-white border border-white/20">
                  {lang === 'vi' ? activeCert.categoryVi : activeCert.categoryEn}
                </span>
                <span 
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeCert.accentColor}20`,
                    color: activeCert.accentColor,
                    border: `1px solid ${activeCert.accentColor}50`
                  }}
                >
                  {lang === 'vi' ? activeCert.badgeVi : activeCert.badgeEn}
                </span>
                <span className="text-xs font-mono text-[#888888]">{activeCert.year}</span>
                <span className="text-[#444]">•</span>
                <span className="text-xs font-sans text-[#cccccc] font-medium">
                  {lang === 'vi' ? activeCert.issuerVi : activeCert.issuerEn}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-bold font-syne text-[#f4efea] leading-snug">
                {lang === 'vi' ? activeCert.titleVi : activeCert.titleEn}
              </h4>

              <p className="text-xs sm:text-[13px] text-[#9e9ea7] mt-1 leading-relaxed">
                {lang === 'vi' ? activeCert.descVi : activeCert.descEn}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => setFullscreenImage(activeCert.image)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b1c24] hover:bg-[#252733] border border-[#303342] text-[#f4efea] text-xs font-mono transition-all shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#d8c8a8]" />
                <span>{lang === 'vi' ? 'Xem ảnh gốc phóng to' : 'Inspect High-Res'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. Fullscreen High-Resolution Inspection Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-5xl max-h-[92vh] flex flex-col items-center">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute -top-12 right-0 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <span>{lang === 'vi' ? 'Đóng' : 'Close'} ✕</span>
            </button>
            <img
              src={fullscreenImage}
              alt="Certificate Fullscreen"
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsGallery3D;
