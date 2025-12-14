import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaEnvelope,
  FaRegCheckCircle,
  FaExclamationTriangle,
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

  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8">
      <div
        className="w-full mb-4 text-center"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-flex flex-col md:flex-row md:items-center border-b-4 border-yellow-500 pb-2">
          <FaEnvelope className="mx-auto md:mr-3 text-yellow-600 text-4xl mb-2 md:mb-0" />

          <h2 className="text-4xl font-extrabold text-gray-900">
            Contact Messages ({messages.length})
          </h2>
        </div>
      </div>

      <p
        className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Review all messages sent through the contact form. This allows you to
        stay connected with your users and address their queries or feedback.
      </p>

      <div
        className="bg-white shadow-2xl rounded-xl border border-gray-100 p-6"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border-2 border-dashed p-8 rounded-lg">
            <p className="text-xl">No contact messages found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-5 rounded-lg shadow-md transition duration-300 ${
                  msg.isRead
                    ? "bg-gray-50 border border-gray-200"
                    : "bg-yellow-50 border-l-4 border-yellow-500 hover:shadow-lg"
                }`}
              >
                <div className="flex justify-between items-start border-b pb-2 mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-800">
                      {msg.name}
                    </p>
                    <p className="text-sm text-gray-600">{msg.email}</p>
                  </div>

                  <p className="text-xs font-medium text-gray-500">
                    {new Date(msg.receivedAt).toLocaleString()}
                  </p>
                </div>

                <p className="mt-2 text-gray-700 whitespace-pre-line border-l-2 pl-3 border-gray-300 italic">
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
