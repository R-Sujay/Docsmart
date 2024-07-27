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
  const router = useRouter();

  return (
    <div className="flex items-center justify-between pt-10 lg:px-5 xl:px-0 px-5 md:px-10">
      <div className="flex items-center flex-shrink-0 flex-1">
        <Link href="/" className="flex-shrink-0">
          <Image priority src="/logo.png" width={60} height={60} alt="logo" className="cursor-pointer" />
        </Link>
        {totalDocs && pathname === "/dashboard" && <Input placeholder="Search for a document" className="sm:mx-10 pl-5 text-lg text-white focus:border-red-100 mx-5 bg-[#0f1012] h-14 max-w-lg border-0" />}
      </div>

      {pathname !== "/" && (
        <SignedIn>
          <div className="flex items-center space-x-2 text-white">
            <Button asChild variant="link" className="hidden md:flex">
              <Link href="/dashboard/upgrade" className="text-lg text-white">
                Pricing
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/dashboard" className="text-lg text-white">
                My Documents
              </Link>
            </Button>

            <Button asChild variant="outline" className="border-indigo-600">
              <Link href="/dashboard/upload" className="text-lg text-white">
                <FilePlus2 className="text-indigo-600" />
              </Link>
            </Button>

            <UserButton />
          </div>
        </SignedIn>
      )}
    </div>
  );
}

export default Header;
