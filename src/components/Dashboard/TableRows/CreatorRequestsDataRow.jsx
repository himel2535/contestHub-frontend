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
      className="hover:bg-yellow-50 transition duration-150 ease-in-out"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <td className="px-5 py-4 border-b border-gray-100 bg-white text-sm text-center">
        <span
          onClick={handleRoleUpdate}
          className="relative cursor-pointer inline-flex items-center px-4 py-2 font-semibold text-white leading-tight transition duration-150 transform hover:scale-105 shadow-md rounded-full bg-yellow-600 hover:bg-yellow-700"
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
