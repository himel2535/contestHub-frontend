// src/pages/Dashboard/ContestSubmissions.jsx

import { useParams, Link } from 'react-router'; 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import ErrorPage from '../../components/Shared/ErrorPage/ErrorPage';
import { FaArrowLeft, FaTrophy } from 'react-icons/fa'; 
import toast from 'react-hot-toast'; 
import { useState } from 'react'; 
import DeclareWinnerModal from '../../components/Modal/DeclareWinnerModal';

const ContestSubmissions = () => {
  const { contestId } = useParams(); 
  const queryClient = useQueryClient(); 

  // 💡 Winner Modal State Management
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
    isError: isContestError 
  } = useQuery({
    queryKey: ["contestDetails", contestId],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/contest/${contestId}`
      );
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
    isError: isSubmissionsError 
  } = useQuery({
    queryKey: ["contestSubmissions", contestId],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/contest-submissions/${contestId}`
      );
      return result.data;
    },
    enabled: !!contestId,
  });
  
  // =========================================================
  // 3. Mutation for Declaring Winner
  // =========================================================
  const declareWinnerMutation = useMutation({
    mutationFn: (winnerInfo) => {
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/contests/winner/${contestId}`,
        winnerInfo
      );
    },
    onSuccess: () => {
      toast.success("Winner declared successfully!");
     
      closeWinnerModal(); 
     
      queryClient.invalidateQueries({ queryKey: ['contestDetails', contestId] });
      queryClient.invalidateQueries({ queryKey: ['contestSubmissions', contestId] });
      queryClient.invalidateQueries({ queryKey: ['inventory'] }); 
    },
    onError: (err) => {
        const errorMessage = err.response?.data?.message || "Failed to declare winner.";
        toast.error(errorMessage);
    }
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

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
        <Link to="/dashboard/my-inventory" className="text-gray-600 hover:text-lime-500 flex items-center mb-6">
            <FaArrowLeft className="mr-2" /> Back to My Contests
        </Link>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Submissions for Contest: <span className="text-lime-600">{contestName}</span>
        </h2>
        
        {/* 💡 Winner Status Display */}
        {winnerDeclared ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex items-center shadow-md">
                <FaTrophy className="text-2xl mr-3" />
                <p className="font-semibold">Winner Declared! </p>
                <p className="ml-2">The winner is **{contestDetails.winner.name}** ({contestDetails.winner.email}).</p>
            </div>
        ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-lg shadow-md">
                <p className="font-semibold">Winner Not Declared Yet.</p>
            </div>
        )}

        {submissions.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-xl text-gray-600 font-medium">No submissions found yet for this contest. 😟</p>
            </div>
        ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full leading-normal divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Participant Name</th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Participant Email</th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Submitted Task</th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Submitted At</th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th> 
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {submissions.map((sub) => {
                            const isWinner = contestDetails?.winner?.email === sub.email;
                            const isDisabled = winnerDeclared && !isWinner;
                            
                            // Check if the current submission is the one being processed
                            const isProcessing = declareWinnerMutation.isPending && selectedSubmission?._id === sub._id;
                            
                            return (
                            <tr key={sub._id} className={isWinner ? 'bg-green-50' : ''}>
                                <td className="px-5 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                                <td className="px-5 py-5 whitespace-nowrap text-sm text-gray-600">{sub.email}</td>
                                <td className="px-5 py-5 text-sm text-gray-500 break-words max-w-sm">{sub.task}</td>
                                <td className="px-5 py-5 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(sub.submittedAt).toLocaleDateString()}
                                </td>
                                
                                <td className="px-5 py-5 whitespace-nowrap text-sm">
                                    {isWinner ? (
                                        <span className="inline-flex items-center px-3 py-1 font-semibold text-green-800 bg-green-200 rounded-full">
                                            <FaTrophy className="mr-1"/> Winner
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleDeclareWinnerClick(sub)}
                                            disabled={isDisabled || isProcessing}
                                            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full transition duration-150 ease-in-out 
                                                ${isDisabled 
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-lime-500 text-white hover:bg-lime-600'
                                                }`}
                                        >
                                            {isProcessing ? 'Processing...' : 'Declare Winner'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        )}
        
        {/* 💡 Declare Winner Confirmation Modal */}
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