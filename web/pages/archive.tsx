import React, { ReactElement } from "react";
import ArchivedTaskCard from "../components/ArchivedTaskCard";
import Layout from "../components/Layout";
import { useArchive } from "../data/useArchive";

const Archive = () => {
  const { isValidating, allTasks, setSize, size, hasMore, isLoadingMore, isRefreshing } =
    useArchive();

  return (
    <div className="flex flex-col h-full">
      <h1 className="page-header flex-initial">Archive</h1>
      <div className="">
        <div className="grid grid-cols-3 justify-items-center gap-4 mt-4 pb-2 overflow-auto">
          {isValidating
            ? "loading..."
            : allTasks?.map((task) => <ArchivedTaskCard key={task.id} task={task} />)}
        </div>
        {hasMore && (
          <div className="text-center mt-4">
            <button
              disabled={isLoadingMore}
              className="px-3 py-2 bg-sky-100 text-sky-700 hover:bg-sky-200 hover:textsk rounded"
              onClick={() => setSize(size + 1)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Archive.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Archive;
