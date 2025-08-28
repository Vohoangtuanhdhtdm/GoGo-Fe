import { CourseDetailPage } from "@/components/module/Course/CourseDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  return (
    <div>
      <div>
        <CourseDetailPage courseId={courseId} />
      </div>
    </div>
  );
}
