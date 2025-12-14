import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router"; 
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const contestId = searchParams.get("contestId");

  useEffect(() => {
    if (sessionId) {
      // 💡 পেমেন্ট সফল হওয়ার পর সার্ভারে সেশন আইডি পাঠানো
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId]);

  return (
    // 💡 Main container এ ডার্ক মোড ব্যাকগ্রাউন্ড এবং টেক্সট যোগ করা হলো
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4">
      <div
        // 💡 কার্ডের ব্যাকগ্রাউন্ড, শ্যাডো এবং টেক্সট কালার ডার্ক মোড ফ্রেন্ডলি করা হলো
        className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl dark:shadow-2xl dark:shadow-green-500/20 text-center transition-colors duration-300 max-w-lg w-full border border-gray-100 dark:border-gray-700"
      >
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
        
        {/* হেডিং */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Payment Successful!
        </h1>

        {/* মেসেজ */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your purchase. Your order is being processed, and you are now registered for the contest.
        </p>

        {/* Go Back to Contest Details */}
        <Link
          to={`/contest/${contestId}`}
          // 💡 বাটন ১: হলুদ থিমের সাথে মানানসই হলুদ বাটন
          className="inline-block bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 mr-3"
        >
          Back to Contest
        </Link>

        {/* Go to Orders */}
        <Link
          to="/dashboard/my-orders"
          // 💡 বাটন ২: ডার্ক মোড ফ্রেন্ডলি গৌণ বাটন
          className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;