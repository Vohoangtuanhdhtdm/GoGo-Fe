import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/course/$courseId/modules/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  return (
    <div>
      Hello "/admin/course/$courseId/modules/create"! <h1>{courseId}</h1>
    </div>
  );
}
