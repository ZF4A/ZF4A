import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const nodeCount = 40;
const connectionCount = 60;

export default function NeuralSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodePositions = new Float32Array(nodeCount * 3);
    
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.5;
      
      nodePositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      nodePositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      nodePositions[i3 + 2] = r * Math.cos(phi);
    }

    // Create random connections
    const linePositions = new Float32Array(connectionCount * 6);
    for (let i = 0; i < connectionCount; i++) {
      const i6 = i * 6;
      const a = Math.floor(Math.random() * nodeCount);
      const b = Math.floor(Math.random() * nodeCount);
      
      const a3 = a * 3;
      const b3 = b * 3;
      
      linePositions[i6] = nodePositions[a3];
      linePositions[i6 + 1] = nodePositions[a3 + 1];
      linePositions[i6 + 2] = nodePositions[a3 + 2];
      linePositions[i6 + 3] = nodePositions[b3];
      linePositions[i6 + 4] = nodePositions[b3 + 1];
      linePositions[i6 + 5] = nodePositions[b3 + 2];
    }

    return { nodePositions, linePositions };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.3} />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#FFAA00" transparent opacity={0.5} />
      </mesh>
      
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 100]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.4} />
      </mesh>
      
      {/* Second ring */}
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FFAA00" transparent opacity={0.3} />
      </mesh>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#FFD700"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Data pulses orbiting */}
      {[0, 1, 2, 3].map((i) => (
        <DataPulse key={i} index={i} />
      ))}
    </group>
  );
}

function DataPulse({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = (index / 4) * Math.PI * 2;
  const radius = 2.5 + index * 0.3;
  const speed = 0.5 + index * 0.2;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.7) * 0.5;
      meshRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial
        color="#FFD700"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
