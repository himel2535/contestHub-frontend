// src/components/Home/HomeContestSearchResults.jsx (আপডেট করা কোড)

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useSearchParams } from "react-router"; 
import AllContestCard from "../../components/Home/AllContestCard"; 
import Container from "../../components/Shared/Container"; 
import ErrorPage from "../../components/Shared/ErrorPage/ErrorPage"; 

const HomeContestSearchResults = () => {


  const [searchParams] = useSearchParams();
  const contestType = searchParams.get('type'); 
  

  const { 
    data: contests, 
    isPending, 
    isError 
  } = useQuery({
    queryKey: ["homeSearchContests", contestType], 
    queryFn: async () => {
 
      const url = `${import.meta.env.VITE_API_URL}/contests?type=${contestType}`;
      const result = await axios(url);
      return result.data;
    },

    enabled: !!contestType, 
  });



  if (!contestType) {
    return null; 
  }
  

  if (isPending) {
     return <LoadingSpinner />;
  }

  if (isError) return <ErrorPage />;
  
  const isNoResults = contests && contests.length === 0;


  const headingText = `Category Search Results`;
  const subTitleText = `Showing all contests matching the category "${contestType}". Refine your search above if needed.`;


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
          </div>
          
          {isNoResults && (
            <div 
              className="text-center py-10 border border-dashed border-gray-300 rounded-lg mx-auto max-w-xl"
              data-aos="zoom-in"
            >
                <p className="text-xl text-gray-500">
                    Sorry, no contests found matching your search term: <span className="font-semibold">{contestType}</span>.
                </p>
            </div>
          )}

          {!isNoResults && (
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                  contests.map((contest, index)=>(
                    <div
                      key={contest._id}
                      data-aos="fade-up"
                      data-aos-delay={index * 50} // Stagger effect
                    >
                      <AllContestCard contest={contest}/>
                    </div>
                  ))
                }
              </div>
          )}
      </div>
    </Container>
  );
};

export default HomeContestSearchResults;