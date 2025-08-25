import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export function Sidebar() {
  const user = useContext(UserContext);
  console.log("User in Sidebar:", user);
  return (
    <div className="flex flex-col space-y-4">
      <h1>ABC: {user.user?.name}</h1>
      <button
        onClick={() => {
          user.setUser({ name: "New Name", email: "abc@.com" });
        }}
      >
        Change User
      </button>
    </div>
  );
}
