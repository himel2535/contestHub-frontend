// src/components/Dashboard/TableRows/AdminContestDataRow.jsx (অনুমিত কোড)

// import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const AdminContestDataRow = ({ contest, refetch }) => {
  const axiosSecure = useAxiosSecure();

  // 💡 Reject এবং Confirm এর জন্য PATCH রিকোয়েস্ট
  const handleStatusUpdate = async (newStatus) => {
    try {
      // 💡 এটি PATCH রুট ব্যবহার করছে, যা কনটেস্টটি ডিলিট করবে না।
      await axiosSecure.patch(`/contest-status/${contest._id}`, { status: newStatus });
      toast.success(`Contest status updated to ${newStatus}!`);
      refetch && refetch();
    } catch (err) {
      toast.error(`Failed to set status to ${newStatus}.`);
      console.error(err);
    }
  };

  // ⚠️ স্থায়ীভাবে ডিলিট করার জন্য DELETE রিকোয়েস্ট
  const handlePermanentDelete = async () => {
    try {
        // ⚠️ এটিই ডাটাবেস থেকে স্থায়ীভাবে ডিলিট করে।
        await axiosSecure.delete(`/contests-delete/${contest._id}`);
        toast.success("Contest permanently deleted by Admin.");
        refetch && refetch();
    } catch (err) {
        toast.error("Failed to delete contest permanently.");
        console.error(err);
    }
  }

  // UI স্ট্যাটাস কালার কোডিং
  const statusClasses = {
    Pending: "bg-yellow-200 text-yellow-900",
    Confirmed: "bg-green-200 text-green-900",
    Rejected: "bg-red-200 text-red-900",
    Completed: "bg-blue-200 text-blue-900",
  };
  const statusClass = statusClasses[contest.status] || "bg-gray-200 text-gray-900";


  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{contest.name}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{contest.category}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className={`px-3 py-1 font-semibold text-xs rounded-full ${statusClass}`}>
          {contest.status}
        </span>
      </td>

      {/* Action Buttons */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
        {/* Confirm Button */}
        {contest.status === 'Pending' && (
          <button
            onClick={() => handleStatusUpdate('Confirmed')}
            className="text-green-600 hover:text-green-800 p-2 border border-green-300 rounded-md transition duration-150"
            title="Confirm Contest"
          >
            <FaCheck />
          </button>
        )}

        {/* Reject Button (uses PATCH /contest-status/:id) */}
        {contest.status === 'Pending' && (
          <button
            onClick={() => handleStatusUpdate('Rejected')}
            className="text-red-600 hover:text-red-800 p-2 border border-red-300 rounded-md transition duration-150"
            title="Reject Contest"
          >
            <FaTimes />
          </button>
        )}
        
        {/* Permanent Delete Button */}
        {contest.status !== 'Confirmed' && contest.status !== 'Completed' && ( 
            <button
                onClick={handlePermanentDelete}
                className="text-gray-500 hover:text-gray-700 p-2 border border-gray-300 rounded-md ml-2 transition duration-150"
                title="Permanent Delete from Database"
            >
                <FaTrash />
            </button>
        )}
      </td>
    </tr>
  );
};

export default AdminContestDataRow;