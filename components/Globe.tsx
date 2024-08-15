"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import countries from "./files/globe-data-min.json";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const Globe: React.FC = () => {
  const globeRef = useRef<THREE.Group>(new THREE.Group());
  const { scene } = useThree();

  useEffect(() => {
    const globe = new ThreeGlobe().hexPolygonsData(countries.features).hexPolygonResolution(3).hexPolygonMargin(0.7).showAtmosphere(true).atmosphereColor("#3a228a").atmosphereAltitude(0.25);

    globe.rotateY(-Math.PI * (5 / 9));
    globe.rotateZ(-Math.PI / 6);

    // Cast the material to MeshPhongMaterial
    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(0x0c1d47);
    globeMaterial.emissive = new THREE.Color(0x0c1d47);
    globeMaterial.emissiveIntensity = 0.3;
    globeMaterial.shininess = 1.0;

    globeRef.current.add(globe);
    scene.add(globeRef.current);

    return () => {
      scene.remove(globeRef.current);
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.5 * delta; // Subtle spin
    }
  });

  const isSmallScreen = typeof window !== "undefined" ? useWindowDimensions().width < 1280 : false;
  const scale = isSmallScreen ? 0.006 : 0.01;

  return (
    <group ref={globeRef} scale={[scale, scale, scale]}>
      <ambientLight intensity={1} />
      <directionalLight position={[-800, 2000, 400]} intensity={10} />
      <directionalLight position={[-200, 500, 200]} intensity={10} />
      <pointLight position={[-200, 500, 200]} intensity={1} />
    </group>
  );
};

export default Globe;
