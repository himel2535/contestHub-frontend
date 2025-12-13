// src/pages/Dashboard/Creator/SellerStatistics.jsx

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaChartBar, FaChartPie, FaDollarSign, FaUsers, FaClipboardList } from "react-icons/fa";

// --- Sub-Component: Contest Status Pie Chart Mockup ---
const StatusPieChart = ({ stats }) => {
    // Data preparation for the chart
    const data = [
        { label: 'Completed', value: stats.completedContests, color: '#facc15' }, // Yellow-500
        { label: 'Confirmed', value: stats.confirmedContests, color: '#fcd34d' }, // Yellow-400
        { label: 'Pending', value: stats.pendingContests, color: '#fde047' }, // Yellow-300
    ].filter(item => item.value > 0);
    
    const totalCount = data.reduce((sum, item) => sum + item.value, 0);

    if (totalCount === 0) {
        return <p className="text-gray-500 text-center mt-5">No active contests to display status chart.</p>;
    }

    let gradientString = '';
    let currentAngle = 0;

    data.forEach(item => {
        const angle = (item.value / totalCount) * 360;
        gradientString += `${item.color} ${currentAngle}deg ${currentAngle + angle}deg, `;
        currentAngle += angle;
    });

    // Remove the trailing comma and space
    gradientString = gradientString.slice(0, -2);
    
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <FaChartPie className="mr-2 text-yellow-600" /> Contest Status Breakdown
            </h3>
            <div className="relative w-40 h-40">
                {/* CSS Pie Chart */}
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        background: `conic-gradient(${gradientString})`,
                    }}
                >
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">
                            {totalCount} Total
                        </span>
                    </div>
                </div>
            </div>
            {/* Legend */}
            <div className="mt-6 space-y-2 text-sm">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-600 font-medium">{item.label}: <span className="font-bold">{item.value}</span></span>
                    </div>
                ))}
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
    data: statsData,
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
  if (isError) return <div className="text-red-500 text-center py-10">Failed to load statistics.</div>;

  const { totalContests, totalRevenue, totalParticipants, ...statusStats } = statsData;
  
  // Format currency
  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalRevenue);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center">
        <FaChartBar className="mr-3 text-yellow-600" /> Creator Statistics & Earnings
      </h2>

      {/* Overview Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* Total Contests Created */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Contests Created</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">{totalContests}</p>
          </div>
          <FaClipboardList className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Total Participants */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Participants</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">{totalParticipants}</p>
          </div>
          <FaUsers className="text-5xl text-yellow-300 opacity-70" />
        </div>
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">{formattedRevenue}</p>
          </div>
          <FaDollarSign className="text-5xl text-yellow-300 opacity-70" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contest Status Pie Chart */}
        <div className="lg:col-span-1 flex justify-center">
            <StatusPieChart stats={statusStats} />
        </div>
        
        {/* Placeholder for future charts (e.g., Monthly Revenue Chart) */}
        <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 flex items-center justify-center min-h-60">
            <p className="text-gray-500">Placeholder: Monthly Revenue Chart (Future Feature)</p>
        </div>
      </div>
    </div>
  );
};

export default SellerStatistics;