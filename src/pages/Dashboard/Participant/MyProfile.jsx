import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaTrophy,
  FaChartPie,
  FaEdit,
  FaSave,
  FaCrown,
} from "react-icons/fa";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

// Chart Component (Simple Mockup)
const WinRateChart = ({ winPercentage }) => {
  const won = parseFloat(winPercentage);
  const participated = 100 - won;

  return (
    <div
      className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-500"
      data-aos="fade-right"
      data-aos-duration="800"
    >
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
        <FaChartPie className="mr-2 text-yellow-600" /> Win Rate
      </h3>
      <div className="relative w-32 h-32">
        {/* Simple CSS Donut Chart Mockup */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#facc15 ${won}%, #d1d5db 0)`,
          }}
        >
          <div className="absolute inset-4 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-yellow-600">{won}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
        <p className="text-yellow-600">Won: {won}%</p>
        <p className="text-gray-400 dark:text-gray-500">
          Participated: {participated.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: statsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-stats`);

      // Reset form with fetched profile data
      reset(data.profile);
      return data;
    },
  });

  // 2. Profile Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (updatedProfile) => {
      return axiosSecure.patch("/user-profile-update", updatedProfile);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["myStats"] });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !statsData)
    return <div className="text-red-500">Failed to load profile data.</div>;

  const { profile, participationCount, winCount, winPercentage } = statsData;

  const HeadingIcon = FaUser;
  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 dark:bg-gray-900 overflow-hidden">
      <div
        className="text-center mb-10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2">
          <HeadingIcon className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
          <span className="">
            <span>My Profile & Stats</span>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1. Stats and Win Chart Column (Left) */}
        <div className="lg:col-span-1 space-y-8">
          <WinRateChart winPercentage={winPercentage} />

          <div
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-500"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
              <FaTrophy className="mr-2 text-yellow-600" /> Contest Overview
            </h3>
            <div className="space-y-3">
              <p className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span className="font-medium">Total Participated:</span>
                <span className="font-bold text-lg text-yellow-600">
                  {participationCount}
                </span>
              </p>
              <p className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span className="font-medium">Contests Won:</span>
                <span className="font-bold text-lg text-yellow-600">
                  {winCount}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Profile Details and Update Form (Right) */}
        <div
          className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-500"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <div className="flex justify-between items-center mb-6 border-b dark:border-gray-700 pb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Account Details
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 transition duration-150 flex items-center cursor-pointer"
            >
              {isEditing ? (
                <FaSave className="mr-2" />
              ) : (
                <FaEdit className="mr-2" />
              )}
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Photo and Email */}
            <div className="flex md:flex-row flex-col items-center space-x-6 mb-6">
              <img
                src={
                  profile?.photo ||
                  user?.photoURL ||
                  "https://via.placeholder.com/150"
                }
                alt={profile?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
              <div>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {profile?.email}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  Role: {profile?.role}
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {/* 1. Name */}
              <div data-aos="fade-up" data-aos-delay="400">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  {...register("name", { required: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition 
                    ${
                      isEditing
                        ? "border-yellow-500 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-yellow-200"
                        : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-default border-gray-200 dark:border-gray-600"
                    }`}
                />
              </div>

              {/* 2. Photo URL */}
              <div data-aos="fade-up" data-aos-delay="500">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  {...register("photo")}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition 
                    ${
                      isEditing
                        ? "border-yellow-500 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-yellow-200"
                        : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-default border-gray-200 dark:border-gray-600"
                    }`}
                />
              </div>

              {/* 3. Bio (Extra Field) */}
              <div
                className="md:col-span-2"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Bio / Short Address
                </label>
                <textarea
                  rows="3"
                  disabled={!isEditing}
                  {...register("bio")}
                  placeholder="A short bio or your current location/address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition 
                    ${
                      isEditing
                        ? "border-yellow-500 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-yellow-200"
                        : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-default border-gray-200 dark:border-gray-600"
                    }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div className="mt-8" data-aos="fade-in" data-aos-delay="700">
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="w-full px-4 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                >
                  {updateProfileMutation.isPending ? (
                    "Saving Changes..."
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Profile
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
