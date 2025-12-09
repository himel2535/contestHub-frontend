import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { FaTrophy } from 'react-icons/fa'; 

const DeclareWinnerModal = ({ 
    closeModal, 
    isOpen, 
    handleDeclare, 
    participantName, 
    isDeclaring 
}) => {
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                className="text-xl font-bold leading-6 text-gray-900 flex items-center text-red-600 border-b pb-2"
              >
                <FaTrophy className="mr-2 text-yellow-500" /> Confirm Winner Declaration
              </DialogTitle>
              
              <div className="mt-4">
                <p className="text-md text-gray-700 font-semibold">
                  Are you absolutely sure you want to declare the winner?
                </p>
                
                <div className="bg-blue-50 p-3 mt-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                        You are about to declare: <br/>
                        <span className="font-bold text-lg text-blue-900">{participantName}</span> as the winner of this contest.
                    </p>
                </div>
                
                <p className="text-sm text-red-500 mt-3 font-medium">
                  This action is irreversible and will mark the contest as **Completed**.
                </p>
              </div>
              
              <hr className="mt-8" />
              
              <div className="flex mt-4 justify-around">
                <button
                  onClick={handleDeclare}
                  type="button"
                  disabled={isDeclaring}
                  className={`cursor-pointer inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium transition duration-150 ease-in-out ${
                    isDeclaring 
                        ? 'bg-gray-300 text-gray-600' 
                        : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                  }`}
                >
                  {isDeclaring ? 'Declaring...' : 'Yes, Declare Winner'}
                </button>
                <button
                  type="button"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeclareWinnerModal;