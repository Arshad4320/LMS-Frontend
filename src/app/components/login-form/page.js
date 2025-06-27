"use client";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();

      Cookies.set("token", res.token);

      const decoded = jwtDecode(res.token);
      const role = decoded?.role;

      dispatch(
        setUser({
          ...decoded,
          name: res?.user?.name || decoded?.name || "User",
        })
      );

      toast.success("Login successful!");

      if (role === "admin") {
        router.push("/dashboard");
      } else if (role === "user") {
        router.push("/");
      } else {
        toast.error("Unknown role. Contact support.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
