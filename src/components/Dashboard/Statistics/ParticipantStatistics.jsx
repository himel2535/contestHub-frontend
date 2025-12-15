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
    <div
      className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-yellow-500"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-4 flex items-center">
        <FaChartPie className="mr-2 text-yellow-600" /> Win Rate
      </h3>
      <div className="relative w-50 h-50">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#facc15 ${won}%, #d1d5db ${won}%)`,
          }}
        >
          <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-yellow-600">{won}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">
        <p className="text-yellow-600">Won: {won}%</p>
        <p className="text-gray-400 dark:text-gray-400">
          Participated: {participated.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

// --- Sub-Component: Category Participation Bar Chart ---
const CategoryBarChart = ({ categoryStats }) => {
  if (!categoryStats || categoryStats.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-yellow-500">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-6 flex items-center">
          <FaChartBar className="mr-2 text-yellow-600" /> Participation by
          Category
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No participation data available for categories.
        </p>
      </div>
    );
  }

  const maxCount = Math.max(...categoryStats.map((stat) => stat.count));

  return (
    <div
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-yellow-500"
      data-aos="fade-left"
      data-aos-duration="1000"
    >
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-6 flex items-center">
        <FaChartBar className="mr-2 text-yellow-600" /> Participation by
        Category
      </h3>
      <div className="space-y-4">
        {categoryStats.map((stat, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="flex justify-between items-center mb-1 text-sm font-medium">
              <span className="text-gray-700 dark:text-gray-200">
                {stat._id}
              </span>
              <span className="text-yellow-600 font-bold">{stat.count}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
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

  const {
    data: statsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ParticipantStats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/Participant-stats`);
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

  const {
    participationCount,
    winCount,
    winPercentage,
    //  categoryStats
  } = statsData;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-10 inline-flex items-center whitespace-nowrap border-b-4 border-yellow-500 pb-2"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <FaList className="mr-2 text-yellow-600 text-2xl md:text-3xl flex-shrink-0" />
        <span>My Activity Statistics</span>
      </h2>

      {/* Overview Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Total Participated */}
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="0"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Total Participated
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {participationCount}
            </p>
          </div>
          <FaUser className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Contests Won */}
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Contests Won
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {winCount}
            </p>
          </div>
          <FaTrophy className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Win Rate */}
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Overall Win Rate
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {winPercentage}%
            </p>
          </div>
          <FaChartPie className="text-5xl text-yellow-300 opacity-70" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-1 gap-8 text-center item-center justify-center">
        <WinRateChart winPercentage={winPercentage} />
        {/* <CategoryBarChart categoryStats={categoryStats} /> */}
      </div>
    </div>
  );
};

export default ParticipantStatistics;
