import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useTheme from "../../../hooks/useTheme"; // 💡 useTheme আমদানি করা হলো
import {
  FaChartBar,
  FaDollarSign,
  FaUsers,
  FaClipboardList,
  FaCrown, 
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
// 💡 resolvedTheme prop গ্রহণ করছে
const CustomTooltip = ({ active, payload, label, resolvedTheme }) => { 
  if (active && payload && payload.length) {
    return (
      <div className={`p-2 border rounded-lg shadow-md text-sm ${
          resolvedTheme === 'dark' 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-white border-gray-300'
        }`}>
        <p className={`font-semibold ${resolvedTheme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{`${label} Contests`}</p>
        {/* payload[0] is the 'Count' Bar data */}
        <p className="text-green-600">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Sub-Component: Contest Status Bar Chart  ---
// 💡 resolvedTheme prop গ্রহণ করছে
const StatusBarChart = ({ stats, resolvedTheme }) => { 
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

  // Define chart colors based on theme
  const axisColor = resolvedTheme === 'dark' ? "#9ca3af" : "#555";
  const tickFill = resolvedTheme === 'dark' ? "#e5e7eb" : "#1f2937";
  const gridStroke = resolvedTheme === 'dark' ? "#4b5563" : "#e0e0e0";

  if (totalCount === 0) {
    return (
      <div
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং শ্যাডো যোগ করা হয়েছে
        className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-500 w-full h-full items-center justify-center min-h-[350px]"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
          <FaChartBar className="mr-2 text-yellow-600" /> Contest Status Breakdown
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          No contests to display status chart.
        </p>
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
    <div
      // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং শ্যাডো যোগ করা হয়েছে
      className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-500 w-full h-full"
      data-aos="fade-right"
    >
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
        <FaChartBar className="mr-2 text-yellow-600" /> Contest Status Breakdown
      </h3>

      <div className="flex-grow min-h-[350px] w-full"> 
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridStroke} 
              vertical={false}
            />
            
            {/* 💡 ফিক্সড: XAxis - Tick এবং Line Color পরিবর্তন */}
            <XAxis 
              dataKey="name" 
              stroke={axisColor}
              tick={{ fill: tickFill }}
              axisLine={{ stroke: axisColor }}
              tickLine={{ stroke: axisColor }}
            /> 
            
            {/* 💡 ফিক্সড: YAxis - Tick এবং Line Color পরিবর্তন */}
            <YAxis 
              allowDecimals={false} 
              stroke={axisColor}
              tick={{ fill: tickFill }}
              axisLine={{ stroke: axisColor }}
              tickLine={{ stroke: axisColor }}
            />
            
            {/* 💡 CustomTooltip-এ theme prop পাস করা হলো */}
            <Tooltip content={<CustomTooltip resolvedTheme={resolvedTheme} />} /> 
            
            <Bar
              dataKey="Count"
              // eslint-disable-next-line react-hooks/static-components
              shape={<CustomBar />}
              // 💡 ফিক্সড: Bar Label Color
              label={{ 
                position: "top", 
                fill: tickFill, 
                fontSize: 12 
              }} 
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
  // 💡 থিম স্টেট সরাসরি এখানে নেওয়া হলো
  const { theme } = useTheme();

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
      <div className="text-red-500 dark:text-red-400 text-center py-10 text-xl font-semibold">
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

    // 💡 Main container এ ডার্ক মোড ব্যাকগ্রাউন্ড নিশ্চিত করা হলো
    // (যদি আপনি চান এটি DashboardLayout এর ব্যাকগ্রাউন্ডের উপর আলাদা একটি বক্স হিসেবে থাকুক, 
    // তাহলে bg-white dark:bg-gray-900 ব্যবহার করুন, যা এখানে ব্যবহার করা হয়েছে।)
    <div className="container mx-auto px-4 sm:px-8 py-8 bg-white dark:bg-gray-900 min-h-screen">
      

      <div
        className="text-center mb-10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2"
        >
   
          <FaChartBar className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
          <span className="">
            <span>Creator Statistics & Earnings</span>
          </span>
        </h2>
      </div>
      

      <p 
     
        className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-4xl mx-auto text-lg font-medium"
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
          // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং শ্যাডো যোগ করা হয়েছে
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-md border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="0"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Contests Created
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {totalContests || 0}
            </p>
          </div>
          <FaClipboardList className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Total Participants */}
        <div
          // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং শ্যাডো যোগ করা হয়েছে
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-md border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Participants
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {totalParticipants || 0}
            </p>
          </div>
          <FaUsers className="text-5xl text-yellow-300 opacity-70" />
        </div>

        {/* Total Revenue */}
        <div
          // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং শ্যাডো যোগ করা হয়েছে
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-md border-l-4 border-yellow-500 flex items-center justify-between"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
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
          {/* 💡 StatusBarChart-এ theme prop পাস করা হলো */}
          <StatusBarChart stats={statusStats} resolvedTheme={theme} /> 
        </div>

        {/* Placeholder for future charts (e.g., Monthly Revenue Chart) */}
        <div
          // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং শ্যাডো যোগ করা হয়েছে
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl border-t-4 border-yellow-500 flex items-center justify-center min-h-[350px]"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Placeholder: Monthly Revenue Chart (Future Feature)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorStatistics;