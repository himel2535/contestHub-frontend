// src/components/Modal/ConfirmModal.jsx (New File - Fixed Style)

import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";

const ConfirmModal = ({ closeModal, isOpen, handleAction }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      {/* Background/Backdrop fixed using absolute positioning inside Dialog */}
      <div className="fixed inset-0 bg-black/30 z-10" aria-hidden="true" /> 
      
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-bold leading-6 text-gray-900"
            >
              Confirm Contest Approval
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Are you sure you want to **CONFIRM** this contest?
              </p>
              <p className="text-sm text-gray-500 mt-1 font-semibold">
                Once confirmed, it will be visible to all users.
              </p>
            </div>
            <hr className="mt-8 " />
            <div className="flex mt-2 justify-around">
              <button
                onClick={handleAction}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Yes, Confirm
              </button>
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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