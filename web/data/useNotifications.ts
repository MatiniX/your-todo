import { AxiosError } from "axios";
import useSWR from "swr";
import axiosInstance from "../utils/axiosInstance";

export interface Notification {
  id: number;
  type:
    | "friendship_canceled"
    | "new_friend_request"
    | "new_task"
    | "friend_request_accepted"
    | "friend_request_rejected"
    | "task_completed"
    | "task_rejected"
    | "task_accepted";
  message: string;
  seen: boolean;
  userId: number | null;
  taskId: number | null;
  friendRequestId: number | null;
  createdAt: string;
}

const useNotifications = () => {
  const { data, error, isValidating, mutate } = useSWR<Notification[], AxiosError>(
    "user/notifications",
    async () => {
      try {
        const response = await axiosInstance.get("user/notifications");
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  const hasNew = data && data.length > 0;

  return { notifications: data, error, hasNew, isValidating, mutate };
};

export { useNotifications };
