import { api } from "@/service/api";
import Cookies from "js-cookie";

// Lưu token vào cookie
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export const login = async (data: LoginData) => {
  const response = await api.post("/Account/login", data);
  console.log("response", response.data);
  Cookies.set("accessToken", response.data.token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });

  return response.data;
};

export const logout = () => {
  Cookies.remove("accessToken");
};
