import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { useState } from "react";

async function getUserFiles() {
  const { userId } = await auth();
  let files;

  if (!userId) {
    throw new Error("User not found");
  }

  files = await adminDb.collection("users").doc(userId).collection("files").get();
  return { files };
}

export default getUserFiles;
