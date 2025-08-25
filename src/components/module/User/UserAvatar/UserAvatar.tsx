import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const UserAvatar = () => {
  const user = useContext(UserContext);
  console.log("User in UserAvatar:", user);
  return (
    <>{user.user ? <h1>Hi, {user.user.name}</h1> : <h1> Hãy đăng nhập!</h1>}</>
  );
};
