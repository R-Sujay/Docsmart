"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 5 }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      />
    </div>
  );
}

export default Loading;
