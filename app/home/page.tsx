import { Metadata } from "next";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "DocSmart",
  description: "Unlock the power of DocSmart! Upload a PDF and let DocSmart answer your questions, making it easier to access the information you need.",
};

function page() {
  redirect("/");
  return;
}

export default page;
