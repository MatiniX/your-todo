import Head from "next/head";
import React, { ReactElement, useState } from "react";
import CompleteTaskAlert from "../components/CompleteTaskAlert";
import ErrorDialog from "../components/ErrorDialog";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import SingleTask from "../components/SingleTask";
import TaskDetailsModal from "../components/TaskDetailsModal";
import { Task } from "../data/interfaces/Task";
import { useTasksToComplete } from "../data/useTasksToComplete";

const Tasks = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [completeTaskAlertOpen, setCompleteTaskAlertOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();

  const { allTasks, hasTasks, isLoading, error } = useTasksToComplete();

  return (
    <>
      <Head>
        <title>My Tasks</title>
      </Head>
      <h1 className="page-header">Your Tasks</h1>

      {isLoading ? (
        <div className="h-16 w-16 mx-auto mt-32">
          <LoadingSpinner />
        </div>
      ) : hasTasks ? (
        <>
          <div className="divide-y-2">
            {allTasks!.map((dailyTasks, idx) => {
              const { date, tasks } = dailyTasks;

              return (
                <div className="mb-2" key={idx}>
                  <h2 className="my-2 text-lg font-medium text-gray-500">{date}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tasks.map((task, idx) => (
                      <SingleTask
                        key={task.id}
                        task={task}
                        setDetailsOpen={setDetailsOpen}
                        setAlertOpen={setCompleteTaskAlertOpen}
                        setCurrentTask={setCurrentTask}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center mt-48">
          <h1 className="text-2xl text-gray-800">
            {error
              ? "There was an error while loading your tasks."
              : "Looks like you don't have any tasks."}
          </h1>
          <h2 className="text-gray-500">
            {error
              ? "Please come back later to see if the error magically disapeared."
              : "You can enjoy other activities!"}
          </h2>
        </div>
      )}
      {hasTasks && (
        <>
          <TaskDetailsModal
            isOpen={detailsOpen}
            setIsOpen={setDetailsOpen}
            task={currentTask}
            openErrorDialog={setErrorDialogOpen}
          />
          <CompleteTaskAlert
            task={currentTask}
            isOpen={completeTaskAlertOpen}
            setIsOpen={setCompleteTaskAlertOpen}
            openErrorDialog={setErrorDialogOpen}
          />
        </>
      )}
      <ErrorDialog
        open={errorDialogOpen}
        setIsOpen={setErrorDialogOpen}
        closeMessage="Close"
        title="Something went wrong"
        text="There was an unknown error. Try again later."
      />
    </>
  );
};

Tasks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Tasks;
