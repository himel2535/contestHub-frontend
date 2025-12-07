import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import AllContestCard from "./AllContestCard";

const AllContests = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/contests`);
      return result.data;
    },
  });
  console.log(data);

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {
          data.map(contest=><AllContestCard key={contest._id} contest={contest}/>)
        }
        
      </div>
    </Container>
  );
};

export default AllContests;
