import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

const AddContestForm = () => {
  const { user } = useAuth();

  // react-query mutation
  const {
    mutateAsync,
    isLoading: isMutating,
    isError,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(`${import.meta.env.VITE_API_URL}/contests`, payload);
    },
    onSuccess: (data) => {
      toast.success("Contest added successfully");
      console.log("Server response:", data);
      mutationReset();
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to add contest");
    },
    retry: 1,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { name, description, participantsCount, prizeMoney, contestFee, category, image, deadline } = data;

      if (!image || image.length === 0) {
        toast.error("Please select an image");
        return;
      }

      // IMAGE UPLOAD
      let imageUrl = "";
      try {
        imageUrl = await imageUpload(image[0]);
        console.log("Image uploaded:", imageUrl);
      } catch (err) {
        console.error("Image upload failed:", err);
        toast.error("Image upload failed!");
        return;
      }

      const contestData = {
        image: imageUrl,
        name,
        description,
        participantsCount: Number(participantsCount),
        prizeMoney: Number(prizeMoney),
        contestFee: Number(contestFee),
        category,
        deadline: new Date(deadline).toISOString(),
        contestCreator: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      // SEND TO SERVER
      await mutateAsync(contestData);
      reset();
    } catch (err) {
      console.error("Form submit error:", err);
      toast.error("Something went wrong");
    }
  };

  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Name</label>
              <input
                {...register("name", { required: "Name is required", maxLength: 50 })}
                className="w-full px-4 py-3 border rounded-md bg-white"
                placeholder="Contest name"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 rounded-md bg-white"
              >
                <option value="Programming Contest">Programming Contest</option>
                <option value="Design Contest">Design Contest</option>
                <option value="Gaming Contest">Gaming Contest</option>
                <option value="Article Writing">Article Writing</option>
              </select>
              {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-600">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full h-32 p-3 border rounded-md bg-white"
                placeholder="Describe the contest"
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-gray-600">Deadline</label>
              <input
                {...register("deadline", { required: "Deadline is required" })}
                type="datetime-local"
                className="w-full px-4 py-3 border rounded-md bg-white"
              />
              {errors.deadline && <p className="text-xs text-red-500">{errors.deadline.message}</p>}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-600">Prize Money</label>
                <input {...register("prizeMoney", { required: true, min: 0 })} type="number" className="w-full px-4 py-3 border rounded-md bg-white" />
              </div>

              <div>
                <label className="block text-gray-600">Contest Fee</label>
                <input {...register("contestFee", { required: true, min: 0 })} type="number" className="w-full px-4 py-3 border rounded-md bg-white" />
              </div>

              <div>
                <label className="block text-gray-600">Participants Count</label>
                <input {...register("participantsCount", { required: true, min: 0 })} type="number" className="w-full px-4 py-3 border rounded-md bg-white" />
              </div>
            </div>

            {/* Image upload */}
            <div className="p-4 rounded-lg">
              <label className="block text-gray-600 mb-2">Banner Image</label>
              <input {...register("image", { required: "Image is required" })} type="file" accept="image/*" />
              {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isMutating}
              className={`w-full p-3 text-white rounded-md ${isMutating ? "bg-gray-400" : "bg-lime-500"}`}
            >
              {isMutating ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Save & Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContestForm;
