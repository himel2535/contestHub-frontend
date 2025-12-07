import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ContestDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const {
    data: contest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/contest/${id}`
      );
      return res.data;
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10">Error loading data</p>;

  // destructuring contest data safely
  const {
    image,
    name,
    description,
    participantsCount,
    prizeMoney,
    contestFee,
    category,
    contestCreator,
  } = contest || {};

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Left / Image */}
        <div className="flex-1">
          <img
            className="rounded-xl h-full w-full object-cover"
            src={image}
            alt={name}
          />
        </div>

        {/* Right / Details */}
        <div className="flex-1">
          <Heading title={name} subtitle={`Category: ${category}`} />

          <hr className="my-4" />

          <p className="text-neutral-600 leading-relaxed">{description}</p>

          <hr className="my-4" />

          <div className="flex items-center gap-3 mt-3">
            {" "}
            <img
              src={contestCreator?.image}
              alt="creator"
              className="w-15 h-15 rounded-full"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-semibold text-neutral-500">
                {contestCreator?.name}
              </p>
              <p className="font-semibold text-neutral-500">
                {contestCreator?.email}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <p className="text-lg font-semibold">
            Participants: {participantsCount}
          </p>

          <hr className="my-4" />

          {/* Creator Info */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold mt-2 text-gray-700">
              Prize Money: ${prizeMoney}
            </p>
            <p className="text-xl font-bold mt-2 text-gray-700">
              Registration Fee: ${contestFee}
            </p>
          </div>

          <hr className="my-6" />

          {/* Pay / Register */}
          <div className="flex justify-between items-center">
            <Button label="Pay" onClick={() => setIsOpen(true)} />
          </div>

          {/* Modal */}
          <PurchaseModal
            contest={contest}
            isOpen={isOpen}
            closeModal={closeModal}
          />
        </div>
      </div>
    </Container>
  );
};

export default ContestDetails;
