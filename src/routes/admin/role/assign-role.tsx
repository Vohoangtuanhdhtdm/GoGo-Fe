import UserRoleManagement from "@/components/admin/Role/UserRoleManagement";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/role/assign-role")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <UserRoleManagement />
    </div>
  );
}
