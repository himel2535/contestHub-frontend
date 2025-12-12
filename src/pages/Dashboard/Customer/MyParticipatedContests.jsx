import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParticipatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-contests`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  const sortedContests = [...contests].sort((a, b) => {
    const deadlineA = new Date(a.deadline || a.paymentTime);
    const deadlineB = new Date(b.deadline || b.paymentTime);

    return deadlineA - deadlineB;
  });

  if (isPending) return <LoadingSpinner />;

  if (isError) return <ErrorPage />;

  if (sortedContests.length === 0) {
    return (
      <div className="text-center py-20 bg-white shadow-lg rounded-lg mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No Contests Participated Yet 😔
        </h2>
        <p className="text-gray-500">
          You haven't paid for any contests recently.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        My Participated Contests ({sortedContests.length})
      </h2>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="min-w-full leading-normal divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Fee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Payment Status
                  </th>
                  {/* 💡 Deadline Column Added */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Upcoming Deadline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedContests.map((contest) => (
                  <CustomerOrderDataRow
                    key={contest._id}
                    contest={contest}
                    showAction={false}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParticipatedContests;
