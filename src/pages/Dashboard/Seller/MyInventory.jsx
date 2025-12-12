// src/pages/Dashboard/Creator/MyInventory.jsx

import PlantDataRow from "../../../components/Dashboard/TableRows/PlantDataRow";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
      // 💡 এই রুটটি Contest Creator এর তৈরি করা সকল Contest নিয়ে আসবে
      const result = await axiosSecure(`/my-inventory/${user.email}`);
      return result.data;
    },
  });

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  if (isError) return <ErrorPage></ErrorPage>;

  // No contest message
  if (contests.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-600">
          You have not created any contests yet. 📝
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    {/* Submissions Header */}
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Submissions
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Delete
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contests.map((contest) => (
                    // 💡 PlantDataRow is used here as the Contest Row component
                    <PlantDataRow
                      key={contest._id}
                      contest={contest}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInventory;
