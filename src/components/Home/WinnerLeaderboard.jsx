// src/components/Home/WinnerLeaderboard.jsx

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import {
  FaTrophy,
  FaUsers,
  FaMoneyBillWave,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import Container from "../Shared/Container";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

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

  if (isLoading) return <LoadingSpinner />;
  if (isError || !leaderboardData) return <ErrorPage />;

  const { totalWinners, totalPrizeMoney, recentWinners } = leaderboardData;
  const heroWinner = recentWinners?.[0];
  const totalContestsLaunched = totalWinners > 0 ? totalWinners + 10 : 10;

  return (
    <section className="py-12 bg-white dark:bg-gray-900 overflow-x-hidden">
      <Container>
        {/* overflow lock */}
        <div className=" transition-colors duration-500 overflow-x-hidden">
          {/* ---------- Header ---------- */}
          <div className="text-center mb-12 px-4 sm:px-6" data-aos="fade-down">
            <div className="inline-block border-b-4 border-yellow-500 pb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200 flex items-center justify-center tracking-tight">
                <FaCrown className="hidden md:inline-block text-yellow-500 mr-3" />
                Hall of Fame: Where Talent Wins Big
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mt-4 mx-auto">
              See the incredible talents who turned their passion into success.
              Your name could be next!
            </p>
          </div>

          {/* ---------- Stats Cards ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 ">
            {/* Winners */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-yellow-500 text-center">
              <FaUsers className="text-4xl sm:text-5xl mb-3 text-yellow-500 mx-auto" />
              <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200">
                Total Champions Crowned
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold mt-1 text-green-600 dark:text-green-400">
                {totalWinners}
              </p>
            </div>

            {/* Prize */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-amber-500 text-center">
              <FaMoneyBillWave className="text-4xl sm:text-5xl mb-3 text-amber-500 mx-auto" />
              <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200">
                Total Prizes Distributed
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold mt-1 text-red-600 dark:text-red-400">
                ${totalPrizeMoney.toLocaleString()}
              </p>
            </div>

            {/* Contests */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-indigo-500 text-center sm:col-span-2 lg:col-span-1">
              <FaStar className="text-4xl sm:text-5xl mb-3 text-indigo-500 mx-auto" />
              <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200">
                Contests Launched
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold mt-1 text-purple-600 dark:text-purple-400">
                {totalContestsLaunched}+
              </p>
            </div>
          </div>

          {/* ---------- Winners Section ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            {/* Hero Winner (desktop sticky only) */}
            {heroWinner && (
              <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-t-8 border-yellow-500 text-center lg:sticky lg:top-10">
                <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Latest Champion!
                </h3>

                <img
                  src={heroWinner.winnerPhoto || "default-user-placeholder.jpg"}
                  alt={heroWinner.winnerName}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-yellow-400 mx-auto mb-4"
                />

                <p className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">
                  {heroWinner.winnerName}
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Conquered:{" "}
                  <span className="font-semibold">
                    {heroWinner.contestName}
                  </span>
                </p>

                <p className="text-3xl font-extrabold text-red-600 dark:text-red-400 mt-2">
                  Prize: ${heroWinner.prize}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  {new Date(heroWinner.declaredAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Other Winners */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6 border-b pb-2 dark:border-gray-700">
                Recent Success Stories
              </h3>

              {recentWinners.length <= 1 ? (
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-500 dark:text-gray-400">
                  No further winners declared yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentWinners.slice(1).map((winner, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex items-center gap-4 border-l-4 border-yellow-500"
                    >
                      <img
                        src={
                          winner.winnerPhoto || "default-user-placeholder.jpg"
                        }
                        alt={winner.winnerName}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-yellow-400"
                      />

                      <div className="flex-grow">
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          {winner.winnerName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Contest: {winner.contestName}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-extrabold text-yellow-600 dark:text-yellow-400">
                          ${winner.prize}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Prize
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------- CTA ---------- */}
          <div className="mt-16 text-center bg-yellow-100 dark:bg-gray-800 p-8 rounded-2xl shadow-inner ">
            <p className="text-xl md:text-2xl font-bold text-yellow-800 dark:text-yellow-400">
              "Success isn't final; failure isn't fatal."
            </p>
            <p className="mt-3 text-yellow-700 dark:text-yellow-300">
              Join a contest today and start your journey!
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WinnerLeaderboard;
