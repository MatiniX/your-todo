import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import useUser from "../data/useUser";

const Home: NextPage = () => {
  const { user, loading, loggedOut } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <h1 className="inline-block mx-auto text-9xl font-black">Index page </h1>
      <h1>{user.username}</h1>
      <h1>{user.id}</h1>
    </div>
  );
};

export default Home;
