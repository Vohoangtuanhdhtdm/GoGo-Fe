import { api } from "@/service/api";
import Cookies from "js-cookie";

// Lưu token vào cookie
export interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post("/Account/login", data);
  console.log("response", response.data);
  Cookies.set("token", response.data.token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });

  return response.data;
};
