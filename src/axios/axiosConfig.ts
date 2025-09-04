import axios from "axios";
import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const api: AxiosInstance = axios.create({
  baseURL: "https://localhost:7074/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token từ cookie vào header nếu có
api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
