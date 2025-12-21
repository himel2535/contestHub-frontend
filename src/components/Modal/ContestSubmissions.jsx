/* eslint-disable react-hooks/static-components */

import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../../components/Shared/ErrorPage/ErrorPage";
import { FaArrowLeft, FaTrophy, FaRegSmileBeam } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import DeclareWinnerModal from "../../components/Modal/DeclareWinnerModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ContestSubmissions = () => {
  const { contestId } = useParams();
  const queryClient = useQueryClient();

  const axiosSecure = useAxiosSecure();

  //  Winner Modal State Management
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const openWinnerModal = (submission) => {
    setSelectedSubmission(submission);
    setIsWinnerModalOpen(true);
  };

  const closeWinnerModal = () => {
    setIsWinnerModalOpen(false);
    setSelectedSubmission(null);
  };

  // =========================================================
  // 1. Contest Details Query (Name and Winner status)
  // =========================================================
  const {
    data: contestDetails,
    isPending: isContestPending,
    isError: isContestError,
  } = useQuery({
    queryKey: ["contestDetails", contestId],
    queryFn: async () => {
      const result = await axiosSecure(`/contest/${contestId}`);
      return result.data;
    },
    enabled: !!contestId,
  });

  // =========================================================
  // 2. Submissions Query
  // =========================================================
  const {
    data: submissions = [],
    isPending: isSubmissionsPending,
    isError: isSubmissionsError,
  } = useQuery({
    queryKey: ["contestSubmissions", contestId],
    queryFn: async () => {
      const result = await axiosSecure(`/contest-submissions/${contestId}`);
      return result.data;
    },
    enabled: !!contestId,
  });

  // =========================================================
  // 3. Mutation for Declaring Winner
  // =========================================================
  const declareWinnerMutation = useMutation({
    mutationFn: (winnerInfo) => {
      return axiosSecure.patch(`/contests/winner/${contestId}`, winnerInfo);
    },
    onSuccess: () => {
      toast.success("🏆 Winner declared successfully! Congratulations!");

      closeWinnerModal();

      queryClient.invalidateQueries({
        queryKey: ["contestDetails", contestId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contestSubmissions", contestId],
      });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Oops! Failed to declare winner.";
      toast.error(errorMessage);
    },
  });

  // =========================================================
  // Event Handler (Modal Call)
  // =========================================================

  const handleDeclareWinnerClick = (submission) => {
    openWinnerModal(submission);
  };

  const confirmDeclareWinner = () => {
    if (!selectedSubmission) return;

    const winnerInfo = {
      winnerName: selectedSubmission.name,
      winnerEmail: selectedSubmission.email,
      submissionId: selectedSubmission._id,
      winnerPhoto: selectedSubmission.photo,
    };

    declareWinnerMutation.mutate(winnerInfo);
  };

  // =========================================================
  // Loading and Error Handling
  // =========================================================
  if (isContestPending || isSubmissionsPending) return <LoadingSpinner />;

  if (isContestError || isSubmissionsError) return <ErrorPage />;

  if (!contestId) return <ErrorPage message="Contest ID is missing!" />;

  if (isContestPending === false && !contestDetails) {
    return <ErrorPage message={`Contest with ID ${contestId} not found.`} />;
  }

  const contestName = contestDetails?.name || "Contest Submissions";
  const winnerDeclared = !!contestDetails?.winner;

  // --- FIX 1: Declare winningContests to resolve the undefined error ---
  // eslint-disable-next-line no-unused-vars
  const winningContests = [];

  // --- FIX 1: Define CustomHeading within the component scope to use local variables ---
  const CustomHeading = ({ name }) => (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2">
      <FaRegSmileBeam className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
      <span className="flex flex-wrap items-baseline">
        <span>{name}</span>
        <span className="text-yellow-500/80 font-semibold text-xl sm:text-2xl md:text-3xl ml-2">
          (Submissions)
        </span>
      </span>
    </h2>
  );

  return (
    <div className="container mx-auto px-2 sm:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Link
        to="/dashboard/my-inventory"
        className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center mb-6 transition-colors duration-200 font-medium"
      >
        <FaArrowLeft className="mr-2" /> Back to My Contests
      </Link>

      <div className="mb-8">
        {/* --- FIX 1: Use CustomHeading here --- */}

        <CustomHeading name={contestName} />
      </div>

      {/* 💡 Winner Status Display (Responsive Padding & Text Alignment Fix) */}
      {winnerDeclared ? (
        <div className="bg-green-100 dark:bg-green-900/40 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 pl-2 sm:pl-4 mb-6 rounded-lg flex flex-col items-center sm:flex-row sm:items-center shadow-md dark:shadow-xl text-center sm:text-left transition-colors duration-300">
          <FaTrophy className="text-2xl mr-3 mb-2 sm:mb-0 flex-shrink-0" />
          {/* --- FIX 2 & 3: Changed "Fantastic News" to "Winner Declared!" and ensured text-center on small screens, icon on the same line. --- */}
          <p className="font-semibold text-lg flex-shrink-0">
            Winner Declared!
          </p>
          <p className="ml-0 mt-1 sm:mt-0 sm:ml-2">
            The winner is **{contestDetails.winner.name}** (
            {contestDetails.winner.email}).
          </p>
        </div>
      ) : (
        <div className="bg-yellow-100 dark:bg-yellow-900/40 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 mb-6 rounded-lg shadow-md dark:shadow-xl transition-colors duration-300">
          <p className="font-semibold flex items-center">
            <FaRegSmileBeam className="mr-2 text-xl" /> Just waiting! Winner Not
            Declared Yet.
          </p>
        </div>
      )}

      {submissions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-2xl text-center transition-colors duration-300">
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
            No submissions found yet for this contest. Time to wait and see!
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg dark:shadow-2xl overflow-x-auto transition-colors duration-300">
          <table className="min-w-full leading-normal divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Participant
                </th>
                <th className="hidden md:table-cell px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Submitted Task
                </th>
                <th className="hidden lg:table-cell px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Submitted At
                </th>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {submissions.map((sub) => {
                const isWinner = contestDetails?.winner?.email === sub.email;
                const isDisabled = winnerDeclared && !isWinner;

                // Check if the current submission is the one being processed
                const isProcessing =
                  declareWinnerMutation.isPending &&
                  selectedSubmission?._id === sub._id;

                return (
                  <tr
                    key={sub._id}
                    className={
                      isWinner
                        ? "bg-green-50 dark:bg-green-900/30"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    }
                  >
                    <td className="px-3 sm:px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {sub.name}
                      <span className="block md:hidden text-xs text-gray-500 dark:text-gray-400">
                        {sub.email}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-5 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {sub.email}
                    </td>
                    <td className="px-3 sm:px-5 py-4 text-sm text-gray-500 dark:text-gray-400 break-words max-w-[150px] sm:max-w-xs overflow-hidden text-ellipsis">
                      {sub.task.substring(0, 50)}...
                    </td>
                    <td className="hidden lg:table-cell px-5 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>

                    <td className="px-3 sm:px-5 py-4 whitespace-nowrap text-sm">
                      {isWinner ? (
                        <span className="inline-flex items-center px-3 py-1 font-semibold text-green-800 bg-green-200 dark:bg-green-700 dark:text-green-100 rounded-full transition-colors duration-150">
                          <FaTrophy className="mr-1" /> Grand Winner!
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDeclareWinnerClick(sub)}
                          disabled={isDisabled || isProcessing}
                          className={`relative inline-block px-3 py-1 text-xs sm:text-sm font-semibold leading-tight rounded-full transition duration-200 ease-in-out shadow-md
                         ${
                           isDisabled
                             ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                             : "bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                         }`}
                        >
                          {isProcessing ? "Processing..." : "Declare Winner"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/*  Declare Winner Confirmation Modal */}
      <DeclareWinnerModal
        isOpen={isWinnerModalOpen}
        closeModal={closeWinnerModal}
        handleDeclare={confirmDeclareWinner}
        participantName={selectedSubmission?.name}
        isDeclaring={declareWinnerMutation.isPending}
      />
    </div>
  );
};

export default ContestSubmissions;
