import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const mesh = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.mouse;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, x * 2, 0.1);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, y * 2, 0.1);
    
    mesh.current.rotation.x = time * 0.1 + mouse.current.y * 0.05;
    mesh.current.rotation.y = time * 0.15 + mouse.current.x * 0.05;
  });

  return (
    <group ref={mesh}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={[
            (Math.sin(i) * 12), 
            (Math.cos(i * 1.5) * 8), 
            (Math.sin(i * 0.5) * 5)
          ]}>
            <octahedronGeometry args={[Math.random() * 0.4 + 0.15, 0]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              transparent 
              opacity={0.15} 
              wireframe 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Particles() {
  const count = 1500;
  const mesh = useRef<THREE.Points>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.x = time * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 60)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color="#a78bfa" 
        transparent 
        opacity={0.3} 
        sizeAttenuation={true} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c1d95" />
        
        <FloatingShapes />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
        <Particles />
      </Canvas>
    </div>
  );
}
