

import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa"; 


import { useSearchParams } from "react-router"; 

import AllContestCard from "./AllContestCard";

const AllContests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  

  const currentContestType = searchParams.get("type") || "";
  

  const [searchInput, setSearchInput] = useState(currentContestType);


  const { data, isPending, isError } = useQuery({
    queryKey: ["contests", currentContestType],
    queryFn: async () => {

      const url = `${import.meta.env.VITE_API_URL}/contests${
        currentContestType ? `?type=${currentContestType}` : ""
      }`;
      const result = await axios(url);
      return result.data;
    },
  });


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchInput.trim();
    

    const newSearchParams = new URLSearchParams(searchParams);

    if (trimmedQuery) {

        newSearchParams.set('type', trimmedQuery);
    } else {

        newSearchParams.delete('type'); 
    }

    setSearchParams(newSearchParams); 
  };


  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const isNoResults = data && data.length === 0;


  const headingText = currentContestType
    ? `Category Results for: "${currentContestType}"`
    : "Explore All Available Contests";
    
  const subTitleText = currentContestType
    ? `Showing all contests matching the category "${currentContestType}".`
    : "Dive into our full list of competitions and find your next creative challenge.";

  return (
    <Container>
      <div className="py-12">
        

        <div className="text-center mb-10">
          <h2
            className="text-5xl font-extrabold text-gray-800 pt-4 mb-2 inline-block border-b-4 border-yellow-500"
            data-aos="fade-down"
          >
            {headingText}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg" data-aos="fade-up">
            {subTitleText}
          </p>
          
 
          <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mx-auto mt-8" data-aos="fade-up" data-aos-delay="200">
            <div className="relative flex items-center bg-white border border-gray-300 rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search by Contest Category (e.g., Design, Coding)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full py-3 pl-6 pr-14 text-gray-700 focus:outline-none text-base"
                aria-label="Search contests by category"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 w-14 bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Start category search"
              >
                <FaSearch className="text-xl" />
              </button>
            </div>
          </form>

          {currentContestType && (
            <button
                onClick={() => {
                    setSearchInput("");
                    handleSearchSubmit({ preventDefault: () => {} }); 
                }}
                className="mt-3 text-sm text-red-500 hover:underline"
            >
                Clear Search Filter
            </button>
          )}

        </div>
        
   
        {isNoResults && (
          <div
            className="text-center py-20 bg-gray-50 border border-dashed border-gray-300 rounded-lg mx-auto max-w-4xl"
            data-aos="zoom-in"
          >
            <p className="text-2xl text-gray-600">
              Sorry, no contests found matching your criteria.
            </p>
            {currentContestType && <p className="text-lg text-gray-500 mt-2">Category: <span className="font-semibold text-red-500">"{currentContestType}"</span></p>}
          </div>
        )}

        {/*  Contest Cards Animation */}
        {!isNoResults && (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {data.map((contest, index) => (
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
      </div>
    </Container>
  );
};

export default AllContests;