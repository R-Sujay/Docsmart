"use client";

import React from "react";
import { RecoilRoot } from "recoil";

function RecoilContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilContainer;
