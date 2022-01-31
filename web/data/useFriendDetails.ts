import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface FriendDetails {
  username: string;
  trustPoints: number;
  memberSince: string;
  tasksSent: number;
  tasksRecieved: number;
}

const useFriendDetails = (id: number) => {
  const { data, error, mutate } = useSWR<FriendDetails, AxiosError>(
    id ? "user/friends/:id" : null,
    async () => {
      try {
        const response = await axiosInstance.get(`user/friends/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  const loading = !data && !error;

  return { friendDetails: data, error, loading, mutate };
};

export default useFriendDetails;
