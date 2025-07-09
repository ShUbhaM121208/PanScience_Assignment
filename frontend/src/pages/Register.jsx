import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // ✅ Axios instance

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"), // ✅ add this
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { username, email, password } = data;

      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      console.log("✅ Registered:", res.data);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Register error:", err.response?.data);
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          {...register("username")}
          placeholder="Username"
          className="w-full px-3 py-2 border rounded-md"
        />
        <p className="text-red-500 text-sm">{errors.username?.message}</p>

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

        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded-md"
        />
        <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
