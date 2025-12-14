import { format } from "date-fns";

const ParticipantOrderDataRow = ({ contest }) => {

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"; 
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"; 
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  //  Deadline Formatting: Only displaying the date if it exists
  const formattedDeadline = contest.deadline
    ? format(new Date(contest.deadline), "MMM dd, yyyy")
    : "N/A"; 

  return (
    <>
      {/* 1. Image */}

      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center">
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

      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <p className="text-gray-900 dark:text-gray-100 font-medium">{contest.name}</p>
      </td>

      {/* 3. Category */}

      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <p className="text-gray-600 dark:text-gray-400">{contest.category}</p>
      </td>

      {/* 4. Fee */}
      {/* 💡 ফিক্স: cell background, border এবং text কালার dark mode এর জন্য আপডেট করা হয়েছে */}
      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <p className="text-gray-900 dark:text-gray-100">${contest.contestFee}</p>
      </td>

      {/* 5. Status (Payment Status) */}

      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
            contest.status
          )}`}
        >
          {contest.status}
        </span>
      </td>

      {/* 6. Deadline (Dynamically display contest.deadline) */}

      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <p className="text-gray-900 dark:text-gray-100 font-medium">{formattedDeadline}</p>
      </td>
    </>
  );
};

export default ParticipantOrderDataRow;