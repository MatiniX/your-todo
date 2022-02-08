import React, { ReactElement, useEffect, useState } from "react";
import ArchivedTaskCard from "../components/ArchivedTaskCard";
import Layout from "../components/Layout";
import TaskDetailsModal from "../components/TaskDetailsModal";
import { Task } from "../data/interfaces/Task";
import { useArchive } from "../data/useArchive";

const Archive = () => {
  const { allTasks, setSize, size, hasMore, isLoadingMore } = useArchive();

  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(0);
  const [selectedTask, setselectedTask] = useState<Task>();
  useEffect(() => {
    if (allTasks.length > 0) {
      setselectedTask(allTasks[selectedTaskIdx]);
    }
  }, [selectedTaskIdx, allTasks]);

  return (
    <div className="flex flex-col h-full">
      <h1 className="page-header flex-initial">Archive</h1>
      <div className="">
        <div className="grid grid-cols-3 justify-items-center gap-4 mt-4 py-4 overflow-auto">
          {allTasks?.map((task, index) => (
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
      {isLoadingMore || !selectedTask ? null : (
        <TaskDetailsModal
          isOpen={taskDetailOpen}
          setIsOpen={setTaskDetailOpen}
          task={selectedTask}
        />
      )}
    </div>
  );
};

Archive.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Archive;
