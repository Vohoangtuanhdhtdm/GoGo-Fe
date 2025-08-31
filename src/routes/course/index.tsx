import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/course/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Tất cả khóa học</div>;
}
