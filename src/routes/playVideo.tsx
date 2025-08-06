import { DetailedLearningPage } from "@/components/module/PlayVideo/DetailedLearningPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playVideo")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DetailedLearningPage />
    </div>
  );
}
