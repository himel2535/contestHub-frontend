import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { FaEdit, FaTimes } from "react-icons/fa";
import UpdateContestForm from "../Form/UpdateContestForm";

const UpdateContestModal = ({ setIsEditModalOpen, isOpen, contest, refetch }) => {
  const closeModal = () => setIsEditModalOpen(false);

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
            className="w-full max-w-2xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl rounded-xl border-t-4 border-yellow-500"
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div className="flex items-center">
                <FaEdit className="text-3xl text-yellow-600 mr-3" />
                <DialogTitle
                  as="h3"
                  className="text-xl font-bold leading-6 text-gray-900"
                >
                  Update Contest Information
                </DialogTitle>
              </div>

              <button
                onClick={closeModal}
                className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-full transition duration-150"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="mt-4 w-full">
              <UpdateContestForm
                contest={contest}
                closeModal={closeModal}
                refetch={refetch}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateContestModal;
