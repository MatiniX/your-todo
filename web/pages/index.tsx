import { FolderAddIcon } from "@heroicons/react/outline";
import {
  BadgeCheckIcon,
  ChartSquareBarIcon,
  PencilAltIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import Layout from "../components/Layout";
import { useIndexStats } from "../data/useIndexStats";
import useUser from "../data/useUser";

const Home = () => {
  const { stats, isValidating, error } = useIndexStats();
  const { user, loading } = useUser();

  useEffect(() => {
    console.log(document.cookie);
  }, []);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1 className="mt-4 text-center text-4xl text-gray-800 font-bold">
        Welcome back {loading ? "" : user!.username}
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-8 mt-16">
        <div
          className="flex items-center gap-4 py-4 px-8 bg-white shadow rounded-md flex-auto max-w-xs
        transition hover:scale-105 cursor-pointer"
          onClick={() => router.replace("/tasks")}
        >
          <i>
            <PencilAltIcon className="w-16 text-sky-500" />
          </i>
          <div className="flex flex-col">
            <p className="text-gray-500">Tasks to complete</p>
            {isValidating ? (
              <div className="w-full pr-4 mt-1">
                <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <span className="text-gray-800 text-4xl font-bold">{stats?.taskToComplete}</span>
            )}
          </div>
        </div>
        <div
          className="flex items-center gap-4 py-4 px-8 bg-white shadow rounded-md flex-auto max-w-xs
        transition hover:scale-105 cursor-pointer"
          onClick={() => router.replace("/review")}
        >
          <i>
            <BadgeCheckIcon className="w-16 text-sky-500" />
          </i>
          <div className="flex flex-col">
            <p className="text-gray-500">Tasks to review</p>
            {isValidating ? (
              <div className="w-full pr-4 mt-1">
                <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <span className="text-gray-800 text-4xl font-bold">{stats?.taskToReview}</span>
            )}
          </div>
        </div>
        <div
          className="flex items-center gap-4 py-4 px-8 bg-white shadow rounded-md flex-auto max-w-xs
        transition hover:scale-105 cursor-pointer"
          onClick={() => router.replace("/leaderboard")}
        >
          <i>
            <ChartSquareBarIcon className="w-16 text-sky-500" />
          </i>
          <div className="flex flex-col">
            <p className="text-gray-500">Global rank</p>
            {isValidating ? (
              <div className="w-full pr-4 mt-1">
                <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <span className="text-gray-800 text-4xl font-bold">#{stats?.myRank}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-16">
        <i>
          <FolderAddIcon className="w-16 text-gray-400" />
        </i>
        <h3 className="text-gray-400">Create a task and send it to a friend</h3>
        <button
          className="flex items-center gap-1 px-3 py-2 my-4 bg-sky-500 hover:bg-sky-600 focus:ring-2 
        focus:ring-sky-600 focus:ring-offset-2 text-white rounded transition"
          onClick={() => router.replace("/create-task")}
        >
          <i>
            <PlusIcon className="w-5" />
          </i>
          <span>Create Task</span>
        </button>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
