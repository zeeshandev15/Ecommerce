import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 mr-3 md:mr-0">
      <Image src={"/images/logo.png"} width={40} height={40} alt="brand" />
      <p className="text-2xl font-bold">SELL EASE</p>
    </Link>
  );
};

export default Logo;
