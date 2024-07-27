"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "./ui/input";
import getUserFiles from "@/utils/getUserFiles";

function Header({ totalDocs }: { totalDocs?: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between pt-10 lg:px-5 xl:px-0 px-5 md:px-10">
      <Link href="/" className="flex-shrink-0">
        <Image priority src="/logo.png" width={50} height={50} alt="logo" className="cursor-pointer" />
      </Link>

      {pathname !== "/" && (
        <SignedIn>
          <div className="flex items-center justify-between flex-1 text-white">
            <div className="max-w-2xl text-lg font-semibold font-montserrat text-gray-200 mx-auto flex-1 flex justify-between">
              <Link href="/dashboard/upgrade">Pricing</Link>

              <Link href="/dashboard">My Documents</Link>
              <Link href="/dashboard/upload">New Chat</Link>
            </div>
            <div className="">
              <UserButton />
            </div>
          </div>
        </SignedIn>
      )}
    </div>
  );
}

export default Header;
