import { mutate } from "swr";
import axiosInstance from "./axiosInstance";

const markAsSeen = async (ids: Array<Number>) => {
  try {
    const response = await axiosInstance.patch("user/notifications", ids);
    mutate("user/notifications");
    return response.status === 200;
  } catch (error) {
    throw error;
  }
};

export { markAsSeen };
