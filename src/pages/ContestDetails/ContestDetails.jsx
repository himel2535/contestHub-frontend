import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useAuth } from "../../hooks/useAuth";
import SubmitTaskModal from "../Submit/SubmitTaskModal";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";

const ContestDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  const { user } = useAuth();
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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <ErrorPage></ErrorPage>;

  const {
    image,
    name,
    description,
    participantsCount,
    prizeMoney,
    contestFee,
    category,
    contestCreator,
    participants = [],
  } = contest || {};

  // ⭐ check if user registered:
  const isRegistered = participants.includes(user?.email);

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Left */}
        <div className="flex-1">
          <img
            className="rounded-xl h-full w-full object-cover"
            src={image}
            alt={name}
          />
        </div>

        {/* Right */}
        <div className="flex-1">
          <Heading title={name} subtitle={`Category: ${category}`} />
          <hr className="my-4" />
          <p className="text-neutral-600">{description}</p>
          <hr className="my-4" />

          <div className="flex items-center gap-3 mt-3">
            <img
              src={contestCreator?.image}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{contestCreator?.name}</p>
              <p className="text-sm">{contestCreator?.email}</p>
            </div>
          </div>

          <hr className="my-4" />
          <p className="text-lg font-semibold">
            Participants: {participantsCount}
          </p>

          <hr className="my-4" />

          <div className="flex justify-between">
            <p className="text-xl font-bold">Prize: ${prizeMoney}</p>
            <p className="text-xl font-bold">Fee: ${contestFee}</p>
          </div>

          <hr className="my-6" />

          {/* ⭐ BUTTON LOGIC */}
          {!isRegistered ? (
            <Button label="Pay & Register" onClick={() => setIsOpen(true)} />
          ) : (
            <Button label="Submit Task" onClick={() => setTaskOpen(true)} />
          )}

          {/* Modals */}
          <PurchaseModal
            contest={contest}
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
          />
          <SubmitTaskModal
            contestId={id}
            isOpen={taskOpen}
            closeModal={() => setTaskOpen(false)}
          />
        </div>
      </div>
    </Container>
  );
};

export default ContestDetails;
