import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaEnvelope,
  FaRegCheckCircle,
  FaExclamationTriangle,
  FaCrown, // কাস্টম হেডিং এর জন্য
} from "react-icons/fa";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdminContactMessages = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contact-message"],
    queryFn: async () => {
      const res = await axiosSecure("/contact-message");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  // 💡 ডার্ক মোড ফিক্সড
  if (isError) return <ErrorPage></ErrorPage>;

  return (
    // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড
    <div className="container mx-auto px-4 sm:px-8 pt-8 dark:bg-gray-900 min-h-screen">
      <div
        className="w-full mb-10 text-center"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        {/* 👑 কাস্টম হেডিং স্টাইল প্রয়োগ করা হয়েছে */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2">
          <FaEnvelope className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
          <span className="">
            <span>Contact Messages ({messages.length})</span>
          </span>
        </h2>
      </div>

      <p
        // 💡 ডার্ক মোড টেক্সট কালার
        className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Review all messages sent through the contact form. This allows you to
        stay connected with your users and address their queries or feedback.
      </p>

      <div
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড, শ্যাডো এবং বর্ডার
        className="bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {messages.length === 0 ? (
          <div
            // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড, টেক্সট এবং বর্ডার
            className="text-center py-10 text-gray-500 dark:text-gray-400 border-2 border-dashed dark:border-gray-600 p-8 rounded-lg"
          >
            <p className="text-xl">No contact messages found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-5 rounded-lg shadow-md transition duration-300 ${
                  msg.isRead
                    ? "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    : "bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-500 hover:shadow-lg dark:hover:shadow-yellow-600/30"
                }`}
              >
                <div className="flex sm:flex-row flex-col justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-800 dark:text-gray-100">
                      {msg.name}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {msg.email}
                    </p>
                  </div>

                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {new Date(msg.receivedAt).toLocaleString()}
                  </p>
                </div>

                <p className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-line border-l-2 pl-3 border-gray-300 dark:border-gray-600 italic">
                  "{msg.message}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactMessages;
