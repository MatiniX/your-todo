import { mutate } from "swr";
import axiosInstance from "./axiosInstance";

const removeFriend = async (friendId: number) => {
  try {
    const response = await axiosInstance.delete(`user/cancel-friendship/${friendId}`);
    mutate("user/friends"); // Invalidate friend list cache
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendFriendRequest = async (username: string): Promise<string> => {
  try {
    const response = await axiosInstance.post(`user/friend-request/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { removeFriend, sendFriendRequest };
