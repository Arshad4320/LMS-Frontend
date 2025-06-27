"use client";

import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful!");
      reset();
      router.push("/components/login-form");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
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
        <select {...register("role")} className="w-full p-2 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
