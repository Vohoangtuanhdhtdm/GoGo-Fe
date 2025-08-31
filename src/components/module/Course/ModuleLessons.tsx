import { lessonsInModuleService } from "@/api/lessonService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ListVideo } from "lucide-react";

type ModuleLessonsProps = {
  moduleId: string;
  courseId: string;
  currentLessonId: string;
};

export const ModuleLessons = ({
  moduleId,
  courseId,
  currentLessonId,
}: ModuleLessonsProps) => {
  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons", moduleId],
    queryFn: () => lessonsInModuleService(moduleId),
  });
  if (isLoading) {
    return (
      <div className="pl-8 py-2 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    );
  }
  return (
    <ul className="pl-4 border-l ml-5 space-y-1">
      {lessons
        ?.sort((a, b) => a.displayOrder - b.displayOrder)
        .map((lesson) => (
          <li key={lesson.id}>
            <Link
              to="/course/$courseId/modules/$modulesId/lessons/$lessonId"
              params={{
                courseId,
                modulesId: moduleId,
                lessonId: lesson.id,
              }}
              className="block"
            >
              <Button
                variant="ghost"
                className={`w-full justify-start h-auto py-2 px-3 text-left ${
                  lesson.id === currentLessonId
                    ? "bg-slate-100 dark:bg-slate-800 font-semibold"
                    : ""
                }`}
              >
                <ListVideo className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{lesson.title}</span>
              </Button>
            </Link>
          </li>
        ))}
    </ul>
  );
};
