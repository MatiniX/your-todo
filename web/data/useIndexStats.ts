import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface IndexStats {
  myRank: string;
  taskToComplete: number;
  taskToReview: number;
}

const useIndexStats = () => {
  const { data, isValidating, error, mutate } = useSWR<IndexStats, AxiosError>(
    "user/index-stats",
    async () => {
      try {
        const response = await axiosInstance.get("user/index-stats");
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  return { stats: data, isValidating, error, mutate };
};

export { useIndexStats };
