import Router from "next/router";
import React, { ReactNode, useEffect } from "react";
import useUser from "../data/useUser";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { loggedOut } = useUser();

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/login");
    }
  }, [loggedOut]);

  if (loggedOut) return <h1>redirecting...</h1>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="md:ml-72 w-full">
        <TopNav />
        <MobileNav />
        <main className="px-8 py-4 h-content bg-gray-50 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
