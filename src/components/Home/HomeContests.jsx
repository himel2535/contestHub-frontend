

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useSearchParams } from "react-router"; 
import AllContestCard from "../../components/Home/AllContestCard"; 

const HomeContests = () => {

  const [searchParams] = useSearchParams();
  const contestType = searchParams.get('type') || ''; 

  const { data: contests, isPending, isError } = useQuery({

    queryKey: ["homeContests", contestType], 
    queryFn: async () => {
     
      const url = `${import.meta.env.VITE_API_URL}/contests${contestType ? `?type=${contestType}` : ''}`;
      
      const result = await axios(url);
      return result.data;
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500 text-center">Failed to load contests.</p>;
  
  const isNoResults = contests && contests.length === 0;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        {contestType ? `Filtered Contests for: "${contestType}"` : 'Featured Contests'}
      </h2>
      
      {isNoResults && (
        <p className="text-xl text-gray-500 text-center">
            Sorry, no contests found matching your search term: <span className="font-semibold text-red-500">"{contestType}"</span>.
        </p>
      )}

      {!isNoResults && (
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              contests.map(contest => <AllContestCard key={contest._id} contest={contest}/>)
            }
          </div>
      )}
    </div>
  );
};

export default HomeContests;