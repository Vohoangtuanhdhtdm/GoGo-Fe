import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Tất cả khóa học</h1>
    </div>
  );
}
