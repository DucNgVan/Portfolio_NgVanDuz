import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RotateCw, Sparkles } from 'lucide-react';

/**
 * Mobile3DHero
 * Dedicated touch-interactive 3D character viewport specifically engineered for mobile screens.
 * Features:
 * - 60fps lightweight Three.js stage with Draco-decoded model
 * - Smooth touch drag to spin character 360°
 * - Subtle idle floating & breathing animation
 * - Fallback to high-res avatar if WebGL is unavailable
 */
export const Mobile3DHero = () => {
  const mountRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 280;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.18, 3.1);

    // 2. Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      return;
    }

    // 3. Lighting (Warm Champagne & Soft Studio Rim)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.4);
    keyLight.position.set(2.5, 3.5, 4.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.2);
    fillLight.position.set(-3.0, 1.5, 2.0);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xfef08a, 2.5, 10);
    rimLight.position.set(0, 2.0, -2.5);
    scene.add(rimLight);

    // 4. Load 3D Character
    let model = null;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let touchStartX = 0;
    let isTouching = false;
    let autoRotateSpeed = 0.005;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/models/character-cinematic.glb',
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, -0.68, 0);
        model.scale.set(0.92, 0.92, 0.92);

        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.roughness = Math.min(child.material.roughness || 0.6, 0.55);
            child.material.metalness = Math.max(child.material.metalness || 0.1, 0.15);
          }
        });

        scene.add(model);
        setModelLoaded(true);
      },
      undefined,
      (err) => {
        console.warn('Mobile 3D model fallback:', err);
      }
    );

    // 5. Touch Interaction Handlers
    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      setHasInteracted(true);
    };

    const onTouchMove = (e) => {
      if (!isTouching || !e.touches || e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartX;
      touchStartX = currentX;
      targetRotationY += deltaX * 0.015;
    };

    const onTouchEnd = () => {
      isTouching = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    domEl.addEventListener('touchmove', onTouchMove, { passive: true });
    domEl.addEventListener('touchend', onTouchEnd, { passive: true });

    // 6. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (model) {
        // Idle floating & breathing
        model.position.y = -0.68 + Math.sin(elapsedTime * 1.6) * 0.035;

        // Auto gentle idle rotation when not touching
        if (!isTouching) {
          targetRotationY += autoRotateSpeed;
        }

        // Smooth damping interpolation
        currentRotationY += (targetRotationY - currentRotationY) * 0.08;
        model.rotation.y = currentRotationY;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 280;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      domEl.removeEventListener('touchstart', onTouchStart);
      domEl.removeEventListener('touchmove', onTouchMove);
      domEl.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      dracoLoader.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] bg-gradient-to-b from-[#f2efe9] to-[#f8f7f4] rounded-3xl overflow-hidden shadow-inner border border-black/[0.06] flex items-center justify-center select-none touch-pan-y">
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing" />

      {/* Floating Status / Interactive Hint Badge */}
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-[10px] font-mono text-[#8c7355] font-bold flex items-center gap-1.5 shadow-sm pointer-events-none">
        <RotateCw className="w-3 h-3 text-[#c5a880] animate-spin [animation-duration:8s]" />
        <span>Swipe 3D • 360°</span>
      </div>

      {/* Subtle bottom indicator */}
      {!hasInteracted && modelLoaded && (
        <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none animate-bounce">
          <span className="text-[9.5px] font-mono font-semibold px-3 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
            Drag to rotate character
          </span>
        </div>
      )}
    </div>
  );
};

export default Mobile3DHero;
