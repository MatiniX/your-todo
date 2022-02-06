import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

interface FriendRequest {
  id: number;
  state: string;
  fromUserId: number;
  toUserId: number;
  createdAt: string;
  updatedAt: string;
  fromUser: {
    username: string;
  };
}

const useFriendRequests = () => {
  const { data, error, isValidating, mutate } = useSWR<FriendRequest[], AxiosError>(
    "user/friend-request",
    async () => {
      try {
        const response = await axiosInstance.get("user/friend-request");
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );
  return { friendRequests: data, error, isValidating, mutate };
};

export { useFriendRequests };
