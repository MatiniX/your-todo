import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface TasksToComplete {
  date: string;
  tasks: {
    id: number;
    title: string;
    description: string | null;
    taskState: string;
    createdAt: Date;
    updatedAt: Date;
    fromUser: {
      id: number;
      username: string;
    };
  }[];
}

const useTasksToComplete = () => {
  const { data, error, mutate } = useSWR<TasksToComplete[], AxiosError>(
    "task/to-complete",
    async () => {
      try {
        const response = await axiosInstance.get("task/to-complete");
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  // zoradí tasky podľa dátumu vytvorenia od najnovších
  const sortedData = data?.sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0));
  const loading = !data && !error;

  return { allTasks: sortedData, error, loading, mutate };
};
export { useTasksToComplete };
