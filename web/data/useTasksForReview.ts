import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface Task {
  id: number;
  title: string;
  description: string | null;
  taskState: string;
  createdAt: string;
  updatedAt: string;
  toUser: {
    id: number;
    username: string;
  };
}

const useTasksForReview = () => {
  const { data, error, mutate } = useSWR<Task[], AxiosError>("task/review", async () => {
    try {
      const response = await axiosInstance.get("task/review");
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  const loading = !error && !data;

  return { tasks: data, error, mutate, loading };
};

export default useTasksForReview;
