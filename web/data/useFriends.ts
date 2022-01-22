import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";
import { User } from "./useUser";

const useFriends = () => {
  const { data, error, mutate } = useSWR<User[], AxiosError>("user/friends", async () => {
    try {
      const response = await axiosInstance.get("user/details");
      return response.data.friends;
    } catch (error) {
      throw error;
    }
  });
  const loading = !data && !error;

  return { friends: data, loading, mutate };
};

export default useFriends;
