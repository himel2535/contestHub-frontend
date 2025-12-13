import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import {
  FaChartBar,
  FaDollarSign,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

// 💡 IMPORTS FOR BAR CHART
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Custom Tooltip Component for Bar Chart ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-md text-sm">
        <p className="font-semibold text-gray-800">{`${label} Contests`}</p>
        {/* payload[0] is the 'Count' Bar data */}
        <p className="text-green-600">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Sub-Component: Contest Status Bar Chart  ---
const StatusBarChart = ({ stats }) => {
  const chartData = [
    {
      name: "Completed",
      Count: stats.completedContests || 0,
      color: "#10b981", // Emerald Green
    },
    {
      name: "Confirmed",
      Count: stats.confirmedContests || 0,
      color: "#f59e0b", // Amber/Yellow
    },
    {
      name: "Pending",
      Count: stats.pendingContests || 0,
      color: "#fde047", // Yellow-300
    },
  ].filter((item) => item.Count > 0);

  const totalCount = chartData.reduce((sum, item) => sum + item.Count, 0);

  if (totalCount === 0) {
    return (
      <div
        className="flex flex-col p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 w-full h-full items-center justify-center min-h-[350px]"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaChartBar className="mr-2 text-yellow-600" /> Contest Status Breakdown
        </h3>
        <p className="text-gray-500 mt-4">
          No contests to display status chart.
        </p>
      </div>
    );
  }

  // Custom Bar component to apply dynamic color
  const CustomBar = (props) => {
    const { x, y, width, height, payload } = props;

    // Fallback color if color property is missing
    const barColor = payload && payload.color ? payload.color : "#ccc"; 

    return (
      <rect x={x} y={y} width={width} height={height} fill={barColor} rx={5} />
    );
  };
  
  return (
    <div
      className="flex flex-col p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 w-full h-full"
      data-aos="fade-right"
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <FaChartBar className="mr-2 text-yellow-600" /> Contest Status Breakdown
      </h3>

      {/* 💡 ফিক্স: min-h-[350px] যোগ করা হলো চার্ট রেন্ডারিং নিশ্চিত করতে */}
      <div className="flex-grow min-h-[350px] w-full"> 
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis dataKey="name" stroke="#555" />
            <YAxis allowDecimals={false} stroke="#555" />
            <Tooltip content={<CustomTooltip />} /> {/* 💡 Custom Tooltip ব্যবহার করা হলো */}
            <Bar
              dataKey="Count"
              // eslint-disable-next-line react-hooks/static-components
              shape={<CustomBar />}
              label={{ position: "top", fill: "#555", fontSize: 12 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- Main Component ---
const CreatorStatistics = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Creator Statistics
  const {
    data: statsData = {}, 
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["creatorStats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/creator-stats`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (isError)
    return (
      <div className="text-red-500 text-center py-10 text-xl font-semibold">
        Failed to load statistics. Please check server connection.
      </div>
    );

  // Destructure the data
  const { totalContests, totalRevenue, totalParticipants, ...statusStats } =
    statsData;

  // Format currency
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalRevenue || 0);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div
        className="text-center mb-10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-block border-b-4 border-yellow-500 pb-2">
          {/* Small Screen Icon */}
          <div className="mb-2 block md:hidden">
            <FaChartBar className="text-5xl text-yellow-600 mx-auto" />
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 inline-flex items-center">
            {/* Large Screen Icon */}
            <span className="hidden md:inline-flex items-center justify-center">
              <FaChartBar className="mr-3 text-yellow-600 text-4xl" />
            </span>
            Creator Statistics & Earnings
          </h2>
        </div>
      </div>
      
      {/* 💡 নতুন প্যারাগ্রাফ যোগ করা হলো */}
      <p 
        className="text-center text-gray-600 mb-10 max-w-4xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        View key metrics related to your created contests, total revenue generated, and 
        a detailed breakdown of your contests by status (Pending, Confirmed, Completed).
      </p>

      {/* Overview Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Total Contests Created */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="0"
        >
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Contests Created
            </p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {totalContests || 0}
            </p>
          </div>
          <FaClipboardList className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Total Participants */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Participants
            </p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {totalParticipants || 0}
            </p>
          </div>
          <FaUsers className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Total Revenue */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {formattedRevenue}
            </p>
          </div>
          <FaDollarSign className="text-5xl text-yellow-300 opacity-70" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contest Status Bar Chart */}
        <div className="lg:col-span-1">
          <StatusBarChart stats={statusStats} />
        </div>

        {/* Placeholder for future charts (e.g., Monthly Revenue Chart) */}
        <div
          className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 flex items-center justify-center min-h-[350px]"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <p className="text-gray-500 text-lg font-medium">
            Placeholder: Monthly Revenue Chart (Future Feature)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorStatistics;