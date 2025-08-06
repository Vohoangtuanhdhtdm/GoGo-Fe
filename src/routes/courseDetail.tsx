import { CourseDetailPage } from "@/components/module/Course/CourseDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courseDetail")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CourseDetailPage />
    </div>
  );
}
