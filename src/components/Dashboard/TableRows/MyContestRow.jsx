import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";

const MyContestRow = ({ contest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [status, setStatus] = useState(
    contest.status?.toLowerCase() || "pending"
  );

  // ---delete---
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/contests/${contest._id}`
      );
      toast.success("Contest deleted!");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete contest!");
      console.log(err);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value.toLowerCase();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/contests/${contest._id}/status`,
        {
          status: newStatus,
        }
      );
      setStatus(newStatus);
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
      console.log(err);
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition">
      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {contest.name}
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
        {contest.category}
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
        ${contest.contestFee}
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
        {status}
      </td>

      <td className="px-5 py-4 whitespace-nowrap text-sm flex gap-2">
        {/* Pending → Status Selector */}
        {status === "pending" && (
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-1 border-2 border-lime-300 rounded-md bg-white text-gray-900"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
          </select>
        )}

        {/* Confirmed → See Submissions */}
        {status === "confirmed" && (
          <Link
            to={`/dashboard/submissions/${contest._id}`}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            See Submissions
          </Link>
        )}

        {/* Edit & Delete */}
        {status === "pending" && (
          <>
            <Link
              to={`/dashboard/edit-contest/${contest._id}`}
              className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Edit
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
            <DeleteModal
              handleDelete={handleDelete}
              isOpen={isOpen}
              closeModal={closeModal}
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default MyContestRow;
