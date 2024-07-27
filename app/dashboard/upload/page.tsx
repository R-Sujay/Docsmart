import Documents from "@/components/Documents";
import React from "react";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import getUserFiles from "@/utils/getUserFiles";

async function Dashboard() {
  const { userId } = await auth();
  const { files } = await getUserFiles();
  const totalDocs = files.docs.length > 0;

  if (!userId) {
    throw new Error("User not found");
  }

  return (
    <div className="h-full max-w-7xl mx-auto">
      <div className="">
        <div className="grain" />
        <div className="-z-20 w-full h-full filter blur-2xl object-cover block fixed top-0 bottom-0 left-0 right-0">
          <Image layout="fill" src="/bgDash.png" alt="bg" className="-z-50" />
        </div>
      </div>

      <FileUpload />
    </div>
  );
}

export default Dashboard;
