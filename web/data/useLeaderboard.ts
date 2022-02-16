import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface UserStats {
  id: number;
  username: string;
  trustPoints: number;
}

const useLeaderboard = () => {
  const { data, error, mutate } = useSWR<UserStats[], AxiosError>("user/leaderboard", async () => {
    try {
      const response = await axiosInstance.get("user/leaderboard");
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  const isLoading = !data && !error;

  return { data, error, mutate, isLoading };
};

export { useLeaderboard };
