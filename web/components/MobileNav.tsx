import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";

const MobileNav = () => {
  return (
    <div className="md:hidden relative h-16 bg-sky-500 flex items-center z-10 shadow">
      <Logo />
      <HamburgerMenu />
    </div>
  );
};

export default MobileNav;
