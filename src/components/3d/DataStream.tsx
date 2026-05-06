import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BAR_COUNT = 20;
const STREAM_COUNT = 50;

export default function DataStream() {
  const groupRef = useRef<THREE.Group>(null);

  const barData = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 6,
      height: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.3,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const streamData = useMemo(() => {
    return Array.from({ length: STREAM_COUNT }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: Math.random() * 6 - 3,
      z: (Math.random() - 0.5) * 4,
      speed: Math.random() * 3 + 2,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating bars */}
      {barData.map((bar, i) => (
        <FloatingBar key={`bar-${i}`} {...bar} />
      ))}
      
      {/* Data streams */}
      {streamData.map((stream, i) => (
        <DataParticle key={`stream-${i}`} {...stream} />
      ))}

      {/* Central ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00C853" transparent opacity={0.3} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function FloatingBar({ x, height, speed, phase }: { x: number; height: number; speed: number; phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      const currentHeight = height + Math.sin(t * speed + phase) * 0.5;
      meshRef.current.scale.y = Math.max(0.1, currentHeight);
      meshRef.current.position.y = currentHeight / 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[x, height / 2, 0]}>
      <boxGeometry args={[0.15, 1, 0.15]} />
      <meshBasicMaterial
        color="#00C853"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function DataParticle({ x, y, z, speed }: { x: number; y: number; z: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.x = x + Math.sin(t * 0.5) * 0.5;
      meshRef.current.position.y = y + Math.sin(t * speed) * 1.5;
      meshRef.current.position.z = z + Math.cos(t * 0.3) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial
        color="#FFD700"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
