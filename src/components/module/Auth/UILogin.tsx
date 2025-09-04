import { Link } from "@tanstack/react-router";

const UILogin = () => {
  return (
    <div>
      <Link
        className="px-4 py-1.5 rounded-xl text-sm font-medium 
             bg-blue-600 text-white hover:bg-blue-800 
             transition-colors duration-200"
        to="/auth/login"
      >
        Login
      </Link>
    </div>
  );
};

export default UILogin;
