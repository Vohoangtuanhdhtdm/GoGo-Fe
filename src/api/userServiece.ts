import { api } from "@/axios/axiosConfig";

type TRole = "Member" | "Admin";

type TUserRole = {
  user: {
    fullName: string;
    email: string;
    avatarUrl: string | null;
    joinedAt: string;
  };
  role: TRole[];
};

export type UserAll = {
  userId: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  joinedAt: string;
};

export const getAllUser = async (): Promise<UserAll[]> => {
  const response = await api.get(`/User`);
  return response.data;
};

export const getInfoUser = async (userId: string): Promise<TUserRole> => {
  const response = await api.get(`/User/${userId}`);
  return response.data;
};
