import axiosInstance from "./axiosInstance";

interface Task {
  title: string;
  to: number;
  description?: string;
}

const createTask = async (task: Task) => {
  try {
    const response = await axiosInstance.post("task/create", { toUserId: task.to, ...task });
    return response.data.toUser.username;
  } catch (error) {
    throw error;
  }
};

export default createTask;
