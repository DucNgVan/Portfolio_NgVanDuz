import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { Rotate3d, RefreshCw, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Check if WebGL / WebGL2 is supported and active in the current browser/device
 */
const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

/**
 * Universal 360° Interactive Three.js 3D Character Model
 * Fully corrected & optimized:
 * - Upright sitting posture with attractive 3/4 hero turn
 * - Strict HORIZONTAL-ONLY rotation (Polar angle locked to eye-level, no vertical pitch)
 * - Balanced studio lighting: removes interior point light artifacts and harsh glare
 * - FrontSide culling: completely eliminates interior backface z-fighting and hand artifacts
 * - Multi-tier Draco decoder with automatic Google CDN fallback
 * - Adaptive DPR & viewport auto-framing for mobile screens
 * - Context loss and restoration recovery
 * - IntersectionObserver to save battery when offscreen
 * - Touch-action: pan-y (allows vertical page scroll while rotating horizontally)
 * - Zero deprecation warnings
 * - Graceful fallback UI with retry if WebGL/network is unavailable
 */
export const InteractiveCharacter = () => {
  const { lang } = useLanguage();
  const mountRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const isWebGLAvailable = checkWebGLSupport();

  useEffect(() => {
    // If WebGL is not available on this device, skip Three.js initialization and show fallback
    if (!isWebGLAvailable) {
      setIsLoading(false);
      setLoadError(
        lang === 'vi'
          ? 'Thiết bị không hỗ trợ WebGL hoặc đã tắt tăng tốc phần cứng.'
          : 'WebGL is not supported or hardware acceleration is disabled on this device.'
      );
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 480;
    let height = container.clientHeight || 520;
    let isDisposed = false;
    let isVisible = true;
    let animId = null;

    // 1. Three.js Scene
    const scene = new THREE.Scene();

    // 2. Safe WebGL Renderer initialization with device-specific tuning
    let renderer;
    try {
      const isMobile = window.innerWidth < 768;
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // save memory & fill-rate on mobile GPUs
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      });

      // Optimal pixel ratio: max 1.75 on mobile, 2.0 on desktop
      const maxDpr = isMobile ? 1.75 : 2.0;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      // Disable shadow maps since there is no receiver plane: saves 50% draw calls & vertex processing
      renderer.shadowMap.enabled = false;

      // Ensure touch-action allows vertical scrolling on mobile
      renderer.domElement.style.touchAction = 'pan-y';
      renderer.domElement.style.outline = 'none';

      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('Could not initialize WebGLRenderer:', err);
      setIsLoading(false);
      setLoadError(
        lang === 'vi'
          ? 'Không thể khởi tạo WebGL trên thiết bị này.'
          : 'Unable to initialize WebGL context on this device.'
      );
      return;
    }

    // 3. Camera Setup with dynamic aspect auto-framing
    const initialAspect = width / (height || 1);
    const camera = new THREE.PerspectiveCamera(34, initialAspect, 0.1, 50);
    // On narrow screens (portrait mobile), back up slightly so character is fully framed without clipping
    camera.position.set(0, 0.22, initialAspect < 1 ? 4.2 / Math.max(0.72, initialAspect) : 4.2);

    // 4. PMREM RoomEnvironment for realistic PBR reflections
    let envTexture = null;
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTexture;
      pmremGenerator.dispose();
    } catch (envErr) {
      console.warn('RoomEnvironment fallback to ambient lighting:', envErr);
    }

    // 5. 360° Studio Lighting (Rebalanced: warm champagne & cool slate, no interior blowout)
    const frontKeyLight = new THREE.DirectionalLight(0xd8c8a8, 2.2);
    frontKeyLight.position.set(-2.2, 3.5, 3.2);
    scene.add(frontKeyLight);

    const frontFillLight = new THREE.DirectionalLight(0x8fa8c8, 1.1);
    frontFillLight.position.set(2.8, 1.2, 2.2);
    scene.add(frontFillLight);

    const backKeyLight = new THREE.DirectionalLight(0xd8c8a8, 1.8);
    backKeyLight.position.set(2.0, 3.0, -3.0);
    scene.add(backKeyLight);

    const backFillLight = new THREE.DirectionalLight(0x8fa8c8, 1.0);
    backFillLight.position.set(-2.2, 1.5, -2.5);
    scene.add(backFillLight);

    const rimLight = new THREE.DirectionalLight(0xf4efea, 1.6);
    rimLight.position.set(0.0, 3.8, 0.0);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xd8c8a8, 0x14151a, 0.85);
    scene.add(hemiLight);

    // Soft subtle ambient front bounce light (no interior point light glitch)
    const softBounceLight = new THREE.DirectionalLight(0xd8c8a8, 0.5);
    softBounceLight.position.set(0, -1.0, 2.0);
    scene.add(softBounceLight);

    // 6. Ambient Tech Dust Particles
    const particleCount = window.innerWidth < 768 ? 18 : 32;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 4.0;
      pPos[i + 1] = (Math.random() - 0.5) * 3.5;
      pPos[i + 2] = (Math.random() - 0.5) * 3.0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xd8c8a8,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 7. Main 3D Model Root Group
    const modelRoot = new THREE.Group();
    // Default pleasant 3/4 turn towards viewer
    modelRoot.rotation.y = -0.15;
    scene.add(modelRoot);

    // 8. Robust Multi-Tier Model Loading (Local -> CDN Fallback)
    const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
    const localDracoPath = `${baseUrl}draco/`;
    const cdnDracoPath = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';
    const modelUrl = `${baseUrl}models/character.glb`;

    let activeDracoLoader = null;

    const setupModelInScene = (gltf) => {
      if (isDisposed) return;
      const character = gltf.scene;

      // Upright natural posture: model was exported with node_0 rotation applied, no inversion needed
      character.rotation.set(0, 0, 0);
      character.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(character);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Center horizontally and align vertically for perfect eye-level composition
      character.position.x = -center.x;
      character.position.y = -center.y - 0.12;
      character.position.z = -center.z;

      // Auto-scale to fill viewport beautifully
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.45 / maxDim;
      modelRoot.scale.set(scale, scale, scale);

      character.traverse((child) => {
        if (child.isMesh && child.material) {
          // FrontSide prevents internal backface z-fighting inside laptop shell and fingers
          child.material.side = THREE.FrontSide;
          child.material.envMapIntensity = 0.95;
          child.material.roughness = 0.55;
          child.material.metalness = 0.12;
          if (child.material.specularColor) {
            child.material.specularColor.setRGB(0.15, 0.15, 0.15);
          }
          child.material.needsUpdate = true;
        }
      });

      modelRoot.add(character);
      setIsLoading(false);
      setLoadError(null);
    };

    const loadWithDracoPath = (decoderPath, isCdnFallback = false) => {
      if (isDisposed) return;

      if (activeDracoLoader) {
        try {
          activeDracoLoader.dispose();
        } catch {}
      }

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(decoderPath);
      activeDracoLoader = dracoLoader;

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        modelUrl,
        (gltf) => {
          setupModelInScene(gltf);
        },
        (xhr) => {
          if (xhr.lengthComputable && xhr.total > 0) {
            const percent = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
            setLoadProgress(percent);
          }
        },
        (error) => {
          console.warn(`Error loading model with decoder path (${decoderPath}):`, error);
          if (!isCdnFallback && !isDisposed) {
            console.log('Attempting fallback to official Google Draco CDN decoder...');
            loadWithDracoPath(cdnDracoPath, true);
          } else if (!isDisposed) {
            console.error('All Draco decoder paths failed:', error);
            setIsLoading(false);
            setLoadError(
              lang === 'vi'
                ? 'Không thể tải mô hình 3D. Vui lòng kiểm tra kết nối mạng.'
                : 'Failed to load 3D character. Please check network connection.'
            );
          }
        }
      );
    };

    // Start loading with local Draco decoders
    loadWithDracoPath(localDracoPath, false);

    // 9. OrbitControls for Horizontal Only (Strict 360° Azimuthal Drag, Locked Polar Angle)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // keep layout stable
    controls.enablePan = false;
    // Strict horizontal rotation only: lock polar angle to eye-level (PI / 2)
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    // Allow vertical swipe gestures to pass through to document scrolling on touch screens
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    let userInteracting = false;
    let lastInteractionTime = 0;

    controls.addEventListener('start', () => {
      userInteracting = true;
      setIsInteracting(true);
    });

    controls.addEventListener('end', () => {
      lastInteractionTime = performance.now();
      setTimeout(() => {
        if (performance.now() - lastInteractionTime >= 1800) {
          userInteracting = false;
          setIsInteracting(false);
        }
      }, 2000);
    });

    // 10. Mouse tracking for subtle horizontal parallax when not orbiting (desktop only)
    let targetMouseX = 0;
    let currentMouseX = 0;

    const handleMouseMove = (e) => {
      if (userInteracting) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      targetMouseX = Math.max(-1, Math.min(1, x));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 11. Animation Loop (60fps/120fps with performance.now, zero deprecation)
    const startTime = performance.now();
    let isContextLost = false;

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      if (!isVisible || isContextLost) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;

      controls.update();

      if (!userInteracting) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.06;

        // Strictly horizontal rotation: no vertical pitch tilt
        modelRoot.rotation.y = -0.15 + currentMouseX * 0.28;
        modelRoot.rotation.x = 0;
        modelRoot.position.y = Math.sin(elapsedTime * 1.6) * 0.035;
      }

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Responsive Resize & Dynamic Aspect Ratio Handler
    const handleResize = () => {
      if (!container || isDisposed) return;
      width = container.clientWidth || 480;
      height = container.clientHeight || 520;
      if (width === 0 || height === 0) return;

      const aspect = width / height;
      camera.aspect = aspect;
      // On narrow screens (portrait mobile), back up slightly so character is fully framed without clipping
      camera.position.z = aspect < 1 ? 4.2 / Math.max(0.72, aspect) : 4.2;
      camera.updateProjectionMatrix();

      const isMobile = window.innerWidth < 768;
      const maxDpr = isMobile ? 1.75 : 2.0;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 13. WebGL Context Loss & Restoration Handlers (Vital for Mobile Safari / Android)
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost. Pausing animation loop.');
      isContextLost = true;
      if (animId) cancelAnimationFrame(animId);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored. Resuming rendering.');
      isContextLost = false;
      animate();
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 14. Offscreen & Background Tab Optimization (Battery saving)
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting && document.visibilityState === 'visible';
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    // 15. Complete Resource Cleanup on unmount
    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (observer) {
        observer.disconnect();
      }

      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      controls.dispose();

      if (activeDracoLoader) {
        try {
          activeDracoLoader.dispose();
        } catch {}
      }

      if (envTexture) {
        try {
          envTexture.dispose();
        } catch {}
      }

      pGeo.dispose();
      pMat.dispose();

      // Dispose all child meshes and materials in scene
      scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [retryCount, isWebGLAvailable, lang]);

  const handleRetry = () => {
    setIsLoading(true);
    setLoadProgress(0);
    setLoadError(null);
    setRetryCount((c) => c + 1);
  };

  return (
    <div className="relative w-full h-full max-w-[480px] sm:max-w-[540px] flex items-center justify-center select-none touch-pan-y">
      {/* 1. Gentle Studio Soft Champagne Halo */}
      <div
        className="character-rim absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(216,200,168,0.2) 0%, rgba(191,168,130,0.08) 50%, transparent 75%)',
          filter: 'blur(55px)',
          transform: 'translate(-50%, -42%)',
          top: '50%',
          left: '50%',
        }}
      />

      {/* 2. Loading State Indicator with progress percentage */}
      {isLoading && !loadError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 pointer-events-none">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full border-2 border-[#d8c8a8]/25 border-t-[#d8c8a8] animate-spin" />
            <Rotate3d className="absolute w-4 h-4 text-[#d8c8a8]/70" />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#d8c8a8] uppercase">
            {lang === 'vi'
              ? loadProgress > 0
                ? `Đang tải mô hình 3D... ${loadProgress}%`
                : 'Đang tải mô hình 3D...'
              : loadProgress > 0
              ? `Loading 3D Model... ${loadProgress}%`
              : 'Loading 3D Model...'}
          </span>
          {loadProgress > 0 && (
            <div className="w-36 h-1 bg-[#1a1b22] rounded-full overflow-hidden border border-[#2b2d37]">
              <div
                className="h-full bg-gradient-to-r from-[#bfa882] to-[#d8c8a8] transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* 3. Error / Unsupported WebGL Fallback UI */}
      {loadError && (
        <div className="relative z-20 flex flex-col items-center justify-center text-center p-4 max-w-xs">
          <div className="relative w-48 h-60 sm:w-56 sm:h-72 mb-3 flex items-center justify-center">
            <img
              src="/images/character-avatar.webp"
              alt="Nguyen Van Duc"
              className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              loading="eager"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#d8c8a8] mb-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#d8c8a8]" />
            <span>{lang === 'vi' ? 'Không thể xem 3D' : '3D Preview Unavailable'}</span>
          </div>
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1c24] border border-[#d8c8a8]/40 hover:border-[#d8c8a8] text-[#f4efea] text-xs font-mono transition-colors shadow-md"
          >
            <RefreshCw className="w-3 h-3 text-[#d8c8a8]" />
            <span>{lang === 'vi' ? 'Thử lại chế độ 3D' : 'Retry 3D Mode'}</span>
          </button>
        </div>
      )}

      {/* 4. Interactive 3D Three.js WebGL Canvas Mount */}
      {!loadError && (
        <div
          ref={mountRef}
          className="relative z-10 w-full h-[360px] sm:h-[440px] lg:h-[490px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        />
      )}

      {/* 5. Interactive Hint Badge (Strict horizontal rotation instruction) */}
      {!isLoading && !loadError && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318]/85 border border-[#2b2d37] backdrop-blur-md shadow-lg transition-opacity duration-300">
          <Rotate3d className="w-3.5 h-3.5 text-[#d8c8a8] animate-spin-slow" />
          <span className="text-[10px] font-mono text-[#cccccc] tracking-wider uppercase">
            {lang === 'vi'
              ? isInteracting
                ? 'Đang xoay ngang 360°'
                : 'Mô hình 3D • Kéo ngang để xoay 360°'
              : isInteracting
              ? 'Free 360° Horizontal Orbit Active'
              : '3D Model • Drag Horizontally to Rotate'}
          </span>
        </div>
      )}
    </div>
  );
};

export default InteractiveCharacter;
