import { UpdateCourse } from "@/components/admin/Course/UpdateCourse";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/course/$courseId/update")({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  return (
    <div>
      <UpdateCourse courseId={courseId} />
    </div>
  );
}
