import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-between py-10">
      <Image priority src="/logo.png" width={60} height={60} alt="logo" />
    </div>
  );
}

export default Header;
