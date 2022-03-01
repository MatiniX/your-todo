import axiosInstance from "./axiosInstance";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const login = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await axiosInstance.post("auth/login", { usernameOrEmail, password });
    return response.status === 200;
  } catch (error) {
    // Error handling
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("auth/logout");
    return response.status === 200;
  } catch (error) {
    // Error handling
    throw error;
  }
};

export const register = async (registerData: RegisterData) => {
  try {
    const response = await axiosInstance.post("auth/register", registerData);
    response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (email: string) => {
  return axiosInstance.get(`auth/forgot-password/${email}`);
};

export const changePassword = async (token: string, newPassword: string) => {
  return axiosInstance.post("auth/change-password", { token, newPassword });
};
