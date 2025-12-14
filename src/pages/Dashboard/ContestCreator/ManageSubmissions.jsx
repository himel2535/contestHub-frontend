import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SimpleSubmissionDataRow from "../../../components/Dashboard/TableRows/SimpleSubmissionDataRow";
import { FaTasks, FaCrown } from "react-icons/fa"; 

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
 
        className="text-center py-20 bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-700/50 rounded-xl mx-auto max-w-lg border-t-4 border-yellow-500"
        data-aos="fade-up"
      >
        <FaTasks className="text-6xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-100 mb-2">
          No Submissions Yet! 📝
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          It looks like participants haven't submitted tasks for your contests.
        </p>
      </div>
    );
  }

  return (

    <div className="container mx-auto px-4 sm:px-8 pt-8 dark:bg-gray-900 min-h-screen">
      

      <div
        className="text-center mb-10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2"
        >
          <FaTasks className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
          <span className="">
            <span>Manage Submissions ({submissions.length})</span>
          </span>
        </h2>
      </div>


      <p

        className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-4xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Review and evaluate submissions from participants across your contests.
        Check the submitted links/text and prepare for the contest result
        declaration once the deadline is met.
      </p>

      <div 

        className="bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-700/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        <div className="p-4 overflow-x-auto">
          <div
            className="inline-block min-w-full"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <table className="min-w-full leading-normal divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  {/* Table Headers (Yellow background is fine, text is white) */}
                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-center text-xs font-semibold uppercase tracking-wider"
                  >
                    Participant
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Email
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Submission Link/Text
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-yellow-500 border-b border-yellow-400 text-white text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Submitted On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
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