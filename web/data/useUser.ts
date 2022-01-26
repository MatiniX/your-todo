import { AxiosError } from "axios";
import axiosInstance from "../utils/axiosInstance";
import useSWRImmutable from "swr/immutable";

export interface User {
  id: number;
  username: string;
}

const useUser = () => {
  const { data, mutate, error } = useSWRImmutable<User, AxiosError>("auth/me", async () => {
    try {
      const response = await axiosInstance.get("auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  const loading = !data && !error;
  const loggedOut = error && error.response?.status === 403;

  return { loading, loggedOut, user: data as User, mutate };
};

export default useUser;
