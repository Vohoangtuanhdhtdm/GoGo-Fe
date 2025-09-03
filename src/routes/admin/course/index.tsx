import AdminCourseListPage from "@/components/admin/Course/AdminCourseListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/course/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AdminCourseListPage />
    </div>
  );
}
