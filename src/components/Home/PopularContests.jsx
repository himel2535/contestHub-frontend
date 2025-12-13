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

  // sort by highest participantsCount
  const popular = [...data]
    .sort((a, b) => b.participantsCount - a.participantsCount)
    .slice(0, 5);

  return (
    <Container>
      <div className="flex justify-between items-center mt-10 mb-5">
        <h1 className="text-3xl font-bold text-yellow-600">
          🔥 Popular Contests
        </h1>

        <Link
          to="/all-contests"
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Show All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {popular.map((contest) => (
          <PopularContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </Container>
  );
};

export default PopularContests;
