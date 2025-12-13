// src/components/Home/WinnerLeaderboard.jsx (আপডেট করা কোড)

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaTrophy, FaUsers, FaMoneyBillWave, FaStar, FaCrown } from "react-icons/fa";
import Container from "../Shared/Container"; // Container ইম্পোর্ট করা হলো (যদি এটি আপনার Shared ফোল্ডারে থাকে)

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
  
  // একটি আনুমানিক সংখ্যা সেট করা হলো যদি contests launched ডেটা না থাকে
  const totalContestsLaunched = totalWinners > 0 ? (totalWinners + 10) : 10; 

  return (
    <div className="py-16 bg-white transition duration-500">
      <Container> {/* Container ব্যবহার করা হলো */}
        {/* --- 1. Inspirational Heading (Similar Style) --- */}
        <div 
            className="text-center mb-12"
            data-aos="fade-down"
            data-aos-duration="800"
        >
          <div className="inline-block border-b-4 border-yellow-500 pb-2">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-2 flex items-center justify-center tracking-tight">
                <FaCrown className="text-yellow-500 text-4xl mr-3" />
                Hall of Fame: Where Talent Wins Big
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            See the incredible talents who turned their passion into success.
            Your name could be next!
          </p>
        </div>

        {/* --- 2. Global Stats Cards (Similar Style, Light Background) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Total Winners */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-yellow-500 transform hover:scale-[1.02] transition duration-300 text-gray-800"
            data-aos="fade-up" data-aos-delay="0"
          >
            <FaUsers className="text-5xl mb-3 text-yellow-500" />
            <p className="text-xl font-medium">Total Champions Crowned</p>
            <p className="text-5xl font-extrabold mt-1 text-green-600">{totalWinners}</p>
          </div>

          {/* Total Prize Money */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-amber-500 transform hover:scale-[1.02] transition duration-300 text-gray-800"
            data-aos="fade-up" data-aos-delay="150"
          >
            <FaMoneyBillWave className="text-5xl mb-3 text-amber-500" />
            <p className="text-xl font-medium">Total Prizes Distributed</p>
            <p className="text-5xl font-extrabold mt-1 text-red-600">
              ${totalPrizeMoney.toLocaleString()}
            </p>
          </div>

          {/* Total Contests */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-indigo-500 transform hover:scale-[1.02] transition duration-300 text-gray-800"
            data-aos="fade-up" data-aos-delay="300"
          >
            <FaStar className="text-5xl mb-3 text-indigo-500" />
            <p className="text-xl font-medium">Contests Launched</p>
            <p className="text-5xl font-extrabold mt-1 text-purple-600">
              {totalContestsLaunched}+
            </p>
          </div>
        </div>

        {/* --- 3. Recent Champions & Hero Winner --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* A. Hero Winner Card (Left side) */}
          {heroWinner && (
            <div 
              className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-2xl border-t-8 border-yellow-500 h-fit sticky top-10"
              data-aos="zoom-in"
            >
              <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Latest Champion!
              </h3>
              <div className="flex flex-col items-center">
                <img
                  src={heroWinner.winnerPhoto || "default-user-placeholder.jpg"}
                  alt={heroWinner.winnerName}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-yellow-400 mb-4"
                />
                <p className="text-2xl font-extrabold text-yellow-600">
                  {heroWinner.winnerName}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  Conquered:{" "}
                  <span className="font-semibold text-gray-800">
                    {heroWinner.contestName}
                  </span>
                </p>
                <p className="text-3xl font-extrabold text-red-600 mt-2">
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
            <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
              Recent Success Stories
            </h3>

            {recentWinners.length <= 1 ? (
              <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-md">
                No further winners declared yet. Be the first one!
              </div>
            ) : (
              <div className="space-y-4">
                {recentWinners.slice(1).map((winner, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition duration-300 border-l-4 border-yellow-500"
                    data-aos="fade-left" data-aos-delay={index * 100} // স্ট্যাগার্ড অ্যানিমেশন
                  >
                    <img
                      src={winner.winnerPhoto || "default-user-placeholder.jpg"}
                      alt={winner.winnerName}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-yellow-400"
                    />
                    <div className="flex-grow">
                      <p className="text-xl font-bold text-gray-900">
                        {winner.winnerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Category: {winner.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-yellow-600">
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

        {/* --- 4. Call to Action/Inspiring Text (Light Background) --- */}
        <div 
          className="mt-16 text-center bg-yellow-100 p-8 rounded-2xl shadow-inner"
          data-aos="zoom-in"
        >
          <p className="text-2xl font-bold text-yellow-800">
            "Success isn't final; failure isn't fatal: It is the courage to
            continue that counts."
          </p>
          <p className="text-lg mt-3 text-yellow-700">
            Join a contest today and start your journey to the Hall of Fame!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default WinnerLeaderboard;