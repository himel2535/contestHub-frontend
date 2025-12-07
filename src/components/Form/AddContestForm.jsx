import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddContestForm = () => {
  const { user } = useAuth();

  // use mutation hook---tanstackQuery
  const { isPending, isError, mutateAsync,reset:mutationReset } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/contests`,
        payload
      );
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Plant Added successfully");
      mutationReset()
    },
    onMutate: (payload) => {
      console.log(payload);
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 3,
  });


  // --use react hook form--
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      name,
      description,
      participantsCount,
      prizeMoney,
      contestFee,
      category,
      image,
    } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);

      const contestData = {
        image: imageUrl,
        name,
        description,
        participantsCount: Number(participantsCount),
        prizeMoney: Number(prizeMoney),
        contestFee: Number(contestFee),
        category,
        contestCreator: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(contestData);
      reset()
    } catch (err) {
      console.log(err);
    }
  };

  // if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                id="name"
                type="text"
                placeholder="Plant Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name cannot be too long",
                  },
                })}
              />

              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
                {...register("category", { required: "Category is required" })}
              >
                {/* design contests, article writing, business ideas, gaming reviews, */}
                <option value="Programming Contest">Programming Contest</option>
                <option value="Design Contest">Design Contest</option>
                <option value="Gaming Contest">Gaming Contest</option>
                <option value="Article Writing">Article Writing</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                name="description"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Prize Money & participants Counts */}
            <div className="flex justify-between gap-2">
              {/* Prize Money */}

              <div className="space-y-1 text-sm">
                <label htmlFor="prizeMoney" className="block text-gray-600 ">
                  Prize Money
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="prizeMoney"
                  type="number"
                  placeholder="Prize Money"
                  {...register("prizeMoney", {
                    required: "Prize Money is required",
                    min: { value: 0, message: "Prize Money must be positive" },
                  })}
                />
                {errors.prizeMoney && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.prizeMoney.message}
                  </p>
                )}
              </div>

              {/* Contest Fee */}
              <div className="space-y-1 text-sm">
                <label htmlFor="contestFee" className="block text-gray-600 ">
                  Contest Fee
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="contestFee"
                  type="number"
                  placeholder="Contest Fee per Contest"
                  {...register("contestFee", {
                    required: "Contest Fee is required",
                    min: { value: 0, message: "Contest Fee must be positive" },
                  })}
                />
                {errors.contestFee && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.contestFee.message}
                  </p>
                )}
              </div>
              {/* Participants Count */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="participantsCount"
                  className="block text-gray-600"
                >
                  Participants Count
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="participantsCount"
                  type="number"
                  placeholder="Participants Count"
                  {...register("participantsCount", {
                    required: "Participants Count is required",
                    min: {
                      value: 0,
                      message: "Participants Count must be Positive",
                    },
                  })}
                />
                {errors.participantsCount && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.participantsCount.message}
                  </p>
                )}
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                      {...register("image", {
                        required: "Image is required",
                      })}
                    />
                    {errors.image && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.image.message}
                      </p>
                    )}
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      Upload
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              {isPending ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Save & Continue'
              )}
              {/* save and continue */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContestForm;
