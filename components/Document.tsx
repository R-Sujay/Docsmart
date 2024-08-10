"use client";

import byteSize from "byte-size";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { DownloadCloud, Trash2Icon } from "lucide-react";
import { deleteDocument } from "@/actions/deleteDocument";
import useSubscription from "@/hooks/useSubscription";

function Document({ id, name, downloadUrl, size }: { id: string; name: string; downloadUrl: string; size: number }) {
  const router = useRouter();
  const [isDeleting, startTranstion] = useTransition();
  const { hasActiveMembership } = useSubscription();

  return (
    <div className="flex flex-col w-64 h-80 rounded-xl bg-gray-900 drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-[#3a506b] hover:text-white cursor-pointer group">
      <div
        className="flex-1"
        onClick={() => {
          router.push(`/dashboard/files/${id}`);
        }}
      >
        <p className="font-semibold line-clamp-2 text-white">{name}</p>
        <p className="text-sm text-gray-500 group-hover:text-indigo-100">{byteSize(size).toString()}</p>
      </div>

      <div className="flex space-x-2 justify-end">
        <Button
          disabled={isDeleting || !hasActiveMembership}
          className="border-gray-700 border"
          onClick={() => {
            const prompt = window.confirm("Are you sure you want to delete this document?");
            if (prompt) {
              // delete document
              startTranstion(async () => {
                await deleteDocument(id);
              });
            }
          }}
        >
          <Trash2Icon className="h-6 w-6 text-red-500" />
          {!hasActiveMembership && <span className="text-red-500 ml-2">PRO Feature</span>}
        </Button>
        <Button className="border-gray-700 border" asChild>
          <a href={downloadUrl} download>
            <DownloadCloud className="h-6 w-6 text-indigo-600" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Document;
