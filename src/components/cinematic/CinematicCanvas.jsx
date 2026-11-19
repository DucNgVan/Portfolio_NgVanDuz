import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/**
 * CinematicCanvas
 * Fullscreen 3D Stage acting as an interactive camera timeline:
 * - Interpolates camera position, target, rotation, and lighting based on scrollProgress (0 to 1)
 * - Loads the model /models/character-cinematic.glb with Draco decoding
 * - Adds floating cyber dust particles and dynamic cinematic rim lighting
 */
export const CinematicCanvas = ({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) => {
  const mountRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [webGlError, setWebGlError] = useState(false);

  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const mousePosRef = useRef(mousePos);
  mousePosRef.current = mousePos;

  // Cinematic keyframes for camera & model across 5 scenes:
  // Scene 1: Model centered with text on two sides (desired roles on right)
  // Scene 2..5: Model glides left & right, zooms in & out, while UI elements interleave symmetrically!
  const keyframes = [
    {
      progress: 0.0,
      camPos: new THREE.Vector3(0.0, 0.08, 4.40), // Pull camera back so model fits comfortably in the central corridor
      camTarget: new THREE.Vector3(0.0, 0.02, 0),
      sideOffset: 0.0, // Model dead-centered in the open central corridor
      modelRotY: 0.0,
      lightIntensity: 1.85,
    },
    {
      progress: 0.30,
      camPos: new THREE.Vector3(0.0, 0.08, 3.55), // Pulled back so model is smaller and leaves plenty of space for UI
      camTarget: new THREE.Vector3(0.0, 0.10, 0.05),
      sideOffset: 0.88, // Model cleanly on LEFT with wide separation from UI
      modelRotY: 0.14, // Model turns gently towards right cards
      lightIntensity: 1.95,
    },
    {
      progress: 0.54,
      camPos: new THREE.Vector3(0.0, 0.16, 3.65), // ZOOM OUT for wide heroic project stage!
      camTarget: new THREE.Vector3(0.0, 0.08, 0),
      sideOffset: -0.80, // Model on RIGHT, UI on LEFT!
      modelRotY: -0.14,
      lightIntensity: 1.85,
    },
    {
      progress: 0.76,
      camPos: new THREE.Vector3(0.0, 0.10, 2.95), // MEDIUM ZOOM for Honors!
      camTarget: new THREE.Vector3(0.0, 0.10, 0),
      sideOffset: 0.76, // Model on LEFT, UI on RIGHT!
      modelRotY: 0.10,
      lightIntensity: 2.0,
    },
    {
      progress: 1.0,
      camPos: new THREE.Vector3(0.0, 0.16, 3.45), // Balanced Finish
      camTarget: new THREE.Vector3(0.0, 0.08, 0),
      sideOffset: -0.75, // Model on RIGHT, UI on LEFT!
      modelRotY: -0.08,
      lightIntensity: 1.8,
    },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isDisposed = false;

    // 1. Bright Artistic Scene & Camera
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
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL is not available or disabled on this device:', err);
      setWebGlError(true);
      return () => {
        isDisposed = true;
      };
    }

    // 3. Bright Soft Studio Portrait Lighting (Artistic, Flattering, Natural)
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

    // 4. Floating Warm Champagne Dust Particles (Daylight Gallery Motes)
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

    // 5. Model Container Group
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    // 6. Load /models/character-cinematic.glb with Draco
    const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${baseUrl}draco/`);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

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
        const scale = 2.45 / maxDim;
        modelRoot.scale.set(scale, scale, scale);

        char.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.side = THREE.FrontSide;
            // Soft matte finish eliminates harsh plastic / uncanny valley glare:
            child.material.roughness = 0.72;
            child.material.metalness = 0.04;
            child.material.needsUpdate = true;
          }
        });

        modelRoot.add(char);
        setModelLoaded(true);
      },
      undefined,
      (err) => console.warn('Cinematic model load error:', err)
    );

    // 7. Render Loop with Spline Interpolation & Organic Micro-Breathing
    let animId;
    const clock = new THREE.Clock();
    const currentCamPos = new THREE.Vector3(0.0, 0.08, 4.40);
    const currentTarget = new THREE.Vector3(0.0, 0.02, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Organic subtle breathing float (gentle, artistic, natural human presence)
      modelRoot.position.y = Math.sin(elapsedTime * 1.3) * 0.012;
      modelRoot.rotation.z = Math.cos(elapsedTime * 0.9) * 0.004;

      // Particle subtle drifting
      if (particles) {
        particles.rotation.y += 0.0004;
      }

      // Calculate camera position and target from scrollProgress
      const p = Math.max(0, Math.min(1, scrollProgressRef.current));
      
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
      // Smooth cubic ease in out
      const smoothT = segmentT < 0.5 
        ? 2 * segmentT * segmentT 
        : 1 - Math.pow(-2 * segmentT + 2, 2) / 2;

      const targetCamPos = new THREE.Vector3().lerpVectors(k1.camPos, k2.camPos, smoothT);
      const targetLook = new THREE.Vector3().lerpVectors(k1.camTarget, k2.camTarget, smoothT);
      const targetModelRotY = THREE.MathUtils.lerp(k1.modelRotY, k2.modelRotY, smoothT);

      // Dynamic Interleaved Framing: Model glides left & right and zooms in & out across scenes
      const targetSideOffset = THREE.MathUtils.lerp(k1.sideOffset, k2.sideOffset, smoothT);
      const isWideScreen = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const responsiveScale = isWideScreen ? 1.0 : (isTablet ? 0.6 : 0.0);

      targetCamPos.x += targetSideOffset * responsiveScale;
      targetLook.x += targetSideOffset * responsiveScale;

      // Add mouse parallax
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
      keyLight.intensity = targetLightIntensity;

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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#f8f7f4]"
    >
      {webGlError && (
        <div className="absolute inset-0 bg-radial from-[#ffffff] via-[#f4f2eb] to-[#e8e4dc] opacity-90" />
      )}
    </div>
  );
};

export default CinematicCanvas;
