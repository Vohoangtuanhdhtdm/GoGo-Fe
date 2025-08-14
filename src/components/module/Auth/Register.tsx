import { Link } from "@tanstack/react-router";

export const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Hình minh họa */}
        <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-8">
          <img
            src="https://i.pinimg.com/1200x/95/ca/2f/95ca2f6aa6ad06bd0f42cafd6ef1d32a.jpg"
            alt="Register illustration"
            className="max-w-sm"
          />
        </div>

        {/* Form đăng ký */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Đăng Ký
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-colors"
            >
              Tạo tài khoản
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/"
              className="text-blue-500 font-semibold hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
