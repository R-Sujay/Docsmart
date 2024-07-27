import Chat from "@/components/Chat";
import PdfView from "@/components/PdfView";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

async function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
  auth().protect();
  const { userId } = await auth();

  const ref = await adminDb.collection("users").doc(userId!).collection("files").doc(id).get();

  const url = ref.data()?.downloadUrl;

  return (
    <div className="grid lg:grid-cols-5 pt-10 overflow-hidden h-full">
      <div className="cols-span-5 lg:col-span-2 overflow-y-auto border border-b-0 border-[#161b33]">
        <div className="">
          <div className="grain" />
          <div className="-z-20 w-full h-full filter blur-2xl object-cover block fixed top-0 bottom-0 left-0 right-0">
            <Image layout="fill" src="/bgDash.png" alt="bg" className="-z-50" />
          </div>
        </div>
        <Chat id={id} />
      </div>

      <div className="col-span-full lg:col-span-3 scrollbar-hide lg:-order-1 overflow-auto">
        <PdfView url={url} />
      </div>
    </div>
  );
}

export default ChatToFilePage;
