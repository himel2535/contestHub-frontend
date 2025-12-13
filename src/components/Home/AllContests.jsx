import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
// 💡 useSearchParams ইমপোর্ট করা আছে
import { useSearchParams } from "react-router"; 
import AllContestCard from "./AllContestCard";

const AllContests = () => {

  const [searchParams] = useSearchParams();
  const contestType = searchParams.get('type') || ''; 

  const { data, isPending, isError } = useQuery({

    queryKey: ["contests", contestType], 
    queryFn: async () => {
      

      const url = `${import.meta.env.VITE_API_URL}/contests${contestType ? `?type=${contestType}` : ''}`;
      
      const result = await axios(url);
      return result.data;
    },
  });

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  if (isError) return <ErrorPage></ErrorPage>;
  
  const isNoResults = data && data.length === 0;

  return (
    <Container>
      <h2 className="text-4xl font-extrabold text-gray-800 text-center pt-8 mb-10">
        {
            contestType 
            ? `Search Results for: "${contestType}"` 
            : 'All Available Contests'
        }
      </h2>
      
      {isNoResults && (
        <div className="text-center py-20">
            <p className="text-2xl text-gray-500">
                Sorry, no contests found matching your search term: <span className="font-semibold text-red-500">"{contestType}"</span>.
            </p>
        </div>
      )}

      {!isNoResults && (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
              data.map(contest=><AllContestCard key={contest._id} contest={contest}/>)
            }
          </div>
      )}
    </Container>
  );
};

export default AllContests;