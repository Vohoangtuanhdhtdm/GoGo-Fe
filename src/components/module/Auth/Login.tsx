import type { LoginData } from "@/api/authService";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { login } from "@/api/authService";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (error: AxiosError) => {
      const message =
        error.response?.status === 401 || error.response?.status === 400
          ? "Email hoặc mật khẩu không chính xác. Vui lòng thử lại."
          : "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      setError("root.serverError", { type: "manual", message });
    },
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-8">
          <img
            src="https://i.pinimg.com/1200x/c5/3f/28/c53f28516b4b25921882823ed3e5b71e.jpg"
            alt="Learning illustration"
            className="max-w-sm rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Đăng Nhập
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("username", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Địa chỉ email không hợp lệ",
                  },
                })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-400`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                {...register("password", { required: "Mật khẩu là bắt buộc" })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-400`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errors.root?.serverError && (
              <p className="text-sm text-red-600 text-center">
                {errors.root.serverError.message}
              </p>
            )}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/auth/register"
              className="text-green-500 font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
