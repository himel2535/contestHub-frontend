import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaPlusCircle, FaSave } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const AddContestForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-query mutation
  const {
    mutateAsync,
    isPending: isMutationPending,
    isError,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axiosSecure.post(`/contests`, payload);
    },
    onSuccess: (data) => {
      toast.success("Contest added successfully!");
      console.log("Server response:", data);
      mutationReset();
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error(error?.response?.data?.message || "Failed to add contest.");
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
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const {
        name,
        description,
        participantsCount,
        prizeMoney,
        contestFee,
        category,
        image,
        deadline,
      } = data;

      if (!image || image.length === 0) {
        toast.error("Please select an image");
        setIsSubmitting(false);
        return;
      }

      // IMAGE UPLOAD
      let imageUrl = "";
      try {
        imageUrl = await imageUpload(image[0]);
      } catch (err) {
        console.error("Image upload failed:", err);
        toast.error("Image upload failed!");
        setIsSubmitting(false);
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
        status: "pending",
        deadline: new Date(deadline).toISOString(),
        contestCreator: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(contestData);
      reset();
    } catch (err) {
      console.error("Form submit error:", err);
      toast.error("Something went wrong during form processing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isError) return <ErrorPage />;

  const isDisabled = isSubmitting || isMutationPending;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div
        className="text-center mb-10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-block border-b-4 border-yellow-500 pb-2">
          <div className="mb-2 block md:hidden">
            <FaPlusCircle className="text-5xl text-yellow-600 mx-auto" />
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 inline-flex items-center">
            <span className="hidden md:inline-flex items-center justify-center">
              <FaPlusCircle className="mr-3 text-yellow-600 text-4xl" />
            </span>
            Add A New Contest
          </h2>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-2xl p-6 lg:p-10 border-t-4 border-yellow-500">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column - Contest Details (3 Fields + Description) */}
            <div
              className="space-y-6"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              {/* Name */}
              <div className="space-y-1 text-sm">
                <label className="block text-gray-700 font-medium">
                  Contest Name
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 50,
                      message: "Name cannot exceed 50 characters",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white transition duration-150"
                  placeholder="e.g., Frontend Design Challenge"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-1 text-sm">
                <label className="block text-gray-700 font-medium">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white transition duration-150"
                >
                  <option value="">Select a Category</option>
                  <option value="Programming Contest">
                    Programming Contest
                  </option>
                  <option value="Design Contest">Design Contest</option>
                  <option value="Gaming Contest">Gaming Contest</option>
                  <option value="Article Writing">Article Writing</option>
                  <option value="Photography">Photography Contest</option>
                  <option value="Video Editing">Video Editing Contest</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full h-[150px] p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white transition duration-150"
                  placeholder="Describe the contest objectives, rules, and eligibility."
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Financials, Deadline, and Image (4 Fields) */}
            <div
              className="space-y-6"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Prize Money */}
                <div>
                  <label className="block text-gray-700 font-medium">
                    Prize Money ($){" "}
                  </label>
                  <input
                    {...register("prizeMoney", {
                      required: "Prize is required",
                      min: { value: 1, message: "Prize must be at least 1" },
                    })}
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white"
                  />
                  {errors.prizeMoney && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.prizeMoney.message}
                    </p>
                  )}
                </div>

                {/* Contest Fee */}
                <div>
                  <label className="block text-gray-700 font-medium">
                    Entry Fee ($)
                  </label>
                  <input
                    {...register("contestFee", {
                      required: "Fee is required",
                      min: { value: 0, message: "Fee cannot be negative" },
                    })}
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white"
                  />
                  {errors.contestFee && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.contestFee.message}
                    </p>
                  )}
                </div>

                {/* Participants Count */}
                <div>
                  <label className="block text-gray-700 font-medium">
                    Participants
                  </label>
                  <input
                    {...register("participantsCount", {
                      required: "Count is required",
                      min: { value: 1, message: "Must be at least 1" },
                    })}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white"
                  />
                  {errors.participantsCount && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.participantsCount.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Deadline
                </label>
                <input
                  {...register("deadline", {
                    required: "Deadline is required",
                  })}
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white transition duration-150"
                />
                {errors.deadline && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.deadline.message}
                  </p>
                )}
              </div>

              {/* Image upload */}
              <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                <label className="block text-gray-700 font-medium mb-2">
                  Banner Image Upload
                </label>
                <input
                  {...register("image", {
                    required: "Banner image is required",
                  })}
                  type="file"
                  accept="image/*"
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                />
                {errors.image && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full p-3 text-white font-bold rounded-md cursor-pointer transition duration-200 flex items-center justify-center ${
                  isDisabled
                    ? "bg-yellow-500 disabled:cursor-not-allowed opacity-70"
                    : "bg-yellow-600 hover:bg-yellow-700 shadow-md"
                }`}
              >
                {isDisabled ? (
                  <>
                    <TbFidgetSpinner className="animate-spin mr-2" /> Saving
                    Contest...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save & Continue
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContestForm;
