import axiosInstance from "./axiosInstance";

export async function login(usernameOrEmail: string, password: string) {
  try {
    const response = await axiosInstance.post("auth/login", { usernameOrEmail, password });
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
}
