import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const { signIn, signInWithGoogle, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const { user } = await signIn(email, password);
      // --store user to mongodb--
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      // --store user to mongodb--
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-yellow-500 w-full rounded-md py-3 text-white"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Forgot Password (optional) */}
        <div className="space-y-1 mt-2">
          <button className="text-xs hover:text-yellow-500 hover:underline text-gray-400 cursor-pointer">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Login with social</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        {/* Footer */}
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            state={from}
            className="hover:text-yellow-500 text-gray-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
