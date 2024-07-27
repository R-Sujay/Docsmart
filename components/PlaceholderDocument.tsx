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
    <Button onClick={handleClick} className="flex flex-col items-center  hover:bg-black w-64 h-80 rounded-xl bg-[#0f1012] overflow-hidden drop-shadow-md text-gray-600">
      <Background />
      {/* <div className="">
        <div className="grain" />
        <div className="-z-20 w-full h-full filter blur-2xl object-cover block fixed top-0 bottom-0 left-0 right-0">
          <Image layout="fill" src="/bgDash.png" alt="bg" className="-z-50" />
        </div>
      </div> */}
      <PlusCircleIcon className="h-16 w-16" />
      <p>Add a document</p>
    </Button>
  );
}

export default PlaceholderDocument;
