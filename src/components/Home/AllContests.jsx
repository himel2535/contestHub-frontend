import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import React, { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router";
import AllContestCard from "./AllContestCard";

const ITEMS_PER_PAGE = 10;

const AllContests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentContestType = searchParams.get("type") || "";
  const [searchInput, setSearchInput] = useState(currentContestType);

  const { data, isPending, isError } = useQuery({
    queryKey: ["contests", currentContestType, currentPage],
    queryFn: async () => {
      const url = `${
        import.meta.env.VITE_API_URL
      }/contests?limit=${ITEMS_PER_PAGE}&page=${currentPage}${
        currentContestType ? `&type=${currentContestType}` : ""
      }`;
      const result = await axios.get(url);
      return result.data;
    },
  });

  const contests = data?.contests || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchInput.trim();
    const newSearchParams = new URLSearchParams(searchParams);

    if (trimmedQuery) newSearchParams.set("type", trimmedQuery);
    else newSearchParams.delete("type");

    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const isNoResults = contests.length === 0;
  

  const headingText = currentContestType
    ? `Category Results for: "${currentContestType}"`
    : "Explore All Available Contests";

  const subTitleText = currentContestType
    ? `Showing contests matching the category "${currentContestType}" (Page ${currentPage} of ${totalPages}).`
    : `Dive into our full list of competitions (Page ${currentPage} of ${totalPages}) and find your next creative challenge.`;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      <div className="py-8 ">
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200 pt-4 mb-2 inline-block border-b-4 border-yellow-500"
            data-aos="fade-down"

            style={{ textShadow: '0 0 5px rgba(255, 215, 0, 0.4)' }} 
          >
            {headingText}
          </h2>
          <p
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg"
            data-aos="fade-up"
          >
            {subTitleText}
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-xl mx-auto mt-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* --- FIX APPLIED HERE: Search Bar Glow --- */}
            <div 
              className="relative flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg overflow-hidden transition-shadow duration-300"
     
              style={{
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 215, 0, 0.7)',
 
              }}
            >
              <input
                type="text"
                placeholder="Search by Contest Category (e.g., Design, Coding)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full py-3 pl-6 pr-14 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none text-sm sm:text-base"
                aria-label="Search contests by category"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 w-14 bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Start category search"
   
                style={{
                   boxShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
                }}
              >
                <FaSearch className="text-lg sm:text-xl" />
              </button>
            </div>
          </form>

          {currentContestType && (
            <button
              onClick={() => {
                setSearchInput("");
                const newSearchParams = new URLSearchParams();
                newSearchParams.set("page", "1");
                setSearchParams(newSearchParams);
              }}
              className="mt-2  cursor-pointer text-red-500 hover:underline"
            >
              Clear Search Filter
            </button>
          )}
        </div>

        {/* No Results */}
        {isNoResults && (
          <div
            className="text-center py-20 bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg mx-auto max-w-4xl"
            data-aos="zoom-in"
          >
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
              Sorry, no contests found matching your criteria.
            </p>
            {currentContestType && (
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
                Category:{" "}
                <span className="font-semibold text-red-500">
                  "{currentContestType}"
                </span>
              </p>
            )}
          </div>
        )}

        {/* Contest Cards */}
        {!isNoResults && (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {contests.map((contest, index) => (
              <div
                key={contest._id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <AllContestCard contest={contest} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isNoResults && totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
            >
              <FaChevronLeft className="inline mr-1" /> Previous
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                  currentPage === page
                    ? "bg-yellow-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
            >
              Next <FaChevronRight className="inline ml-1" />
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllContests;