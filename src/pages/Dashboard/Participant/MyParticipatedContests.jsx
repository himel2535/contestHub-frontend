import { useQuery } from "@tanstack/react-query";
import ParticipantOrderDataRow from "../../../components/Dashboard/TableRows/ParticipantOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaListAlt, FaList } from "react-icons/fa"; 

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
    // Sorting by deadline (ascending)
    const deadlineA = new Date(a.deadline || a.paymentTime);
    const deadlineB = new Date(b.deadline || b.paymentTime);

    return deadlineA - deadlineB;
  });

  if (isPending) return <LoadingSpinner />;

  if (isError) return <ErrorPage />;

  if (sortedContests.length === 0) {
    return (
      <div
        className="text-center py-20 bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl rounded-xl mx-auto max-w-lg"
        data-aos="zoom-in"
      >
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          No Contests Participated Yet 😔
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          You haven't paid for any contests recently. Start exploring now!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8 dark:bg-gray-900">
      
 
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 sm:mb-10 flex items-center border-b-4 border-yellow-500 pb-2"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <FaList className="mr-2 text-yellow-600 text-xl sm:text-2xl md:text-3xl flex-shrink-0" />

        <span className="flex flex-col sm:flex-row sm:space-x-1">
          <span>My Participated Contests</span>
          {/* <span className="text-yellow-500/80 font-semibold text-xl sm:text-3xl">({sortedContests.length})</span> */}
        </span>
      </h2>


      <div
        className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl rounded-xl overflow-hidden"
        data-aos="fade-up"
      >
        <div className="p-4 overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="min-w-full leading-normal divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-yellow-50 dark:bg-yellow-900/40">
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Fee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Upcoming Deadline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {sortedContests.map((contest, index) => (
                  <tr
                    key={contest._id}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <ParticipantOrderDataRow
                      contest={contest}
                      showAction={false}
                    />
                  </tr>
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