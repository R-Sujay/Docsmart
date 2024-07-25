"use client";

import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Image, Environment, ScrollControls, useScroll, useTexture, RoundedBox, Text } from "@react-three/drei";
import { easing } from "maath";
import "@/utils/BentPlaneGeometry";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const CARD_WIDTH = 1;
const CARD_HEIGHT = 0.5;
const TEXT_SIZE = 0.1;
const BOUNCE_SPEED = 1; // Bounce speed constant
const SCALE_FACTOR = window.innerWidth / 1920; // Scale based on screen width (assuming 1920px as base)
const PAGE_X_OFFSET = -1; // X-axis offset for the entire page

const IsoAnimation = () => (
  <div className="w-screen h-screen">
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }} className="w-full h-full">
      <fog attach="fog" args={["#a79", 8.5, 12]} />
      <group position={[PAGE_X_OFFSET, 0, 0]} scale={[SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR]}>
        <ScrollControls horizontal pages={4} infinite>
          <CenterSquare />
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
          <Banner position={[0, -0.5, 0]} /> {/* Moved Banner down */}
        </ScrollControls>
      </group>
    </Canvas>
  </div>
);

function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents horizontally
    state.events.update(); // Raycasts every frame rather than on pointer-move
    // Get mouse position relative to the viewport
    const mouseX = (state.pointer.x / width) * 2 - 1;
    const mouseY = -(state.pointer.y / height) * 2 + 1;
    // Move camera relative to the mouse position
    easing.damp3(state.camera.position, [mouseX * 2, mouseY + 1.5, 10], 0.3, delta);
    state.camera.lookAt(0, 0, 0); // Look at center
  });

  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, count = 8 }) {
  const ref = useRef();
  const [spinSpeed, setSpinSpeed] = useState(0.5); // Initial fast spin speed
  const [bounceOffset, setBounceOffset] = useState(0); // Bounce offset

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Gradually slow down the spin speed over 1 second
      const interval = setInterval(() => {
        setSpinSpeed((prevSpeed) => {
          if (prevSpeed <= 0.002) {
            return 0.002; // Final slow spin speed
          }
          return prevSpeed - 0.0029;
        });
      }, 0.5); // Adjust interval for smoother deceleration
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.y += spinSpeed; // Rotate the carousel
    setBounceOffset(Math.sin(state.clock.getElapsedTime() * BOUNCE_SPEED) * 0.05); // Calculate bounce offset using sine wave
  });

  return (
    <group ref={ref} position={[0, 0.3 + bounceOffset, 0]}>
      {" "}
      {/* Moved Carousel up */}
      {/* Apply bounce offset */}
      {Array.from({ length: count }, (_, i) => (
        <Card key={i} url={`/images/img${Math.floor(i % 10) + 1}_.jpg`} position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]} rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]} text={`Card ${i + 1}`} />
      ))}
    </group>
  );
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
  const [bounceOffset, setBounceOffset] = useState(0); // Bounce offset

  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map.offset.x += delta / 2;
    setBounceOffset(Math.sin(state.clock.getElapsedTime() * BOUNCE_SPEED) * 0.05); // Calculate bounce offset using sine wave
  });

  return (
    <mesh ref={ref} {...props} position={[0, -0.5 + bounceOffset, 0]}>
      {" "}
      {/* Adjusted position */}
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

export default IsoAnimation;
