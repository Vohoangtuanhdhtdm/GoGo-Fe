import { DetailedLearningPage } from "@/components/module/PlayVideo/DetailedLearningPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseId/$lessonId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId, lessonId } = Route.useParams();
  return (
    <div>
      <h3>Bài học: {lessonId}</h3>
      <p>Thuộc khóa học: {courseId}</p>
      <div>
        <DetailedLearningPage />
      </div>
    </div>
  );
}
