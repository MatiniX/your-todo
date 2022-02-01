import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import ReviewTask from "../components/ReviewTask";
import useTasksForReview from "../data/useTasksForReview";

const Review = () => {
  const { tasks, error, loading } = useTasksForReview();

  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <h1 className="page-header">Review</h1>
          <div className="flex flex-wrap mt-4 gap-4">
            {tasks!.map((task) => (
              <ReviewTask
                key={task.id}
                id={task.id}
                title={task.title}
                username={task.toUser.username}
                completedOn={task.updatedAt}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
Review.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Review;
