"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import("./Globe"), { ssr: false });

const HeroAnimation = () => {
  const GLOBE_SIZE = 0.5; // Adjust this value to change the globe size

  return (
    <div className="w-[40vw] h-[500px] xl:w-[50vw] heightMin:h-[80vh] overflow-x-hidden scrollbar-hide">
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }} className="w-screen h-full">
        <group scale={[GLOBE_SIZE, GLOBE_SIZE, GLOBE_SIZE]}>
          <Globe />
        </group>
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.5}
          minDistance={10} // Set minimum distance for zooming
          maxDistance={10} // Set maximum distance for zooming
        />
      </Canvas>
    </div>
  );
};

export default HeroAnimation;
