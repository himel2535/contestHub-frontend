import { useState } from "react";

import { Link } from "react-router";

import DeleteModal from "../../Modal/DeleteModal";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateContestModal from "../../Modal/UpdateContestModal";

const ContestDataRow = ({ contest, refetch }) => {
  const axiosSecure = useAxiosSecure();
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isPending = contest.status === "Pending";

  // Status Class Mapping for UI
  const statusClasses = {
    Pending: "bg-yellow-200 text-yellow-800",
    Confirmed: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
    Completed: "bg-blue-200 text-blue-800",
  };
  const currentStatusClass =
    statusClasses[contest.status] || "bg-gray-200 text-gray-800";

  function openDeleteModal() {
    if (isPending) {
      setIsDeleteOpen(true);
    }
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  // ---delete---
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/creator-contests-delete/${contest._id}`);
      toast.success("Contest deleted successfully!");
      refetch && refetch();
      closeDeleteModal();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete contest!";
      toast.error(errorMessage);
      console.error("Delete Error:", err);
      closeDeleteModal();
    }
  };

  // Update Modal Handlers
  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  return (
    <tr data-aos="fade-up" data-aos-delay="50">
      {/* Image */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="Contest Banner"
                src={contest.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      {/* Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{contest.name}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full text-xs transition duration-200 ${currentStatusClass}`}
        >
          {contest.status}
        </span>
      </td>

      {/* Submissions Button */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link
          to={`/dashboard/contest-submissions/${contest._id}`}
          className="relative inline-block px-3 py-1 font-semibold leading-tight group text-center"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-yellow-200 opacity-70 rounded-full transition duration-150 group-hover:bg-yellow-300"
          ></span>
          <span className="relative text-yellow-900 group-hover:text-yellow-800">
            Submissions ({contest.submissionCount || 0})
          </span>
        </Link>
      </td>

      {/* Update/Edit Button (Disabled if not Pending) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => isPending && setIsEditModalOpen(true)}
          disabled={!isPending}
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full transition duration-150 ${
            isPending
              ? "cursor-pointer text-green-900 group"
              : "cursor-not-allowed text-gray-500 opacity-70"
          }`}
          title={
            isPending
              ? "Edit Contest"
              : `Cannot edit contest with status: ${contest.status}`
          }
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-full transition duration-150 ${
              isPending
                ? "bg-green-200 opacity-70 group-hover:bg-green-300"
                : "bg-gray-200 opacity-50"
            }`}
          ></span>
          <span className="relative">Edit</span>
        </button>

        <UpdateContestModal
          contest={contest}
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          closeModal={closeEditModal}
          refetch={refetch}
        />
      </td>

      {/* Delete Button (Disabled if not Pending) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={openDeleteModal}
          disabled={!isPending}
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full transition duration-150 ${
            isPending
              ? "cursor-pointer text-red-900 group"
              : "cursor-not-allowed text-gray-500 opacity-70"
          }`}
          title={
            isPending
              ? "Delete Contest"
              : `Cannot delete contest with status: ${contest.status}`
          }
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-full transition duration-150 ${
              isPending
                ? "bg-red-200 opacity-70 group-hover:bg-red-300"
                : "bg-gray-200 opacity-50"
            }`}
          ></span>
          <span className="relative">Delete</span>
        </button>

        <DeleteModal
          handleDelete={handleDelete}
          isOpen={isDeleteOpen}
          closeModal={closeDeleteModal}
          actionType="delete"
        />
      </td>
    </tr>
  );
};

export default ContestDataRow;
