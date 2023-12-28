import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {signinErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 text-white text-center rounded-lg my-2"
            key={i}
          >
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4">Login to Create!</h1>
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
            type="text"
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
          <button type="submit" className="bg-blue">
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between my-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
