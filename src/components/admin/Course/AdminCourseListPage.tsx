import { coursesService, deleteCourse } from "@/api/courseService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { TCourse } from "@/types/course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

// Giả sử bạn có một component Layout cho trang admin
function AdminCourseListPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: coursesService,
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      console.log("Xóa thành công! Đang làm mới danh sách...");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa khóa học:", error);
    },
  });

  const handleDelete = async (courseId: string, courseName: string) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa khóa học "${courseName}" không?`
      )
    ) {
      deleteCourseMutation.mutate(courseId);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <Skeleton className="h-8 w-1/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    // Component báo lỗi giữ nguyên
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Đã xảy ra lỗi</AlertTitle>
          <AlertDescription>
            Không thể tải danh sách khóa học. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header của trang quản lý */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý Khóa học</h1>
        <Button onClick={() => navigate({ to: "/admin/course/create" })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm khóa học mới
        </Button>
      </div>

      {/* Lưới hiển thị các khóa học */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((course: TCourse) => (
          <Card
            key={course.id}
            className="flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg border"
          >
            <img
              src={course.thumbnailUrl}
              alt={`Thumbnail for ${course.name}`}
              className="w-full h-40 object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(course.name)}`;
                e.currentTarget.onerror = null;
              }}
            />
            <CardHeader className="flex-grow p-4">
              <CardTitle className="text-lg font-semibold leading-tight h-12 line-clamp-2">
                {course.name}
              </CardTitle>
              {/* Badge thay cho description để gọn hơn */}
              <div className="pt-2">
                <Badge variant="outline">{course.skillLevel}</Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 mt-auto">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course.price)}
              </span>
              {/* Nút hành động */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    navigate({
                      to: "/admin/course/$courseId/update",
                      params: { courseId: course.id },
                    })
                  }
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDelete(course.id, course.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminCourseListPage;
