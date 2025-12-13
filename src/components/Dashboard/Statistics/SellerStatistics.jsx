// src/pages/Dashboard/Creator/SellerStatistics.jsx

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  FaChartBar,
  FaDollarSign,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

// 💡 NEW IMPORTS FOR BAR CHART
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Sub-Component: Contest Status Bar Chart ---
const StatusBarChart = ({ stats }) => {
  const chartData = [
    {
      name: "Completed",
      Count: stats.completedContests || 0,
      color: "#10b981",
    },
    {
      name: "Confirmed",
      Count: stats.confirmedContests || 0,
      color: "#f59e0b",
    },
    {
      name: "Pending",
      Count: stats.pendingContests || 0,
      color: "#fde047",
    },
  ].filter((item) => item.Count > 0);

  const totalCount = chartData.reduce((sum, item) => sum + item.Count, 0);

  if (totalCount === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        No contests to display status chart.
      </div>
    );
  }

  // Custom Bar component to apply dynamic color
  const CustomBar = (props) => {
    const { x, y, width, height, payload } = props;

    const barColor = payload && payload.color ? payload.color : "#ccc";

    return (
      <rect x={x} y={y} width={width} height={height} fill={barColor} rx={5} />
    );
  };
  return (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 w-full h-full">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <FaChartBar className="mr-2 text-yellow-600" /> Contest Status Breakdown
        (Bar Chart)
      </h3>

      <div className="flex-grow min-h-[300px] w-full">
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
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
              }}
              formatter={(value, name, props) => [
                `Count: ${value}`,
                props.payload.name,
              ]}
            />
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
const SellerStatistics = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Creator Statistics
  const {
    data: statsData = {}, // Ensure statsData is initialized
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
  // Red alert error display
  if (isError)
    return (
      <div className="text-red-500 text-center py-10 text-xl font-semibold">
        Failed to load statistics. Please check server connection.
      </div>
    );

  // Destructure the data. Assuming status stats come in camelCase
  const { totalContests, totalRevenue, totalParticipants, ...statusStats } =
    statsData;

  // Format currency
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalRevenue || 0);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center">
        <FaChartBar className="mr-3 text-yellow-600" /> Creator Statistics &
        Earnings
      </h2>

      {/* Overview Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Total Contests Created */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
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
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
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
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
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
        <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 flex items-center justify-center min-h-[300px]">
          <p className="text-gray-500">
            Placeholder: Monthly Revenue Chart (Future Feature)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerStatistics;
