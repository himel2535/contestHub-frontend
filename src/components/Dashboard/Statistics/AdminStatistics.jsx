// src/components/Dashboard/Statistics/AdminStatistics.jsx

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage"; // assuming it's available

import { FaUserAlt, FaDollarSign, FaListAlt } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";

// --- Sub-Component: StatusPieChart (No change in logic/colors) ---
const StatusPieChart = ({ stats }) => {
  const data = [
    { label: "Completed", value: stats.Completed || 0, color: "#facc15" },
    { label: "Confirmed", value: stats.Confirmed || 0, color: "#f59e0b" },
    { label: "Pending", value: stats.Pending || 0, color: "#fde047" },
    { label: "Rejected", value: stats.Rejected || 0, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

  if (totalCount === 0) {
    return (
      <p className="text-gray-500 text-center mt-5">No contests created yet.</p>
    );
  }

  let gradientString = "";
  let currentAngle = 0;

  data.forEach((item) => {
    const angle = (item.value / totalCount) * 360;
    gradientString += `${item.color} ${currentAngle}deg ${
      currentAngle + angle
    }deg, `;
    currentAngle += angle;
  });

  gradientString = gradientString.slice(0, -2);

  // 💡 Chart Size Change: Added w-full to the outer div, and increased chart size
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-8 w-full">
      <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center justify-center">
        <FaChartPie className="mr-3 text-yellow-600" /> Contest Status Breakdown
      </h3>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
        {/* 💡 Increased Pie Chart Size: w-52 h-52 (from w-40 h-40) */}
        <div className="relative w-52 h-52">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(${gradientString})`,
            }}
          >
            <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-base font-semibold text-gray-600">
                {totalCount} Total
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-base">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-700 font-medium">
                {item.label}: <span className="font-bold">{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const AdminStatistics = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: statsData = {},
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ["adminStats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-stats`);
      return data;
    },
  });

  if (isLoading || loading) return <LoadingSpinner />;
  // Assuming ErrorPage is defined and works
  // if (isError) return <ErrorPage />;

  const {
    totalUsers,
    totalContests,
    totalRevenue,
    totalOrders,
    statusBreakdown = {},
  } = statsData;

  // Format currency
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalRevenue || 0);

  return (
    <div>
      <div className="mt-16">
        {/* small cards (remains the same) */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
          {/* 1. Total Revenue Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-amber-600 to-amber-400 text-white shadow-amber-500/40`}
              style={{
                backgroundImage:
                  "linear-gradient(to top right, #d97706, #fcd34d)",
              }}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Revenue
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {formattedRevenue}
              </h4>
            </div>
          </div>

          {/* 2. Total Orders Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-lime-600 to-lime-400 text-white shadow-lime-500/40`}
              style={{
                backgroundImage:
                  "linear-gradient(to top right, #65a30d, #a3e635)",
              }}
            >
              <BsFillCartPlusFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Participation
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalOrders}
              </h4>
            </div>
          </div>

          {/* 3. Total Contests Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-800 to-yellow-600 text-white shadow-yellow-800/40`}
              style={{
                backgroundImage:
                  "linear-gradient(to top right, #92400e, #d97706)",
              }}
            >
              <FaListAlt className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Contests
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalContests}
              </h4>
            </div>
          </div>

          {/* 4. Total Users Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40`}
              style={{
                backgroundImage:
                  "linear-gradient(to top right, #eab308, #facc15)",
              }}
            >
              <FaUserAlt className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total User
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalUsers}
              </h4>
            </div>
          </div>
        </div>

        {/* 💡 Chart Section: Changed grid layout to center and maximize the chart */}
        <div className="mb-4 grid grid-cols-1 justify-center">
          {/* Contest Status Pie Chart - Use col-span-1 and center it */}
          <div className="flex justify-center w-full">
            <StatusPieChart stats={statusBreakdown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
