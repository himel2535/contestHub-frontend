

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SimpleSubmissionDataRow from "../../../components/Dashboard/TableRows/SimpleSubmissionDataRow";
import { FaTasks } from "react-icons/fa";

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

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  if (submissions.length === 0) {
    return (
      <div
        className="text-center py-20 bg-white shadow-2xl rounded-xl mx-auto max-w-lg border-t-4 border-yellow-500"
        data-aos="fade-up"
      >
        <FaTasks className="text-6xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">
          No Submissions Yet! 📝
        </h2>
        <p className="text-gray-500 text-lg">
          It looks like participants haven't submitted tasks for your contests.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8">
      {/* 1. Primary Heading (Small device fix) */}
      <div
        className="text-center mb-4" // Reduced mb to mb-4
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-block border-b-4 border-yellow-500 pb-2">
          {/* Small Screen Icon */}
          <div className="mb-2 block md:hidden">
            <FaTasks className="text-5xl text-yellow-600 mx-auto" />
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 inline-flex items-center">
            {/* Large Screen Icon */}
            <span className="hidden md:inline-flex items-center justify-center">
              <FaTasks className="mr-3 text-yellow-600 text-4xl" />
            </span>
            Manage Submissions ({submissions.length})
          </h2>
        </div>
      </div>


      <p
        className="text-center text-gray-600 mb-10 max-w-4xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Review and evaluate submissions from participants across your contests.
        Check the submitted links/text and prepare for the contest result
        declaration once the deadline is met.
      </p>

      <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
        <div className="p-4 overflow-x-auto">
          <div
            className="inline-block min-w-full"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <table className="min-w-full leading-normal divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-center text-xs font-semibold uppercase tracking-wider"
                  >
                    Participant
                  </th>

                  {/* 2. Participant Name */}
                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Name
                  </th>

                  {/* 3. Participant Email */}
                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Email
                  </th>

                  {/* 4. Task/Submission Link */}
                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Submission Link/Text
                  </th>

                  {/* 5. Submission Time */}
                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Submitted On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((submission, index) => (
                  <SimpleSubmissionDataRow
                    key={submission._id}
                    submission={submission}
                    delay={index * 50}
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
