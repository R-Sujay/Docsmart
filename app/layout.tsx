import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Josefin_Sans, Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import RecoilContainer from "@/components/RecoilContainer";

export const metadata: Metadata = {
  title: "DocSmart",
  description: "Unlock the power of DocSmart! Upload a PDF and let DocSmart answer your questions, making it easier to access the information you need.",
};

const researcher = localFont({
  src: [
    { path: "../public/fonts/researcher-researcher-thin-200.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/researcher-researcher-squid-700.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/researcher-researcher-regular-400.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/researcher-researcher-bold-700.ttf", weight: "700", style: "normal" },
  ],
});

const josefinSans = Josefin_Sans({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

console.log(montserrat.style);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <RecoilContainer>
        <html lang="en">
          <body className="bg-[#0f1012]">{children}</body>
        </html>
      </RecoilContainer>
    </ClerkProvider>
  );
}
