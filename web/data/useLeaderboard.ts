import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

const useLeaderboard = () => {
  const { data, error, mutate } = useSWR("user/leaderboard", async () => {
    try {
      const response = await axiosInstance.get("user/leaderboard");
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  const loading = !data && !error;

  return { data, error, mutate, loading };
};

export { useLeaderboard };
