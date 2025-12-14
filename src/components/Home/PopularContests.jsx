import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import PopularContestCard from "./PopularContestCard";
import { Link } from "react-router";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

const PopularContests = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contests`);
      return res.data;
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const contestsArray = data?.contests || [];

  const popular = [...contestsArray]
    .sort((a, b) => b.participantsCount - a.participantsCount)
    .slice(0, 5);

  return (
    <Container>
      <div className="py-12 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-x-hidden">
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200 inline-block border-b-4 border-yellow-500"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            Popular Contests
          </h1>

          <Link
            to="/all-contests"
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition duration-300 shadow-md"
            data-aos="fade-left"
          >
            Show All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {popular.map((contest, index) => (
            <div
              key={contest._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <PopularContestCard contest={contest} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularContests;
