"use client";

import {
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  type MotionValue,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const springValues: SpringOptions = {
  damping: 40,
  stiffness: 80,
  mass: 2,
};

const modelPosition: [number, number, number] = [0, 0.6, 0];
const modelScale = 0.068;

const baseRotation = new THREE.Euler(0.4, -0.6, 0);

function Track({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const gltf = useGLTF("/models/solar_panel.glb");
  const rotationGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (rotationGroupRef.current) {
      const intensity = 0.08;
      rotationGroupRef.current.rotation.x =
        baseRotation.x + mouseY.get() * intensity;
      rotationGroupRef.current.rotation.y =
        baseRotation.y + mouseX.get() * intensity;
    }
  });

  return (
    <group position={modelPosition} scale={modelScale}>
      <group ref={rotationGroupRef}>
        <Center>
          <primitive object={gltf.scene} />
        </Center>
      </group>
    </group>
  );
}

export default function SolarModel3D() {
  const mouseX = useSpring(useMotionValue(0), springValues);
  const mouseY = useSpring(useMotionValue(0), springValues);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{ width: "100%", height: "100%", cursor: "grab" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, 5, -5]} intensity={1} />
        <Environment preset="city" />
        <Track mouseX={mouseX} mouseY={mouseY} />
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          target={modelPosition}
          enableDamping={true}
          dampingFactor={0.01}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        [Image of 3D coordinate system axis]
        <ContactShadows
          position={[modelPosition[0], -2.5, modelPosition[2]]}
          resolution={1024}
          scale={15}
          blur={2}
          opacity={0}
          far={10}
        />
      </Canvas>
    </div>
  );
}
