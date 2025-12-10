

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaTrophy, FaUsers, FaMoneyBillWave } from "react-icons/fa";

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

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-lime-600 mb-10">
          🏆 Contest Hall of Fame
        </h2>

        {/* --- 1. Stats Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Winners */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border-b-4 border-lime-500">
            <FaUsers className="text-5xl text-lime-500 mx-auto mb-3" />
            <p className="text-xl font-medium text-gray-700">Total Winners</p>
            <p className="text-4xl font-bold text-gray-800">{totalWinners}</p>
          </div>

          {/* Total Prize Money */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border-b-4 border-lime-500">
            <FaMoneyBillWave className="text-5xl text-lime-500 mx-auto mb-3" />
            <p className="text-xl font-medium text-gray-700">
              Prize Money Given
            </p>
            <p className="text-4xl font-bold text-gray-800">
              ${totalPrizeMoney}
            </p>
          </div>

          {/* Contest Category */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border-b-4 border-lime-500">
            <FaTrophy className="text-5xl text-lime-500 mx-auto mb-3" />
            <p className="text-xl font-medium text-gray-700">Total Contests</p>
            <p className="text-4xl font-bold text-gray-800">
              {recentWinners.length}
            </p>{" "}
            {/* ⚠️ Note: Use a separate aggregation if you need ALL contests */}
          </div>
        </div>

        {/* --- 2. Recent Winners Section --- */}
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Recent Champions
        </h3>

        {recentWinners.length === 0 ? (
          <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-md">
            No winners declared yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentWinners.map((winner, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition duration-300 border-l-4 border-lime-500"
              >
                <img
                  src={winner.winnerPhoto || "default-user-placeholder.jpg"}
                  alt={winner.winnerName}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-lime-400"
                />
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {winner.winnerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Won: {winner.contestName}
                  </p>
                  <p className="text-lg font-semibold text-lime-600">
                    Prize: ${winner.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerLeaderboard;
