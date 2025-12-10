// src/pages/LeaderboardPage/LeaderboardPage.jsx

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { FaCrown, FaTrophy, FaMedal, FaStar } from "react-icons/fa";

const DEFAULT_PHOTO = "https://i.ibb.co/68v8zJ3/default-user-placeholder.jpg";

const LeaderboardPage = () => {
  const {
    data: winners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topWinners"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/top-winners-ranking`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center p-12 text-red-500">
        Failed to load the Leaderboard.
      </div>
    );
  }

  const topThree = winners.slice(0, 3);
  const restWinners = winners.slice(3);

  return (
    <Container>
      <div className="py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-lime-600 mb-2 flex flex-col md:flex-row items-center justify-center">
            <FaCrown className="md:mr-3 text-yellow-500 text-4xl mb-2 md:mb-0" />{" "}
            Global Champions Ranking
          </h1>
          <p className="text-xl text-gray-600">
            Top users ranked by the number of contests they have won.
          </p>
        </div>

        {winners.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-lg text-center text-gray-700">
            <p className="text-2xl font-semibold">
              No Winners Declared Yet. Be the first to secure Rank 1!
            </p>
          </div>
        ) : (
          <>
            {/* --- A. Top 3 Spotlight --- */}

            <div className="flex flex-col items-center md:flex-row md:items-end justify-center md:gap-6 gap-6 mb-12">
              {/* Rank 2 */}
              {topThree[1] && (
                <RankingCard
                  winner={topThree[1]}
                  rank={2}
                  color="bg-gray-400"
                  icon={<FaMedal />}
                  size="h-72"
                  order="order-2 md:order-1"
                />
              )}

              {/* Rank 1 (Hero) */}
              {topThree[0] && (
                <RankingCard
                  winner={topThree[0]}
                  rank={1}
                  color="bg-yellow-500"
                  icon={<FaCrown />}
                  size="h-80"
                  hero={true}
                  order="order-1"
                />
              )}

              {/* Rank 3 */}
              {topThree[2] && (
                <RankingCard
                  winner={topThree[2]}
                  rank={3}
                  color="bg-orange-500"
                  icon={<FaMedal />}
                  size="h-64"
                  order="order-3 md:order-3"
                />
              )}
            </div>

            {/* --- B. Full Ranking Table  --- */}
            {restWinners.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-lg mt-8 overflow-x-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Full Leaderboard
                </h3>
                <table className="min-w-full leading-normal divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Champion
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Wins
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {restWinners.map((winner, index) => (
                      <tr key={winner.email} className="hover:bg-gray-50">
                        <td className="px-5 py-3 text-sm font-medium text-gray-900">
                          {index + 4}
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={winner.photo || DEFAULT_PHOTO}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                              alt={winner.name}
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {winner.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {winner.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-lg font-bold text-lime-600">
                          {winner.wins}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

// 💡 Ranking Card Sub-Component
const RankingCard = ({ winner, rank, color, icon, size, hero, order }) => (
  <div
    className={`flex flex-col items-center p-4 rounded-xl shadow-xl transition duration-300 transform hover:scale-105 ${size} relative text-white ${color} w-full max-w-xs ${order} ${
      hero ? "mt-0" : "mt-6 md:mt-0"
    }`}
  >
    <div
      className="absolute top-0 w-full h-full opacity-10 rounded-xl"
      style={{ backgroundColor: "#000" }}
    ></div>

    {hero && <FaStar className="text-5xl text-white mb-2 animate-pulse" />}

    <div className="text-center mt-auto w-full px-2">
      <div
        className={`text-4xl font-extrabold mb-1 flex items-center justify-center ${
          hero ? "text-white" : "text-gray-900"
        }`}
      >
        {icon}
      </div>
      <p
        className={`text-6xl font-black ${
          hero ? "text-white" : "text-gray-900"
        }`}
      >
        #{rank}
      </p>

      <img
        src={winner.photo || DEFAULT_PHOTO}
        className={`rounded-full object-cover mx-auto my-3 ring-4 ${
          hero ? "w-20 h-20 ring-yellow-300" : "w-16 h-16 ring-white"
        }`}
        alt={winner.name}
      />

      <p
        className={`text-xl font-bold truncate w-full ${
          hero ? "text-white" : "text-gray-900"
        }`}
      >
        {winner.name}
      </p>

      <p
        className={`text-sm truncate ${
          hero ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Wins: {winner.wins}
      </p>
    </div>
  </div>
);

export default LeaderboardPage;
