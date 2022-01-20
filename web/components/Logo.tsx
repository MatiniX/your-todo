import React from "react";
import { BsListCheck } from "react-icons/bs";
import NextLink from "next/link";

const Logo = () => {
  return (
    <NextLink href="/">
      <a className="flex items-center mt-2 w-full text-white">
        <BsListCheck className="w-12 h-12 mr-2 ml-5" />
        <h1 className="font-bold  text-4xl ">Your Todo</h1>
      </a>
    </NextLink>
  );
};

export default Logo;
