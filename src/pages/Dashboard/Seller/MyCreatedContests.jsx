import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import MyContestRow from "../../../components/Dashboard/TableRows/MyContestRow";


const MyCreatedContests = () => {
  const { user } = useAuth();

  const {
    data: contests = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["my-created-contests", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-created-contests/${user?.email}`
      );
      return res.data;
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10">
      <h2 className="text-2xl font-bold mb-4">My Created Contests</h2>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                  Contest Name
                </th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                  Fee
                </th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {contests.map((contest) => (
                <MyContestRow key={contest._id} contest={contest} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCreatedContests;
