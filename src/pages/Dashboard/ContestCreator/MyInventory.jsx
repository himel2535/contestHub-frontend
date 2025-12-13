import { FaClipboardList } from "react-icons/fa";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ContestDataRow from "../../../components/Dashboard/TableRows/ContestDataRow";

const MyInventory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["inventory", user.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-inventory/${user.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) return <LoadingSpinner />;

  if (isError) return <ErrorPage />;

  // No contest message
  if (contests.length === 0) {
    return (
      <div className="text-center py-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-yellow-600 mb-4">
          Contest Inventory
        </h2>
        <p className="text-xl font-semibold text-gray-600">
          You have not created any contests yet. 📝
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      {/* 1. Primary Heading (Small device fix) */}
      <div
        className="text-center mb-4" // Reduced mb to mb-4
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-block border-b-4 border-yellow-500 pb-2">
          {/* Small Screen Icon */}
          <div className="mb-2 block md:hidden">
            <FaClipboardList className="text-5xl text-yellow-600 mx-auto" />
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 inline-flex items-center">
            {/* Large Screen Icon */}
            <span className="hidden md:inline-flex items-center justify-center">
              <FaClipboardList className="mr-3 text-yellow-600 text-4xl" />
            </span>
            My Contest Inventory
          </h2>
        </div>
      </div>

      <p
        className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Manage all the contests you have created. View their current status,
        monitor participant submissions, and update or delete your contests as
        needed.
      </p>

      {/* Table Container */}
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div
          className="inline-block min-w-full shadow-2xl rounded-lg overflow-hidden border border-gray-100"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-sm uppercase font-semibold tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-sm uppercase font-semibold tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-sm uppercase font-semibold tracking-wider"
                >
                  Status
                </th>
                {/* Submissions Header */}
                <th
                  scope="col"
                  className="px-5 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-sm uppercase font-semibold tracking-wider"
                >
                  Submissions
                </th>

                <th
                  scope="col"
                  className="px-5 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-sm uppercase font-semibold tracking-wider"
                >
                  Update
                </th>

                <th
                  scope="col"
                  className="px-5 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-sm uppercase font-semibold tracking-wider"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest, index) => (
                <ContestDataRow
                  key={contest._id}
                  contest={contest}
                  refetch={refetch}
                  delay={index * 50}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyInventory;
