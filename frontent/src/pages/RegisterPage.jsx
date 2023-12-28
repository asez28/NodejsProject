import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-screen items-center justify-center">
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form
        
        onSubmit={onSubmit}
      >
      {registerError.map((error, i) => (
        <div className="bg-red-500 p-2 text-white text-center rounded-lg my-2" key={i}>{error}</div>
      ))}
        <h1 className="text-2xl font-bold mb-4">Register to Enjoy!</h1>
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}
        <input
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <input
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        <input
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <div>
          <label htmlFor="rol">Select your role:</label>
          <select
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
            id="rol"
            {...register("rol", { required: true })}
          >
            <option value="Lite">Lite</option>
            <option value="Pro">Pro</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-blue">
          Register
        </button>
      </form>
      <p className="flex gap-x-2 justify-between my-2">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Sign In
          </Link>
        </p>
        </div>
    </div>
  );
}

export default RegisterPage;
