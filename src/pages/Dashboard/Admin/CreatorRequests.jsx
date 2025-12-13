// src/pages/Dashboard/Admin/CreatorRequests.jsx

import React from "react";
import CreatorRequestsDataRow from "../../../components/Dashboard/TableRows/CreatorRequestsDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage/ErrorPage";
import { FaUserPlus } from "react-icons/fa";

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

  if (isError) return <ErrorPage />;

  return (
    <div className="container mx-auto px-4 sm:px-8 pt-8">
      <div
        className="w-full mb-4 text-center"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-flex flex-col md:flex-row md:items-center border-b-4 border-yellow-500 pb-2">
          <FaUserPlus className="mx-auto md:mr-3 text-yellow-600 text-4xl mb-2 md:mb-0" />

          <h2 className="text-4xl font-extrabold text-gray-900">
            Creator Requests ({requests.length})
          </h2>
        </div>
      </div>

      <p
        className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg font-medium"
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
            className="inline-block min-w-full shadow-2xl rounded-xl overflow-hidden border border-gray-100"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <table className="min-w-full leading-normal divide-y divide-gray-200">
              <thead>
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
              <tbody className="divide-y divide-gray-100">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="py-8 text-center text-gray-500">
                      No pending creator requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((request, index) => (
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
