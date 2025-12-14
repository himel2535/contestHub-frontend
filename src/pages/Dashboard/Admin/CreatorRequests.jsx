// src/pages/Dashboard/Admin/CreatorRequests.jsx

import React from "react";
import CreatorRequestsDataRow from "../../../components/Dashboard/TableRows/CreatorRequestsDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import { FaUserPlus, FaCrown } from "react-icons/fa"; // FaCrown আমদানি করা হলো

const CreatorRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: requests = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["creator-requests", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/creator-requests`);
      return result.data;
    },
  });

  if (isPending) return <LoadingSpinner />;

  // 💡 ডার্ক মোড ফিক্সড
  if (isError) return <ErrorPage />;

  return (
    // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড
    <div className="container mx-auto px-4 sm:px-8 pt-8 dark:bg-gray-900 min-h-screen">
      <div
        className="w-full mb-10 text-center"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        {/* 👑 কাস্টম হেডিং স্টাইল প্রয়োগ করা হয়েছে */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2"
        >
          <FaUserPlus className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
          <span className="">
            <span>Creator Requests ({requests.length})</span>
          </span>
        </h2>
      </div>

      <p
        // 💡 ডার্ক মোড টেক্সট কালার
        className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Review pending requests from users wishing to become Contest Creators.
        Approve their request to grant them the necessary permissions.
      </p>

      {/* Table Container */}
      <div className="pb-8 ">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            // 💡 ডার্ক মোড শ্যাডো এবং বর্ডার
            className="inline-block min-w-full shadow-2xl dark:shadow-gray-700/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <table className="min-w-full leading-normal divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                {/* Table Headers (Yellow BG is fine) */}
                <tr className="bg-yellow-500">
                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-yellow-400 text-white text-left text-xs uppercase font-semibold tracking-wider"
                  >
                    Email
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-yellow-400 text-white text-center text-xs uppercase font-semibold tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {requests.length === 0 ? (
                  <tr>
                    {/* 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং টেক্সট */}
                    <td 
                      colSpan="2" 
                      className="py-8 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                    >
                      No pending creator requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((request, index) => (
                    // CreatorRequestsDataRow কম্পোনেন্টটিকে ডার্ক মোডের জন্য আলাদাভাবে আপডেট করতে হবে
                    <CreatorRequestsDataRow
                      refetch={refetch}
                      key={request._id}
                      request={request}
                      delay={index * 50} // Staggered animation
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorRequests;