import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";

import { FaUserAlt, FaDollarSign, FaListAlt, FaChartBar } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";

// --- Sub-Component: StatusBarChart (Fixed for small screens) ---
const StatusBarChart = ({ stats }) => {
  const data = [
    {
      label: "Completed",
      value: stats.Completed || 0,
      color: "bg-green-500",
      progressColor: "bg-green-600",
    },
    {
      label: "Confirmed",
      value: stats.Confirmed || 0,
      color: "bg-yellow-500",
      progressColor: "bg-yellow-600",
    },
    {
      label: "Pending",
      value: stats.Pending || 0,
      color: "bg-amber-300",
      progressColor: "bg-amber-400",
    },
    {
      label: "Rejected",
      value: stats.Rejected || 0,
      color: "bg-red-500",
      progressColor: "bg-red-600",
    },
  ].filter((item) => item.value > 0);

  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

  if (totalCount === 0) {
    return (
      <p className="text-gray-500 text-center mt-5">No contests created yet.</p>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div
      className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-xl border border-gray-100 p-8 w-full max-w-4xl"
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4 text-center">
        <div className="inline-flex flex-col md:flex-row md:items-center">
          <FaChartBar className="mx-auto md:mr-3 text-yellow-600 text-4xl mb-2 md:mb-0" />
          Contest Status Breakdown (Bar Chart)
        </div>
      </h3>

      <div className="space-y-6">
        {data.map((item, index) => {
          const widthPercentage =
            totalCount > 0 ? (item.value / maxValue) * 100 : 0;
          const valuePercentage =
            totalCount > 0 ? ((item.value / totalCount) * 100).toFixed(1) : 0;

          return (
            <div
              key={index}
              className="flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-700 font-medium flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${item.color}`}
                  ></span>
                  {item.label}
                </span>
                <span className="font-bold text-gray-800">
                  {item.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({valuePercentage}%)
                  </span>
                </span>
              </div>

              {/* Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${item.progressColor}`}
                  style={{ width: `${widthPercentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}

        {/* Total Count */}
        <div className="pt-4 border-t border-gray-200 text-right text-lg font-bold text-gray-700">
          Total Contests: {totalCount}
        </div>
      </div>
    </div>
  );
};

// --- Main Component (Only header part reviewed for context) ---
const AdminStatistics = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: statsData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminStats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-stats`);
      return data;
    },
  });

  if (isLoading || loading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const {
    totalUsers,
    totalContests,
    totalRevenue,
    totalOrders,
    statusBreakdown = {},
  } = statsData;

  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalRevenue || 0);

  const cardData = [
    {
      title: "Total Revenue",
      value: formattedRevenue,
      icon: FaDollarSign,
      colorStart: "#d97706",
      colorEnd: "#fcd34d",
      delay: 0,
    },
    {
      title: "Total Participation",
      value: totalOrders,
      icon: BsFillCartPlusFill,
      colorStart: "#65a30d",
      colorEnd: "#a3e635",
      delay: 150,
    },
    {
      title: "Total Contests",
      value: totalContests,
      icon: FaListAlt,
      colorStart: "#92400e",
      colorEnd: "#d97706",
      delay: 300,
    },
    {
      title: "Total User",
      value: totalUsers,
      icon: FaUserAlt,
      colorStart: "#eab308",
      colorEnd: "#facc15",
      delay: 450,
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-0">
      {/* Main Header */}
      <div
        className="w-full mb-10 text-center"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-flex flex-col md:flex-row md:items-center border-b-4 border-yellow-500 pb-2">
          <FaChartBar className="mx-auto md:mr-3 text-yellow-600 text-4xl mb-2 md:mb-0" />

          <h2 className="text-4xl font-extrabold text-gray-900">
            Admin Global Statistics
          </h2>
        </div>
      </div>

      {/* small cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
        {cardData.map((card) => (
          <div
            key={card.title}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-xl transform hover:scale-[1.02] transition duration-300 border-b-4 border-yellow-500/50"
            data-aos="zoom-in"
            data-aos-delay={card.delay}
          >
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center text-white`}
              style={{
                backgroundImage: `linear-gradient(to top right, ${card.colorStart}, ${card.colorEnd})`,
              }}
            >
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-gray-600">
                {card.title}
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-3xl font-bold leading-snug text-gray-900">
                {card.value}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section: Used flex to ensure centering */}
      <div className="mb-4 flex justify-center w-full">
        <StatusBarChart stats={statusBreakdown} />
      </div>
    </div>
  );
};

export default AdminStatistics;
