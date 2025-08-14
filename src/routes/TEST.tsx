import { Login } from "@/components/module/Auth/Login";
import { Register } from "@/components/module/Auth/Register";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/TEST")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
    </div>
  );
}
