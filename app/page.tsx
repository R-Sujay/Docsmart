import Background from "@/components/Background";
import Button3D from "@/components/Button3D";
import Header from "@/components/Header";
import IsoAnimation from "@/components/IsoAnimation";
import Loading from "@/components/Loading";
import React from "react";

function page() {
  return (
    <div className="">
      <Background />
      {/* <Loading /> */}
      <div className="min-h-screen flex-col flex max-w-7xl mx-auto">
        <Header />
        <div className="flex-1 flex justify-between items-center">
          <div className="text-white flex-1 space-y-5">
            <div className="space-y-5">
              <h6 className="text-xl font-researcher">Get Ready</h6>
              <h1 className="text-8xl font-researcher font-bold">FUTURE</h1>
            </div>

            <p className="text-gray-500 font-josefinSans text-lg">Upload your document, and our chatbot will answer questions, summarize content, and answer all your Q's. Ideal for everyone, Chat with PDF turns static documents into dynamic conversations, enhancing productivity 10x fold effortlessly.</p>

            <div className="flex items-center justify-start space-x-5">
              <div className="overflow-hidden px-8 pt-4 pb-3 text-xl font-josefinSans flex cursor-pointer rounded-3xl bg-indigo-500">Get Started</div>
              {/* <Button3D /> */}
            </div>
          </div>

          <div className="flex-1">{/* <IsoAnimation /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default page;
