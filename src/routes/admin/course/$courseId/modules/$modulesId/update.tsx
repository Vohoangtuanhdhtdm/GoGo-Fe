import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/admin/course/$courseId/modules/$modulesId/update"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/course/$courseId/modules/$modulesId/update"!</div>;
}
