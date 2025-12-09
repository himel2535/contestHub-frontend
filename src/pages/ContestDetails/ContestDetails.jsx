import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import SubmitTaskModal from "../Submit/SubmitTaskModal";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../../components/Shared/ErrorPage/ErrorPage";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ContestDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isContestEnded, setIsContestEnded] = useState(false);

  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch contest data
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
    refetchOnWindowFocus: false,
  });

  // Countdown logic
  useEffect(() => {
    if (!contest?.deadline) return;

    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(contest.deadline);
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        setIsContestEnded(true);
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setIsContestEnded(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest?.deadline]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

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
    winner,
  } = contest || {};

  const isRegistered = participants.includes(user?.email);

  // After successful registration, refetch contest to update participantsCount
  const handleRegistered = () => {
    queryClient.invalidateQueries(["contest", id]);
  };

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

          <p className="text-lg font-semibold mt-3">Deadline: {timeLeft}</p>

          <p className="text-neutral-600 my-4">{description}</p>
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

          {winner && winner.name && (
            <>
              <hr className="my-4" />
              <div className="flex items-center gap-3">
                <img src={winner.photo} className="w-12 h-12 rounded-full" />
                <p className="font-semibold">Winner: {winner.name}</p>
              </div>
            </>
          )}

          <hr className="my-6" />

          {/* Button logic */}
          <div className="flex flex-col gap-3">
            <Button
              label={isRegistered ? "Already Registered" : "Pay & Register"}
              onClick={() => setIsOpen(true)}
              disabled={isContestEnded || isRegistered}
            />

            {isRegistered && (
              <Button
                label="Submit Task"
                onClick={() => setTaskOpen(true)}
                disabled={isContestEnded}
              />
            )}
          </div>

          {/* Modals */}
          <PurchaseModal
            contest={contest}
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            onSuccess={handleRegistered} // update participantsCount after payment
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