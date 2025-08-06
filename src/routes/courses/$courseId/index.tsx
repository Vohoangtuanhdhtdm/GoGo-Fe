import { CourseDetailPage } from "@/components/module/Course/CourseDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  return (
    <div>
      <h2>Chi tiết khóa học: {courseId}</h2>
      <div>
        <CourseDetailPage />
      </div>
    </div>
  );
}
