import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils"; // Assume this is available
import { TbFidgetSpinner } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {  useState } from "react"; // useState for image preview

// Helper function to format ISO date string for datetime-local input
const formatDeadlineForInput = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  // Ensure the date is valid
  if (isNaN(date)) return '';
  
  // Get components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  // Format: YYYY-MM-DDTHH:MM
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const UpdateContestForm = ({ contest, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [currentImage] = useState(contest.image); // State for image preview

  // 1. Prepare default deadline value
  const formattedDeadline = formatDeadlineForInput(contest.deadline);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: contest.name,
      description: contest.description,
      participantsCount: contest.participantsCount,
      prizeMoney: contest.prizeMoney,
      contestFee: contest.contestFee,
      category: contest.category,
      // 💡 DEADLINE SETUP - Use the formatted value for the input field
      deadline: formattedDeadline, 
    },
  });

  // 2. TanStack Query Mutation for Update
  const {
    mutateAsync,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (payload) => {
   
      return await axiosSecure.put(`/contests-update/${contest._id}`, payload);
    },
    onSuccess: () => {
      toast.success("Contest updated successfully!");
      refetch && refetch(); 
      closeModal();
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
      toast.error(`Failed to update contest: ${error.response?.data?.message || error.message}`);
    },
  });

  // 3. Form Submission Handler
  const onSubmit = async (data) => {
    try {
      const { name, description, participantsCount, prizeMoney, contestFee, category, image, deadline } = data;
      let imageUrl = currentImage; // Start with the existing image

      // Check if a new image was selected
      if (image && image.length > 0) {
        // IMAGE UPLOAD (if new image selected)
        try {
          imageUrl = await imageUpload(image[0]);
          console.log("New image uploaded:", imageUrl);
          reset()
        } catch (err) {
          console.error("Image upload failed:", err);
          toast.error("New image upload failed!");
          return;
        }
      }

      const updatedContestData = {
        image: imageUrl,
        name,
        description,
        participantsCount: Number(participantsCount),
        prizeMoney: Number(prizeMoney),
        contestFee: Number(contestFee),
        category,
      
        deadline: new Date(deadline).toISOString(), 
      };

      // SEND UPDATE TO SERVER
      await mutateAsync(updatedContestData);
    } catch (err) {
      console.error("Form submit error:", err);
      toast.error("Something went wrong during update");
    }
  };

  if (isError) return <div className="text-red-500 p-4">Error loading update form data.</div>;

  return (
    <div className="w-full text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6">
        <div className="grid grid-cols-1 gap-6">
          
          {/* Contest Name */}
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
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full h-32 p-3 border rounded-md bg-white"
              placeholder="Describe the contest"
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          {/* 💡 DEADLINE FIELD - Same setup as AddForm */}
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600">Deadline</label>
            <input
              {...register("deadline", { required: "Deadline is required" })}
              type="datetime-local"
              className="w-full px-4 py-3 border rounded-md bg-white"
            />
            {errors.deadline && <p className="text-xs text-red-500">{errors.deadline.message}</p>}
          </div>

          {/* Money Fields */}
          <div className="grid grid-cols-3 gap-4">
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
          <div className="p-4 rounded-lg flex gap-4 items-center">
            {/* Current Image Preview */}
            <img src={currentImage} alt="Current Contest" className="h-16 w-24 object-cover rounded-md" />
            
            <div>
                <label className="block text-gray-600 mb-2">Change Image (Optional)</label>
                <input {...register("image")} type="file" accept="image/*" className="cursor-pointer text-sm" />
                {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full p-3 text-white rounded-md cursor-pointer ${isPending ? "bg-gray-400" : "bg-green-500"}`}
          >
            {isPending ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Update Contest"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContestForm;