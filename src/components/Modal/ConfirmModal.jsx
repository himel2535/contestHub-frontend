import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { FaRegThumbsUp, FaTimes } from "react-icons/fa";

const ConfirmModal = ({ closeModal, isOpen, handleAction }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            // 💡 Modal Style Fx (Green Border for Confirm)
            className="w-full max-w-md bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl rounded-xl border-t-4 border-green-500"
            data-aos="zoom-in"
          >
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <div className="flex items-center">
                <FaRegThumbsUp className="text-3xl text-green-600 mr-3" />
                <DialogTitle
                  as="h3"
                  className="text-xl font-bold leading-6 text-gray-900"
                >
                  Confirm Contest Approval
                </DialogTitle>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-red-600 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-700">
                Are you sure you want to **CONFIRM** this contest?
              </p>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                Once confirmed, it will be visible to all users.
              </p>
            </div>

            <div className="flex mt-6 justify-end space-x-3">
              {/* Confirm Button (Green Theme) */}
              <button
                onClick={handleAction}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition duration-150"
              >
                Yes, Confirm
              </button>

              {/* Cancel Button (Secondary) */}
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition duration-150"
                onClick={closeModal}
              >
                No, Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
