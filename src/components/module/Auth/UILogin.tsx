import { MenubarTrigger } from "@/components/ui/menubar";
import { UserContext } from "@/context/UserContext";
import { Link } from "@tanstack/react-router";
import { useContext } from "react";

const UILogin = () => {
  const user = useContext(UserContext);
  return (
    <>
      {user.user ? (
        <></>
      ) : (
        <MenubarTrigger>
          <Link
            className="px-4 py-1.5 rounded-xl text-sm font-medium 
             bg-blue-600 text-white hover:bg-blue-800 
             transition-colors duration-200"
            to="/auth/login"
          >
            Login
          </Link>
        </MenubarTrigger>
      )}
    </>
  );
};

export default UILogin;
