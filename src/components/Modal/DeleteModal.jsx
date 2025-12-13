import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const DeleteModal = ({ closeModal, isOpen, handleDelete, actionType }) => {
  // Determine primary color and text based on actionType
  const isRejectAction = actionType === "reject";
  const confirmText = isRejectAction ? "Reject & Delete" : "Delete";

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-sm bg-white p-6 backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl rounded-xl border-t-4 border-red-500"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-3xl text-red-500 mr-3" />
                <DialogTitle
                  as="h3"
                  className="text-xl font-bold leading-6 text-gray-900"
                >
                  Confirm Action
                </DialogTitle>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                {isRejectAction ? (
                  <span className="font-semibold text-red-600">
                    WARNING: This action will reject and permanently delete the
                    contest.
                  </span>
                ) : (
                  <span className="font-semibold text-red-600">
                    WARNING: This action will permanently delete the contest.
                  </span>
                )}
                <br />
                <span className="mt-1 block">
                  You cannot undo this process once it&apos;s executed. Are you
                  absolutely sure?
                </span>
              </p>
            </div>

            <hr className="mt-6 border-gray-200" />


            <div className="flex mt-4 justify-end space-x-3">
              {/* Confirm/Delete Button - Left Side */}
              <button
                onClick={handleDelete}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition duration-150"
              >
                Yes, {confirmText}
              </button>

              {/* Cancel Button - Right Side */}
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-yellow-200 px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 transition duration-150"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
