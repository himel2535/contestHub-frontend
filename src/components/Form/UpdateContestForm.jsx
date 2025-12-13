// src/components/Dashboard/Form/UpdateContestForm.jsx (পূর্বের UpdatePlantForm)

import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils"; // Assume this is available
import { TbFidgetSpinner } from "react-icons/tb";
import { FaSave } from "react-icons/fa"; // 💡 নতুন আইকন
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react"; 

// Helper function to format ISO date string for datetime-local input
const formatDeadlineForInput = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date)) return '';
  
  // Format: YYYY-MM-DDTHH:MM
  // Note: Local machine's timezone might affect the display if the ISO string doesn't include Z or a timezone offset.
  // For consistency in React forms, setting the value based on local interpretation is often required.
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const UpdateContestForm = ({ contest, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const [newImageFile, setNewImageFile] = useState(null);
  const [currentImage] = useState(contest.image); 

  // Prepare default deadline value
  const formattedDeadline = formatDeadlineForInput(contest.deadline);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: contest.name,
      description: contest.description,

      participantsCount: contest.participantsCount,
      prizeMoney: contest.prizeMoney,
      contestFee: contest.contestFee,
      category: contest.category,
      deadline: formattedDeadline, 
    },
  });

  // TanStack Query Mutation for Update
  const {
    mutateAsync,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (payload) => {
      // Assuming contest._id is available for the PUT request
      return await axiosSecure.put(`/contests-update/${contest._id}`, payload);
    },
    onSuccess: () => {
      toast.success("Contest updated successfully!");
      refetch && refetch(); 
      closeModal();
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
      toast.error(`Failed to update contest: ${error.response?.data?.message || 'Check console for details.'}`);
    },
  });

  // Handle new image file selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    } else {
      setNewImageFile(null);
    }
  };


  // Form Submission Handler
  const onSubmit = async (data) => {
    try {
      const { name, description, participantsCount, prizeMoney, contestFee, category, deadline } = data;
      let imageUrl = currentImage; // Start with the existing image

      // Check if a new image was selected (using the state)
      if (newImageFile) {
        // IMAGE UPLOAD (if new image selected)
        try {
          imageUrl = await imageUpload(newImageFile);
          console.log("New image uploaded:", imageUrl);
          
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
  
  // 💡 Image preview source check
  const previewUrl = newImageFile ? URL.createObjectURL(newImageFile) : currentImage;


  return (
    <div className="w-full text-gray-800">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* === Left Column === */}
          <div className="space-y-6">
            
            {/* Contest Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-700 font-medium">Contest Name</label>
              <input
                {...register("name", { required: "Name is required", maxLength: { value: 50, message: "Max 50 characters" } })}
      
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white transition duration-150"
                placeholder="Contest name"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-700 font-medium">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
         
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white transition duration-150"
              >
                <option value="Programming Contest">Programming Contest</option>
                <option value="Design Contest">Design Contest</option>
                <option value="Gaming Contest">Gaming Contest</option>
                <option value="Article Writing">Article Writing</option>
                <option value="Photography">Photography Contest</option>
                <option value="Video Editing">Video Editing Contest</option>
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
            </div>

            {/* DEADLINE FIELD */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-700 font-medium">Deadline</label>
              <input
                {...register("deadline", { required: "Deadline is required" })}
                type="datetime-local"
  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white transition duration-150"
              />
              {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline.message}</p>}
            </div>
          </div>
          
          {/* === Right Column === */}
          <div className="space-y-6">
            
            {/* Prize Money */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-700 font-medium">Prize Money ($)</label>
              <input 
                {...register("prizeMoney", { required: "Prize is required", min: { value: 1, message: "Must be at least 1" } })} 
                type="number" 
                step="0.01"

                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white" 
                placeholder="e.g., 500"
              />
              {errors.prizeMoney && <p className="text-xs text-red-500 mt-1">{errors.prizeMoney.message}</p>}
            </div>

            {/* Contest Fee */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-700 font-medium">Entry Fee ($)</label>
              <input 
                {...register("contestFee", { required: "Fee is required", min: { value: 0, message: "Cannot be negative" } })} 
                type="number" 
                step="0.01"
  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white" 
                placeholder="e.g., 10"
              />
              {errors.contestFee && <p className="text-xs text-red-500 mt-1">{errors.contestFee.message}</p>}
            </div>

            {/* Participants Count */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-700 font-medium">Participants Count</label>
              <input 
                {...register("participantsCount", { required: "Count is required", min: { value: 1, message: "Must be at least 1" } })} 
                type="number" 
       
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white" 
                placeholder="e.g., 50"
              />
              {errors.participantsCount && <p className="text-xs text-red-500 mt-1">{errors.participantsCount.message}</p>}
            </div>
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="space-y-1 text-sm">
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white"
              placeholder="Describe the contest objectives and rules."
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        {/* Image upload */}
        <div className="p-4 rounded-lg flex gap-4 items-center border border-gray-200 bg-white">
          {/* Current/New Image Preview */}
          <img src={previewUrl} alt="Contest Banner" className="h-16 w-24 object-cover rounded-md border" />
          
          <div>
              <label className="block text-gray-700 font-medium mb-1">Change Banner Image (Optional)</label>
              <input 
                {...register("image")} 
                type="file" 
                onChange={(e) => {
                    handleImageChange(e);
                    register('image').onChange(e); 
                }}
                accept="image/*" 
                className="cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
              />
              {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full p-3 text-white font-bold rounded-md cursor-pointer transition duration-200 flex items-center justify-center ${
    
            isPending 
                ? "bg-yellow-500 opacity-80 cursor-not-allowed" 
                : "bg-yellow-600 hover:bg-yellow-700 shadow-md"
          }`}
        >
          {isPending ? (
            <>
                <TbFidgetSpinner className="animate-spin mr-2" /> Updating Contest...
            </>
          ) : (
            <>
                <FaSave className="mr-2" /> Update Contest
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateContestForm;