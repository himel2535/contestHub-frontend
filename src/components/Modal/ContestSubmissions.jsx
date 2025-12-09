// src/pages/Dashboard/ContestSubmissions.jsx

import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import ErrorPage from '../../components/Shared/ErrorPage/ErrorPage';
import { FaArrowLeft } from 'react-icons/fa';

const ContestSubmissions = () => {
  const { contestId } = useParams(); 
  
  // =========================================================
  // 1. 💡 Contest Details Query:
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
    staleTime: 1000 * 60 * 5, 
  });

  const contestName = contestDetails?.name || "Loading Contest Name...";

  // =========================================================
  // 2.  Submissions Query: 
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
  //  Combined Loading and Error Handling
  // =========================================================
  if (isContestPending || isSubmissionsPending) return <LoadingSpinner />;
  
  if (isContestError || isSubmissionsError) return <ErrorPage />;
  
  if (!contestId) return <ErrorPage message="Contest ID is missing!" />;
  
  if (isContestPending === false && !contestDetails) {
     return <ErrorPage message={`Contest with ID ${contestId} not found.`} />;
  }


  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
        <Link to="/dashboard/my-inventory" className="text-gray-600 hover:text-lime-500 flex items-center mb-6">
            <FaArrowLeft className="mr-2" /> Back to My Contests
        </Link>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Submissions for Contest: <span className="text-lime-600">
         
              {contestName}
            </span>
        </h2>

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
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {submissions.map((sub) => (
                            <tr key={sub._id}>
                                <td className="px-5 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                                <td className="px-5 py-5 whitespace-nowrap text-sm text-gray-600">{sub.email}</td>
                                <td className="px-5 py-5 text-sm text-gray-500 break-words max-w-sm">{sub.task}</td>
                                <td className="px-5 py-5 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(sub.submittedAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  );
};

export default ContestSubmissions;