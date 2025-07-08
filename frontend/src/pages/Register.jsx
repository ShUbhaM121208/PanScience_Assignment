import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required(),
  password: yup.string().min(6).required(),
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

  const onSubmit = (data) => {
    console.log("Registering:", data);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

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
