import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface User {
  id: number;
  username: string;
}

export default function useUser() {
  const { data, mutate, error } = useSWR("auth/me", async () => {
    const response = await axiosInstance.get("auth/me");
    return response.data;
  });

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return { loading, loggedOut, user: data as User, mutate };
}
