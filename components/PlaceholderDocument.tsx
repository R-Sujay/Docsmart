"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Background from "./Background";
import Image from "next/image";

function PlaceholderDocument() {
  const router = useRouter();

  const handleClick = async () => {
    // check
    router.push("/dashboard/upload");
  };

  return (
    <Button onClick={handleClick} className="flex flex-col items-center  transition-all transform hover:scale-105 hover:bg-black w-64 h-80 rounded-xl bg-[#0f1012] overflow-hidden drop-shadow-md text-gray-600">
      <Background />
      <PlusCircleIcon className="h-16 w-16" />
      <p>Add a document</p>
    </Button>
  );
}

export default PlaceholderDocument;
