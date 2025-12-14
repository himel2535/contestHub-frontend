import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useSearchParams } from "react-router";
import AllContestCard from "../../components/Home/AllContestCard";
import Container from "../../components/Shared/Container";
import ErrorPage from "../../components/Shared/ErrorPage/ErrorPage";
import { Link } from "react-router";

const HomeContestSearchResults = () => {
  const [searchParams] = useSearchParams();
  const contestType = searchParams.get("type");

  const {
    data: contests,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["homeSearchContests", contestType],
    queryFn: async () => {
      const url = `${
        import.meta.env.VITE_API_URL
      }/contests?type=${contestType}`;
      const result = await axios.get(url);

      if (result.data && Array.isArray(result.data.contests)) {
        return result.data.contests;
      }

      if (Array.isArray(result.data)) {
        return result.data;
      }

      return [];
    },

    enabled: !!contestType,
  });

  if (!contestType) {
    return null;
  }

  const finalContests = Array.isArray(contests) ? contests : [];

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) return <ErrorPage />;

  const isNoResults = finalContests.length === 0;

  const headingText = `Category Search Results`;
  const subTitleText = `Showing all contests matching the category "${contestType}". Refine your search above if needed.`;

  return (
    <Container>
      <div className="py-12 mx-auto text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200 inline-block border-b-4 border-yellow-500"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {headingText}
          </h1>

          <p
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg"
            data-aos="fade-up"
          >
            {subTitleText}
          </p>
        </div>

        {isNoResults && (
          <div

            className="text-center py-10 border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg mx-auto max-w-xl"
            data-aos="zoom-in"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Sorry, no contests found matching your search term:{" "}
              <span className="font-semibold">{contestType}</span>.
            </p>
          </div>
        )}

        {!isNoResults && (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {finalContests.map((contest, index) => (
              <div
                key={contest._id}
                data-aos="fade-up"
                data-aos-delay={index * 50} // Stagger effect
              >
                <AllContestCard contest={contest} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomeContestSearchResults;
