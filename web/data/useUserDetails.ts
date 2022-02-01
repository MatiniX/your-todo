import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface UserDetails {
  username: string;
  trustPoints: number;
  memberSince: string;
  tasksSent: number;
  tasksRecieved: number;
}

const useUserDetails = (id: number) => {
  const { data, error, isValidating, mutate } = useSWR<UserDetails, AxiosError>(
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

  const isLoading = !error && !data;

  return { friendDetails: data, error, isValidating, isLoading, mutate };
};

export { useUserDetails };
