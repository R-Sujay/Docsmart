"use client";

import React from "react";
import { CheckCircleIcon, HammerIcon, PlusIcon, RocketIcon, SaveIcon } from "lucide-react";
import { progressState, statusState } from "@/recoil/fileUploadAtom";
import { useRecoilValue } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import { StatusText } from "@/hooks/useUpload";

function PdfLoading() {
  const statusIcons: {
    [key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: <RocketIcon className="h-20 w-20 text-indigo-600" />,
    [StatusText.UPLOADED]: <CheckCircleIcon className="h-20 w-20 text-indigo-600" />,
    [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-indigo-600" />,
    [StatusText.GENERATING]: <HammerIcon className="h-20 w-20 text-indigo-600" />,
  };
  const progress = useRecoilValue<number | null>(progressState);
  const status = useRecoilValue<string | null>(statusState);
  const progressLoading = progress === null || progress === 100;

  return (
    <div className="flex justify-center flex-col items-center w-full h-full rounded-full relative">
      {
        //@ts-ignore
        statusIcons[status]!
      }
      <CircularProgress value={progress!} thickness={2} variant={progressLoading ? "indeterminate" : "determinate"} className="absolute !w-full !h-full" />
      <h1 className="text-center">{status}</h1>
    </div>
  );
}

export default PdfLoading;
