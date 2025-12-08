import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
// import { useAuth } from "../../hooks/useAuth";

const SubmitTaskModal = ({ isOpen, closeModal, contestId }) => {
  const [task, setTask] = useState("");
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/submit-task`, {
      contestId,
      task,
      email: user.email,
    });

    toast("Task submitted!");
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-xl font-semibold mb-3">Submit Your Task</h2>

        <textarea
          className="border w-full p-3 h-32 rounded"
          placeholder="Paste your links here..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Submit
        </button>

        <button
          onClick={closeModal}
          className="mt-2 w-full text-gray-600"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default SubmitTaskModal;
