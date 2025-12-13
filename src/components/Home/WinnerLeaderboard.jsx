import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaTrophy, FaUsers, FaMoneyBillWave, FaStar } from "react-icons/fa";

const WinnerLeaderboard = () => {
  const {
    data: leaderboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/winners-leaderboard`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !leaderboardData) {
    return (
      <div className="text-center p-8 text-red-500">
        Error loading winners data.
      </div>
    );
  }

  const { totalWinners, totalPrizeMoney, recentWinners } = leaderboardData;
  const heroWinner = recentWinners[0];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900 transition duration-500">
      <div className="container mx-auto px-4">
        {/* --- 1. Inspirational Heading --- */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            🌟 Hall of Fame: Where Talent Wins Big
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See the incredible talents who turned their passion into success.
            Your name could be next!
          </p>
        </div>

        {/* --- 2. Global Stats Cards (Upgraded Design) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Total Winners */}
          <div className="bg-gradient-to-r from-yellow-500 to-green-500 p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition duration-300 text-white">
            <FaUsers className="text-5xl mb-3 opacity-80" />
            <p className="text-xl font-medium">Total Champions Crowned</p>
            <p className="text-5xl font-extrabold mt-1">{totalWinners}</p>
          </div>

          {/* Total Prize Money */}
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition duration-300 text-white">
            <FaMoneyBillWave className="text-5xl mb-3 opacity-80" />
            <p className="text-xl font-medium">Total Prizes Distributed</p>
            <p className="text-5xl font-extrabold mt-1">
              ${totalPrizeMoney.toLocaleString()}
            </p>
          </div>

          {/* Total Contests (Adjusted to be more inspirational) */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition duration-300 text-white">
            <FaStar className="text-5xl mb-3 opacity-80" />
            <p className="text-xl font-medium">Contests Launched</p>
            <p className="text-5xl font-extrabold mt-1">
              {(totalWinners > 0 ? totalWinners : "") || "Start Now!"}
            </p>
          </div>
        </div>

        {/* --- 3. Recent Champions & Hero Winner --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* A. Hero Winner Card (Left side) */}
          {heroWinner && (
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-t-8 border-yellow-500 h-fit sticky top-10">
              <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                Latest Champion!
              </h3>
              <div className="flex flex-col items-center">
                <img
                  src={heroWinner.winnerPhoto || "default-user-placeholder.jpg"}
                  alt={heroWinner.winnerName}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-yellow-400 mb-4"
                />
                <p className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">
                  {heroWinner.winnerName}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                  Conquered:{" "}
                  <span className="font-semibold">
                    {heroWinner.contestName}
                  </span>
                </p>
                <p className="text-3xl font-extrabold text-red-500 mt-2">
                  Prize: ${heroWinner.prize}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Declared on:{" "}
                  {new Date(heroWinner.declaredAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* B. List of Other Recent Winners (Right side) */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2">
              Recent Success Stories
            </h3>

            {recentWinners.length <= 1 ? (
              <div className="text-center text-gray-500 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                No further winners declared yet. Be the first one!
              </div>
            ) : (
              <div className="space-y-4">
                {recentWinners.slice(1).map((winner, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition duration-300 border-l-4 border-yellow-500"
                  >
                    <img
                      src={winner.winnerPhoto || "default-user-placeholder.jpg"}
                      alt={winner.winnerName}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-yellow-400"
                    />
                    <div className="flex-grow">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {winner.winnerName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Category: {winner.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-yellow-600 dark:text-yellow-400">
                        ${winner.prize}
                      </p>
                      <p className="text-xs text-gray-500">Prize Money</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- 4. Call to Action/Inspiring Text --- */}
        <div className="mt-16 text-center bg-yellow-50 dark:bg-yellow-900 p-8 rounded-2xl shadow-inner">
          <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
            "Success isn't final; failure isn't fatal: It is the courage to
            continue that counts."
          </p>
          <p className="text-lg mt-3 text-yellow-700 dark:text-yellow-300">
            Join a contest today and start your journey to the Hall of Fame!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinnerLeaderboard;
