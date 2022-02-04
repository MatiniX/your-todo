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

const useUserInfo = (id: number) => {
  const { data, error, isValidating, mutate } = useSWR<UserDetails, AxiosError>(
    id ? "user/info/:id" : null,
    async () => {
      try {
        const response = await axiosInstance.get(`user/info/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  const isLoading = !error && !data;

  return { userInfo: data, error, isValidating, isLoading, mutate };
};

export { useUserInfo };
