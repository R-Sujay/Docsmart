"use client";

import React from "react";
import FileUploader from "@/components/FileUploader";
import PdfLoading from "@/components/PdfLoading";
import { useRecoilState } from "recoil";
import { tabState } from "@/recoil/fileUploadAtom";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";

function FileUpload() {
  const [tab, setTab] = useRecoilState<number>(tabState);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 100 }}
        className={`bg-[rgba(_255,_255,_255,_0_)] backdrop-filter backdrop-blur-[90px] relative z-0 overflow-hidden cursor-pointer text-gray-400/95 flex flex-col justify-center items-center transition-all ${tab === 1 ? "w-[80%] h-[80%] rounded-3xl" : "w-96 h-96 rounded-full"}`}
        onClick={() => {
          if (tab === 0) {
            setTab(1);
          }
        }}
      >
        {/* <img src="https://static.vecteezy.com/system/resources/previews/021/680/448/non_2x/gradient-indigo-background-illustration-free-photo.jpg" className="absolute -z-10 filter blur-2xl" alt="" /> */}

        {tab === 1 ? (
          <FileUploader />
        ) : tab === 3 ? (
          <PdfLoading />
        ) : (
          <>
            <PlusIcon className="h-28 w-28" />
            <h1>Upload Your First Document</h1>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default FileUpload;
