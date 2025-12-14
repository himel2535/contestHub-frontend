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

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center p-12 text-red-500 dark:text-red-400">
        Failed to load the Leaderboard.
      </div>
    );

  const topThree = winners.slice(0, 3);
  const restWinners = winners.slice(3);

  return (
    <Container>
      <div className="py-8">
        {/* --- Heading --- */}
        <div
          className="text-center mb-10"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <div className="inline-block border-b-4 border-yellow-500 pb-2">
            {/* Small devices: icon above */}
            <div className="block md:hidden mb-2">
              <FaCrown className="text-yellow-500 text-4xl mx-auto" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-3 md:flex-row flex-col">
              {/* Large devices: icon inline */}
              <span className="hidden md:flex">
                <FaCrown className="text-yellow-500 text-4xl mr-3" />
              </span>
              Global Champions Ranking
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-4">
            Top users ranked by the number of contests they have won.
          </p>
        </div>

        {/* --- No Winners --- */}
        {winners.length === 0 ? (
          <div
            className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg text-center text-gray-700 dark:text-gray-200"
            data-aos="zoom-in"
          >
            <p className="text-2xl font-semibold">
              No Winners Declared Yet. Be the first to secure Rank 1!
            </p>
          </div>
        ) : (
          <>
            {/* --- Top 3 Spotlight --- */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:gap-6 gap-6 mb-12">
              {topThree[1] && (
                <RankingCard
                  winner={topThree[1]}
                  rank={2}
                  color="from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900"
                  icon={<FaMedal />}
                  size="h-72"
                  order="order-2 md:order-1"
                  delay="100"
                />
              )}

              {topThree[0] && (
                <RankingCard
                  winner={topThree[0]}
                  rank={1}
                  color="from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700"
                  icon={<FaCrown />}
                  size="h-80"
                  hero={true}
                  order="order-1"
                  delay="0"
                />
              )}

              {topThree[2] && (
                <RankingCard
                  winner={topThree[2]}
                  rank={3}
                  color="from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700"
                  icon={<FaMedal />}
                  size="h-64"
                  order="order-3 md:order-3"
                  delay="200"
                />
              )}
            </div>

            {/* --- Full Ranking Table --- */}
            {restWinners.length > 0 && (
              <div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-8 overflow-x-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">
                  Full Leaderboard
                </h3>
                <table className="min-w-full leading-normal divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Champion
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Wins
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {restWinners.map((winner, index) => (
                      <tr
                        key={winner.email}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">
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
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                                {winner.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {winner.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-lg font-bold text-yellow-600">
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

const RankingCard = ({
  winner,
  rank,
  color,
  icon,
  size,
  hero,
  order,
  delay,
}) => (
  <div
    data-aos="zoom-in-up"
    data-aos-delay={delay}
    className={`flex flex-col items-center p-4 rounded-xl shadow-xl transform transition hover:scale-105 ${size} relative w-full max-w-xs ${order}`}
  >
    {/* Gradient background */}
    <div
      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-90`}
    ></div>

    {hero && <FaStar className="text-5xl text-white mb-2 animate-pulse relative z-10" />}

    <div className="text-center mt-auto w-full px-2 relative z-10">
      <div className="text-4xl font-extrabold mb-1 flex items-center justify-center text-white">
        {icon}
      </div>
      <p className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-black text-white mb-2">
        {rank}
      </p>

      <img
        src={winner.photo || DEFAULT_PHOTO}
        className={`rounded-full object-cover mx-auto my-3 ring-4 ${
          hero ? "w-20 h-20 ring-yellow-300" : "w-16 h-16 ring-white"
        }`}
        alt={winner.name}
      />

      <p className="text-xl font-bold truncate w-full text-white">{winner.name}</p>
      <p className="text-sm truncate text-gray-200">Wins: {winner.wins}</p>
    </div>
  </div>
);

export default LeaderboardPage;
