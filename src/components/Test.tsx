import { UserContextProvider } from "@/context/UserContext";
import { Sidebar } from "@/Sidebar";

export function Dashboard() {
  return (
    <UserContextProvider>
      <Sidebar />
    </UserContextProvider>
  );
}
