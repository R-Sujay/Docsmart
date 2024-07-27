"use client";

import { generateEmbeddings } from "@/actions/generateEmbeddings";
import { db, storage } from "@/firebase";
import { fileIdState, progressState, statusState, tabState } from "@/recoil/fileUploadAtom";
import { useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

export enum StatusText {
  UPLOADING = "Uploading file...",
  UPLOADED = "File Uploaded successfully",
  SAVING = "Saving file to database...",
  GENERATING = "Generating AI Embeddings, This will only take a few seconds",
}

export type Status = StatusText[keyof StatusText];

function useUpload() {
  const setProgress = useSetRecoilState<number | null>(progressState);
  const setFileId = useSetRecoilState<string | null>(fileIdState);
  const setStatus = useSetRecoilState<string | null>(statusState);
  const { user } = useUser();
  const router = useRouter();
  const setTab = useSetRecoilState<number>(tabState);
  async function handleUpload(file: File) {
    if (!file || !user) return;
    setTab(3);

    const fileIdToUploadTo = uuidv4();

    const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setStatus(StatusText.UPLOADING);
        setProgress(percent);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        setStatus(StatusText.UPLOADED);

        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

        setStatus(StatusText.SAVING);

        await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadUrl: downloadUrl,
          ref: uploadTask.snapshot.ref.fullPath,
          createAt: new Date(),
        });
        console.log(downloadUrl);

        setStatus(StatusText.GENERATING);

        await generateEmbeddings(fileIdToUploadTo);

        setStatus(StatusText.UPLOADED);

        router.push("/dashboard");

        setFileId(fileIdToUploadTo);
      }
    );
  }

  return {
    handleUpload,
  };
}

export default useUpload;
