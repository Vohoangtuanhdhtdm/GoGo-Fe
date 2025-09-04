import { api } from "@/axios/axiosConfig";

export const AssignRole = async (userId: string) => {
  const response = await api.post(`/Admin/users/${userId}/assign-admin`);
  return response.data;
};
