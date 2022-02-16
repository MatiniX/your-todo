import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface UserDetails {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

const useUserDetails = () => {
  const { data, isValidating, error, mutate } = useSWR<UserDetails, AxiosError>(
    "user/info",
    async () => {
      try {
        const response = await axiosInstance.get("user/details");
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  const isLoading = !data && !error;

  return { userDetails: data, error, isLoading, mutate };
};

export { useUserDetails };
