// src/components/Modal/SubmitTaskModal.jsx

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";

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
    const taskData = {
      contestId: contestId,
      task: data.taskContent,
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
            // 💡 মডাল কন্টেইনারের ব্যাকগ্রাউন্ড, টেক্সট এবং শ্যাডো ডার্ক মোড ফ্রেন্ডলি করা হলো
            className="w-full max-w-md bg-white dark:bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl dark:shadow-2xl dark:shadow-yellow-500/20 rounded-2xl"
          >
            <DialogTitle
              as="h3"
              // 💡 হেডিং টেক্সট কালার ডার্ক মোড ফ্রেন্ডলি করা হলো
              className="text-lg font-medium text-center leading-6 text-gray-900 dark:text-gray-100"
            >
              Submit Your Task
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="taskContent"
                  // 💡 লেবেল টেক্সট কালার ডার্ক মোড ফ্রেন্ডলি করা হলো
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Submit Your Task Content or Description
                </label>

                <textarea
                  id="taskContent"
                  rows="6"
                  {...register("taskContent", {
                    required: "Task content is required",
                  })}
                  // 💡 টেক্সট এরিয়া: ব্যাকগ্রাউন্ড, বর্ডার এবং টেক্সট কালার ডার্ক মোড ফ্রেন্ডলি করা হলো
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border
                           bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:dark:text-gray-400"
                  placeholder="Write your submission content or task details here..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  // 💡 Cancel বাটন: ডার্ক মোড ব্যাকগ্রাউন্ড এবং টেক্সট কালার
                  className="inline-flex justify-center rounded-md border border-transparent 
                           bg-gray-100 dark:bg-gray-600 px-4 py-2 text-sm font-medium 
                           text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 disabled:opacity-50"
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