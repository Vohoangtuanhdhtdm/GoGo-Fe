import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { getInfoUser } from "@/api/userServiece";

interface DecodedToken {
  nameid: string; // User ID
  exp: number; // Expiration time
}

type User = {
  id: string;
  name: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const authenticateUser = async () => {
      // 1. Kiểm tra token có tồn tại hay không
      const token = Cookies.get("accessToken");

      if (!token) {
        setIsLoading(false);
        return; // Không có token, kết thúc sớm
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        console.log("decode", decoded);
        // 2. Kiểm tra token còn hạn hay không
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove("accessToken");
          setIsLoading(false);
          return;
        }

        // 3. Nếu còn hạn, gọi API lấy thông tin người dùng
        // Điều này đảm bảo dữ liệu (đặc biệt là role) luôn mới nhất
        const userInfo = await getInfoUser(decoded.nameid);

        if (userInfo) {
          setUser({
            id: decoded.nameid,
            name: userInfo.user.fullName,
            email: userInfo.user.email,
          });
          setIsAuth(true);

          // Kiểm tra quyền Admin từ kết quả API
          if (userInfo.role.includes("Admin")) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        // Lỗi có thể xảy ra khi: token không hợp lệ, API getInfoUser thất bại (vd: user đã bị xóa)
        console.error("Authentication failed:", error);
        Cookies.remove("accessToken");
        // Reset lại state để đảm bảo an toàn
        setUser(null);
        setIsAuth(false);
        setIsAdmin(false);
      } finally {
        // Luôn tắt loading sau khi hoàn tất
        setIsLoading(false);
      }
    };

    authenticateUser();
  }, []);

  if (isLoading) {
    return <div>Đang tải ứng dụng...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
