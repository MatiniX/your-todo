import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface UserStats {
  trustPoints: number;
  tasksCompleted: number;
  tasksFailed: number;
  friends: number;
  tasksSent: number;
  tasksRecieved: number;
}

const useUserStats = () => {
  const { data, isValidating, error, mutate } = useSWR<UserStats, AxiosError>(
    "user/stats",
    async () => {
      try {
        const response = await axiosInstance.get("user/stats");
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  return { userStats: data, error, isValidating, mutate };
};

export { useUserStats };
