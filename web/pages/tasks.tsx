import React, { ReactElement, useState } from "react";
import CompleteTaskAlert from "../components/CompleteTaskAlert";
import Layout from "../components/Layout";
import SingleTask from "../components/SingleTask";
import TaskDetailsModal from "../components/TaskDetailsModal";
import { useTasksToComplete } from "../data/useTasksToComplete";

const Tasks = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(-1);
  const [currentTaskTitle, setCurrentTaskTitle] = useState("");
  const [currentTaskDescription, setCurrentTaskDescription] = useState<string | null>("");
  const [currentTaskAuthor, setCurrentTaskAuthor] = useState("");
  const [completeTaskAlertOpen, setCompleteTaskAlertOpen] = useState(false);

  const { allTasks, loading, error, mutate } = useTasksToComplete();

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <h1 className="page-header">Your Tasks</h1>
          <div className="divide-y-2 pr-4">
            {allTasks!.map((dailyTasks, idx) => {
              const { date, tasks } = dailyTasks;
              console.log(date);
              return (
                <div className="mb-2" key={idx}>
                  <h2 className="my-2 text-lg font-medium text-gray-500">{date}</h2>
                  <div className="flex flex-wrap gap-4">
                    {tasks.map((task, idx) => (
                      <SingleTask
                        key={idx}
                        id={task.id}
                        title={task.title}
                        fromUser={task.fromUser.username}
                        description={task.description}
                        setDetailsOpen={setDetailsOpen}
                        setCurrentTaskAuthor={setCurrentTaskAuthor}
                        setCurrentTaskDescritpion={setCurrentTaskDescription}
                        setCurrentTaskTitle={setCurrentTaskTitle}
                        setAlertOpen={setCompleteTaskAlertOpen}
                        setCurrentTaskId={setCurrentTaskId}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <TaskDetailsModal
            id={currentTaskId}
            title={currentTaskTitle}
            fromUser={currentTaskAuthor}
            description={currentTaskDescription}
            isOpen={detailsOpen}
            setIsOpen={setDetailsOpen}
          />
          <CompleteTaskAlert
            isOpen={completeTaskAlertOpen}
            setIsOpen={setCompleteTaskAlertOpen}
            taskTitle={currentTaskTitle}
            fromUser={currentTaskAuthor}
            taskId={currentTaskId}
            mutate={mutate}
          />
        </>
      )}
    </>
  );
};

Tasks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Tasks;
