// src/components/Modal/SubmitTaskModal.jsx

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";

// 💡 onSuccess prop যোগ করা হয়েছে ContestDetails থেকে স্ট্যাটাস আপডেট করার জন্য
const SubmitTaskModal = ({ contestId, closeModal, isOpen, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const submitTaskFn = async (taskData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/submit-task`,
      taskData
    );
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: submitTaskFn,
    onSuccess: () => {
      toast.success("Task Submitted successfully!");
      reset();
      closeModal();

      // টাস্ক সফলভাবে সাবমিট হওয়ার পর ContestDetails কে আপডেট করার জন্য কল
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error("Submission Error:", error);
      toast.error("Failed to submit task.");
    },
  });

  const onSubmit = (data) => {
    // 💡 এখানে 'taskContent' ফিল্ড ব্যবহার করা হচ্ছে
    const taskData = {
      contestId: contestId,
      task: data.taskContent, // সংশোধিত: টেক্সট এরিয়া থেকে ডেটা
      email: user?.email,
      name: user?.displayName,
      photoUrl: user?.photoURL,
    };
    mutate(taskData);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Submit Your Task
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="taskContent"
                  className="block text-sm font-medium text-gray-700"
                >
                  Submit Your Task Content or Description
                </label>
                {/* 💡 টেক্সট এরিয়া যোগ করা হলো */}
                <textarea
                  id="taskContent"
                  rows="6"
                  {...register("taskContent", {
                    required: "Task content is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm p-2 border"
                  placeholder="Write your submission content or task details here..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-white hover:bg-lime-600 disabled:opacity-50"
                  disabled={isPending}
                >
                  {isPending ? (
                    <TbFidgetSpinner className="animate-spin m-auto" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SubmitTaskModal;
