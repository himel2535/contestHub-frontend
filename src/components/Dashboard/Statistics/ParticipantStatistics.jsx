// src/pages/Dashboard/Customer/CustomerStatistics.jsx

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import {
  FaChartBar,
  FaChartPie,
  FaTrophy,
  FaUser,
  FaList,
} from "react-icons/fa";

// --- Sub-Component: Win Percentage Donut Chart ---
const WinRateChart = ({ winPercentage }) => {
  const won = parseFloat(winPercentage);
  const participated = 100 - won;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <FaChartPie className="mr-2 text-yellow-600" /> Win Rate
      </h3>
      <div className="relative w-32 h-32">
        {/* Simple CSS Donut Chart Mockup */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#facc15 ${won}%, #d1d5db 0)`,
          }}
        >
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-yellow-600">{won}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm font-medium text-gray-600">
        <p className="text-yellow-600">Won: {won}%</p>
        <p className="text-gray-400">
          Participated: {participated.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

// --- Sub-Component: Category Participation Bar Chart Mockup ---
const CategoryBarChart = ({ categoryStats }) => {
  if (categoryStats.length === 0) {
    return (
      <p className="text-gray-500">
        No participation data available for categories.
      </p>
    );
  }

  // Find the max count for scaling the bars
  const maxCount = Math.max(...categoryStats.map((stat) => stat.count));

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
        <FaChartBar className="mr-2 text-yellow-600" /> Participation by
        Category
      </h3>
      <div className="space-y-4">
        {categoryStats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1 text-sm font-medium">
              <span className="text-gray-700">{stat._id}</span>
              <span className="text-yellow-600 font-bold">{stat.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{ width: `${(stat.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
const ParticipantStatistics = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Customer Statistics
  const {
    data: statsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customerStats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/customer-stats`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-red-500 text-center py-10">
        Failed to load statistics.
      </div>
    );

  const { participationCount, winCount, winPercentage, categoryStats } =
    statsData;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center">
        <FaList className="mr-3 text-yellow-600" /> My Activity Statistics
      </h2>

      {/* Overview Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Total Participated */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Participated
            </p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {participationCount}
            </p>
          </div>
          <FaUser className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Contests Won */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Contests Won</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {winCount}
            </p>
          </div>
          <FaTrophy className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Win Rate */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Overall Win Rate
            </p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {winPercentage}%
            </p>
          </div>
          <FaChartPie className="text-5xl text-yellow-300 opacity-70" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Win Rate Chart */}
        <div className="lg:col-span-1">
          <WinRateChart winPercentage={winPercentage} />
        </div>

        {/* Right: Participation by Category Chart */}
        <div className="lg:col-span-1">
          <CategoryBarChart categoryStats={categoryStats} />
        </div>
      </div>
    </div>
  );
};

export default ParticipantStatistics;
