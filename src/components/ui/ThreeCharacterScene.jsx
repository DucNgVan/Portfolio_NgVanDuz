import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader, RGBELoader } from 'three-stdlib';

const checkWebGL = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

const ThreeCharacterScene = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkWebGL()) {
      setLoading(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let isDisposed = false;

    // 1. Scene & Renderer
    const scene = new THREE.Scene();
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.innerWidth >= 768,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setLoading(false);
      return;
    }

    // 2. Camera setup matching MoncyDev
    const aspect = width / (height || 1);
    const camera = new THREE.PerspectiveCamera(15.5, aspect, 0.1, 100);
    camera.position.set(0, 13.2, 24.5);
    camera.lookAt(0, 12.2, 0);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc7a9ff, 1.4);
    dirLight.position.set(-2, 8, 10);
    scene.add(dirLight);

    const purpleRimLight = new THREE.PointLight(0xc2a4ff, 2.5, 40);
    purpleRimLight.position.set(0, 12, -4);
    scene.add(purpleRimLight);

    const fillLight = new THREE.DirectionalLight(0x5400ff, 0.8);
    fillLight.position.set(4, 5, -2);
    scene.add(fillLight);

    const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

    // Optional HDR environment
    try {
      new RGBELoader()
        .setPath(`${baseUrl}models/`)
        .load('char_enviorment.hdr', (texture) => {
          if (isDisposed) return;
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
          scene.environmentIntensity = 0.5;
        }, undefined, () => {});
    } catch {}

    // 4. Character Loader with multi-tier Draco paths
    const localDracoPath = `${baseUrl}draco/`;
    const cdnDracoPath = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(localDracoPath);

    let loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let headBone = null;
    let mixer = null;
    let character = null;

    const loadModel = (dracoPath, isCdnFallback = false) => {
      if (isDisposed) return;
      if (isCdnFallback) {
        dracoLoader.dispose();
        dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(dracoPath);
        loader.setDRACOLoader(dracoLoader);
      }

      loader.load(
        `${baseUrl}models/character.glb`,
        (gltf) => {
          if (isDisposed) return;
          character = gltf.scene;
          character.position.set(0, 0, 0);
          character.scale.set(1, 1, 1);

          character.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material.roughness = Math.max(child.material.roughness || 0.4, 0.3);
            }
          });

          scene.add(character);
          headBone = character.getObjectByName('spine006') || character.getObjectByName('head') || null;

          if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(character);
            gltf.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
          }

          setLoading(false);
        },
        undefined,
        (error) => {
          if (!isCdnFallback && !isDisposed) {
            loadModel(cdnDracoPath, true);
          } else {
            console.error('Error loading 3D character in scene:', error);
            setLoading(false);
          }
        }
      );
    };

    loadModel(localDracoPath, false);

    // 5. Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const onMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 6. Resize handler
    const onResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // 7. Animation Loop with performance.now()
    let reqId = null;
    let lastTime = performance.now();

    const animate = () => {
      if (isDisposed) return;
      reqId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      const elapsed = now * 0.001;

      if (mixer) {
        mixer.update(delta);
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      if (headBone) {
        headBone.rotation.y = currentRotationY;
        headBone.rotation.x = currentRotationX + Math.sin(elapsed * 1.5) * 0.03;
      } else if (character) {
        character.rotation.y = currentRotationY * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      if (reqId) cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      dracoLoader.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="character-rim absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(251,141,255,0.45) 0%, rgba(84,0,255,0.3) 50%, transparent 75%)',
          filter: 'blur(55px)',
          transform: 'translate(-50%, -40%)',
          top: '50%',
          left: '50%',
        }}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#d8c8a8] border-t-transparent animate-spin" />
            <span className="text-[11px] font-mono text-[#d8c8a8] tracking-widest uppercase">
              Loading 3D Scene...
            </span>
          </div>
        </div>
      )}

      <div 
        ref={containerRef} 
        className="w-full h-full relative z-10 pointer-events-none flex items-center justify-center"
      />
    </div>
  );
};

export default ThreeCharacterScene;
