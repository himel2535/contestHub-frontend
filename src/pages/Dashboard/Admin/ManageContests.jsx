// src/pages/Dashboard/Admin/ManageContests.jsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
  FaClipboardList,
} from "react-icons/fa"; // 💡 FaClipboardList যোগ করা হয়েছে
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import DeleteModal from "../../../components/Modal/DeleteModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import RejectModal from "../../../components/Modal/RejectModal";

const ManageContests = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // --- Modal States ---
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const [contestToHandle, setContestToHandle] = useState(null);

  // Close all modals
  const closeModal = () => {
    setIsDeleteOpen(false);
    setIsConfirmOpen(false);
    setIsRejectOpen(false);
    setContestToHandle(null);
  };
  // -------------------

  // 1. Fetch all contests for Admin Management
  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminContests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-contests-admin`);
      return res.data;
    },
  });

  // 2. Mutation for Confirm/Reject status update (PATCH request)
  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/contest-status/${id}`, { status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(
        `Contest status updated to ${variables.status} successfully!`
      );
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["adminContests"] });
    },
    onError: (error) => {
      console.error("Status Update Error:", error);
      toast.error(
        `Failed to update status: ${
          error.response?.data?.message || error.message
        }`
      );
      closeModal();
    },
  });

  // 3. Mutation for Permanent Delete (DELETE request)
  const { mutate: deleteContest, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/contests-delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success(`Contest permanently deleted by Admin.`);
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["adminContests"] });
    },
    onError: (error) => {
      console.error("Permanent Delete Error:", error);
      toast.error(
        `Failed to delete contest: ${
          error.response?.data?.message || error.message
        }`
      );
      closeModal();
    },
  });

  // --- Handlers ---

  const handleActionClick = (id, type) => {
    setContestToHandle(id);
    if (type === "confirm") {
      setIsConfirmOpen(true);
    } else if (type === "reject") {
      setIsRejectOpen(true);
    } else if (type === "delete") {
      setIsDeleteOpen(true);
    }
  };

  // 💡 Final Action Dispatcher (called from inside the Modals)
  const handleConfirmedAction = (actionType) => {
    if (!contestToHandle) return;

    if (actionType === "confirm") {
      updateStatus({ id: contestToHandle, status: "Confirmed" });
    } else if (actionType === "reject") {
      updateStatus({ id: contestToHandle, status: "Rejected" });
    } else if (actionType === "delete") {
      deleteContest(contestToHandle);
    }
  };

  // --- Render Logic ---

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-red-500 text-center p-8">
        Failed to load contests.
      </div>
    );

  const isActionPending = isUpdating || isDeleting;

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8">
      {/* 💡 ফিক্সড: প্রধান হেডিং - ছোট ডিভাইসে আইকন উপরে, টেক্সট সেন্টারে */}
      <div
        className="w-full mb-4 text-center"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-flex flex-col md:flex-row md:items-center border-b-4 border-yellow-500 pb-2">
          <FaClipboardList className="mx-auto md:mr-3 text-yellow-600 text-4xl mb-2 md:mb-0" />

          <h2 className="text-4xl font-extrabold text-gray-900">
            Manage All Contests ({contests.length})
          </h2>
        </div>
      </div>

      {/* 💡 প্যারাগ্রাফ যোগ করা হলো */}
      <p
        className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Review all pending contest submissions. Approve them to make them live
        or reject them if they violate community guidelines. Deletion is
        permanent.
      </p>

      {/* Table Container */}
      <div
        className="overflow-x-auto bg-white shadow-2xl rounded-xl border border-gray-100"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head - 💡 হলুদ থিম */}
          <thead className="bg-yellow-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Contest Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Creator Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Fee / Prize
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {contests.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No contests found for management.
                </td>
              </tr>
            ) : (
              contests.map((contest, index) => (
                <tr
                  key={contest._id}
                  className="hover:bg-yellow-50 transition duration-150"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contest.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="text-gray-900 font-medium">
                      {contest.contestCreator?.name || "N/A"}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      {contest.contestCreator?.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="font-semibold text-yellow-600">
                      Fee: ${contest.contestFee}
                    </span>
                    <br />
                    <span className="font-semibold text-green-600">
                      Prize: ${contest.prizeMoney}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                        contest.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : contest.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : contest.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {contest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    {/* Confirm Button */}
                    <button
                      onClick={() => handleActionClick(contest._id, "confirm")}
                      disabled={contest.status !== "Pending" || isActionPending}
                      className={`mx-1 p-2 rounded-full transition duration-150 transform hover:scale-110 focus:outline-none ${
                        contest.status === "Pending"
                          ? "cursor-pointer text-green-600 hover:text-white hover:bg-green-500 shadow-md"
                          : "opacity-40 cursor-not-allowed text-gray-400"
                      }`}
                      title="Confirm Contest"
                    >
                      <FaCheckCircle className="inline text-2xl" />
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => handleActionClick(contest._id, "reject")}
                      disabled={contest.status !== "Pending" || isActionPending}
                      className={`mx-1 p-2 rounded-full transition duration-150 transform hover:scale-110 focus:outline-none ${
                        contest.status === "Pending"
                          ? "cursor-pointer text-red-600 hover:text-white hover:bg-red-500 shadow-md"
                          : "opacity-40 cursor-not-allowed text-gray-400"
                      }`}
                      title="Reject Contest"
                    >
                      <FaTimesCircle className="inline text-2xl" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleActionClick(contest._id, "delete")}
                      disabled={isActionPending}
                      className={`mx-1 p-2 rounded-full transition duration-150 transform hover:scale-110 focus:outline-none ${
                        !isActionPending
                          ? "cursor-pointer text-red-700 hover:text-white hover:bg-red-600 shadow-md"
                          : "opacity-40 cursor-not-allowed text-gray-400"
                      }`}
                      title="Permanently Delete Contest"
                    >
                      <FaTrashAlt className="inline text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Action Modals --- */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        closeModal={closeModal}
        handleAction={() => handleConfirmedAction("confirm")}
      />
      <RejectModal
        isOpen={isRejectOpen}
        closeModal={closeModal}
        handleAction={() => handleConfirmedAction("reject")}
      />
      {/* Assuming DeleteModal is themed correctly */}
      <DeleteModal
        isOpen={isDeleteOpen}
        closeModal={closeModal}
        handleDelete={() => handleConfirmedAction("delete")}
        actionType="delete"
        message="Are you sure you want to permanently delete this contest from the database? This action is irreversible."
      />
    </div>
  );
};

export default ManageContests;
