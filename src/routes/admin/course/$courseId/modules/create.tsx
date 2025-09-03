import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/course/$courseId/modules/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/course/$courseId/modules/create"!</div>;
}
