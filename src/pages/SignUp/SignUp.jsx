import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const { name, email, password, image } = data;

      const imageFile = image[0];
      

      const imageURL = await imageUpload(imageFile)

      // 1. Create User
      await createUser(email, password);

      // --store user to mongodb--
      await saveOrUpdateUser({name,email,image:imageURL})


      // 2. Update Profile
      await updateUserProfile(name, imageURL);

      toast.success("Signup Successful!");
      reset();

      // 3. Redirect
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const {user}=await signInWithGoogle();

      // --store user to mongodb--
      await saveOrUpdateUser({name:user?.displayName,email:user?.email,image:user?.photoURL})

      toast.success("Signup Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to PlantNet</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-lime-50 file:text-lime-700
                hover:file:bg-lime-100
                bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
                py-2"
              {...register("image")}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 border-gray-300"
              {...register("email", {
                required: "Email is required",
              })}
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
            className="bg-lime-500 w-full rounded-md py-3 text-white"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Signup with social</p>
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
          Already have an account?{" "}
          <Link to="/login" className="hover:text-lime-500 text-gray-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
