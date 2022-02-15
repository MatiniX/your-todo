import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";
import { Task } from "./interfaces/Task";

interface TasksToComplete {
  date: string;
  tasks: Task[];
}

const useTasksToComplete = () => {
  const { data, error, mutate, isValidating } = useSWR<TasksToComplete[], AxiosError>(
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

  const hasTasks = data && data.length > 0;
  const isLoading = !data && !error;

  return { allTasks: sortedData, error, hasTasks, isLoading, isValidating, mutate };
};
export { useTasksToComplete };
