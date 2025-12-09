// src/Form/UpdatePlantForm.jsx

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils"; 
import useAuth from "../../hooks/useAuth";


// 💡 ডেডলাইন ডেটা ফরমেট করার জন্য ইউটিলিটি ফাংশন
// YYYY-MM-DDTHH:MM ফরম্যাট নিশ্চিত করা হলো (datetime-local এর জন্য)
const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        // যদি ডেটটি inválid হয়, খালি স্ট্রিং ফেরত দেওয়া
        if (isNaN(date)) return ''; 

        // ISO স্ট্রিং থেকে YYYY-MM-DDT... অংশটি বের করা
        const isoString = date.toISOString();
        const year = isoString.substring(0, 4);
        const month = isoString.substring(5, 7);
        const day = isoString.substring(8, 10);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        // YYYY-MM-DDTHH:MM ফরম্যাট
        return `${year}-${month}-${day}T${hours}:${minutes}`;

    } catch (e) {
        console.error("Invalid date string for formatting:", dateString, e);
        return '';
    }
};


// 💡 Update Function for useMutation (কোনো পরিবর্তন নেই)
const updateContest = async ({ id, updatedData }) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_URL}/contests-update/${id}`,
    updatedData
  );
  return data;
};

const UpdatePlantForm = ({ contest, closeModal }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth(); 
  const LIST_QUERY_KEY = ['inventory', user.email]; 

  // 1. Initialize React Hook Form
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: contest?.name || '',
      category: contest?.category || 'Programming Contest',
      description: contest?.description || '',
      // 💡 datetime-local ফরমেটে ডেডলাইন সেট করা হলো
      deadline: formatDateForInput(contest?.deadline) || '', 
      
      contestFee: contest?.contestFee || 0, 
      prizeMoney: contest?.prizeMoney || 0, 
    },
  });

  // 2. Initialize Tanstack Query Mutation (কোনো পরিবর্তন নেই)
  const mutation = useMutation({
    mutationFn: updateContest,
    onSuccess: (response, variables) => { 
      toast.success("Contest Updated Successfully!");
      closeModal();
      
      queryClient.setQueryData(LIST_QUERY_KEY, (oldContests) => {
        if (!oldContests) return [];
        
        const finalUpdatedData = { ...variables.updatedData, image: variables.updatedData.image }; 

        return oldContests.map(c => 
          c._id === contest._id 
            ? { ...c, ...finalUpdatedData } 
            : c
        );
      });
    },
    onError: (error) => {
      toast.error("Failed to update contest!");
      console.error(error);
    }
  });

  // 3. Form submission handler
  const onSubmit = async (data) => { 
    let imageUrl = contest.image; 

    // 💡 Image Upload Logic (remains the same)
    if (data.image && data.image.length > 0) {
        const imageFile = data.image[0];
        
        try {
            toast.loading("Uploading image...", { id: 'imgUpload' });
            imageUrl = await imageUpload(imageFile); 
            toast.success("Image uploaded!", { id: 'imgUpload' });
        } catch (uploadError) {
            toast.error("Image upload failed!", { id: 'imgUpload' });
            console.error("Image Upload Error:", uploadError);
            return; 
        }
    }

    // 💡 Prepare updated data with all fields including the new deadline
    const updatedData = {
      name: data.name,
      image: imageUrl, 
      category: data.category,
      description: data.description,
      
      // 🚨 ফিক্স: datetime-local ইনপুট থেকে পাওয়া স্ট্রিংটিকে ISO ফরম্যাটে রূপান্তর
      deadline: new Date(data.deadline).toISOString(), 
      
      contestFee: Number(data.contestFee),
      prizeMoney: Number(data.prizeMoney),
    };
    
    // 💡 Mutation call
    mutation.mutate({ id: contest._id, updatedData });
  };


  return (
    <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>Name</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                type='text'
                placeholder='Contest Name'
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Category */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600 '>Category</label>
              <select
                className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                {...register("category", { required: "Category is required" })}
              >
                <option value="Programming Contest">Programming Contest</option>
                <option value="Design Contest">Design Contest</option>
                <option value="Gaming Contest">Gaming Contest</option>
                <option value="Article Writing">Article Writing</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>
            
            {/* 💡 ডেডলাইন ফিল্ড (datetime-local এ পরিবর্তন করা হলো) */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='deadline' className='block text-gray-600 '>Deadline</label>
              <input
                type='datetime-local' // 🚨 ফিক্স: টাইপ পরিবর্তন
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                {...register("deadline", { required: "Deadline is required" })}
              />
              {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
            </div>

            {/* Description */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>Description</label>
              <textarea
                placeholder='Write contest description here...'
                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500 '
                {...register("description")}
              ></textarea>
            </div>
          </div>
          
          <div className='space-y-6 flex flex-col'>
            {/* Contest Fee & Prize Money */}
            <div className='flex justify-between gap-2'>
              {/* Contest Fee */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='contestFee' className='block text-gray-600 '>Contest Fee</label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  type='number'
                  placeholder='Fee per contest'
                  {...register("contestFee", { required: "Contest Fee is required", valueAsNumber: true })}
                />
                {errors.contestFee && <p className="text-red-500 text-xs mt-1">{errors.contestFee.message}</p>}
              </div>

              {/* Prize Money */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='prizeMoney' className='block text-gray-600'>Prize Money</label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  type='number'
                  placeholder='Prize Money'
                  {...register("prizeMoney", { required: "Prize Money is required", valueAsNumber: true })}
                />
                {errors.prizeMoney && <p className="text-red-500 text-xs mt-1">{errors.prizeMoney.message}</p>}
              </div>
            </div>
            
            {/* IMAGE UPLOAD SECTION */}
            <div className=' p-4  w-full  m-auto rounded-lg grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      {...register("image")} 
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-100'>
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
              {/* Optional: Display current image */}
              {contest.image && <img src={contest.image} alt="Current Contest" className="mt-2 w-full h-16 object-cover rounded"/>}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 disabled:bg-gray-400'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Updating...' : 'Update Contest'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdatePlantForm