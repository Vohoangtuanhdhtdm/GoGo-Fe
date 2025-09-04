// src/components/module/Admin/UserRoleManagement.tsx

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllUser, type UserAll } from "@/api/userServiece";
import { AssignRole } from "@/api/roleService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Hàm helper để lấy chữ cái đầu của tên
const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export default function UserRoleManagement() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<UserAll | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 1. Dùng useQuery để fetch danh sách tất cả người dùng
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"], // Key để cache data
    queryFn: getAllUser,
  });

  // 2. Dùng useMutation để thực hiện hành động phân quyền
  const assignRoleMutation = useMutation({
    mutationFn: AssignRole,
    onSuccess: () => {
      console.log(`Phân quyền Admin cho ${selectedUser?.fullName} thành công!`);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => {
      console.error("Assign role error:", error);
    },
    onSettled: () => {
      // Đóng dialog sau khi thực hiện xong
      setIsDialogOpen(false);
      setSelectedUser(null);
    },
  });

  // Hàm xử lý khi nhấn nút "Phân quyền"
  const handleAssignClick = (user: UserAll) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Hàm xác nhận phân quyền
  const handleConfirmAssign = () => {
    if (selectedUser) {
      assignRoleMutation.mutate(selectedUser.userId);
    }
  };

  // 3. Render giao diện dựa trên trạng thái của useQuery
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Đang tải danh sách người dùng...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
        Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Quản lý & Phân quyền Người dùng
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Họ và Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={user.avatarUrl || ""}
                      alt={user.fullName}
                    />
                    <AvatarFallback>
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.joinedAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAssignClick(user)}
                    disabled={user.email.includes("admin@")} // Ví dụ: không cho phép phân quyền lại cho admin gốc
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Phân quyền Admin
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog xác nhận */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận phân quyền</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn cấp quyền{" "}
              <span className="font-bold text-red-500">Admin</span> cho người
              dùng{" "}
              <span className="font-bold text-primary">
                {selectedUser?.fullName}
              </span>
              ? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAssign}
              disabled={assignRoleMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {assignRoleMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
