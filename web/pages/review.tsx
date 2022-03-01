import { PlusIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ReviewTask from "../components/ReviewTask";
import useTasksForReview from "../data/useTasksForReview";

const Review = () => {
  const { tasks, error, isLoading, hasTasks } = useTasksForReview();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Review Tasks</title>
      </Head>
      <h1 className="page-header">Review</h1>
      {isLoading ? (
        <div className="w-16 h-16 mx-auto mt-32">
          <LoadingSpinner />
        </div>
      ) : hasTasks ? (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
          {tasks?.map((task) => (
            <ReviewTask
              key={task.id}
              id={task.id}
              title={task.title}
              username={task.toUser!.username}
              completedOn={task.updatedAt}
            />
          ))}
          {error && "Error while fetching tasks"}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-32">
          <h3 className="text-gray-800 text-2xl text-center">
            Looks like there are no tasks to review.
          </h3>
          <h4 className="text-gray-400">Send some tasks to your friends!</h4>
          <button
            className="flex items-center gap-1 px-3 py-2 mt-4 bg-sky-500 hover:bg-sky-600 focus:ring-2 
        focus:ring-sky-600 focus:ring-offset-2 text-white rounded transition"
            onClick={() => router.replace("/create-task")}
          >
            <i>
              <PlusIcon className="w-5" />
            </i>
            <span>Create Task</span>
          </button>
        </div>
      )}
    </>
  );
};
Review.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Review;
