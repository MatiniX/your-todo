import axiosInstance from "./axiosInstance";

const markAsSeen = async (ids: Array<Number>) => {
  try {
    const response = await axiosInstance.patch("user/notifications", ids);
    return response.status === 200;
  } catch (error) {
    throw error;
  }
};

export { markAsSeen };
