"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Image, Environment, ScrollControls, useScroll, useTexture, RoundedBox, Text } from "@react-three/drei";
import { easing } from "maath";
import "@/utils/BentPlaneGeometry";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const CARD_WIDTH = 1;
const CARD_HEIGHT = 0.5;
const TEXT_SIZE = 0.1;

const Page = () => (
  <div className="w-screen h-screen">
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }} className="w-full h-full">
      <fog attach="fog" args={["#a79", 8.5, 12]} />
      <ScrollControls horizontal pages={4} infinite>
        <CenterSquare />
        <Rig rotation={[0, 0, 0.15]}>
          <Carousel />
        </Rig>
        <Banner position={[0, -0.15, 0]} />
      </ScrollControls>
      <Environment preset="sunset" background blur={0.5} />
    </Canvas>
  </div>
);

function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents horizontally
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, count = 8 }) {
  return Array.from({ length: count }, (_, i) => <Card key={i} url={`/images/img${Math.floor(i % 10) + 1}_.jpg`} position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]} rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]} text={`Card ${i + 1}`} />);
}

function Card({ url, text, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);

  const normalMapTexture = useLoader(THREE.TextureLoader, "/images/normal.png");
  normalMapTexture.wrapS = THREE.RepeatWrapping;
  normalMapTexture.wrapT = THREE.RepeatWrapping;
  normalMapTexture.repeat.set(1, 1);

  const hdrEquirect = useLoader(RGBELoader, "/empty_warehouse_01_2k.hdr");
  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

  const material = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    thickness: 1.2,
    roughness: 0.6,
    envMap: hdrEquirect,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    normalScale: new THREE.Vector2(1, 1),
    normalMap: normalMapTexture,
    clearcoatNormalMap: normalMapTexture,
    clearcoatNormalScale: new THREE.Vector2(0.3, 0.3),
  });

  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(material, "reflectivity", hovered ? 0.25 : 0.1, 0.2, delta);
  });

  return (
    <group {...props} ref={ref} onPointerEnter={pointerOver} onPointerLeave={pointerOut}>
      <RoundedBox material={material} args={[CARD_WIDTH, CARD_HEIGHT, 0.1]} radius={0.05} smoothness={4}>
        <Text
          // position={[0, 0, 3.06]} // Position the text slightly in front of the card
          fontSize={TEXT_SIZE}
          color="gray"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </RoundedBox>
    </group>
  );
}

function CenterSquare() {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

function Banner(props) {
  const ref = useRef();
  const texture = useTexture("/images/work_.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map.offset.x += delta / 2;
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

export default Page;
