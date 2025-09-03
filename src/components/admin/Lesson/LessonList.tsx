// src/components/LessonList.tsx

import { useQuery } from "@tanstack/react-query";
import { lessonsInModuleService } from "@/api/lessonService";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clapperboard, Pencil, Trash2 } from "lucide-react";

interface LessonListProps {
  moduleId: string;
}

export function LessonList({ moduleId }: LessonListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lessons", moduleId],
    queryFn: () => lessonsInModuleService(moduleId),
    enabled: !!moduleId,
  });

  if (isLoading) {
    return (
      <div className="space-y-3 pl-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <Skeleton className="h-5 w-5 mr-3" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-2">
        Đã có lỗi xảy ra khi tải danh sách bài học.
      </Alert>
    );
  }

  const sortedLessons = data?.sort((a, b) => a.displayOrder - b.displayOrder);

  if (!sortedLessons || sortedLessons.length === 0) {
    return (
      <p className="text-sm text-gray-500 pl-6 py-2">
        Chưa có bài học nào trong module này.
      </p>
    );
  }

  return (
    <div className="space-y-2 pl-6 border-l-2 ml-3">
      {sortedLessons.map((lesson) => (
        <div
          key={lesson.id}
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div className="flex items-center">
            <Clapperboard className="h-4 w-4 mr-3 text-gray-500" />
            <span className="font-medium">{lesson.title}</span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
