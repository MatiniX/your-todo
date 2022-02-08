import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";
import { Task } from "./interfaces/Task";

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
