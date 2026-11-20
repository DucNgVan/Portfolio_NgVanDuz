import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/**
 * Certificate definitions for 3D Museum Pedestals in Scene 4
 */
export const cinematicCertificates = [
  // LEFT SIDE (3 Pedestals): Academic Excellence & National Innovation
  // 1. Outer Left: Top 3 Outstanding Student (Greenwich Academic)
  {
    id: 'top3_2024',
    title: 'Top 3 Sinh Viên Xuất Sắc — Summer 2024',
    titleEn: 'Top 3 Outstanding Student — Summer 2024',
    badge: 'TOP 3 TOÀN KHÓA',
    category: 'academic',
    categoryLabel: 'Chuyên Ngành & Học Thuật',
    issuer: 'University of Greenwich (Vietnam)',
    recipient: 'Nguyen Van Duc (GCD230006)',
    image: '/certificates/cert_top3_2024.jpg',
    year: '2024',
    verificationRef: 'GKDN240149 • QĐ: 157/QĐ-FPTUDN',
    description: 'Vinh danh thành tích học tập vượt trội, đứng trong Top 3 sinh viên có điểm GPA cao nhất toàn khóa cử nhân Quốc tế Greenwich (Đà Nẵng Campus).',
    spreadPos: new THREE.Vector3(-2.50, -1.25, -1.25),
    rotY: 0.44,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 2. Mid Left: Best Student ICM 2026 (Greenwich Academic)
  {
    id: 'best_student_icm_2026',
    title: 'Thủ Khoa Môn Quản Trị Thông Tin & Nội Dung',
    titleEn: 'Best Student: Information & Content Management',
    badge: 'THỦ KHOA MÔN HỌC',
    category: 'academic',
    categoryLabel: 'Chuyên Ngành & Học Thuật',
    issuer: 'Greenwich International Bachelor Program',
    recipient: 'Nguyen Van Duc (GCD230006)',
    image: '/certificates/cert_best_student_icm_2026.jpg',
    year: '2026',
    verificationRef: 'QĐ: 181 QH-PPTUDN • GKD2300025',
    description: 'Thủ khoa đạt điểm số xuất sắc nhất bộ môn Information and Content Management (COMP1643) kỳ Summer Trimester 2026, chứng nhận bởi Giám đốc Phân hiệu TS. Nguyễn Duy Nghiêm.',
    spreadPos: new THREE.Vector3(-1.70, -1.25, -1.65),
    rotY: 0.28,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 3. Inner Left: Impact Innovation Bootcamp 2025 (National 2nd Prize)
  {
    id: 'bootcamp_innovation_2025',
    title: 'Giải Nhì Toàn Quốc — Impact Innovation Bootcamp 2025',
    titleEn: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
    badge: 'GIẢI NHÌ TOÀN QUỐC',
    category: 'academic',
    categoryLabel: 'Chuyên Ngành & Học Thuật',
    issuer: 'Greenwich Vietnam & Đổi Mới Sáng Tạo Bệnh Viện',
    recipient: 'Nguyen Van Duc (GCD230006)',
    image: '/certificates/cert_bootcamp_innovation_2025.jpg',
    year: '2025',
    verificationRef: 'Director of Da Nang Campus: Dr. Nguyen Duy Nghiem',
    description: 'Giải Nhì cuộc thi Đổi mới Sáng tạo Công nghệ (Impact Innovation Bootcamp 2025) với giải pháp số hóa và chuyển đổi số quy trình y tế cộng đồng.',
    spreadPos: new THREE.Vector3(-0.90, -1.25, -1.95),
    rotY: 0.14,
    plinthHeight: 0.72,
    frameColor: 0xd8c8a8,
  },

  // RIGHT SIDE (3 Pedestals): Mentoring, Media & Leadership Activities
  // 4. Inner Right: Greenwich Peer Mentoring Club (Academic Mentoring & Leadership - from PDF)
  {
    id: 'peer_mentoring_2024',
    title: 'Chứng Nhận Mentor Xuất Sắc — Greenwich Peer Mentoring',
    titleEn: 'Certificate of Recognition — Peer Mentoring Club (GPM)',
    badge: 'MENTOR XUẤT SẮC',
    category: 'club_skill',
    categoryLabel: 'CLB & Cố Vấn Học Thuật',
    issuer: 'Greenwich Peer Mentoring Club & Ban CTSV',
    recipient: 'Nguyen Van Duc',
    image: '/certificates/cert_peer_mentoring_2024.jpg',
    year: '2024',
    verificationRef: 'Trưởng ngành QTKD: ThS. Nguyễn Minh Hải & Chủ nhiệm GPM: Đinh Văn Thanh Khởi',
    description: 'Vinh danh đóng góp nổi bật và tích cực với vai trò Mentor hướng dẫn, hỗ trợ học tập và phát triển kỹ năng cho sinh viên khóa mới trong suốt 7 tuần Fall 2024.',
    spreadPos: new THREE.Vector3(0.90, -1.25, -1.95),
    rotY: -0.14,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 5. Mid Right: Greenwich Newspaper Club GNews (Club & Soft Skills)
  {
    id: 'gnews_club_2024',
    title: 'Thành Viên Tích Cực — CLB Báo Chí GNews 2024',
    titleEn: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
    badge: 'CLB BÁO CHÍ',
    category: 'club_skill',
    categoryLabel: 'CLB & Kỹ Năng Mềm',
    issuer: 'Ban Công Tác Sinh Viên & CLB GNews',
    recipient: 'Nguyen Van Duc',
    image: '/certificates/cert_gnews_club_2024.jpg',
    year: '2024',
    verificationRef: 'Trưởng Ban CTSV Mai Đoàn Ngọc Tuyết Oanh & Ban Chủ Nhiệm GNews',
    description: 'Chứng nhận đóng góp tích cực và nổi bật trong ban kỹ thuật và truyền thông báo chí đại học, tham gia biên tập ấn phẩm và truyền thông sự kiện công nghệ sinh viên.',
    spreadPos: new THREE.Vector3(1.70, -1.25, -1.65),
    rotY: -0.28,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 6. Outer Right: Greenwich Music Club GMC (Club & Soft Skills)
  {
    id: 'gmc_music_club',
    title: 'Thành Tích Xuất Sắc — Đêm Nhạc "Under the Baubles"',
    titleEn: 'Outstanding Participation — "Under the Baubles" Musical Night',
    badge: 'CLB ÂM NHẠC',
    category: 'club_skill',
    categoryLabel: 'CLB & Kỹ Năng Mềm',
    issuer: 'Greenwich Music Club (GMC) & Ban CTSV',
    recipient: 'Nguyen Van Duc',
    image: '/certificates/cert_gmc_music_club.jpg',
    year: '2024',
    verificationRef: 'Chủ nhiệm CLB Lê Tất Chương & Trưởng Ban CTSV Mai Đoàn Ngọc Tuyết Oanh',
    description: 'Vinh danh đóng góp nổi bật trong ban tổ chức và tham gia biểu diễn tại đêm đại nhạc hội "Under the Baubles", khẳng định kỹ năng tổ chức sự kiện, gắn kết đội ngũ và kỹ năng mềm.',
    spreadPos: new THREE.Vector3(2.50, -1.25, -1.25),
    rotY: -0.44,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },
];

/**
 * Creates high-resolution metallic brass plaque texture with crisp typography
 */
function createPlaqueCanvas(badge, year, title) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');

  // Brushed brass gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 140);
  grad.addColorStop(0, '#cbb27a');
  grad.addColorStop(0.35, '#f4e5be');
  grad.addColorStop(0.65, '#dfc58d');
  grad.addColorStop(1, '#ab8e54');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 140);

  // Outer bevel
  ctx.strokeStyle = '#624d26';
  ctx.lineWidth = 5;
  ctx.strokeRect(2, 2, 508, 136);

  // Inset hairline
  ctx.strokeStyle = '#fff8e4';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(7, 7, 498, 126);

  // Corner mounting screws
  ctx.fillStyle = '#453314';
  [[14, 14], [498, 14], [14, 126], [498, 126]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2.8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Badge & Year
  ctx.fillStyle = '#1c1407';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${badge}  •  ${year}`, 256, 42);

  // Title
  ctx.fillStyle = '#221908';
  ctx.font = 'bold 22px sans-serif';
  let shortTitle = title;
  if (shortTitle.length > 27) shortTitle = shortTitle.substring(0, 25) + '...';
  ctx.fillText(shortTitle, 256, 88);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates soft volumetric downlight beam gradient texture (matching theatre stage lighting in h1(18).jpg)
 */
function createSpotlightBeamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Vertical gradient: intense bright at top, smoothly fading to transparent at bottom
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0.0, 'rgba(255, 252, 245, 0.95)');
  grad.addColorStop(0.06, 'rgba(255, 245, 225, 0.75)');
  grad.addColorStop(0.25, 'rgba(245, 230, 205, 0.40)');
  grad.addColorStop(0.55, 'rgba(230, 215, 185, 0.18)');
  grad.addColorStop(0.85, 'rgba(215, 200, 170, 0.06)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 512);

  // Horizontal feathering (soft edges)
  const hGrad = ctx.createLinearGradient(0, 0, 128, 0);
  hGrad.addColorStop(0.0, 'rgba(0, 0, 0, 1)');
  hGrad.addColorStop(0.22, 'rgba(255, 255, 255, 1)');
  hGrad.addColorStop(0.78, 'rgba(255, 255, 255, 1)');
  hGrad.addColorStop(1.0, 'rgba(0, 0, 0, 1)');

  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = hGrad;
  ctx.fillRect(0, 0, 128, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates soft, realistic plinth contact & directional drop shadow texture
 */
function createPedestalShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 256, 256);

  // 1. Soft extended directional drop shadow (cast slightly backward away from light)
  const dirGrad = ctx.createRadialGradient(128, 142, 10, 128, 142, 110);
  dirGrad.addColorStop(0, "rgba(0, 0, 0, 0.78)");
  dirGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.42)");
  dirGrad.addColorStop(0.85, "rgba(0, 0, 0, 0.12)");
  dirGrad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
  ctx.fillStyle = dirGrad;
  ctx.beginPath();
  ctx.ellipse(128, 142, 95, 75, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Crisp, deep contact occlusion shadow right beneath plinth footprint
  const occlGrad = ctx.createRadialGradient(128, 128, 20, 128, 128, 75);
  occlGrad.addColorStop(0, "rgba(0, 0, 0, 0.98)");
  occlGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.85)");
  occlGrad.addColorStop(0.9, "rgba(0, 0, 0, 0.38)");
  occlGrad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
  ctx.fillStyle = occlGrad;
  ctx.beginPath();
  ctx.ellipse(128, 128, 75, 55, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates luminous, feathered floor spotlight puddle texture matching h1(18).jpg
 */
function createFloorSpotlightTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 256, 256);

  // Radial pool of theatrical spotlight matching h1(18).jpg
  const grad = ctx.createRadialGradient(128, 128, 15, 128, 128, 120);
  grad.addColorStop(0, "rgba(255, 248, 235, 0.88)");
  grad.addColorStop(0.25, "rgba(245, 235, 215, 0.68)");
  grad.addColorStop(0.55, "rgba(225, 210, 185, 0.32)");
  grad.addColorStop(0.82, "rgba(190, 175, 150, 0.10)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.0)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates authentic museum VIP velvet stanchions (brass posts & catenary red velvet ropes)
 */
function createMuseumStanchions(shadowTexture) {
  const group = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xdfbc68,
    roughness: 0.22,
    metalness: 0.90,
    transparent: true,
    opacity: 0.0,
  });

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x82121e, // Rich deep burgundy velvet
    roughness: 0.82,
    metalness: 0.08,
    transparent: true,
    opacity: 0.0,
  });

  const postShadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
  });

  // Stanchion posts standing along an elegant arc in front of the 6 pedestals
  const postPositions = [
    [-2.85, -0.25],
    [-1.85, -0.70],
    [-0.75, -1.00],
    [0.75, -1.00],
    [1.85, -0.70],
    [2.85, -0.25],
  ];

  const postHeight = 0.62;
  const baseY = -1.25;

  // Stanchion brass posts
  postPositions.forEach(([px, pz]) => {
    const postGroup = new THREE.Group();
    postGroup.position.set(px, baseY, pz);

    // Weighted base plate
    const baseGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.022, 20);
    const baseMesh = new THREE.Mesh(baseGeo, brassMat);
    baseMesh.position.y = 0.011;
    postGroup.add(baseMesh);

    // Post contact shadow directly under base
    const shadowGeo = new THREE.PlaneGeometry(0.28, 0.28);
    const shadowMesh = new THREE.Mesh(shadowGeo, postShadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.002;
    postGroup.add(shadowMesh);

    // Post upright stem
    const stemGeo = new THREE.CylinderGeometry(0.016, 0.016, postHeight, 16);
    const stemMesh = new THREE.Mesh(stemGeo, brassMat);
    stemMesh.position.y = postHeight / 2;
    postGroup.add(stemMesh);

    // Top brass collar ring
    const collarGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.022, 16);
    const collarMesh = new THREE.Mesh(collarGeo, brassMat);
    collarMesh.position.y = postHeight + 0.011;
    postGroup.add(collarMesh);

    // Top spherical finial
    const finialGeo = new THREE.SphereGeometry(0.032, 16, 16);
    const finialMesh = new THREE.Mesh(finialGeo, brassMat);
    finialMesh.position.y = postHeight + 0.045;
    postGroup.add(finialMesh);

    group.add(postGroup);
  });

  // Deep red velvet ropes linking consecutive posts with graceful catenary curves
  for (let i = 0; i < postPositions.length - 1; i++) {
    const p1 = postPositions[i];
    const p2 = postPositions[i + 1];

    const start = new THREE.Vector3(p1[0], baseY + postHeight + 0.01, p1[1]);
    const end = new THREE.Vector3(p2[0], baseY + postHeight + 0.01, p2[1]);

    // Sag amount: center segment sags slightly deeper for majestic VIP drape
    const sag = i === 2 ? 0.16 : 0.12;
    const mid = new THREE.Vector3(
      (p1[0] + p2[0]) / 2,
      baseY + postHeight - sag,
      (p1[1] + p2[1]) / 2
    );

    const curve = new THREE.CatmullRomCurve3([start, mid, end]);
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.014, 8, false);
    const ropeMesh = new THREE.Mesh(tubeGeo, velvetMat);
    group.add(ropeMesh);

    // Brass clip caps at rope ends
    [start, end].forEach((pt) => {
      const clipGeo = new THREE.SphereGeometry(0.020, 12, 12);
      const clipMesh = new THREE.Mesh(clipGeo, brassMat);
      clipMesh.position.copy(pt);
      group.add(clipMesh);
    });
  }

  return {
    group,
    brassMat,
    velvetMat,
    postShadowMat,
  };
}

/**
 * Creates ultra high-resolution canvas texture for the 3D wall-mounted "VERIFIED MILESTONES" lettering
 */
function createWallSignageTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 2048, 512);

  // 1. Top Eyebrow Emblem & Category
  ctx.save();
  ctx.fillStyle = '#dfc58d';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) {
    ctx.letterSpacing = '8px';
  }
  ctx.fillText('✦   A C A D E M I C   &   L E A D E R S H I P   A R C H I V E   ✦', 1024, 75);
  ctx.restore();

  // 2. Main 3D Pin-Mounted Metallic Lettering: VERIFIED MILESTONES
  ctx.save();
  // Deep cast shadow on the wall behind 3D metal letters
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 10;

  // Luminous metallic gold gradient
  const goldGrad = ctx.createLinearGradient(0, 110, 0, 260);
  goldGrad.addColorStop(0.0, '#ffffff');
  goldGrad.addColorStop(0.20, '#faecc5');
  goldGrad.addColorStop(0.55, '#dfc58d');
  goldGrad.addColorStop(0.85, '#bf9b53');
  goldGrad.addColorStop(1.0, '#7d5e28');

  ctx.fillStyle = goldGrad;
  ctx.font = '900 94px "Plus Jakarta Sans", "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) {
    ctx.letterSpacing = '10px';
  }
  ctx.fillText('VERIFIED MILESTONES', 1024, 185);

  // Fine specular top edge highlight on the letters
  ctx.shadowColor = 'transparent';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.strokeText('VERIFIED MILESTONES', 1024, 185);
  ctx.restore();

  // 3. Elegant Architectural Horizontal Rule with Diamond
  ctx.save();
  ctx.strokeStyle = 'rgba(223, 197, 141, 0.65)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(340, 265);
  ctx.lineTo(1708, 265);
  ctx.stroke();

  // Center gold diamond
  ctx.fillStyle = '#faecc5';
  ctx.beginPath();
  ctx.moveTo(1024, 255);
  ctx.lineTo(1034, 265);
  ctx.lineTo(1024, 275);
  ctx.lineTo(1014, 265);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 4. Subtitle / Curatorial Citation
  ctx.save();
  ctx.fillStyle = '#dfc58d';
  ctx.font = 'bold 26px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) {
    ctx.letterSpacing = '6px';
  }
  ctx.fillText('HONORS, SCHOLARSHIPS & STUDENT LEADERSHIP • 2024 — 2026', 1024, 330);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates authentic museum feature exhibition wall behind pedestals with mounted signage
 */
function createMuseumExhibitionWall(signageTexture) {
  const group = new THREE.Group();

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x121319, // Deep exhibition matte charcoal basalt
    roughness: 0.90,
    metalness: 0.05,
    transparent: true,
    opacity: 0.0,
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x5a4d33, // Brushed antique bronze/brass trim
    roughness: 0.45,
    metalness: 0.65,
    transparent: true,
    opacity: 0.0,
  });

  const inlayMat = new THREE.MeshStandardMaterial({
    color: 0x3d3525, // Vertical architectural reveals
    roughness: 0.60,
    metalness: 0.40,
    transparent: true,
    opacity: 0.0,
  });

  const signageMat = new THREE.MeshStandardMaterial({
    map: signageTexture,
    roughness: 0.25,
    metalness: 0.60,
    emissive: 0x3a2e18, // Warm metallic gold luminescence
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.0,
  });

  const wallWidth = 11.8;
  const wallHeight = 6.4;
  const wallDepth = 0.25;
  const wallY = 1.95; // From -1.25 (floor) to 5.15 (ceiling)
  const wallZ = -2.85;

  // A. Main Center Gallery Wall Panel
  const wallGeo = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);
  const wallMesh = new THREE.Mesh(wallGeo, wallMat);
  wallMesh.position.set(0, wallY, wallZ);
  group.add(wallMesh);

  // B. Baseboard Bronze Kickplate (at floor level)
  const baseboardGeo = new THREE.BoxGeometry(wallWidth + 0.04, 0.08, wallDepth + 0.03);
  const baseboardMesh = new THREE.Mesh(baseboardGeo, trimMat);
  baseboardMesh.position.set(0, -1.21, wallZ + 0.01);
  group.add(baseboardMesh);

  // C. Top Architectural Crown Molding
  const crownGeo = new THREE.BoxGeometry(wallWidth + 0.04, 0.06, wallDepth + 0.03);
  const crownMesh = new THREE.Mesh(crownGeo, trimMat);
  crownMesh.position.set(0, 5.12, wallZ + 0.01);
  group.add(crownMesh);

  // D. Vertical Architectural Reveal Seams (subdividing into bays)
  [-3.8, 3.8].forEach((rx) => {
    const revealGeo = new THREE.BoxGeometry(0.018, wallHeight, wallDepth + 0.01);
    const revealMesh = new THREE.Mesh(revealGeo, inlayMat);
    revealMesh.position.set(rx, wallY, wallZ + 0.005);
    group.add(revealMesh);
  });

  // E. 3D Wall-Mounted Signage Plane (VERIFIED MILESTONES)
  // Mounted directly onto the front face of the wall in perfect camera sightline
  const signageGeo = new THREE.PlaneGeometry(5.6, 1.40);
  const signageMesh = new THREE.Mesh(signageGeo, signageMat);
  signageMesh.position.set(0, 0.96, wallZ + wallDepth / 2 + 0.008);
  group.add(signageMesh);

  return {
    group,
    wallMat,
    trimMat,
    inlayMat,
    signageMat,
  };
}

/**
 * CinematicCanvas
 * Fullscreen 3D Stage acting as an interactive camera timeline:
 * - Interpolates camera position, target, rotation, and lighting based on scrollProgress (0 to 1)
 * - Loads the model /models/character-cinematic.glb with Draco decoding
 * - Scene 4: Seated central model with back turned, surrounded by radiating 3D pedestals & spotlit certificates
 */
export const CinematicCanvas = ({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) => {
  const mountRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [webGlError, setWebGlError] = useState(false);

  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const mousePosRef = useRef(mousePos);
  mousePosRef.current = mousePos;

  const scene4FactorRef = useRef(0);

  // Cinematic keyframes for camera & model across 5 scenes
  const keyframes = [
    {
      progress: 0.0,
      camPos: new THREE.Vector3(0.0, 0.08, 4.40),
      camTarget: new THREE.Vector3(0.0, 0.02, 0),
      sideOffset: 0.0,
      modelRotY: 0.0,
      lightIntensity: 1.85,
      spotIntensity: 0.0,
      bgColor: new THREE.Color(0xf8f7f4),
    },
    {
      progress: 0.30,
      camPos: new THREE.Vector3(0.0, 0.08, 3.55),
      camTarget: new THREE.Vector3(0.0, 0.10, 0.05),
      sideOffset: 0.88,
      modelRotY: 1.05, // Model quay sang trái thêm một chút từ góc 1.40
      lightIntensity: 1.95,
      spotIntensity: 0.0,
      bgColor: new THREE.Color(0xf8f7f4),
    },
    {
      progress: 0.54,
      camPos: new THREE.Vector3(0.0, 0.16, 3.65),
      camTarget: new THREE.Vector3(0.0, 0.08, 0),
      sideOffset: -1.05,
      modelRotY: -0.92, // Model quay góc 3/4 sang bên trái hướng về các project cards/elements
      lightIntensity: 1.85,
      spotIntensity: 0.0,
      bgColor: new THREE.Color(0xf8f7f4),
    },
    {
      progress: 0.76,
      camPos: new THREE.Vector3(0.0, 0.55, 4.60), // Góc máy cao thoáng bao quát toàn bộ 5 bệ bằng khen và model
      camTarget: new THREE.Vector3(0.0, -0.15, -0.40),
      sideOffset: 0.0,
      modelRotY: -2.356, // Model quay mặt vào sân khấu chiêm ngưỡng các bằng khen (smooth lerp từ -0.92)
      lightIntensity: 0.05, // Dramatic stage contrast (ambient light drops)
      spotIntensity: 5.5, // Theatrical overhead spotlights (matching h1(18).jpg)
      bgColor: new THREE.Color(0x020204), // Pure stage black / dark galaxy background
    },
    {
      progress: 1.0,
      camPos: new THREE.Vector3(0.0, 0.16, 3.45),
      camTarget: new THREE.Vector3(0.0, 0.08, 0),
      sideOffset: -0.75,
      modelRotY: -0.08,
      lightIntensity: 1.8,
      spotIntensity: 0.0,
      bgColor: new THREE.Color(0xf8f7f4),
    },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isDisposed = false;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f7f4);
    scene.fog = new THREE.FogExp2(0xf8f7f4, 0.02);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 30);
    camera.position.set(0.0, 0.14, 3.35);

    // 2. WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.style.pointerEvents = 'auto';
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL is not available or disabled on this device:', err);
      setWebGlError(true);
      return () => {
        isDisposed = true;
      };
    }

    // 3. Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf0ece1, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.8);
    keyLight.position.set(-2.0, 4.0, 3.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff7ed, 1.1);
    fillLight.position.set(2.5, 2.0, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe8dcc8, 0.8);
    rimLight.position.set(0.0, 2.5, -2.5);
    scene.add(rimLight);

    // 3.4 Model Container Group
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    // 3.5 Volumetric Spotlight Beam Texture (Soft theatrical gradient matching h1(18).jpg)
    const beamTexture = createSpotlightBeamTexture();

    // 3.6 Overhead Theatrical Stage Rig Bar (spanning wide matching h1(18).jpg)
    const rigGeo = new THREE.CylinderGeometry(0.04, 0.04, 7.2, 16);
    rigGeo.rotateZ(Math.PI / 2);
    const rigMat = new THREE.MeshStandardMaterial({ color: 0x14151b, metalness: 0.85, roughness: 0.35 });
    const stageRigBar = new THREE.Mesh(rigGeo, rigMat);
    stageRigBar.position.set(0.0, 4.88, -1.55);
    stageRigBar.visible = false;
    scene.add(stageRigBar);

    const backRimLight = new THREE.DirectionalLight(0xffedd5, 0.0);
    backRimLight.position.set(0.0, 2.5, -2.5);
    scene.add(backRimLight);

    // 3.8 Museum Exhibition Soft Matte Floor in Scene 4
    const floorGeo = new THREE.CircleGeometry(5.8, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x030306, // Deep pitch black stage floor
      roughness: 0.94, // Ultra-matte black slate, zero glare
      metalness: 0.05,
      transparent: true,
      opacity: 0.0,
    });
    const galleryFloor = new THREE.Mesh(floorGeo, floorMat);
    galleryFloor.rotation.x = -Math.PI / 2;
    galleryFloor.position.y = -1.25;
    galleryFloor.visible = false;
    scene.add(galleryFloor);

    // 4. Floating Warm Champagne Dust Particles
    const pCount = window.innerWidth < 768 ? 40 : 80;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 8.0;
      pPositions[i + 1] = (Math.random() - 0.5) * 6.0;
      pPositions[i + 2] = (Math.random() - 0.5) * 6.0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xbfa074,
      size: 0.020,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 4.1 Dark Galaxy Cosmic Starfield for Scene 4
    const starCount = 380;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff), // Diamond White
      new THREE.Color(0x93c5fd), // Ice Blue
      new THREE.Color(0xfde68a), // Pale Gold
      new THREE.Color(0xc4b5fd), // Cosmic Violet
    ];

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 22.0;
      starPos[i * 3 + 1] = Math.random() * 9.0 - 1.5;
      starPos[i * 3 + 2] = -Math.random() * 9.0 - 2.5; // Deep behind pedestals

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const galaxyField = new THREE.Points(starGeo, starMat);
    galaxyField.visible = false;
    scene.add(galaxyField);

    // 5. 3D Museum Exhibition Pedestals & Framed Certificates (Scene 4)
    const pedestalsGroup = new THREE.Group();
    pedestalsGroup.visible = false;
    scene.add(pedestalsGroup);

    const pedestalNodes = [];
    const clickableMeshes = [];
    const textureLoader = new THREE.TextureLoader();
    const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

    // Shared realistic textures for spotlight puddles and plinth shadows
    const floorSpotTexture = createFloorSpotlightTexture();
    const shadowTexture = createPedestalShadowTexture();

    cinematicCertificates.forEach((cert, idx) => {
      // Slender, architectural museum plinth
      const pw = 0.50;
      const pd = 0.34;
      const ph = cert.plinthHeight;

      const pedestal = new THREE.Group();
      pedestal.userData = { certData: cert };

      // A. Plinth Column (Refined Matte Charcoal Basalt)
      const plinthGeo = new THREE.BoxGeometry(pw, ph, pd);
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0x181922,
        roughness: 0.88, // Velvet matte, zero plastic glare
        metalness: 0.08,
      });
      const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
      plinthMesh.position.y = ph / 2;
      pedestal.add(plinthMesh);

      // B. Base Dark Trim
      const baseGeo = new THREE.BoxGeometry(pw + 0.04, 0.03, pd + 0.04);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x0f1016,
        roughness: 0.9,
        metalness: 0.1,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.015;
      pedestal.add(baseMesh);

      // C. Top Brushed Brass Collar
      const topRimGeo = new THREE.BoxGeometry(pw + 0.02, 0.02, pd + 0.02);
      const topRimMat = new THREE.MeshStandardMaterial({
        color: 0xc8b07a,
        roughness: 0.45,
        metalness: 0.65,
      });
      const topRimMesh = new THREE.Mesh(topRimGeo, topRimMat);
      topRimMesh.position.y = ph + 0.01;
      pedestal.add(topRimMesh);

      // D. Subtle Brass Plaque
      const plaqueTex = createPlaqueCanvas(cert.badge, cert.year, cert.title);
      const plaqueGeo = new THREE.PlaneGeometry(0.30, 0.078);
      const plaqueMat = new THREE.MeshStandardMaterial({
        map: plaqueTex,
        roughness: 0.45,
        metalness: 0.5,
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, ph * 0.52, pd / 2 + 0.003);
      pedestal.add(plaqueMesh);

      // E. Framed Certificate on Top (Satin Antique Gold, Archival Matte Paper)
      const frameGroup = new THREE.Group();
      frameGroup.position.set(0, ph + 0.02, 0);
      frameGroup.rotation.x = -0.22; // Gentle tilt facing viewer and model
      frameGroup.userData = { certData: cert };

      const fw = 0.70;
      const fh = 0.48;
      const fdepth = 0.024;

      // Outer Beveled Frame (Satin Dark Antique Gold, matte, no specular glare)
      const outerFrameGeo = new THREE.BoxGeometry(fw, fh, fdepth);
      const outerFrameMat = new THREE.MeshStandardMaterial({
        color: 0x5a4d33,
        roughness: 0.75,
        metalness: 0.35,
      });
      const outerFrame = new THREE.Mesh(outerFrameGeo, outerFrameMat);
      outerFrame.position.y = fh / 2;
      outerFrame.userData = { certData: cert };
      frameGroup.add(outerFrame);
      clickableMeshes.push(outerFrame);

      // Inner Matting Board (Dark museum matting board, maximizes contrast and eliminates white glare)
      const matGeo = new THREE.PlaneGeometry(fw - 0.08, fh - 0.08);
      const matMat = new THREE.MeshStandardMaterial({
        color: 0x08090f,
        roughness: 0.98,
      });
      const matMesh = new THREE.Mesh(matGeo, matMat);
      matMesh.position.set(0, fh / 2, fdepth / 2 + 0.001);
      frameGroup.add(matMesh);

      // Certificate Artwork Plane (Archival matte paper, zero glare)
      const certPlaneGeo = new THREE.PlaneGeometry(fw - 0.14, fh - 0.14);
      const certMat = new THREE.MeshStandardMaterial({
        color: 0xf5f3ed,
        roughness: 0.98,
        metalness: 0.0,
      });

      const texUrl = `${baseUrl}${cert.image.replace(/^\//, '')}`;
      textureLoader.load(
        texUrl,
        (tex) => {
          if (isDisposed) return;
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.generateMipmaps = true;
          certMat.map = tex;
          certMat.needsUpdate = true;
        },
        undefined,
        (err) => console.warn('Cert texture load err:', cert.image, err)
      );

      const certMesh = new THREE.Mesh(certPlaneGeo, certMat);
      certMesh.position.set(0, fh / 2, fdepth / 2 + 0.003);
      certMesh.userData = { certData: cert };
      frameGroup.add(certMesh);
      clickableMeshes.push(certMesh);

      // Easel Stand Backing
      const standGeo = new THREE.BoxGeometry(0.08, 0.34, 0.015);
      const standMat = new THREE.MeshStandardMaterial({ color: 0x1f1e1a, roughness: 0.8 });
      const standMesh = new THREE.Mesh(standGeo, standMat);
      standMesh.position.set(0, fh / 3, -0.06);
      standMesh.rotation.x = 0.32;
      frameGroup.add(standMesh);

      pedestal.add(frameGroup);
      pedestalsGroup.add(pedestal);

      // F. Dedicated Overhead Stage Spotlight for this Pedestal (Matching h1(18).jpg)
      // Dedicated spotlight target Object3D added directly to scene for precise tracking
      const spotTarget = new THREE.Object3D();
      spotTarget.position.set(cert.spreadPos.x, cert.spreadPos.y + ph + 0.22, cert.spreadPos.z);
      scene.add(spotTarget);

      // Exact ceiling lamp coordinates and mathematical aiming vector to pedestal floor pool
      const lampPos = new THREE.Vector3(cert.spreadPos.x, 4.88, cert.spreadPos.z + 0.12);
      const floorTarget = new THREE.Vector3(cert.spreadPos.x, -1.248, cert.spreadPos.z);
      const beamVec = new THREE.Vector3().subVectors(floorTarget, lampPos);
      const beamLength = beamVec.length();
      const beamDir = beamVec.clone().normalize();
      const beamQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), beamDir);

      // Theatrical focused spotlight hitting directly and accurately on the certificate and pedestal
      const pedSpot = new THREE.SpotLight(0xfff3db, 0.0, 16.0, Math.PI / 8.5, 0.45, 1.1);
      pedSpot.position.copy(lampPos);
      pedSpot.target = spotTarget;
      scene.add(pedSpot);

      // F.1 Ceiling Lamp Fixture Canister (Aimed along beamDir)
      const lampGeo = new THREE.CylinderGeometry(0.11, 0.14, 0.24, 16);
      lampGeo.translate(0, 0.12, 0);
      const lampMat = new THREE.MeshStandardMaterial({ color: 0x15161c, metalness: 0.85, roughness: 0.35 });
      const lampMesh = new THREE.Mesh(lampGeo, lampMat);
      lampMesh.position.copy(lampPos);
      lampMesh.quaternion.copy(beamQuat);
      lampMesh.visible = false;
      scene.add(lampMesh);

      // F.2 Glowing Lamp Lens (Facing down towards pedestal)
      const lampLensGeo = new THREE.CircleGeometry(0.10, 16);
      const lampLensMat = new THREE.MeshBasicMaterial({ color: 0xfff6e5, transparent: true, opacity: 0.0 });
      const lampLensMesh = new THREE.Mesh(lampLensGeo, lampLensMat);
      lampLensMesh.position.copy(lampPos);
      lampLensMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), beamDir);
      lampLensMesh.visible = false;
      scene.add(lampLensMesh);

      // F.3 Volumetric Downlight Cone Beam (Accurately lands on the pedestal without drifting)
      const pBeamGeo = new THREE.CylinderGeometry(0.08, 0.65, beamLength, 28, 1, true);
      pBeamGeo.translate(0, -beamLength / 2, 0); // Origin at top fixture
      const pBeamMat = new THREE.MeshBasicMaterial({
        map: beamTexture,
        color: 0xfff3db,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const pBeamMesh = new THREE.Mesh(pBeamGeo, pBeamMat);
      pBeamMesh.position.copy(lampPos);
      pBeamMesh.quaternion.copy(beamQuat);
      pBeamMesh.visible = false;
      scene.add(pBeamMesh);

      // G. Luminous Floor Spotlight Puddle (Luminous warm feathered pool matching h1(18).jpg)
      const floorPoolGeo = new THREE.CircleGeometry(0.72, 32);
      const floorPoolMat = new THREE.MeshBasicMaterial({
        map: floorSpotTexture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const floorPoolMesh = new THREE.Mesh(floorPoolGeo, floorPoolMat);
      floorPoolMesh.rotation.x = -Math.PI / 2;
      floorPoolMesh.position.set(cert.spreadPos.x, -1.248, cert.spreadPos.z);
      floorPoolMesh.visible = false;
      scene.add(floorPoolMesh);

      // H. Deep Plinth Contact & Directional Drop Shadow (Directly beneath plinth base)
      const shadowGeo = new THREE.PlaneGeometry(0.92, 0.72);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.rotation.z = -cert.rotY;
      shadowMesh.position.set(cert.spreadPos.x, -1.245, cert.spreadPos.z);
      shadowMesh.visible = false;
      scene.add(shadowMesh);

      pedestalNodes.push({
        group: pedestal,
        frameGroup,
        spotTarget,
        plinthHeight: ph,
        spreadPos: cert.spreadPos,
        rotY: cert.rotY,
        lampPos,
        spotLight: pedSpot,
        lampMesh,
        lampLensMesh,
        lampLensMat,
        beamMesh: pBeamMesh,
        beamMat: pBeamMat,
        floorPoolMesh,
        shadowMesh,
      });
    });

    // 5.5 Authentic Museum Stanchions (Brass posts & Red velvet ropes)
    const museumStanchionsObj = createMuseumStanchions(shadowTexture);
    museumStanchionsObj.group.visible = false;
    scene.add(museumStanchionsObj.group);

    // 5.6 Authentic Museum Exhibition Feature Wall with Mounted Gold Lettering (VERIFIED MILESTONES)
    const wallSignageTex = createWallSignageTexture();
    const museumWallObj = createMuseumExhibitionWall(wallSignageTex);
    museumWallObj.group.visible = false;
    scene.add(museumWallObj.group);

    // Dedicated Overhead Wall Wash Light highlighting the mounted letters
    const wallWashTarget = new THREE.Object3D();
    wallWashTarget.position.set(0, 0.96, -2.72);
    scene.add(wallWashTarget);

    const wallWashSpot = new THREE.SpotLight(0xfff3db, 0.0, 16.0, Math.PI / 3.4, 0.65, 1.1);
    wallWashSpot.position.set(0, 4.88, -1.50);
    wallWashSpot.target = wallWashTarget;
    scene.add(wallWashSpot);

    // 6. Raycaster for Pedestal Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();
    let hoveredObject = null;

    const getIntersects = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVec.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);
      return raycaster.intersectObjects(clickableMeshes, true);
    };

    const handlePointerMove = (e) => {
      if (scene4FactorRef.current < 0.70) {
        if (hoveredObject) {
          document.body.style.cursor = 'default';
          hoveredObject = null;
        }
        return;
      }
      const hits = getIntersects(e.clientX, e.clientY);
      if (hits.length > 0) {
        document.body.style.cursor = 'pointer';
        hoveredObject = hits[0].object;
      } else if (hoveredObject) {
        document.body.style.cursor = 'default';
        hoveredObject = null;
      }
    };

    const handleClick = (e) => {
      // 1. MUST only handle direct clicks on the canvas
      if (e.target !== renderer.domElement && e.target !== container) return;
      // 2. MUST only be active when firmly inside Scene 4
      if (scene4FactorRef.current < 0.70) return;

      const hits = getIntersects(e.clientX, e.clientY);
      if (hits.length > 0) {
        let target = hits[0].object;
        while (target && !target.userData?.certData && target.parent) {
          target = target.parent;
        }
        if (target?.userData?.certData) {
          window.dispatchEvent(new CustomEvent('open-certificate', { detail: target.userData.certData }));
        }
      }
    };

    // Attach click strictly to renderer.domElement so UI clicks never bleed in
    renderer.domElement.addEventListener('click', handleClick);
    window.addEventListener('pointermove', handlePointerMove);

    // 7. Load /models/character-cinematic.glb with Draco
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${baseUrl}draco/`);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let baseModelScale = 1.0;

    loader.load(
      `${baseUrl}models/character-cinematic.glb`,
      (gltf) => {
        if (isDisposed) return;
        const char = gltf.scene;
        char.rotation.set(0, 0, 0);
        char.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(char);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        char.position.x = -center.x;
        char.position.y = -center.y - 0.08;
        char.position.z = -center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        baseModelScale = 2.45 / maxDim;
        modelRoot.scale.set(baseModelScale, baseModelScale, baseModelScale);

        char.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.side = THREE.FrontSide;
            child.material.roughness = 0.88; // Soft matte fabric on character, zero plastic glare
            child.material.metalness = 0.02;
            child.material.needsUpdate = true;
          }
        });

        modelRoot.add(char);
        setModelLoaded(true);
      },
      undefined,
      (err) => console.warn('Cinematic model load error:', err)
    );

    // 8. Render Loop with Spline Interpolation, Organic Micro-Breathing & Pedestal Spread
    let animId;
    const clock = new THREE.Clock();
    const currentCamPos = new THREE.Vector3(0.0, 0.08, 4.40);
    const currentTarget = new THREE.Vector3(0.0, 0.02, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Particle subtle drifting
      if (particles) {
        particles.rotation.y += 0.0004;
      }

      // Calculate camera position and target from scrollProgress
      const p = Math.max(0, Math.min(1, scrollProgressRef.current));
      
      // Calculate Scene 4 Factor (0 outside, smoothly peaks at 1.0 around 0.76)
      let s4 = 0;
      if (p >= 0.58 && p <= 0.92) {
        if (p < 0.72) {
          s4 = (p - 0.58) / (0.72 - 0.58);
        } else if (p > 0.80) {
          s4 = 1 - (p - 0.80) / (0.92 - 0.80);
        } else {
          s4 = 1.0;
        }
        s4 = Math.max(0, Math.min(1, s4));
        s4 = s4 * s4 * (3 - 2 * s4); // smooth cubic ease
      }
      scene4FactorRef.current = s4;

      // Model scaling, centering & foreground depth staging in Scene 4
      if (baseModelScale > 0) {
        const currentModelScale = baseModelScale * THREE.MathUtils.lerp(1.0, 0.65, s4);
        modelRoot.scale.set(currentModelScale, currentModelScale, currentModelScale);
      }

      // Model sits in foreground looking towards certificates behind him, well below pedestals sightlines
      const breathingY = Math.sin(elapsedTime * 1.3) * 0.010;
      modelRoot.position.z = THREE.MathUtils.lerp(0.0, 1.32, s4);
      modelRoot.position.y = THREE.MathUtils.lerp(-0.08, -0.62, s4) + breathingY;
      modelRoot.rotation.z = Math.cos(elapsedTime * 0.9) * 0.004;

      // Pedestals Group Spread Animation (in background behind model)
      if (s4 <= 0.001) {
        pedestalsGroup.visible = false;
        galleryFloor.visible = false;
        stageRigBar.visible = false;
        galaxyField.visible = false;
        museumStanchionsObj.group.visible = false;
        museumStanchionsObj.brassMat.opacity = 0;
        museumStanchionsObj.velvetMat.opacity = 0;
        museumStanchionsObj.postShadowMat.opacity = 0;
        museumWallObj.group.visible = false;
        museumWallObj.wallMat.opacity = 0;
        museumWallObj.trimMat.opacity = 0;
        museumWallObj.inlayMat.opacity = 0;
        museumWallObj.signageMat.opacity = 0;
        wallWashSpot.intensity = 0;
        pedestalNodes.forEach((node) => {
          node.spotLight.intensity = 0;
          node.lampMesh.visible = false;
          node.lampLensMesh.visible = false;
          node.beamMesh.visible = false;
          node.beamMat.opacity = 0;
          node.lampLensMat.opacity = 0;
          node.floorPoolMesh.visible = false;
          node.floorPoolMesh.material.opacity = 0;
          node.shadowMesh.visible = false;
          node.shadowMesh.material.opacity = 0;
        });
      } else {
        pedestalsGroup.visible = true;
        galleryFloor.visible = true;
        galleryFloor.material.opacity = s4 * 0.98;

        stageRigBar.visible = true;
        galaxyField.visible = true;
        galaxyField.material.opacity = s4 * 0.85;
        galaxyField.rotation.y = elapsedTime * 0.006;
        galaxyField.rotation.x = Math.sin(elapsedTime * 0.05) * 0.004;

        // Smooth elevation & fade animation for the museum feature wall & mounted letters
        museumWallObj.group.visible = true;
        museumWallObj.group.position.y = THREE.MathUtils.lerp(-1.60, 0.0, s4);
        museumWallObj.wallMat.opacity = s4 * 0.98;
        museumWallObj.trimMat.opacity = s4 * 0.98;
        museumWallObj.inlayMat.opacity = s4 * 0.98;
        museumWallObj.signageMat.opacity = s4 * 0.98;
        wallWashSpot.intensity = s4 * 5.2;

        // Smooth elevation & fade animation for museum VIP stanchions & velvet ropes
        museumStanchionsObj.group.visible = true;
        museumStanchionsObj.group.position.y = THREE.MathUtils.lerp(-1.20, 0.0, s4);
        museumStanchionsObj.brassMat.opacity = s4;
        museumStanchionsObj.velvetMat.opacity = s4;
        museumStanchionsObj.postShadowMat.opacity = s4 * 0.75;

        pedestalNodes.forEach((node, idx) => {
          // Contracted origin: clustered near center & sunken below floor
          const ox = node.spreadPos.x * 0.16;
          const oy = -2.35;
          const oz = node.spreadPos.z * 0.16;

          const tx = node.spreadPos.x;
          const ty = node.spreadPos.y;
          const tz = node.spreadPos.z;

          const cx = THREE.MathUtils.lerp(ox, tx, s4);
          let cy = THREE.MathUtils.lerp(oy, ty, s4);
          const cz = THREE.MathUtils.lerp(oz, tz, s4);

          // Gentle breathing float when deployed
          if (s4 > 0.85) {
            cy += Math.sin(elapsedTime * 1.5 + idx * 1.1) * 0.006;
          }

          node.group.position.set(cx, cy, cz);
          node.group.scale.setScalar(s4);
          node.group.rotation.y = node.rotY * s4;

          // Dynamically aim the spotlight target right at the certificate frame
          node.spotTarget.position.set(cx, cy + node.plinthHeight + 0.22, cz);
          node.spotTarget.updateMatrixWorld();

          // Spotlight & Ceiling Lamp Fixtures (aimed directly at this pedestal)
          node.spotLight.intensity = s4 * 5.2;
          node.lampMesh.visible = true;
          node.lampLensMesh.visible = true;
          node.lampLensMat.opacity = s4 * 0.98;

          // Volumetric downlight cone beam
          node.beamMesh.visible = true;
          node.beamMat.opacity = s4 * 0.32;

          // Theatrical floor spotlight puddle & plinth contact shadow
          node.floorPoolMesh.visible = true;
          node.floorPoolMesh.position.set(cx, -1.248, cz);
          node.floorPoolMesh.material.opacity = s4 * 0.70;

          node.shadowMesh.visible = true;
          node.shadowMesh.position.set(cx, -1.245, cz);
          node.shadowMesh.rotation.z = -node.rotY * s4;
          node.shadowMesh.material.opacity = s4 * 0.88;
        });
      }

      // Find bounding keyframes
      let k1 = keyframes[0];
      let k2 = keyframes[keyframes.length - 1];
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (p >= keyframes[i].progress && p <= keyframes[i + 1].progress) {
          k1 = keyframes[i];
          k2 = keyframes[i + 1];
          break;
        }
      }

      const segmentT = (p - k1.progress) / (k2.progress - k1.progress || 1);
      const smoothT = segmentT < 0.5 
        ? 2 * segmentT * segmentT 
        : 1 - Math.pow(-2 * segmentT + 2, 2) / 2;

      const targetCamPos = new THREE.Vector3().lerpVectors(k1.camPos, k2.camPos, smoothT);
      const targetLook = new THREE.Vector3().lerpVectors(k1.camTarget, k2.camTarget, smoothT);
      const targetModelRotY = THREE.MathUtils.lerp(k1.modelRotY, k2.modelRotY, smoothT);

      // Dynamic Interleaved Framing
      const targetSideOffset = THREE.MathUtils.lerp(k1.sideOffset, k2.sideOffset, smoothT);
      const isWideScreen = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const responsiveScale = isWideScreen ? 1.0 : (isTablet ? 0.6 : 0.0);

      targetCamPos.x += targetSideOffset * responsiveScale;
      targetLook.x += targetSideOffset * responsiveScale;

      // Mouse parallax
      const mx = mousePosRef.current.x * 0.15;
      const my = mousePosRef.current.y * 0.1;
      targetCamPos.x += mx;
      targetCamPos.y -= my;

      // Smooth camera lerp
      currentCamPos.lerp(targetCamPos, 0.06);
      currentTarget.lerp(targetLook, 0.06);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentTarget);

      // Model rotation
      modelRoot.rotation.y = THREE.MathUtils.lerp(modelRoot.rotation.y, targetModelRotY + mx * 0.3, 0.06);

      // Dynamic light color lerp
      const targetLightIntensity = THREE.MathUtils.lerp(k1.lightIntensity, k2.lightIntensity, smoothT);

      // Dynamic theater spotlight & ambient lerp for Scene 4
      const targetSpotIntensity = THREE.MathUtils.lerp(k1.spotIntensity, k2.spotIntensity, smoothT);
      backRimLight.intensity = targetSpotIntensity * 0.35;

      // Dynamic theater background color lerp
      const targetBg = new THREE.Color().lerpColors(k1.bgColor, k2.bgColor, smoothT);
      scene.background.copy(targetBg);
      if (scene.fog) scene.fog.color.copy(targetBg);

      // Ambient compensation in dark theater: drop ambient to near-zero in Scene 4 for stark theatrical spotlight contrast
      hemiLight.intensity = THREE.MathUtils.lerp(1.4, 0.05, s4);
      fillLight.intensity = THREE.MathUtils.lerp(1.1, 0.03, s4);
      keyLight.intensity = THREE.MathUtils.lerp(targetLightIntensity, 0.02, s4);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || isDisposed) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (renderer?.domElement) {
        renderer.domElement.removeEventListener('click', handleClick);
      }
      document.body.style.cursor = 'default';
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      if (dracoLoader) {
        dracoLoader.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 w-full h-full z-0 bg-[#f8f7f4]"
    >
      {webGlError && (
        <div className="absolute inset-0 bg-radial from-[#ffffff] via-[#f4f2eb] to-[#e8e4dc] opacity-90" />
      )}
    </div>
  );
};

export default CinematicCanvas;
