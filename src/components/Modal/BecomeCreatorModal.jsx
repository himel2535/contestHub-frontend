import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaCrown, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 

const BecomeCreatorModal = ({ closeModal, isOpen }) => {
  const axiosSecure = useAxiosSecure();

  const handleRequest = async () => {
    try {
      await axiosSecure.post("/become-creator");
      toast.success(
        "Request sent successfully! Please wait for admin approval."
      );
    } catch (error) {
      console.log(error);

      const errorMessage =
        error?.response?.data?.message ||
        "Failed to send request. Please try again.";
      toast.error(errorMessage);
    } finally {
      closeModal();
    }
  };

  // 💡 Note: Headless UI recommends using the prop name 'close' in Dialog.
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none" // Increased z-index
      onClose={closeModal} // Correctly using closeModal passed as prop
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg bg-white p-8 backdrop-blur-sm duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl rounded-2xl border-t-4 border-yellow-500" // Added border and shadow
          >
            <DialogTitle
              as="h3"
              className="text-2xl font-bold text-center leading-6 text-gray-900 flex items-center justify-center mb-6"
            >
              <FaCrown className="mr-3 text-yellow-600 text-3xl" />
              Become A Contest Creator!
            </DialogTitle>

            <div className="mt-2 text-center">
              <p className="text-sm text-gray-700 font-medium mb-4">
                By continuing, you agree to submit a request to the Admin to
                upgrade your account role.
              </p>
              <p className="text-xs text-gray-500 italic">
                (Approval is not guaranteed and subject to review.)
              </p>
            </div>

            <div className="mt-8 space-y-3 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" /> Terms and
                Conditions Summary:
              </h4>
              <ul className="list-disc pl-8 text-sm text-gray-600">
                <li>
                  Contest creation abilities will be unlocked upon approval.
                </li>
                <li>You must adhere to all platform rules and guidelines.</li>
                <li>Requests are processed within 24-48 hours.</li>
              </ul>
            </div>

            <div className="flex mt-8 justify-around">
              <button
                onClick={handleRequest}
                type="button"
                className="cursor-pointer inline-flex justify-center items-center rounded-lg border border-transparent bg-yellow-600 px-6 py-3 text-sm font-bold text-white shadow-md transition duration-200 hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
              >
                <FaCrown className="mr-2" /> Confirm Request
              </button>

              <button
                type="button"
                className="cursor-pointer inline-flex justify-center items-center rounded-lg border border-red-400 bg-white px-6 py-3 text-sm font-bold text-red-600 shadow-sm transition duration-200 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                <FaTimesCircle className="mr-2" /> Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BecomeCreatorModal;
