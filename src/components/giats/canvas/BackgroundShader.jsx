import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float cnoise2(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColorAccent;
uniform vec2 uPlaneRes;
uniform vec2 uMouse2D;
uniform float uLinesBlur;
uniform float uNoise;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float uLinesAmount;
uniform float uBackgroundScale;
uniform float uTime;

varying vec2 vUv;

float lines(vec2 uv, float offset) {
  float a = abs(0.5 * sin(uv.y * uLinesAmount) + offset * uLinesBlur);
  return smoothstep(0.0, uLinesBlur + offset * uLinesBlur, a);
}

float random(vec2 p) {
  vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
  return fract(cos(dot(p, k1)) * 12345.6789);
}

vec3 fadeLine(vec2 uv, vec2 mouse2D, vec3 col1, vec3 col2, vec3 col3, vec3 col4) {
  mouse2D = (mouse2D + 1.0) * 0.5;
  float n1 = cnoise2(uv);
  float n2 = cnoise2(uv + uOffsetX * 15.0);
  float n3 = cnoise2(uv * 0.3 + uOffsetY * 8.0);
  float nFinal = mix(mix(n1, n2, mouse2D.x), n3, mouse2D.y);
  vec2 baseUv = vec2(nFinal + 2.05) * uBackgroundScale;

  float basePattern = lines(baseUv, 0.1);
  float secondPattern = lines(baseUv, 0.2);

  vec3 baseColor = mix(col1, col2, basePattern);
  vec3 secondBaseColor = mix(baseColor, col3, secondPattern);
  return secondBaseColor;
}

void main() {
  vec2 mouse2D = uMouse2D;
  vec2 uv = vUv;
  uv.y += uOffsetY;
  uv.x += uOffsetX;
  uv.x *= uPlaneRes.x / uPlaneRes.y;

  vec3 col1 = fadeLine(uv, mouse2D, uColor1, uColor2, uColor3, uColorAccent);
  vec3 finalCol = col1;

  vec2 uvRandom = vUv;
  uvRandom.y *= random(vec2(uvRandom.y, 0.5));
  finalCol.rgb += random(uvRandom) * uNoise;

  gl_FragColor = vec4(finalCol, 1.0);
}
`;

function ShaderPlane() {
  const meshRef = useRef();
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0.24, 0.24, 0.26) }, // Soft graphite
      uColor2: { value: new THREE.Color(0.14, 0.14, 0.16) }, // Dark charcoal
      uColor3: { value: new THREE.Color(0.08, 0.08, 0.10) }, // Deep obsidian
      uColorAccent: { value: new THREE.Color(0.95, 0.95, 0.98) }, // Crisp accent
      uLinesBlur: { value: 0.49 },
      uNoise: { value: 0.025 },
      uOffsetX: { value: 0.34 },
      uOffsetY: { value: 0.0 },
      uLinesAmount: { value: 5.0 },
      uPlaneRes: { value: new THREE.Vector2(size.width || 1920, size.height || 1080) },
      uMouse2D: { value: new THREE.Vector2(0.5, 0.5) },
      uBackgroundScale: { value: 2.8 },
    }),
    [size.width, size.height]
  );

  useFrame((state, delta) => {
    if (meshRef.current && meshRef.current.material) {
      const u = meshRef.current.material.uniforms;
      u.uTime.value += delta * 0.4;
      u.uOffsetX.value += delta * 0.008;
      u.uOffsetY.value += delta * 0.005;

      // Subtle mouse tracking
      u.uMouse2D.value.x += (state.pointer.x - u.uMouse2D.value.x) * 0.05;
      u.uMouse2D.value.y += (state.pointer.y - u.uMouse2D.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export const BackgroundShader = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
        }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

export default BackgroundShader;
