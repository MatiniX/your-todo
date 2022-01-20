import Router from "next/router";
import React, { ReactNode, useEffect } from "react";
import useUser from "../data/useUser";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { loggedOut, loading } = useUser();

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/login");
    }
  }, [loggedOut]);

  if (loggedOut) return <h1>redirecting...</h1>;

  return (
    <div className="flex h-screen">
      {loading ? (
        <h1>loading indicator...</h1>
      ) : (
        <>
          <Sidebar />
          <div className="ml-72 w-full">
            <TopNav />
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
