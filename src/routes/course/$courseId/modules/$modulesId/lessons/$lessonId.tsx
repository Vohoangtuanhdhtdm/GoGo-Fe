import { LessonPlayerPage } from "@/components/module/Course/LessonPlayerPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/course/$courseId/modules/$modulesId/lessons/$lessonId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId, modulesId, lessonId } = Route.useParams();
  return (
    <LessonPlayerPage
      courseId={courseId}
      modulesId={modulesId}
      lessonId={lessonId}
    />
  );
}
