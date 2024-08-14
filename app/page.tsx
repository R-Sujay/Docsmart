import Background from "@/components/Background";
import Header from "@/components/Header";
import HeroAnimation from "@/components/HeroAnimation";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "DocSmart",
  description: "Unlock the power of DocSmart! Upload a PDF and let DocSmart answer your questions, making it easier to access the information you need.",
};

function page() {
  return (
    <div className="">
      <Background />
      <div className="min-h-screen flex-col justify-between flex max-w-7xl mx-auto">
        <Header />
        <div className="flex-1 flex justify-between xl:p-0 px-5 items-center">
          <div className="text-white flex-1 space-y-5 text-center lg:text-left py-10 heightMin:py-0">
            <div className="space-y-5">
              <h6 className="text-xl font-researcher">Get Ready</h6>
              <h1 className="text-7xl uppercase font-researcher font-bold">DocSmart</h1>
            </div>

            <p className="text-gray-500 font-josefinSans text-lg max-w-2xl mx-auto">Upload your document and our chatbot will answer questions summarize content and answer all your Qs. Ideal for everyone Chat with PDF turns static documents into dynamic conversations enhancing productivity 10x fold effortlessly.</p>

            <div className="flex items-center justify-center lg:justify-start space-x-5 mt-5">
              <div className="relative hidden lg:inline">
                <Link
                  href="/dashboard"
                  className="button absolute font-josefinSans transform w-[180px] h-[50px] text-center leading-[53px] text-gray-200 hover:text-white text-xl uppercase no-underline box-border bg-[linear-gradient(90deg,_#00343a,_#290665,_#0022b5,_#3031fe)] [background-size:400%] rounded-3xl z-10
      hover:animate-[animate_8s_linear_infinite] "
                >
                  Get Started
                </Link>
              </div>

              <div className="lg:hidden mt-5 -ml-10">
                <Link href="/dashboard" className="font-josefinSans pt-5 pb-4 px-5 text-white text-xl uppercase bg-[linear-gradient(90deg,_#00343a,_#290665,_#0022b5,_#3031fe)] rounded-3xl z-10">
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 flex-col justify-center items-center lg:flex hidden">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
