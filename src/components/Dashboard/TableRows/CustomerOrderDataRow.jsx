// src/components/Dashboard/TableRows/CustomerOrderDataRow.jsx

import { format } from "date-fns";

const CustomerOrderDataRow = ({ contest }) => {
  // Determine badge color based on status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 💡 Deadline Formatting: Only displaying the date if it exists
  const formattedDeadline = contest.deadline
    ? format(new Date(contest.deadline), "MMM dd, yyyy")
    : "N/A"; // If deadline field is missing, show 'N/A'

  return (
    <tr className="hover:bg-gray-50">
      {/* 1. Image */}
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm text-center">
        <div className="flex items-center justify-content-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt={contest.name}
                src={contest.image}
                className="mx-auto object-cover rounded w-16 h-10 shadow-md"
              />
            </div>
          </div>
        </div>
      </td>

      {/* 2. Name */}
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{contest.name}</p>
      </td>

      {/* 3. Category */}
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-600">{contest.category}</p>
      </td>

      {/* 4. Fee */}
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${contest.contestFee}</p>
      </td>

      {/* 5. Status (Payment Status) */}
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
            contest.status
          )}`}
        >
          {contest.status}
        </span>
      </td>

      {/* 6. Deadline (Dynamically display contest.deadline) */}
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{formattedDeadline}</p>
      </td>

    </tr>
  );
};

export default CustomerOrderDataRow;
