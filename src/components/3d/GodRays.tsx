import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const godRayVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const godRayFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  
  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Multiple light sources from bottom
    float ray1 = 0.0;
    float ray2 = 0.0;
    float ray3 = 0.0;
    
    // Central beam (softer, cloud-like)
    float dist1 = length(uv - vec2(0.5, 0.0));
    ray1 = exp(-dist1 * 3.8) * (0.12 + 0.08 * sin(uTime * 0.35 + uv.y * 8.0));
    
    // Side beams
    float dist2 = length(uv - vec2(0.2, 0.0));
    ray2 = exp(-dist2 * 4.0) * 0.15 * (1.0 + 0.3 * sin(uTime * 0.7));
    
    float dist3 = length(uv - vec2(0.8, 0.0));
    ray3 = exp(-dist3 * 4.0) * 0.15 * (1.0 + 0.3 * sin(uTime * 0.6 + 1.0));
    
    // Noise for volumetric, lowered amplitude for softness
    float noise = snoise(vec2(uv.x * 2.0, uv.y * 1.6 - uTime * 0.15)) * 0.05;
    
    float totalRay = ray1 + ray2 + ray3 + noise;
    
    // Gold color
    vec3 gold = vec3(1.0, 0.84, 0.0);
    vec3 warm = vec3(1.0, 0.6, 0.1);
    vec3 color = mix(warm, gold, ray1 * 2.0);
    
    float alpha = totalRay * 0.12 * (1.0 - uv.y * 0.6);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function GodRays() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={godRayVertexShader}
        fragmentShader={godRayFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
