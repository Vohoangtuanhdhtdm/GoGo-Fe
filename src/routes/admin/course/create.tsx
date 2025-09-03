import { CreateCourse } from "@/components/admin/Course/CreateCourse";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/course/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CreateCourse />
    </div>
  );
}
