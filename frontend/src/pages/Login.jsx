// src/pages/Login.jsx

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // ✅ Axios instance
import { toast } from "react-toastify";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      const { token, user } = res.data;

      // ✅ Store token
      localStorage.setItem("token", token);

      // ✅ Update Redux state
      dispatch(loginSuccess({ email: user.email, token }));

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
