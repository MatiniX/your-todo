import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface Friend {
  id: number;
  username: string;
  trustPoints: number;
}

const useFriends = () => {
  const { data, error, mutate } = useSWR<Friend[], AxiosError>("user/friends", async () => {
    try {
      const response = await axiosInstance.get("user/friends");
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  const loading = !data && !error;

  return { friends: data, loading, mutate, error };
};

export default useFriends;
