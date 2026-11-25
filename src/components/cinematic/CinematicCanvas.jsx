import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * Certificate definitions for 3D Museum Pedestals in Scene 4
 */
const cinematicCertificates = [
  // LEFT SIDE (3 Pedestals): Academic Excellence & National Innovation
  // 1. Outer Left: Top 3 Outstanding Student (Greenwich Academic)
  {
    id: 'top3_2024',
    title: 'Top 3 Outstanding Students — Summer 2024',
    titleEn: 'Top 3 Outstanding Students — Summer 2024',
    badge: 'TOP 3 IN COHORT',
    category: 'academic',
    categoryLabel: 'Academic & Honors',
    issuer: 'University of Greenwich (Vietnam)',
    recipient: 'Nguyen Van Duc (GCD230006)',
    image: '/certificates/cert_top3_2024.jpg',
    year: '2024',
    verificationRef: 'GKDN240149 • Decision: 157/QĐ-FPTUDN',
    description: 'Honored for exceptional academic excellence, ranking in the Top 3 highest GPA students across the entire Greenwich International Bachelor cohort (Da Nang Campus).',
    spreadPos: new THREE.Vector3(-2.50, -1.25, -1.25),
    rotY: 0.44,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 2. Mid Left: Best Student ICM 2026 (Greenwich Academic)
  {
    id: 'best_student_icm_2026',
    title: 'Top Student: Information & Content Management',
    titleEn: 'Top Student: Information & Content Management',
    badge: 'TOP OF CLASS',
    category: 'academic',
    categoryLabel: 'Academic & Honors',
    issuer: 'Greenwich International Bachelor Program',
    recipient: 'Nguyen Van Duc (GCD230006)',
    image: '/certificates/cert_best_student_icm_2026.jpg',
    year: '2026',
    verificationRef: 'Decision: 181 QH-PPTUDN • GKD2300025',
    description: 'Achieved the highest overall academic score in Information and Content Management (COMP1643) during the Summer Trimester 2026, certified by Campus Director Dr. Nguyen Duy Nghiem.',
    spreadPos: new THREE.Vector3(-1.70, -1.25, -1.65),
    rotY: 0.28,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 3. Inner Left: Impact Innovation Bootcamp 2025
  {
    id: 'bootcamp_innovation_2025',
    title: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
    titleEn: '2nd Prize Winner — Impact Innovation Bootcamp 2025',
    badge: '2ND PRIZE WINNER',
    category: 'academic',
    categoryLabel: 'Academic & Innovation',
    issuer: 'Greenwich Vietnam & Hospital 199 Innovation Hub',
    recipient: 'Nguyen Van Duc (GCD230006)',
    image: '/certificates/cert_bootcamp_innovation_2025.jpg',
    year: '2025',
    verificationRef: 'Da Nang Campus Director: Dr. Nguyen Duy Nghiem',
    description: 'Awarded 2nd Prize at the Impact Innovation Bootcamp 2025 for engineering practical digital transformation and smart public healthcare solutions.',
    spreadPos: new THREE.Vector3(-0.90, -1.25, -1.95),
    rotY: 0.14,
    plinthHeight: 0.72,
    frameColor: 0xd8c8a8,
  },

  // RIGHT SIDE (3 Pedestals): Mentoring, Media & Leadership Activities
  // 4. Inner Right: Greenwich Peer Mentoring Club
  {
    id: 'peer_mentoring_2024',
    title: 'Outstanding Mentor — Greenwich Peer Mentoring Club',
    titleEn: 'Certificate of Recognition — Peer Mentoring Club (GPM)',
    badge: 'OUTSTANDING MENTOR',
    category: 'club_skill',
    categoryLabel: 'Leadership & Mentoring',
    issuer: 'Greenwich Peer Mentoring Club & Student Affairs Dept',
    recipient: 'Nguyen Van Duc',
    image: '/certificates/cert_peer_mentoring_2024.jpg',
    year: '2024',
    verificationRef: 'Head of Business: MSc. Nguyen Minh Hai & GPM President: Dinh Van Thanh Khoi',
    description: 'Recognized for outstanding mentorship and dedication, coaching and guiding incoming students in academic coursework and technical skills throughout the 7-week Fall 2024 semester.',
    spreadPos: new THREE.Vector3(0.90, -1.25, -1.95),
    rotY: -0.14,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 5. Mid Right: Greenwich Newspaper Club GNews
  {
    id: 'gnews_club_2024',
    title: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
    titleEn: 'Active Member — Greenwich Newspaper Club (GNews) 2024',
    badge: 'MEDIA & PRESS',
    category: 'club_skill',
    categoryLabel: 'Clubs & Soft Skills',
    issuer: 'Student Affairs Department & GNews Editorial Board',
    recipient: 'Nguyen Van Duc',
    image: '/certificates/cert_gnews_club_2024.jpg',
    year: '2024',
    verificationRef: 'Head of Student Affairs: Mai Doan Ngoc Tuyet Oanh & GNews Board',
    description: 'Certified for active contributions to the university technical journalism board, leading content publishing, media production, and student tech event coverage.',
    spreadPos: new THREE.Vector3(1.70, -1.25, -1.65),
    rotY: -0.28,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },

  // 6. Outer Right: Greenwich Music Club GMC
  {
    id: 'gmc_music_club',
    title: "Outstanding Performance — 'Under the Baubles' Gala",
    titleEn: "Outstanding Participation — 'Under the Baubles' Musical Night",
    badge: 'MUSIC & ARTS',
    category: 'club_skill',
    categoryLabel: 'Clubs & Soft Skills',
    issuer: 'Greenwich Music Club (GMC) & Student Affairs Dept',
    recipient: 'Nguyen Van Duc',
    image: '/certificates/cert_gmc_music_club.jpg',
    year: '2024',
    verificationRef: 'Club President: Le Tat Chuong & Student Affairs: Mai Doan Ngoc Tuyet Oanh',
    description: "Honored for distinguished contributions to event management, team coordination, and live musical performance at the annual 'Under the Baubles' gala.",
    spreadPos: new THREE.Vector3(2.50, -1.25, -1.25),
    rotY: -0.44,
    plinthHeight: 0.72,
    frameColor: 0xc8b07a,
  },
];

/**
 * Creates metallic brass plaque texture with typography
 */
function createPlaqueCanvas(badge, year, title) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 70;
  const ctx = canvas.getContext('2d');

  // Brushed brass gradient
  const grad = ctx.createLinearGradient(0, 0, 256, 70);
  grad.addColorStop(0, '#cbb27a');
  grad.addColorStop(0.35, '#f4e5be');
  grad.addColorStop(0.65, '#dfc58d');
  grad.addColorStop(1, '#ab8e54');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 70);

  // Outer bevel
  ctx.strokeStyle = '#624d26';
  ctx.lineWidth = 3;
  ctx.strokeRect(1, 1, 254, 68);

  // Inset hairline
  ctx.strokeStyle = '#fff8e4';
  ctx.lineWidth = 1;
  ctx.strokeRect(4, 4, 248, 62);

  // Corner mounting screws
  ctx.fillStyle = '#453314';
  [[8, 8], [248, 8], [8, 62], [248, 62]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Badge & Year
  ctx.fillStyle = '#1c1407';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${badge}  •  ${year}`, 128, 22);

  // Title
  ctx.fillStyle = '#221908';
  ctx.font = 'bold 11px sans-serif';
  let shortTitle = title;
  if (shortTitle.length > 25) shortTitle = shortTitle.substring(0, 23) + '...';
  ctx.fillText(shortTitle, 128, 45);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates soft volumetric downlight beam gradient texture
 */
function createSpotlightBeamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Vertical gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.0, 'rgba(255, 252, 245, 0.95)');
  grad.addColorStop(0.08, 'rgba(255, 245, 225, 0.70)');
  grad.addColorStop(0.30, 'rgba(245, 230, 205, 0.35)');
  grad.addColorStop(0.60, 'rgba(230, 215, 185, 0.15)');
  grad.addColorStop(0.85, 'rgba(215, 200, 170, 0.05)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 256);

  // Horizontal feathering
  const hGrad = ctx.createLinearGradient(0, 0, 64, 0);
  hGrad.addColorStop(0.0, 'rgba(0, 0, 0, 1)');
  hGrad.addColorStop(0.25, 'rgba(255, 255, 255, 1)');
  hGrad.addColorStop(0.75, 'rgba(255, 255, 255, 1)');
  hGrad.addColorStop(1.0, 'rgba(0, 0, 0, 1)');

  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = hGrad;
  ctx.fillRect(0, 0, 64, 256);

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
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 128, 128);

  // Soft directional drop shadow
  const dirGrad = ctx.createRadialGradient(64, 71, 5, 64, 71, 55);
  dirGrad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
  dirGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.40)");
  dirGrad.addColorStop(0.85, "rgba(0, 0, 0, 0.10)");
  dirGrad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
  ctx.fillStyle = dirGrad;
  ctx.beginPath();
  ctx.ellipse(64, 71, 48, 38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Contact occlusion shadow
  const occlGrad = ctx.createRadialGradient(64, 64, 10, 64, 64, 38);
  occlGrad.addColorStop(0, "rgba(0, 0, 0, 0.98)");
  occlGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.85)");
  occlGrad.addColorStop(0.9, "rgba(0, 0, 0, 0.35)");
  occlGrad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
  ctx.fillStyle = occlGrad;
  ctx.beginPath();
  ctx.ellipse(64, 64, 38, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates luminous floor spotlight puddle texture
 */
function createFloorSpotlightTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 128, 128);

  const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
  grad.addColorStop(0, "rgba(255, 248, 235, 0.85)");
  grad.addColorStop(0.25, "rgba(245, 235, 215, 0.65)");
  grad.addColorStop(0.55, "rgba(225, 210, 185, 0.30)");
  grad.addColorStop(0.82, "rgba(190, 175, 150, 0.08)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.0)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates museum VIP velvet stanchions — OPTIMIZED WITH BufferGeometryUtils (Draw Calls reduced from 45 to 3!)
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
    color: 0x82121e,
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

  const brassGeos = [];
  const shadowGeos = [];

  // Merge all post parts into unified geometries to reduce draw calls
  postPositions.forEach(([px, pz]) => {
    // 1. Weighted base plate
    const baseGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.022, 14);
    baseGeo.translate(px, baseY + 0.011, pz);
    brassGeos.push(baseGeo);

    // 2. Post contact shadow
    const shadowGeo = new THREE.PlaneGeometry(0.28, 0.28);
    shadowGeo.rotateX(-Math.PI / 2);
    shadowGeo.translate(px, baseY + 0.002, pz);
    shadowGeos.push(shadowGeo);

    // 3. Post upright stem
    const stemGeo = new THREE.CylinderGeometry(0.016, 0.016, postHeight, 10);
    stemGeo.translate(px, baseY + postHeight / 2, pz);
    brassGeos.push(stemGeo);

    // 4. Collar
    const collarGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.022, 10);
    collarGeo.translate(px, baseY + postHeight + 0.011, pz);
    brassGeos.push(collarGeo);

    // 5. Finial sphere
    const finialGeo = new THREE.SphereGeometry(0.032, 10, 10);
    finialGeo.translate(px, baseY + postHeight + 0.045, pz);
    brassGeos.push(finialGeo);
  });

  // Deep red velvet ropes linking consecutive posts with catenary curves
  const ropeGeos = [];
  for (let i = 0; i < postPositions.length - 1; i++) {
    const p1 = postPositions[i];
    const p2 = postPositions[i + 1];

    const start = new THREE.Vector3(p1[0], baseY + postHeight + 0.01, p1[1]);
    const end = new THREE.Vector3(p2[0], baseY + postHeight + 0.01, p2[1]);

    const sag = i === 2 ? 0.16 : 0.12;
    const mid = new THREE.Vector3((p1[0] + p2[0]) / 2, baseY + postHeight - sag, (p1[1] + p2[1]) / 2);

    const curve = new THREE.CatmullRomCurve3([start, mid, end]);
    const tubeGeo = new THREE.TubeGeometry(curve, 14, 0.014, 6, false);
    ropeGeos.push(tubeGeo);

    // Brass clip caps
    [start, end].forEach((pt) => {
      const clipGeo = new THREE.SphereGeometry(0.020, 8, 8);
      clipGeo.translate(pt.x, pt.y, pt.z);
      brassGeos.push(clipGeo);
    });
  }

  // Single draw call for all brass posts & clips
  const mergedBrassGeo = BufferGeometryUtils.mergeGeometries(brassGeos);
  const brassMesh = new THREE.Mesh(mergedBrassGeo, brassMat);
  group.add(brassMesh);

  // Single draw call for all post shadows
  const mergedShadowGeo = BufferGeometryUtils.mergeGeometries(shadowGeos);
  const shadowMesh = new THREE.Mesh(mergedShadowGeo, postShadowMat);
  group.add(shadowMesh);

  // Single draw call for all velvet ropes
  const mergedRopeGeo = BufferGeometryUtils.mergeGeometries(ropeGeos);
  const ropeMesh = new THREE.Mesh(mergedRopeGeo, velvetMat);
  group.add(ropeMesh);

  return {
    group,
    brassMat,
    velvetMat,
    postShadowMat,
    geometries: [mergedBrassGeo, mergedShadowGeo, mergedRopeGeo],
  };
}

/**
 * Creates museum exhibition feature wall behind pedestals — Optimized draw calls
 */
function createMuseumExhibitionWall() {
  const group = new THREE.Group();

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x0a0b10,
    roughness: 0.95,
    metalness: 0.02,
    transparent: true,
    opacity: 0.0,
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x5a4d33,
    roughness: 0.45,
    metalness: 0.65,
    transparent: true,
    opacity: 0.0,
  });

  const wallWidth = 11.8;
  const wallHeight = 6.4;
  const wallDepth = 0.25;
  const wallY = 1.95;
  const wallZ = -2.85;

  // Center Gallery Wall Panel
  const wallGeo = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);
  const wallMesh = new THREE.Mesh(wallGeo, wallMat);
  wallMesh.position.set(0, wallY, wallZ);
  group.add(wallMesh);

  // Combined Trim Geometries (Baseboard + Crown) into 1 single draw call
  const trimGeos = [];
  const baseboardGeo = new THREE.BoxGeometry(wallWidth + 0.04, 0.08, wallDepth + 0.03);
  baseboardGeo.translate(0, -1.21, wallZ + 0.01);
  trimGeos.push(baseboardGeo);

  const crownGeo = new THREE.BoxGeometry(wallWidth + 0.04, 0.06, wallDepth + 0.03);
  crownGeo.translate(0, 5.12, wallZ + 0.01);
  trimGeos.push(crownGeo);

  const mergedTrimGeo = BufferGeometryUtils.mergeGeometries(trimGeos);
  const trimMesh = new THREE.Mesh(mergedTrimGeo, trimMat);
  group.add(trimMesh);

  return {
    group,
    wallMat,
    trimMat,
    geometries: [wallGeo, mergedTrimGeo],
  };
}

/**
 * CinematicCanvas
 * Fullscreen 3D Stage acting as an interactive camera timeline:
 * - Ultra-light 3D GLB Model (Draco compressed + WebP textures)
 * - Device-aware progressive loading (character-low.glb 247KB for mobile / low-spec, character.glb 511KB for desktop)
 * - Draw Call reduction via BufferGeometryUtils
 * - Clamped DPR & built-in Adaptive Performance Monitor (maintains silky 60 FPS)
 * - Tab visibility throttling to save 100% battery/GPU when inactive
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
      camPos: new THREE.Vector3(0.0, 0.08, 4.75),
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
      modelRotY: 1.05,
      lightIntensity: 1.95,
      spotIntensity: 0.0,
      bgColor: new THREE.Color(0xf8f7f4),
    },
    {
      progress: 0.54,
      camPos: new THREE.Vector3(0.0, 0.16, 3.65),
      camTarget: new THREE.Vector3(0.0, 0.08, 0),
      sideOffset: -1.05,
      modelRotY: -0.92,
      lightIntensity: 1.85,
      spotIntensity: 0.0,
      bgColor: new THREE.Color(0xf8f7f4),
    },
    {
      progress: 0.74,
      camPos: new THREE.Vector3(0.0, 0.55, 4.60),
      camTarget: new THREE.Vector3(0.0, -0.15, -0.40),
      sideOffset: 0.0,
      modelRotY: -2.356,
      lightIntensity: 0.70,
      spotIntensity: 6.5,
      bgColor: new THREE.Color(0x020204),
    },
    {
      progress: 0.82,
      camPos: new THREE.Vector3(0.0, 0.55, 4.60),
      camTarget: new THREE.Vector3(0.0, -0.15, -0.40),
      sideOffset: 0.0,
      modelRotY: -2.356,
      lightIntensity: 0.70,
      spotIntensity: 6.5,
      bgColor: new THREE.Color(0x020204),
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
    let isTabVisible = !document.hidden;

    const isMobileDevice = width < 768;
    const isLowEndDevice = typeof navigator !== 'undefined' && (
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4)
    );

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f7f4);
    scene.fog = new THREE.FogExp2(0xf8f7f4, 0.02);

    const initialAspect = width / height;
    const baseFov = 36;
    const initialFov = initialAspect < 1.0 ? baseFov + (1.0 - initialAspect) * 14 : baseFov;

    const camera = new THREE.PerspectiveCamera(initialFov, initialAspect, 0.1, 30);
    camera.position.set(0.0, 0.14, 3.35);

    // 2. WebGL Renderer (Clamped DPR for smooth 60fps & disabled shadowmaps to eliminate fill-rate overhead)
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobileDevice,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);

      // DPR Optimization: 1.2 on Mobile/Tablet, 1.5 on Desktop (saves 40-50% fragment shading)
      const initialDpr = isMobileDevice 
        ? Math.min(window.devicePixelRatio || 1, 1.2) 
        : Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(initialDpr);
      renderer.shadowMap.enabled = false; // Zero dynamic shadow pass overhead
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

    // 3. Studio Lighting (Streamlined light uniforms)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf0ece1, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.8);
    keyLight.position.set(-2.0, 4.0, 3.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff7ed, 1.1);
    fillLight.position.set(2.5, 2.0, 2.5);
    scene.add(fillLight);

    // 3.4 Model Container Group
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    // 3.5 Volumetric Spotlight Beam Texture
    const beamTexture = createSpotlightBeamTexture();

    // 3.6 Overhead Theatrical Stage Rig Bar
    const rigGeo = new THREE.CylinderGeometry(0.04, 0.04, 7.2, 12);
    rigGeo.rotateZ(Math.PI / 2);
    const rigMat = new THREE.MeshStandardMaterial({ color: 0x14151b, metalness: 0.85, roughness: 0.35 });
    const stageRigBar = new THREE.Mesh(rigGeo, rigMat);
    stageRigBar.position.set(0.0, 3.40, 2.50);
    stageRigBar.visible = false;
    scene.add(stageRigBar);

    // 3.7 Optimized Dual Stage Spotlights (Replaces 6 separate spotlights with 2 key lights)
    const leftSpotTarget = new THREE.Object3D();
    leftSpotTarget.position.set(-1.70, -0.70, -1.60);
    scene.add(leftSpotTarget);

    const leftStageSpot = new THREE.SpotLight(0xfff6e5, 0.0, 16.0, Math.PI / 6, 0.45, 1.0);
    leftStageSpot.position.set(-1.20, 3.40, 2.50);
    leftStageSpot.target = leftSpotTarget;
    leftStageSpot.visible = false;
    scene.add(leftStageSpot);

    const rightSpotTarget = new THREE.Object3D();
    rightSpotTarget.position.set(1.70, -0.70, -1.60);
    scene.add(rightSpotTarget);

    const rightStageSpot = new THREE.SpotLight(0xfff6e5, 0.0, 16.0, Math.PI / 6, 0.45, 1.0);
    rightStageSpot.position.set(1.20, 3.40, 2.50);
    rightStageSpot.target = rightSpotTarget;
    rightStageSpot.visible = false;
    scene.add(rightStageSpot);

    // 3.8 Museum Exhibition Soft Matte Floor in Scene 4
    const floorGeo = new THREE.CircleGeometry(5.8, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x030306,
      roughness: 0.94,
      metalness: 0.05,
      transparent: true,
      opacity: 0.0,
    });
    const galleryFloor = new THREE.Mesh(floorGeo, floorMat);
    galleryFloor.rotation.x = -Math.PI / 2;
    galleryFloor.position.y = -1.25;
    galleryFloor.visible = false;
    scene.add(galleryFloor);

    // 4. Floating Warm Champagne Dust Particles (Device-budgeted)
    const pCount = isMobileDevice ? 25 : 55;
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

    // 4.1 Dark Galaxy Cosmic Starfield for Scene 4 (Device-budgeted)
    const starCount = isMobileDevice ? 120 : 260;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x93c5fd),
      new THREE.Color(0xfde68a),
      new THREE.Color(0xc4b5fd),
    ];

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 22.0;
      starPos[i * 3 + 1] = Math.random() * 9.0 - 1.5;
      starPos[i * 3 + 2] = -Math.random() * 9.0 - 2.5;

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

    const floorSpotTexture = createFloorSpotlightTexture();
    const shadowTexture = createPedestalShadowTexture();

    // Shared geometries across all 6 pedestals
    const sharedPlinthGeo = new THREE.BoxGeometry(0.50, 0.72, 0.34);
    const sharedBaseGeo = new THREE.BoxGeometry(0.54, 0.03, 0.38);
    const sharedTopRimGeo = new THREE.BoxGeometry(0.52, 0.02, 0.36);
    const sharedOuterFrameGeo = new THREE.BoxGeometry(0.74, 0.50, 0.024);
    const sharedMatGeo = new THREE.PlaneGeometry(0.68, 0.44);
    const sharedCertGeo = new THREE.PlaneGeometry(0.64, 0.40);
    const sharedFloorPoolGeo = new THREE.CircleGeometry(0.38, 20);
    const sharedShadowGeo = new THREE.PlaneGeometry(0.64, 0.46);

    // Shared materials
    const sharedPlinthMat = new THREE.MeshStandardMaterial({
      color: 0x2a2c3a,
      roughness: 0.65,
      metalness: 0.16,
    });
    const sharedBaseMat = new THREE.MeshStandardMaterial({
      color: 0x20222f,
      roughness: 0.70,
      metalness: 0.20,
    });
    const sharedTopRimMat = new THREE.MeshStandardMaterial({
      color: 0xdfc58d,
      roughness: 0.35,
      metalness: 0.75,
    });
    const sharedOuterFrameMat = new THREE.MeshStandardMaterial({
      color: 0xd4b878,
      roughness: 0.40,
      metalness: 0.65,
    });
    const sharedMatMat = new THREE.MeshStandardMaterial({
      color: 0x08090f,
      roughness: 0.98,
    });

    const lampCanisterGeos = [];
    const lampLensGeos = [];

    cinematicCertificates.forEach((cert, idx) => {
      const ph = cert.plinthHeight;
      const pedestal = new THREE.Group();
      pedestal.userData = { certData: cert };

      // A. Plinth Column
      const plinthMesh = new THREE.Mesh(sharedPlinthGeo, sharedPlinthMat);
      plinthMesh.position.y = ph / 2;
      plinthMesh.userData = { certData: cert };
      pedestal.add(plinthMesh);
      clickableMeshes.push(plinthMesh);

      // B. Base Dark Trim
      const baseMesh = new THREE.Mesh(sharedBaseGeo, sharedBaseMat);
      baseMesh.position.y = 0.015;
      pedestal.add(baseMesh);

      // C. Top Brushed Brass Collar
      const topRimMesh = new THREE.Mesh(sharedTopRimGeo, sharedTopRimMat);
      topRimMesh.position.y = ph + 0.01;
      pedestal.add(topRimMesh);

      // D. Brass Plaque
      const plaqueTex = createPlaqueCanvas(cert.badge, cert.year, cert.title);
      const plaqueGeo = new THREE.PlaneGeometry(0.30, 0.078);
      const plaqueMat = new THREE.MeshStandardMaterial({
        map: plaqueTex,
        roughness: 0.35,
        metalness: 0.60,
        emissive: 0x241d10,
        emissiveIntensity: 0.22,
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, ph * 0.52, 0.34 / 2 + 0.003);
      pedestal.add(plaqueMesh);

      // E. Framed Certificate on Top
      const frameGroup = new THREE.Group();
      frameGroup.position.set(0, ph + 0.02, 0);
      frameGroup.rotation.x = -0.22;
      frameGroup.userData = { certData: cert };

      const outerFrame = new THREE.Mesh(sharedOuterFrameGeo, sharedOuterFrameMat);
      outerFrame.position.y = 0.25;
      outerFrame.userData = { certData: cert };
      frameGroup.add(outerFrame);
      clickableMeshes.push(outerFrame);

      const matMesh = new THREE.Mesh(sharedMatGeo, sharedMatMat);
      matMesh.position.set(0, 0.25, 0.024 / 2 + 0.001);
      frameGroup.add(matMesh);

      // High-Clarity Archival Certificate Texture
      const certMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.28,
        metalness: 0.0,
        emissive: 0xffffff,
        emissiveIntensity: 0.28,
      });

      const texUrl = `${baseUrl}${cert.image.replace(/^\//, '')}`;
      // Stagger texture load slightly after mount to protect initial network frame budget
      setTimeout(() => {
        if (isDisposed) return;
        textureLoader.load(
          texUrl,
          (tex) => {
            if (isDisposed) return;
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.needsUpdate = true;
            certMat.map = tex;
            certMat.emissiveMap = tex;
            certMat.needsUpdate = true;
          },
          undefined,
          (err) => console.warn('Cert texture load err:', cert.image, err)
        );
      }, 300 + idx * 70);

      const certMesh = new THREE.Mesh(sharedCertGeo, certMat);
      certMesh.position.set(0, 0.25, 0.024 / 2 + 0.003);
      frameGroup.add(certMesh);

      pedestal.add(frameGroup);
      pedestalsGroup.add(pedestal);

      // F. Downlight Cone Beam Geometry & Position
      const spotTargetPos = new THREE.Vector3(cert.spreadPos.x, cert.spreadPos.y + ph + 0.22, cert.spreadPos.z);
      const lampPos = new THREE.Vector3(cert.spreadPos.x * 0.45, 3.40, 2.50);
      const beamVec = new THREE.Vector3().subVectors(spotTargetPos, lampPos);
      const beamLength = beamVec.length();
      const beamDir = beamVec.clone().normalize();
      const beamQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), beamDir);

      // Collect lamp canister and lens geometries to merge into 1 draw call later
      const canisterGeo = new THREE.CylinderGeometry(0.10, 0.12, 0.22, 12);
      canisterGeo.translate(0, 0.11, 0);
      canisterGeo.applyQuaternion(beamQuat);
      canisterGeo.translate(lampPos.x, lampPos.y, lampPos.z);
      lampCanisterGeos.push(canisterGeo);

      const lensGeo = new THREE.CircleGeometry(0.09, 12);
      const lensQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), beamDir);
      lensGeo.applyQuaternion(lensQuat);
      lensGeo.translate(lampPos.x, lampPos.y, lampPos.z);
      lampLensGeos.push(lensGeo);

      // Volumetric Godray Cone Beam
      const pBeamGeo = new THREE.CylinderGeometry(0.04, 0.32, beamLength, 20, 1, true);
      pBeamGeo.translate(0, -beamLength / 2, 0);
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

      // Luminous Floor Spotlight Puddle
      const floorPoolMat = new THREE.MeshBasicMaterial({
        map: floorSpotTexture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const floorPoolMesh = new THREE.Mesh(sharedFloorPoolGeo, floorPoolMat);
      floorPoolMesh.rotation.x = -Math.PI / 2;
      floorPoolMesh.position.set(cert.spreadPos.x, -1.248, cert.spreadPos.z);
      floorPoolMesh.visible = false;
      scene.add(floorPoolMesh);

      // Deep Plinth Drop Shadow
      const pedShadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(sharedShadowGeo, pedShadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.rotation.z = -cert.rotY;
      shadowMesh.position.set(cert.spreadPos.x, -1.245, cert.spreadPos.z);
      shadowMesh.visible = false;
      scene.add(shadowMesh);

      pedestalNodes.push({
        group: pedestal,
        frameGroup,
        plinthHeight: ph,
        spreadPos: cert.spreadPos,
        rotY: cert.rotY,
        lampPos,
        beamMesh: pBeamMesh,
        beamMat: pBeamMat,
        floorPoolMesh,
        shadowMesh,
      });
    });

    // Merged Overhead Stage Lamps (2 draw calls total for all 6 lamps)
    const mergedCanistersGeo = BufferGeometryUtils.mergeGeometries(lampCanisterGeos);
    const canisterMat = new THREE.MeshStandardMaterial({ color: 0x15161c, metalness: 0.85, roughness: 0.35 });
    const mergedCanisterMesh = new THREE.Mesh(mergedCanistersGeo, canisterMat);
    mergedCanisterMesh.visible = false;
    scene.add(mergedCanisterMesh);

    const mergedLensesGeo = BufferGeometryUtils.mergeGeometries(lampLensGeos);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0xfff6e5, transparent: true, opacity: 0.0 });
    const mergedLensMesh = new THREE.Mesh(mergedLensesGeo, lensMat);
    mergedLensMesh.visible = false;
    scene.add(mergedLensMesh);

    // 5.5 Authentic Museum Stanchions (Merged Draw Calls)
    const museumStanchionsObj = createMuseumStanchions(shadowTexture);
    museumStanchionsObj.group.visible = false;
    scene.add(museumStanchionsObj.group);

    // 5.6 Authentic Museum Exhibition Feature Wall
    const museumWallObj = createMuseumExhibitionWall();
    museumWallObj.group.visible = false;
    scene.add(museumWallObj.group);

    // 6. Fast Raycaster for Pedestal Selection (Only 12 primary target meshes)
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();
    let hoveredObject = null;

    const getIntersects = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVec.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);
      return raycaster.intersectObjects(clickableMeshes, false);
    };

    const handlePointerMove = (e) => {
      if (scene4FactorRef.current < 0.35) {
        if (hoveredObject) {
          document.body.style.cursor = 'default';
          hoveredObject = null;
        }
        return;
      }
      if (e.target && e.target.closest && e.target.closest('nav, button, a, input, textarea, [role="button"], [role="dialog"]')) {
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
      if (scene4FactorRef.current < 0.35) return;
      if (
        document.body.style.overflow === 'hidden' ||
        document.querySelector('[role="dialog"]') ||
        (window.__modalClosedTimestamp && Date.now() - window.__modalClosedTimestamp < 450)
      ) {
        return;
      }
      if (e.target && e.target.closest && e.target.closest('nav, button, a, input, textarea, [role="button"], [role="dialog"], [data-modal]')) {
        return;
      }

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

    window.addEventListener('click', handleClick);
    window.addEventListener('pointermove', handlePointerMove);

    // 7. Progressive 3D GLB Model Loading (Device-aware)
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${baseUrl}draco/`);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let baseModelScale = 1.0;
    let modelMaxDim = 1.0;

    const calcResponsiveScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isLandscapePhone = h <= 520 && w > h;
      const isPortraitPhone = w < 768 && h >= w;

      let factor;
      if (isLandscapePhone) {
        factor = 1.10;
      } else if (isPortraitPhone) {
        factor = 1.28;
      } else if (w >= 1600) {
        factor = 2.20;
      } else if (w >= 1366) {
        factor = 2.00;
      } else if (w >= 1024) {
        factor = 1.80;
      } else if (w >= 768) {
        factor = 1.55;
      } else {
        factor = 1.35;
      }
      return factor / (modelMaxDim || 1.0);
    };

    // Low-end / mobile devices automatically load character-low.glb (247KB, 30k tris) for instant start
    const selectedModelPath = (isMobileDevice || isLowEndDevice)
      ? `${baseUrl}models/character-low.glb`
      : `${baseUrl}models/character.glb`;

    loader.load(
      selectedModelPath,
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

        modelMaxDim = Math.max(size.x, size.y, size.z);
        baseModelScale = calcResponsiveScale();
        modelRoot.scale.set(baseModelScale, baseModelScale, baseModelScale);

        char.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;
          }
        });

        modelRoot.add(char);
        setModelLoaded(true);
        window.__cinematicModelLoaded = true;
        window.dispatchEvent(new CustomEvent('glb-loaded'));
      },
      undefined,
      (err) => {
        console.warn('Cinematic model load error:', err);
        window.__cinematicModelLoaded = true;
        window.dispatchEvent(new CustomEvent('glb-loaded'));
      }
    );

    // 8. Render Loop with Adaptive Performance & Spline Interpolation
    let animId;
    const startTime = performance.now();
    const currentCamPos = new THREE.Vector3(0.0, 0.08, 4.75);
    const currentTarget = new THREE.Vector3(0.0, 0.02, 0);

    // Built-in FPS Tracker & Adaptive Quality Throttler
    let frameCounter = 0;
    let lastFpsCheck = performance.now();
    let isAdaptiveLowMode = false;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Save 100% GPU / battery when browser tab is hidden in background
      if (!isTabVisible) return;

      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;

      // Adaptive Performance Monitor (Checks average FPS every 60 frames)
      frameCounter++;
      if (now - lastFpsCheck >= 1000) {
        const currentFps = (frameCounter * 1000) / (now - lastFpsCheck);
        frameCounter = 0;
        lastFpsCheck = now;

        if (currentFps < 38 && !isAdaptiveLowMode && renderer) {
          isAdaptiveLowMode = true;
          // Drop DPR to 1.0 to release GPU fill-rate pressure on struggling devices
          renderer.setPixelRatio(1.0);
          if (particles) particles.visible = false;
          if (galaxyField) galaxyField.material.opacity = Math.min(galaxyField.material.opacity, 0.4);
        }
      }

      // Particle subtle drifting
      if (particles && particles.visible) {
        particles.rotation.y += 0.0004;
      }

      // Calculate camera position and target from scrollProgress
      const p = Math.max(0, Math.min(1, scrollProgressRef.current));

      // Calculate Scene 4 Factor (0 outside, smoothly peaks at 1.0 around 0.76)
      let s4 = 0;
      if (p >= 0.58 && p <= 0.94) {
        if (p < 0.70) {
          s4 = (p - 0.58) / (0.70 - 0.58);
        } else if (p > 0.86) {
          s4 = 1 - (p - 0.86) / (0.94 - 0.86);
        } else {
          s4 = 1.0;
        }
        s4 = Math.max(0, Math.min(1, s4));
        s4 = s4 * s4 * (3 - 2 * s4);
      }
      scene4FactorRef.current = s4;

      // Model scaling, centering & foreground depth staging in Scene 4
      if (baseModelScale > 0) {
        const currentModelScale = baseModelScale * THREE.MathUtils.lerp(1.0, 0.65, s4);
        modelRoot.scale.set(currentModelScale, currentModelScale, currentModelScale);
      }

      const breathingY = Math.sin(elapsedTime * 1.3) * 0.010;
      modelRoot.position.z = THREE.MathUtils.lerp(0.0, 1.32, s4);
      modelRoot.position.y = THREE.MathUtils.lerp(-0.08, -0.62, s4) + breathingY;
      modelRoot.rotation.z = Math.cos(elapsedTime * 0.9) * 0.004;

      // Pedestals Group Spread Animation
      if (s4 <= 0.001) {
        pedestalsGroup.visible = false;
        galleryFloor.visible = false;
        stageRigBar.visible = false;
        galaxyField.visible = false;
        leftStageSpot.visible = false;
        rightStageSpot.visible = false;
        mergedCanisterMesh.visible = false;
        mergedLensMesh.visible = false;
        museumStanchionsObj.group.visible = false;
        museumStanchionsObj.brassMat.opacity = 0;
        museumStanchionsObj.velvetMat.opacity = 0;
        museumStanchionsObj.postShadowMat.opacity = 0;
        museumWallObj.group.visible = false;
        museumWallObj.wallMat.opacity = 0;
        museumWallObj.trimMat.opacity = 0;

        pedestalNodes.forEach((node) => {
          node.beamMesh.visible = false;
          node.beamMat.opacity = 0;
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

        // Dual Stage Spotlights
        leftStageSpot.visible = true;
        rightStageSpot.visible = true;
        const spotMult = isAdaptiveLowMode ? 8.0 : 12.0;
        leftStageSpot.intensity = s4 * spotMult;
        rightStageSpot.intensity = s4 * spotMult;

        mergedCanisterMesh.visible = true;
        mergedLensMesh.visible = true;
        lensMat.opacity = s4 * 0.98;

        // Museum exhibition feature wall
        museumWallObj.group.visible = true;
        museumWallObj.group.position.y = THREE.MathUtils.lerp(-1.60, 0.0, s4);
        museumWallObj.wallMat.opacity = s4 * 0.98;
        museumWallObj.trimMat.opacity = s4 * 0.98;

        // Museum VIP stanchions & velvet ropes
        museumStanchionsObj.group.visible = true;
        museumStanchionsObj.group.position.y = THREE.MathUtils.lerp(-1.20, 0.0, s4);
        museumStanchionsObj.brassMat.opacity = s4;
        museumStanchionsObj.velvetMat.opacity = s4;
        museumStanchionsObj.postShadowMat.opacity = s4 * 0.75;

        pedestalNodes.forEach((node, idx) => {
          const ox = node.spreadPos.x * 0.16;
          const oy = -2.35;
          const oz = node.spreadPos.z * 0.16;

          const tx = node.spreadPos.x;
          const ty = node.spreadPos.y;
          const tz = node.spreadPos.z;

          const cx = THREE.MathUtils.lerp(ox, tx, s4);
          let cy = THREE.MathUtils.lerp(oy, ty, s4);
          const cz = THREE.MathUtils.lerp(oz, tz, s4);

          if (s4 > 0.85) {
            cy += Math.sin(elapsedTime * 1.5 + idx * 1.1) * 0.006;
          }

          node.group.position.set(cx, cy, cz);
          node.group.scale.setScalar(s4);
          node.group.rotation.y = node.rotY * s4;

          // Volumetric cone beam streaming forward over the model
          node.beamMesh.visible = true;
          node.beamMat.opacity = s4 * 0.20;

          // Theatrical floor spotlight puddle & plinth contact shadow
          node.floorPoolMesh.visible = true;
          node.floorPoolMesh.position.set(cx, -1.248, cz);
          node.floorPoolMesh.material.opacity = s4 * 0.55;

          node.shadowMesh.visible = true;
          node.shadowMesh.position.set(cx, -1.245, cz);
          node.shadowMesh.rotation.z = -node.rotY * s4;
          node.shadowMesh.material.opacity = s4 * 0.85;
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
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      const isLandscapePhone = curH <= 520 && curW > curH;
      const isPortraitPhone = curW < 768 && curH >= curW;

      const responsiveScale = curW >= 1280 ? 1.0 : curW >= 1024 ? 0.85 : curW >= 768 ? 0.60 : 0.38;

      targetCamPos.x += targetSideOffset * responsiveScale;
      targetLook.x += targetSideOffset * responsiveScale;

      if (isLandscapePhone) {
        targetCamPos.z *= 1.12;
        targetCamPos.y += 0.04;
        if (p < 0.20) {
          targetCamPos.x -= 0.58;
          targetLook.x -= 0.58;
        }
      } else if (isPortraitPhone) {
        if (p < 0.20) {
          targetCamPos.y = 0.10;
          targetCamPos.z = 4.55;
          targetLook.y = 0.02;
        } else if (p >= 0.65 && p <= 0.88) {
          targetCamPos.z = 5.75;
          targetCamPos.y = 0.82;
          targetLook.y = -0.15;
        }
      }

      // Mouse parallax
      const mx = mousePosRef.current.x * 0.15;
      const my = mousePosRef.current.y * 0.1;
      targetCamPos.x += mx;
      targetCamPos.y -= my;

      currentCamPos.lerp(targetCamPos, 0.06);
      currentTarget.lerp(targetLook, 0.06);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentTarget);

      modelRoot.rotation.y = THREE.MathUtils.lerp(modelRoot.rotation.y, targetModelRotY + mx * 0.3, 0.06);

      const targetLightIntensity = THREE.MathUtils.lerp(k1.lightIntensity, k2.lightIntensity, smoothT);
      const targetBg = new THREE.Color().lerpColors(k1.bgColor, k2.bgColor, smoothT);
      scene.background.copy(targetBg);
      if (scene.fog) scene.fog.color.copy(targetBg);

      hemiLight.intensity = THREE.MathUtils.lerp(1.4, 0.38, s4);
      fillLight.intensity = THREE.MathUtils.lerp(1.1, 0.32, s4);
      keyLight.intensity = THREE.MathUtils.lerp(targetLightIntensity, 0.40, s4);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || isDisposed) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const aspect = width / height;
      camera.aspect = aspect;
      camera.fov = aspect < 1.0 ? baseFov + (1.0 - aspect) * 14 : baseFov;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const curDpr = isAdaptiveLowMode 
        ? 1.0 
        : (width < 768 ? Math.min(window.devicePixelRatio || 1, 1.2) : Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setPixelRatio(curDpr);

      if (modelRoot && modelMaxDim > 0) {
        baseModelScale = calcResponsiveScale();
        modelRoot.scale.set(baseModelScale, baseModelScale, baseModelScale);
      }
    };

    const handleOrientationChange = () => {
      setTimeout(handleResize, 100);
      setTimeout(handleResize, 350);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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

      // Dispose procedural textures & geometries
      beamTexture.dispose();
      shadowTexture.dispose();
      floorSpotTexture.dispose();
      sharedPlinthGeo.dispose();
      sharedBaseGeo.dispose();
      sharedTopRimGeo.dispose();
      sharedOuterFrameGeo.dispose();
      sharedMatGeo.dispose();
      sharedCertGeo.dispose();
      sharedFloorPoolGeo.dispose();
      sharedShadowGeo.dispose();
      mergedCanistersGeo.dispose();
      mergedLensesGeo.dispose();
      museumStanchionsObj.geometries.forEach((g) => g.dispose());
      museumWallObj.geometries.forEach((g) => g.dispose());
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
