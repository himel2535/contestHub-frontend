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

  // Status mapping is kept as is, but parent TD background will be fixed
  const isPending = contest.status === "Pending";

  // Status Class Mapping for UI
  const statusClasses = {
    Pending: "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200", // 💡 ডার্ক মোড ফিক্সড
    Confirmed: "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200", // 💡 ডার্ক মোড ফিক্সড
    Rejected: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200", // 💡 ডার্ক মোড ফিক্সড
    Completed: "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200", // 💡 ডার্ক মোড ফিক্সড
  };
  const currentStatusClass =
    statusClasses[contest.status] || "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

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
    // 💡 ডার্ক মোড হোভার ফিক্স
    <tr className="transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-700" data-aos="fade-up" data-aos-delay="50">
      
      {/* Image */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
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
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড, বর্ডার এবং টেক্সট
        className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <p className="text-gray-900 dark:text-gray-100 font-medium">{contest.name}</p>
      </td>

      {/* Status */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <span
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full text-xs transition duration-200 ${currentStatusClass}`}
        >
          {contest.status}
        </span>
      </td>

      {/* Submissions Button */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <Link
          to={`/dashboard/contest-submissions/${contest._id}`}
          className="relative inline-block px-3 py-1 font-semibold leading-tight group text-center"
        >
          <span
            aria-hidden="true"
            // 💡 ডার্ক মোড হোভার ফিক্স
            className="absolute inset-0 bg-yellow-200 opacity-70 rounded-full transition duration-150 group-hover:bg-yellow-300 dark:bg-yellow-800 dark:opacity-50 dark:group-hover:bg-yellow-700"
          ></span>
          {/* 💡 ডার্ক মোড টেক্সট */}
          <span className="relative text-yellow-900 dark:text-yellow-200 group-hover:text-yellow-800 dark:group-hover:text-yellow-100">
            Submissions ({contest.submissionCount || 0})
          </span>
        </Link>
      </td>

      {/* Update/Edit Button (Disabled if not Pending) */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <button
          onClick={() => isPending && setIsEditModalOpen(true)}
          disabled={!isPending}
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full transition duration-150 ${
            isPending
              ? "cursor-pointer text-green-900 dark:text-green-200 group" // 💡 ডার্ক মোড টেক্সট
              : "cursor-not-allowed text-gray-500 dark:text-gray-400 opacity-70" // 💡 ডার্ক মোড টেক্সট
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
                ? "bg-green-200 opacity-70 group-hover:bg-green-300 dark:bg-green-800 dark:opacity-50 dark:group-hover:bg-green-700" // 💡 ডার্ক মোড ফিক্সড
                : "bg-gray-200 dark:bg-gray-700 opacity-50" // 💡 ডার্ক মোড ফিক্সড
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
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <button
          onClick={openDeleteModal}
          disabled={!isPending}
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full transition duration-150 ${
            isPending
              ? "cursor-pointer text-red-900 dark:text-red-200 group" // 💡 ডার্ক মোড টেক্সট
              : "cursor-not-allowed text-gray-500 dark:text-gray-400 opacity-70" // 💡 ডার্ক মোড টেক্সট
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
                ? "bg-red-200 opacity-70 group-hover:bg-red-300 dark:bg-red-800 dark:opacity-50 dark:group-hover:bg-red-700" // 💡 ডার্ক মোড ফিক্সড
                : "bg-gray-200 dark:bg-gray-700 opacity-50" // 💡 ডার্ক মোড ফিক্সড
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