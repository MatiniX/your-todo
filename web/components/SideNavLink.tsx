import React, { ReactNode } from "react";
import NextLink from "next/link";

interface SideNavLinkProps {
  to: string;
  name: string;
  icon: ReactNode;
}

const SideNavLink = ({ to, name, icon }: SideNavLinkProps) => {
  return (
    <div>
      <NextLink href={to}>
        <a className="mx-2 py-3 md:mx-1 md:py-2 flex items-center text-sky-500 md:text-white rounded hover:bg-sky-700 transition">
          <i className="mx-4">{icon}</i>
          <h3 className="text-xl font-medium">{name}</h3>
        </a>
      </NextLink>
    </div>
  );
};

export default SideNavLink;
