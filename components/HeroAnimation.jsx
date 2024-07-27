"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "./Globe";

const HeroAnimation = () => {
  // Define a constant for globe size control
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
