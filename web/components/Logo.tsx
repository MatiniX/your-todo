import React from "react";
import { BsListCheck } from "react-icons/bs";
import NextLink from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <NextLink href="/">
      <a className="flex items-center md:mt-2 w-full text-white">
        <div className="w-8 h-8 md:w-12 md:h-12 mr-2 ml-5">
          <Image src="/logo.svg" alt="logo" width={128} height={128} layout="responsive" />
        </div>
        <h1 className="font-bold text-2xl md:text-4xl ">Your Todo</h1>
      </a>
    </NextLink>
  );
};

export default Logo;
