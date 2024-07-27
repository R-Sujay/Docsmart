"use client";

import useUpload from "@/hooks/useUpload";
import { fileIdState, tabState } from "@/recoil/fileUploadAtom";
import { CircleArrowDown, RocketIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilValue } from "recoil";

function FileUploader() {
  const { handleUpload } = useUpload();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    const file = acceptedFiles[0];
    if (file) {
      await handleUpload(file);
    } else {
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({ onDrop, accept: { "application/pdf": [".pdf"] } });

  return (
    <div {...getRootProps()} className={`p-10 border-[#012e29] w-full relative z-0 text-[#c7c3be] border-dashed border-2 rounded-3xl h-full flex items-center justify-center ${isFocused || isDragAccept ? "bg-clip-padding backdrop-filter backdrop-blur-[100] bg-opacity-10 bg-white" : "bg-clip-padding backdrop-filter backdrop-blur-[100] bg-opacity-10"}`}>
      <input {...getInputProps()} />
      {/* <img src="https://static.vecteezy.com/system/resources/previews/021/680/448/non_2x/gradient-indigo-background-illustration-free-photo.jpg" className="absolute -z-10 filter blur-2xl" alt="" /> */}

      <div className="flex flex-col justify-center items-center">
        {isDragActive ? (
          <>
            <RocketIcon className="h-20 w-20 animate-ping" />
            <p>Drop the files here ...</p>
          </>
        ) : (
          <>
            <CircleArrowDown className="h-20 w-20 animate-bounce" />
            <p>Drag n drop some files here, or click to select files</p>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
