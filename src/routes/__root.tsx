import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BarChart2,
  BookOpen,
  Library,
  LogOut,
  Map,
  PlusCircle,
  Sparkle,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react";
import { UserContext } from "@/context/UserContext";
import UILogin from "@/components/module/Auth/UILogin";
import { useContext } from "react";
import { logout } from "@/api/authService";
import { UserAvatar } from "@/components/module/User/UserAvatar/UserAvatar";

function RootLayout() {
  const { isAuth, isAdmin, setIsAuth, setUser, setIsAdmin } =
    useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsAuth(false);
    setIsAdmin(false);
  };
  return (
    <div>
      <Menubar className="rounded-none border-b p-6 flex items-center">
        <div className="w-[15%]">
          <MenubarMenu>
            <MenubarTrigger>GoGo!</MenubarTrigger>
            <MenubarContent>
              <Link to="/" className="[&.active]:font-bold">
                <MenubarItem>Về GoGo!</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </div>
        <div className="ml-20 w-[50%]  flex items-center justify-center space-x-6">
          <MenubarMenu>
            <MenubarTrigger>
              <BookOpen className="mr-2 h-4 w-4" />
              Khóa học
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/course">
                <MenubarItem>
                  <Library className="mr-2 h-4 w-4" />
                  Tất cả khóa học
                </MenubarItem>
              </Link>
              <Link to="/about">
                <MenubarItem>
                  <Sparkle className="mr-2 h-4 w-4" />
                  Khóa học mới
                </MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Map className="mr-2 h-4 w-4" />
              Lộ trình
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/about">
                <MenubarItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Tạo lộ trình
                </MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Trophy className="mr-2 h-4 w-4" />
              Bảng xếp hạng
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/ranking">
                <MenubarItem>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Bảng xếp hạng tuần
                </MenubarItem>
              </Link>
              <Link to="/about">
                <MenubarItem>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Bảng xếp hạng tháng
                </MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </div>
        {isAdmin && (
          <MenubarMenu>
            <MenubarTrigger>Admin</MenubarTrigger>
            <MenubarContent>
              <Link to="/admin/course">
                <MenubarItem>Quản lý hệ thống</MenubarItem>
              </Link>
              <Link to="/admin/role/assign-role">
                <MenubarItem>Quản lý nhân sự</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        )}
        <div className=" ml-24 w-[15%] flex items-center justify-end ">
          {isAuth == false ? (
            <UILogin />
          ) : (
            <MenubarMenu>
              <MenubarTrigger>
                <UserAvatar />
              </MenubarTrigger>
              <MenubarContent>
                <Link to="/profile">
                  <MenubarItem>
                    <User className="mr-2 h-4 w-4" />
                    Thông tin
                  </MenubarItem>
                </Link>
                <MenubarItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          )}
        </div>
      </Menubar>

      <main className="p-4">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
