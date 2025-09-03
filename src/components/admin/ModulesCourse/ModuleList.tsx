import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Pencil, Trash2 } from "lucide-react";
import { modulesOfCourseService } from "@/api/moduleService";
import { CreateLessonModal } from "../Lesson/CreateLessonModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonList } from "../Lesson/LessonList";

interface ModuleListProps {
  courseId: string;
}

export function ModuleList({ courseId }: ModuleListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => modulesOfCourseService(courseId),
    enabled: !!courseId, // Chỉ chạy query khi courseId có tồn tại
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="flex items-center p-4">
            <Skeleton className="h-6 w-6 mr-4" />
            <div className="flex-grow">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription>
          Không thể tải danh sách module. Vui lòng thử lại.
        </AlertDescription>
      </Alert>
    );
  }

  const sortedModules = data?.sort((a, b) => a.displayOrder - b.displayOrder);

  if (!sortedModules || sortedModules.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">Chưa có module nào trong khóa học này.</p>
        <p className="text-sm text-gray-400 mt-2">
          Hãy nhấn nút "Thêm Module" để bắt đầu tạo nội dung.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-4">
        {sortedModules.map((module) => (
          <AccordionItem
            key={module.id}
            value={module.id}
            className="border rounded-lg"
          >
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex-grow flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <p className="text-sm text-gray-500 font-normal mt-1">
                    {module.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 pr-4">
                  {/* Nút thêm bài học cho module này */}
                  <CreateLessonModal moduleId={module.id} />
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              {/* Hiển thị danh sách bài học của module này */}
              <LessonList moduleId={module.id} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
