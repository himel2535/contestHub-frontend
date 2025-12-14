

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PurchaseModal = ({ closeModal, isOpen, contest }) => {
  const { user } = useAuth();
  const {
    _id,
    name,
    category,
    contestFee,
    description,
    image,
    contestCreator,
    prizeMoney,
  } = contest || {};

  const handlePayment = async () => {
    // 💡 Error Handling: If user is null, should not proceed
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    const paymentInfo = {
      contestId: _id,
      name,
      category,
      contestFee,
      description,
      image,
      prizeMoney,
      participantsCount: 1,
      contestCreator,
      participant: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data.url;
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
            // মডাল কন্টেইনার: ব্যাকগ্রাউন্ড, শ্যাডো এবং টেক্সট কালার ডার্ক মোড ফ্রেন্ডলি
            className="w-full max-w-md bg-white dark:bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out 
                       data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl dark:shadow-2xl dark:shadow-yellow-500/20 rounded-2xl"
          >
            <DialogTitle
              as="h3"
              // হেডিং টেক্সট কালার ডার্ক মোড ফ্রেন্ডলি
              className="text-lg font-medium text-center leading-6 text-gray-900 dark:text-gray-100"
            >
              Review Info Before Payment
            </DialogTitle>
            
            {/* কন্টেন্ট এরিয়া: টেক্সট কালার ডার্ক মোড ফ্রেন্ডলি */}
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-300">Contest: {name}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-300">Category: {category}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {" "}
                Participant : {user?.displayName}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Contest Fee: $ {contestFee}
              </p>
            </div>
            
            {/* বাটন সেকশন */}
            <div className="flex mt-6 justify-around border-t border-gray-200 dark:border-gray-700 pt-4">
              <button
                onClick={handlePayment}
                type="button"
                // 💡 Pay বাটন: হলুদ রং (Yellow-500/600) ব্যবহার করা হলো
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent 
                           bg-yellow-500 dark:bg-yellow-600 px-4 py-2 text-sm font-medium 
                           text-white hover:bg-yellow-600 dark:hover:bg-yellow-700 
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
              >
                Pay
              </button>
              <button
                type="button"
                // 💡 Cancel বাটন: হলুদ থিমের সাথে মানানসই গ্রে ব্যাকগ্রাউন্ড
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent 
                           bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium 
                           text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
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

export default PurchaseModal;