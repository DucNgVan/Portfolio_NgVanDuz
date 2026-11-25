import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function KineticSpheres({ count = 16 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    const accents = ["#f0f4f1", "#28282b", "#d8c8a8", "#915EFF", "#06b6d4"];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 80;
      const speed = 0.01 + Math.random() / 150;
      const xFactor = -15 + Math.random() * 30;
      const yFactor = -8 + Math.random() * 16;
      const zFactor = -10 + Math.random() * 20;
      const scale = 0.5 + Math.random() * 0.9;
      const color = new THREE.Color(accents[i % accents.length]);
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, scale, color });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor, scale } = particle;
      const t = particle.t + time * speed * 25;

      const a = Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10;
      const c = Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 4;

      dummy.position.set(a * 0.5, b * 0.5, c * 0.5);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(time * 0.2, time * 0.3, time * 0.1);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, particle.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        roughness={0.2}
        metalness={0.7}
      />
    </instancedMesh>
  );
}

function CenterHeroObject() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[2.4, 3]} />
        <MeshDistortMaterial
          color="#1e1e24"
          emissive="#915EFF"
          emissiveIntensity={0.15}
          roughness={0.1}
          metalness={0.8}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export const FloatingMeshes = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 32 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#915EFF" />
      <pointLight position={[0, 0, 5]} intensity={1.2} color="#f2ffbd" />

      <CenterHeroObject />
      <KineticSpheres count={14} />
    </Canvas>
  );
};

export default FloatingMeshes;
