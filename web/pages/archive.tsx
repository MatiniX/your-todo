import React, { ReactElement, useState } from "react";
import ArchivedTaskCard from "../components/ArchivedTaskCard";
import Layout from "../components/Layout";
import TaskDetailsModal from "../components/TaskDetailsModal";
import { useArchive } from "../data/useArchive";

const Archive = () => {
  const { isValidating, allTasks, setSize, size, hasMore, isLoadingMore } = useArchive();

  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <h1 className="page-header flex-initial">Archive</h1>
      <div className="">
        <div className="grid grid-cols-3 justify-items-center gap-4 mt-4 pb-4 overflow-auto">
          {isValidating
            ? "loading..."
            : allTasks?.map((task, index) => (
                <ArchivedTaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  setTaskDetailOpen={setTaskDetailOpen}
                  setSelectedTaskIdx={setSelectedTaskIdx}
                />
              ))}
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
      {isValidating ? null : (
        <TaskDetailsModal
          id={allTasks[selectedTaskIdx].id}
          description={allTasks[selectedTaskIdx].description}
          fromUser={allTasks[selectedTaskIdx].fromUser!.username}
          title={allTasks[selectedTaskIdx].title}
          isOpen={taskDetailOpen}
          setIsOpen={setTaskDetailOpen}
        />
      )}
    </div>
  );
};

Archive.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Archive;
