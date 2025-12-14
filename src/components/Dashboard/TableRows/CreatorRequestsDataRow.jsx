/* eslint-disable no-undef */

import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";

const CreatorRequestsDataRow = ({ request, refetch, delay }) => {
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      const loadingToastId = toast.loading(
        `Updating role for ${request?.email}...`
      );

      await axiosSecure.patch("/update-role", {
        email: request?.email,
        role: "contestCreator",
      });

      toast.success("User successfully promoted to Contest Creator!", {
        id: loadingToastId,
      });
      refetch();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update role.", {
        id: loadingToastId,
      });
    }
  };

  return (
    <tr
      // 💡 ডার্ক মোড হোভার ফিক্স
      className="bg-white dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* 1. Email */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড, বর্ডার এবং টেক্সট
        className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-left"
      >
        <p className="text-gray-900 dark:text-gray-100 font-medium">
            {request?.email}
        </p>
      </td>
      
      {/* 2. Action Button */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center"
      >
        <span
          onClick={handleRoleUpdate}
          className="relative cursor-pointer inline-flex items-center px-4 py-2 font-semibold text-white leading-tight transition duration-150 transform hover:scale-105 shadow-md rounded-full bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          title={`Promote ${request?.email} to Contest Creator`}
        >
          <FaUserEdit className="mr-2 text-sm" />
          <span>Make Creator</span>
        </span>
      </td>
    </tr>
  );
};

export default CreatorRequestsDataRow;