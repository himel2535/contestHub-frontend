import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaTrophy, FaDollarSign, FaCrown, FaList } from "react-icons/fa"; 
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
        className="text-center py-20 bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl rounded-lg mx-auto max-w-2xl border-2 border-dashed border-gray-300 dark:border-gray-700"
        data-aos="zoom-in"
      >
        <FaTrophy className="mx-auto text-yellow-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          No Victory Yet!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Keep participating! Your next contest could be your first win.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8 dark:bg-gray-900">
      

      <div
        className="text-center mb-4" 
        data-aos="fade-down"
        data-aos-duration="800"
      >

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2"
        >
          <FaCrown className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
          <span className="">
            <span>My Glorious Victories</span>
            <span className="text-yellow-500/80 font-semibold text-2xl sm:text-4xl">({winningContests.length})</span>
          </span>
        </h2>
      </div>


      <p className="text-gray-600 dark:text-gray-300 mb-10 text-center max-w-3xl mx-auto leading-relaxed">
        This dedicated section showcases all the contests where you have been
        officially declared the winner. Each entry below represents a successful
        achievement, detailing the contest name, category, the prize money
        awarded, and the date of victory. This is your personal hall of fame, a
        testament to your skill and dedication in conquering various challenges
        on our platform.
      </p>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {winningContests.map((contest, index) => (
          <div
            key={contest._id}

            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-700/50 overflow-hidden transform transition duration-500 hover:scale-[1.03] border-t-4 border-yellow-500"
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

              <span className="inline-block bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                Winner
              </span>

 
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {contest.name}
              </h3>

       
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Category: {contest.category}
              </p>

              {/* Prize and Declaration */}
         
              <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <FaDollarSign className="mr-2 text-lg" />
                  <p className="font-extrabold text-lg">
                    Prize Money: ${contest.prizeMoney}
                  </p>
                </div>

                {/* তারিখ টেক্সট কালার */}
                <div className="text-xs text-gray-600 dark:text-gray-400">
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
      

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xl mx-auto">
          Congratulations on your outstanding performance! As a valued winner,
          you may proceed to your profile or dashboard to manage any pending prize
          collections or to explore more exciting contests to participate in and
          conquer.
        </p>
      </div>
    </div>
  );
};

export default MyWinningContests;