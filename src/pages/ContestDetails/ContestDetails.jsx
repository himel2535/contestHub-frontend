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
import { FaTrophy, FaUserFriends, FaRegClock, FaDollarSign, FaCrown, FaCodeBranch } from "react-icons/fa"; 

const ContestDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isContestEnded, setIsContestEnded] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // 1. Fetch contest data
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

  // 2. Fetch Submission Status
  const { data: submissionStatus, isLoading: isSubmissionLoading } = useQuery({
    queryKey: ["submissionStatus", id, user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/contest-submission-status/${id}/${
          user.email
        }`
      );
      return res.data;
    },
    enabled: !!user?.email && !!contest && !authLoading,
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

  // Handle Loading and Error States
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
  } = contest || {};

  const isRegistered = participants.includes(user?.email);
  const isSubmitted = submissionStatus?.submitted;
  
  const isFinalized = !!winner?.name || isContestEnded; 

  const handleRegistered = () => {
    queryClient.invalidateQueries(["contest", id]);
  };
  
  const handleSubmitted = () => {
      queryClient.invalidateQueries({ queryKey: ["submissionStatus", id, user?.email] });
  }

  // Determine button state and label
  const getButtonState = () => {
    if (isFinalized) return { label: "Contest Closed", disabled: true };
    if (isRegistered) return { label: "Already Registered", disabled: true };
    if (!user) return { label: "Login to Register", disabled: true };
    return { label: "Pay & Register", disabled: false };
  }

  const registerButton = getButtonState();

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-10 py-12">
        
        {/* Left Side: Image, Details and Description (The Main Content) */}
        <div className="flex-1 space-y-8">
          
          {/* Main Image Card with fixed height */}
          <div 
            className="rounded-xl overflow-hidden shadow-2xl border border-gray-100 h-[400px]" // 💡 height ফিক্সড করা হয়েছে
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              className="w-full h-full object-cover" // 💡 ইমেজটিকে div এর সাথে ফিট করার জন্য h-full
              src={image}
              alt={name}
            />
          </div>

          {/* Winner Display - Light Style (Yellow) */}
          {winner && winner.name && (
            <div 
                className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-5 rounded-lg shadow-md flex items-center gap-4"
                data-aos="zoom-in"
                data-aos-delay="300"
            >
                <FaCrown className="text-4xl text-yellow-600 flex-shrink-0" />
                <div className="leading-tight">
                    <span className="font-bold text-xl text-yellow-700 block">🏆 WINNER DECLARED!</span>
                    <span className="text-lg font-semibold">{winner.name}</span>
                </div>
                <img src={winner.photo} className="w-16 h-16 rounded-full object-cover border-4 border-yellow-500 ml-auto" />
            </div>
          )}
          
          {/* Contest Description Card with Animation */}
          <div 
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b-2 pb-2 border-yellow-500/50">
                <FaCodeBranch className="text-yellow-500" /> About Contest
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
          </div>

          {/* Task Instructions Card with Animation */}
          <div 
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b-2 pb-2 border-yellow-500/50">
                <FaTrophy className="text-yellow-500" /> Submission Guidelines
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{taskInstruction}</p>
          </div>
        </div>

        {/* Right Side: Action Panel (Sticky) */}
        <div 
          className="w-full lg:w-[380px] bg-white p-6 rounded-xl shadow-2xl sticky top-20 h-fit border border-yellow-500/50"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          
          {/* Header */}
          <Heading title={name} subtitle={`Category: ${category}`} />
          
          <hr className="my-5 border-gray-200" />
          
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-5">
              
              {/* Prize Money (Green) */}
              <div className="p-3 bg-green-50 rounded-lg text-center shadow-inner border border-green-200">
                  <p className="text-xs uppercase text-green-600 font-medium">Prize Money</p> {/* 💡 Prize Pool পরিবর্তিত */}
                  <p className="text-2xl font-extrabold text-gray-800 flex items-center justify-center gap-1">
                      <FaDollarSign className="text-xl text-green-600" /> {prizeMoney}
                  </p>
              </div>

              {/* Contest Fee (Green - Prize Money এর মতো) */}
              <div className="p-3 bg-green-50 rounded-lg text-center shadow-inner border border-green-200"> {/* 💡 BG & Border Green করা হয়েছে */}
                  <p className="text-xs uppercase text-green-600 font-medium">Contest Fee</p> {/* 💡 Text কালার Green করা হয়েছে */}
                  <p className="text-2xl font-extrabold text-gray-800 flex items-center justify-center gap-1">
                      <FaDollarSign className="text-xl text-green-600" /> {/* 💡 Icon কালার Green করা হয়েছে */}
                      {contestFee}
                  </p>
              </div>

              {/* Deadline Remaining (Red/Indigo - Fee থেকে কালার এখানে এসেছে) */}
              <div className="p-3 bg-red-50 rounded-lg col-span-2 shadow-inner border border-red-200"> {/* 💡 BG & Border Red করা হয়েছে */}
                  <p className="text-xs uppercase text-red-600 font-medium text-center">Deadline Remaining</p> {/* 💡 Text কালার Red করা হয়েছে */}
                  <div className="flex items-center justify-center gap-2 mt-1">
                      <FaRegClock className="text-xl text-red-600" /> {/* 💡 Icon কালার Red করা হয়েছে */}
                      <p className={`text-xl font-extrabold ${isContestEnded ? 'text-red-700' : 'text-gray-800'}`}>{timeLeft}</p>
                  </div>
              </div>

              {/* Participants Count (Gray) */}
              <div className="p-3 bg-gray-50 rounded-lg col-span-2 shadow-inner border border-gray-200">
                  <p className="text-xs uppercase text-gray-600 font-medium text-center">Total Participants</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                      <FaUserFriends className="text-xl text-gray-600" />
                      <p className="text-xl font-extrabold text-gray-800">{participantsCount}</p>
                  </div>
              </div>
          </div>
          
          <hr className="my-5 border-gray-200" />
          
          {/* Creator Info */}
          <p className="text-base font-semibold mb-3 text-gray-700">Contest Creator:</p>
          <div className="flex items-center gap-4 p-3 border border-gray-300 rounded-lg bg-gray-50">
            <img
              src={contestCreator?.image}
              className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500"
              alt={contestCreator?.name}
            />
            <div>
              <p className="font-bold text-gray-800 text-lg">{contestCreator?.name}</p>
              <p className="text-sm text-neutral-500">{contestCreator?.email}</p>
            </div>
          </div>
          
          <hr className="my-6 border-gray-200" />

          {/* Button logic */}
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
                // Custom style for the submit button
                className={`bg-indigo-600 hover:bg-indigo-700 ${
                    isFinalized || isSubmitted ? 'opacity-60 cursor-not-allowed' : ''
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