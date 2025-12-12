// src/components/Dashboard/TableRows/SimpleSubmissionDataRow.jsx

const SimpleSubmissionDataRow = ({ submission }) => {

  // Data extraction based on the provided DB structure (submission.photo, submission.name, submission.email)
  const participantPhoto = submission?.photo || 'https://i.ibb.co/L8GqX61/user.png'; 
  const participantName = submission?.name || 'N/A';
  const participantEmail = submission?.email || 'N/A';
  const taskData = submission?.task || 'No Submission Provided';
  
  const submissionTime = submission?.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : 'N/A';
  
  // Check if the task data is a valid looking URL
  const isLink = taskData && (taskData.startsWith('http') || taskData.startsWith('www.'));

  return (
    <tr className="hover:bg-gray-50">
      
      {/* 1. Participant Image */}
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm text-center">
        <div className="flex items-center justify-center">
            <img 
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-md" 
                src={participantPhoto} 
                alt={participantName} 
            />
        </div>
      </td>
      
      {/* 2. Participant Name */}
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{participantName}</p>
      </td>
      
      {/* 3. Participant Email */}
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{participantEmail}</p>
      </td>
      
      {/* 4. Task/Submission Link/Text */}
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        {isLink ? (
            <a 
                href={taskData} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 underline transition duration-150 break-all"
            >
                {taskData.length > 50 ? `${taskData.substring(0, 50)}...` : taskData} 
            </a>
        ) : (
            <p className="text-gray-900 break-words max-w-xs">{taskData}</p>
        )}
      </td>

      {/* 5. Submission Time */}
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{submissionTime}</p>
      </td>
    </tr>
  );
};

export default SimpleSubmissionDataRow;