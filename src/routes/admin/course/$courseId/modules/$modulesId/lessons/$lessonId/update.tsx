import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/admin/course/$courseId/modules/$modulesId/lessons/$lessonId/update"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello
      "/admin/course/$courseId/modules/$modulesId/lessons/$lessonId/update"!
    </div>
  );
}
