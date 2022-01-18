import type { NextPage } from "next";
import { useEffect } from "react";
import useUser from "../data/useUser";
import { logout } from "../utils/auth";
import Router from "next/router";

const Home: NextPage = () => {
  const { user, loading, loggedOut, mutate } = useUser();

  useEffect(() => {
    console.log(loggedOut);
    if (loggedOut) {
      Router.push("/login");
    }
  }, [loggedOut]);

  if (loggedOut) return <p>redirecting...</p>;

  return (
    <div>
      <h1 className="inline-block mx-auto text-9xl font-black">Index page </h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <h1>{user.username}</h1>
          <h1>{user.id}</h1>
          <button
            onClick={async () => {
              await logout();
              await mutate();
              Router.push("/login");
            }}
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
