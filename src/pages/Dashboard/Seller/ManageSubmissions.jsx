// src/pages/Dashboard/Creator/ManageOrders.jsx

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SimpleSubmissionDataRow from "../../../components/Dashboard/TableRows/SimpleSubmissionDataRow";

const ManageSubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const {
    data: submissions = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["creatorSubmissions", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const result = await axiosSecure.get(
        `/creator-submissions/${user.email}`
      );
      return result.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <ErrorPage></ErrorPage>;

  if (submissions.length === 0) {
    // ... No Submissions Found UI (unchanged)
    return (
      <div className="text-center py-20 bg-white shadow-lg rounded-lg mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No Submissions Found Yet 🙁
        </h2>
        <p className="text-gray-500">
          It looks like participants haven't submitted tasks for your contests.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        View All Contest Submissions ({submissions.length})
      </h2>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="min-w-full leading-normal divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Participant Image
                  </th>

                  {/* 2. Participant Name */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Participant Name
                  </th>

                  {/* 3. Participant Email */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Participant Email
                  </th>

                  {/* 4. Task/Submission Link */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Task/Submission
                  </th>

                  {/* 5. Submission Time */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Submitted On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((submission) => (
                  <SimpleSubmissionDataRow
                    key={submission._id}
                    submission={submission}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubmissions;
