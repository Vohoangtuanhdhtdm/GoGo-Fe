import { Dashboard } from "@/components/Test";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/TEST")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
