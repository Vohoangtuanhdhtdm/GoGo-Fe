import { lessonsInModuleService } from "@/api/lessonService";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/course/$courseId/modules/$modulesId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId, modulesId } = Route.useParams();
  const navigate = useNavigate();
  const {
    data: lessons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lessons", modulesId],
    queryFn: () => lessonsInModuleService(modulesId),
  });
  useEffect(() => {
    if (lessons && lessons.length > 0) {
      const firstLesson = lessons.sort(
        (a, b) => a.displayOrder - b.displayOrder
      )[0];

      navigate({
        to: "/course/$courseId/modules/$modulesId/lessons/$lessonId",
        params: {
          courseId,
          modulesId,
          lessonId: firstLesson.id,
        },
        replace: true,
      });
    }
  }, [lessons, courseId, modulesId, navigate]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Đang tải bài học đầu tiên...</p>
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-8">
        Lỗi khi tải danh sách bài học. Vui lòng quay lại.
      </div>
    );
  }

  if (!isLoading && lessons?.length === 0) {
    return (
      <div className="p-8">
        Module này chưa có bài học nào. Vui lòng quay lại.
      </div>
    );
  }

  // Không render gì trong khi chờ chuyển hướng
  return null;
}
