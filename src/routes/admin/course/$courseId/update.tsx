import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/course/$courseId/update")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/course/$courseId/update"!</div>;
}
