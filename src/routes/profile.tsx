import { UserProfilePage } from "@/components/module/User/UserProfile/UserProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <UserProfilePage />
    </div>
  );
}
