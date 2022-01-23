import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import SingleTask from "../components/SingleTask";

const allTasks = [
  {
    date: new Date(2020, 1, 23),
    tasks: [
      {
        id: 29,
        title: "Task od joza pre mata",
        description: null,
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:26:43.773Z",
        updatedAt: "2022-01-23T07:26:43.773Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
      {
        id: 30,
        title: "Task od joza pre mata",
        description: "tu aj nejaky daky ten desrciption",
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:28:31.321Z",
        updatedAt: "2022-01-23T07:28:31.321Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
      {
        id: 31,
        title: "Task od joza pre mata s dlhym title",
        description: "tu aj nejaky daky ten desrciption",
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:28:31.321Z",
        updatedAt: "2022-01-23T07:28:31.321Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
      {
        id: 31,
        title: "Task od joza pre mata s dlhym title",
        description: "tu aj nejaky daky ten desrciption",
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:28:31.321Z",
        updatedAt: "2022-01-23T07:28:31.321Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
    ],
  },
  {
    date: new Date(2020, 1, 22),
    tasks: [
      {
        id: 29,
        title: "Task od joza pre mata",
        description: null,
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:26:43.773Z",
        updatedAt: "2022-01-23T07:26:43.773Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
      {
        id: 30,
        title: "Task od joza pre mata",
        description: "tu aj nejaky daky ten desrciption",
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:28:31.321Z",
        updatedAt: "2022-01-23T07:28:31.321Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
      {
        id: 31,
        title: "Task od joza pre mata s dlhym title",
        description: "tu aj nejaky daky ten desrciption",
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:28:31.321Z",
        updatedAt: "2022-01-23T07:28:31.321Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
      {
        id: 31,
        title: "Task od joza pre mata s dlhym title",
        description: "tu aj nejaky daky ten desrciption",
        taskState: "awaiting",
        fromUserId: 2,
        toUserId: 1,
        createdAt: "2022-01-23T07:28:31.321Z",
        updatedAt: "2022-01-23T07:28:31.321Z",
        fromUser: {
          id: 2,
          username: "jozo",
          email: "test@test.com",
          trustPoints: 30,
          createdAt: "2022-01-08T13:54:40.643Z",
          updatedAt: "2022-01-13T15:40:54.318Z",
        },
      },
    ],
  },
];

const Tasks = () => {
  return (
    <>
      <h1 className="page-header">Your Tasks</h1>
      <div className="divide-y-2 pr-4">
        {allTasks.map((dailyTasks, idx) => {
          const { date, tasks } = dailyTasks;
          console.log(date);
          return (
            <div className="mb-2">
              <h2 className="my-2 text-lg font-medium text-gray-500">
                {date.toLocaleDateString()}
              </h2>
              <div className="flex flex-wrap gap-4">
                {tasks.map((task, idx) => (
                  <SingleTask
                    key={idx}
                    id={task.id}
                    title={task.title}
                    fromUser={task.fromUser.username}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

Tasks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Tasks;
