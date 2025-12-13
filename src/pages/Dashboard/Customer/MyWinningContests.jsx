

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaTrophy, FaDollarSign, FaCrown } from "react-icons/fa";
import { format } from "date-fns";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";

const MyWinningContests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: winningContests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-winning-contests", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
  
      const res = await axiosSecure.get(`/my-winning-contests`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  if (winningContests.length === 0) {
    return (
      <div
        className="text-center py-20 bg-white shadow-xl rounded-lg mx-auto max-w-2xl border-2 border-dashed border-gray-300"
        data-aos="zoom-in"
      >
        <FaTrophy className="mx-auto text-yellow-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No Victory Yet!
        </h2>
        <p className="text-gray-500">
          Keep participating! Your next contest could be your first win.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8">
     
      <div
        className="text-center mb-10" 
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-block border-b-4 border-yellow-500 pb-2">
          
          <div className="mb-2 block md:hidden">
            <FaCrown className="text-5xl text-yellow-600 mx-auto" />
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 inline-flex items-center">
           
            <span className="hidden md:inline-flex items-center justify-center">
              <FaCrown className="mr-3 text-yellow-600 text-4xl" />
            </span>
            My Glorious Victories ({winningContests.length})
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {winningContests.map((contest, index) => (
          <div
            key={contest._id}
            className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-[1.03] border-t-4 border-yellow-500"
            data-aos="fade-up" 
            data-aos-delay={index * 100}
          >
            {/* Contest Image */}
            <div className="h-40 overflow-hidden">
              <img
                className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-90"
                src={contest.image}
                alt={contest.name}
              />
            </div>

            {/* Card Content */}
            <div className="p-6">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                Winner
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {contest.name}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                Category: {contest.category}
              </p>

              {/* Prize and Declaration */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center text-green-600">
                  <FaDollarSign className="mr-2 text-lg" />
                  <p className="font-extrabold text-lg">
                    Prize Money: ${contest.prizeMoney}
                  </p>
                </div>

                <div className="text-xs text-gray-600">
                  <p>
                    <span className="font-semibold">Declared On: </span>
                    {contest.winner?.declaredAt
                      ? format(
                          new Date(contest.winner.declaredAt),
                          "MMM dd, yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWinningContests;
