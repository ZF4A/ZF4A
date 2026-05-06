import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Reduced particle count for better performance and softer look
const PARTICLE_COUNT = 900;

const sparkVertexShader = `
  attribute float size;
  attribute float life;
  attribute float speed;
  attribute float turbulence;
  varying float vLife;
  varying float vAlpha;
  uniform float uTime;
  
  void main() {
    vLife = life;
    
    vec3 pos = position;
    
    // Rising motion (slower for softer feel)
    float rise = mod(pos.y + uTime * speed * 0.18, 8.0) - 4.0;
    pos.y = rise;
    
    // Turbulence/wind (gentler)
    float turbX = sin(uTime * turbulence + pos.y * 1.2) * 0.18;
    float turbZ = cos(uTime * turbulence * 0.6 + pos.y * 1.0) * 0.18;
    pos.x += turbX;
    pos.z += turbZ;
    
    // Subtle spiral motion
    float angle = pos.y * 0.35 + uTime * 0.12;
    float radius = 0.4 + sin(pos.y * 0.22) * 0.35;
    pos.x += cos(angle) * radius * 0.12;
    pos.z += sin(angle) * radius * 0.12;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size based on life and distance (softer falloff)
    float lifeAlpha = 1.0 - smoothstep(3.2, 4.2, rise + 4.0);
    float distAlpha = 1.0 - smoothstep(5.0, 10.0, -mvPosition.z);
    vAlpha = lifeAlpha * distAlpha;
    
    gl_PointSize = size * (300.0 / -mvPosition.z) * lifeAlpha;
  }
`;

const sparkFragmentShader = `
  varying float vLife;
  varying float vAlpha;
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Gold color with white hot core
    vec3 gold = vec3(1.0, 0.84, 0.0);
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 orange = vec3(1.0, 0.5, 0.0);
    
    // Softer radial falloff for cloud-like points
    float core = 1.0 - smoothstep(0.0, 0.2, dist);
    float mid = 1.0 - smoothstep(0.2, 0.45, dist);
    float outer = 1.0 - smoothstep(0.45, 0.6, dist);
    
    vec3 color = mix(gold, orange, mid);
    color = mix(color, white, core * 0.8);
    
    float alpha = outer * vAlpha * 0.9;
    alpha *= smoothstep(0.0, 0.12, vLife);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function SparkField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, lives, speeds, turbulences } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const lives = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const turbulences = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spawn in a cylinder at bottom
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = Math.sin(angle) * radius;
      
        // slightly smaller and more uniform sizes for a cloud-like soft effect
        sizes[i] = Math.random() * 2 + 0.5;
        lives[i] = Math.random();
        // slower, gentler rising speeds
        speeds[i] = Math.random() * 0.35 + 0.35;
        // reduce turbulence amplitude for smoother motion
        turbulences[i] = Math.random() * 1.2 + 0.3;
    }

    return { positions, sizes, lives, speeds, turbulences };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-life"
          args={[lives, 1]}
        />
        <bufferAttribute
          attach="attributes-speed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-turbulence"
          args={[turbulences, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={sparkVertexShader}
        fragmentShader={sparkFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
