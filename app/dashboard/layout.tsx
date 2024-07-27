import Header from "@/components/Header";
import getUserFiles from "@/utils/getUserFiles";
import { ClerkLoaded } from "@clerk/nextjs";
import React from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { files } = await getUserFiles();
  const totalDocs = files.docs.length > 0;
  return (
    <ClerkLoaded>
      <div className="flex flex-col flex-1 h-screen">
        <div className="max-w-7xl mx-auto w-full">
          <Header totalDocs={totalDocs} />
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
