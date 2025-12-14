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
import {
  FaTrophy,
  FaUserFriends,
  FaRegClock,
  FaDollarSign,
  FaCrown,
  FaCodeBranch,
} from "react-icons/fa";

const ContestDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isContestEnded, setIsContestEnded] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch contest data
  const {
    data: contest,
    isLoading: isContestLoading,
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
    enabled: !!id,
  });

  // Fetch submission status
  const {
    data: submissionStatus,
    isLoading: isSubmissionLoading,
  } = useQuery({
    queryKey: ["submissionStatus", id, user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/contest-submission-status/${id}/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!contest && !authLoading,
    refetchOnWindowFocus: false,
  });

  // Countdown
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

  // Loading & error states
  if (isContestLoading || isSubmissionLoading || authLoading)
    return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  if (!contest) return <ErrorPage message="Contest Not Found" />;

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
    taskInstruction,
  } = contest;

  const isRegistered = participants.includes(user?.email);
  const isSubmitted = submissionStatus?.submitted;
  const isFinalized = !!winner?.name || isContestEnded;

  const handleRegistered = () => {
    queryClient.invalidateQueries(["contest", id]);
  };

  const handleSubmitted = () => {
    queryClient.invalidateQueries({
      queryKey: ["submissionStatus", id, user?.email],
    });
  };

  const getButtonState = () => {
    if (isFinalized) return { label: "Contest Closed", disabled: true };
    if (isRegistered) return { label: "Already Registered", disabled: true };
    if (!user) return { label: "Login to Register", disabled: true };
    return { label: "Pay & Register", disabled: false };
  };

  const registerButton = getButtonState();

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-8 py-8 px-4 sm:px-6 overflow-x-hidden">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          {/* Main Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100 h-[400px]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Winner Card */}
          {winner && winner.name && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md flex items-center gap-4">
              <FaCrown className="text-4xl text-yellow-600 flex-shrink-0" />
              <div className="leading-tight">
                <span className="font-bold text-lg text-yellow-700 block">
                  🏆 WINNER DECLARED!
                </span>
                <span className="text-md font-semibold">{winner.name}</span>
              </div>
              <img
                src={winner.photo}
                className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500 ml-auto"
              />
            </div>
          )}

          {/* Contest Description */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2 border-b-2 pb-2 border-yellow-500/50">
              <FaCodeBranch className="text-yellow-500" /> About Contest
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Task Instructions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2 border-b-2 pb-2 border-yellow-500/50">
              <FaTrophy className="text-yellow-500" /> Submission Guidelines
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {taskInstruction}
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[380px] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl sticky top-20 h-fit border border-yellow-500/50">
          <Heading title={name} subtitle={`Category: ${category}`} />
          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg text-center shadow-inner border border-green-200 dark:border-green-700">
              <p className="text-xs uppercase text-green-600 dark:text-green-400 font-medium">
                Prize Money
              </p>
              <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-1">
                <FaDollarSign className="text-green-600 dark:text-green-400" />{" "}
                {prizeMoney}
              </p>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg text-center shadow-inner border border-green-200 dark:border-green-700">
              <p className="text-xs uppercase text-green-600 dark:text-green-400 font-medium">
                Contest Fee
              </p>
              <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-1">
                <FaDollarSign className="text-green-600 dark:text-green-400" />{" "}
                {contestFee}
              </p>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg col-span-2 shadow-inner border border-red-200 dark:border-red-700">
              <p className="text-xs uppercase text-red-600 dark:text-red-400 font-medium text-center">
                Deadline Remaining
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <FaRegClock className="text-red-600 dark:text-red-400" />
                <p
                  className={`text-xl font-extrabold ${
                    isContestEnded
                      ? "text-red-700 dark:text-red-300"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {timeLeft}
                </p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg col-span-2 shadow-inner border border-gray-200 dark:border-gray-700">
              <p className="text-xs uppercase text-gray-600 dark:text-gray-400 font-medium text-center">
                Total Participants
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <FaUserFriends className="text-gray-600 dark:text-gray-400" />
                <p className="text-xl font-extrabold text-gray-800 dark:text-gray-200">
                  {participantsCount}
                </p>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Creator */}
          <p className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Contest Creator:
          </p>
          <div className="flex items-center gap-4 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            <img
              src={contestCreator?.image}
              className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500"
              alt={contestCreator?.name}
            />
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">
                {contestCreator?.name}
              </p>
              <p className="text-sm text-neutral-500 dark:text-gray-400">
                {contestCreator?.email}
              </p>
            </div>
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              label={registerButton.label}
              onClick={() => setIsOpen(true)}
              disabled={registerButton.disabled}
            />

            {isRegistered && (
              <Button
                label={isSubmitted ? "Task Submitted" : "Submit Task"}
                onClick={() => setTaskOpen(true)}
                disabled={isFinalized || isSubmitted}
                className={`bg-indigo-600 hover:bg-indigo-700 ${
                  isFinalized || isSubmitted ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
            )}

            {!user && (
              <p className="text-center text-sm text-red-500 mt-2">
                Please log in to participate in the contest.
              </p>
            )}
          </div>

          {/* Modals */}
          <PurchaseModal
            contest={contest}
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            onSuccess={handleRegistered}
          />
          <SubmitTaskModal
            contestId={id}
            isOpen={taskOpen}
            closeModal={() => setTaskOpen(false)}
            onSuccess={handleSubmitted}
          />
        </div>
      </div>
    </Container>
  );
};

export default ContestDetails;
