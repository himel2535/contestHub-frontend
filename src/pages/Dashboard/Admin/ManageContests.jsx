
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
// 💡 Existing Delete Modal
import DeleteModal from "../../../components/Modal/DeleteModal";
// 💡 New Modals
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
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Manage All Contests
      </h2>
      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head... (no change) */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contest Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fee / Prize
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {contests.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No contests found for management.
                </td>
              </tr>
            ) : (
              contests.map((contest) => (
                <tr key={contest._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contest.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contest.contestCreator?.name || "N/A"}
                    <br />
                    <span className="text-xs">
                      {contest.contestCreator?.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Fee: ${contest.contestFee}
                    <br />
                    Prize: ${contest.prizeMoney}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                    {/* Confirm Button (Size increased to text-2xl) */}
                    <button
                      onClick={() => handleActionClick(contest._id, "confirm")}
                      disabled={contest.status !== "Pending" || isActionPending}
                      className={`mx-2 p-2 rounded transition duration-150 transform hover:scale-110 focus:outline-none ${
                        contest.status === "Pending"
                          ? "cursor-pointer text-green-600 hover:text-green-900 hover:bg-green-100"
                          : "opacity-50 cursor-not-allowed text-gray-400"
                      }`}
                      title="Confirm Contest"
                    >
                      <FaCheckCircle className="inline text-2xl" />
                    </button>

                    {/* Reject Button (Size increased to text-2xl) */}
                    <button
                      onClick={() => handleActionClick(contest._id, "reject")}
                      disabled={contest.status !== "Pending" || isActionPending}
                      className={`mx-2 p-2 rounded transition duration-150 transform hover:scale-110 focus:outline-none ${
                        contest.status === "Pending"
                          ? "cursor-pointer text-red-600 hover:text-red-900 hover:bg-red-100"
                          : "opacity-50 cursor-not-allowed text-gray-400"
                      }`}
                      title="Reject Contest"
                    >
                      <FaTimesCircle className="inline text-2xl" />
                    </button>

                    {/* Delete Button (Size increased to text-2xl) */}
                    <button
                      onClick={() => handleActionClick(contest._id, "delete")}
                      disabled={isActionPending}
                      className={`mx-2 p-2 rounded transition duration-150 transform hover:scale-110 focus:outline-none ${
                        !isActionPending
                          ? "cursor-pointer text-gray-600 hover:text-red-900 hover:bg-red-100"
                          : "opacity-50 cursor-not-allowed text-gray-400"
                      }`}
                      title="Permanently Delete Contest"
                    >
                      <FaTrashAlt className="inline text-2xl" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Action Modals --- */}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        closeModal={closeModal}
        handleAction={() => handleConfirmedAction("confirm")}
      />

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectOpen}
        closeModal={closeModal}
        handleAction={() => handleConfirmedAction("reject")}
      />

      {/* Delete Modal (Reusable for permanent delete) */}
      <DeleteModal
        isOpen={isDeleteOpen}
        closeModal={closeModal}
        handleDelete={() => handleConfirmedAction("delete")}
        actionType="delete" // To keep your DeleteModal logic clean
        message="Are you sure you want to permanently delete this contest from the database? This action is irreversible."
      />
    </div>
  );
};

export default ManageContests;
