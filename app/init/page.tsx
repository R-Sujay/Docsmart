"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import Button3D from "@/components/Button3D";

export default function Home() {
  // const [isOpen, setIsOpen] = useState(false);
  // const scope = useMenuAnimation(isOpen);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Button3D />
    </main>
  );
}
