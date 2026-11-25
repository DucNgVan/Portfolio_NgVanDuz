import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const STICKERS = [
  { img: "/logos/react.webp", pos: [-5, 1.8, 0], scale: 1.8, speed: 2 },
  { img: "/logos/nodejs.webp", pos: [-2, -1.5, 1], scale: 1.6, speed: 1.8 },
  { img: "/logos/threejs.webp", pos: [1.5, 2.2, -1], scale: 1.9, speed: 2.2 },
  { img: "/logos/docker.webp", pos: [4.8, -1.2, 0.5], scale: 1.7, speed: 1.7 },
  { img: "/logos/typescript.webp", pos: [6, 1.5, -0.5], scale: 1.5, speed: 2 },
  { img: "/logos/git.webp", pos: [-6, -2, -1], scale: 1.6, speed: 1.9 },
];

function InteractiveSticker({ img, pos, scale, speed }) {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, img);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle tilt towards mouse pointer
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -state.pointer.y * 0.4,
        0.05
      );
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef} position={pos} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export const PreFooterPhysics = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      className="w-full h-full"
    >
      <ambientLight intensity={1.5} />
      {STICKERS.map((s, idx) => (
        <InteractiveSticker key={idx} {...s} />
      ))}
    </Canvas>
  );
};

export default PreFooterPhysics;
