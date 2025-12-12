import React from "react";
// import { useState } from "react";
// import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
// import UpdateCreatorRequestModal from "../../Modal/UpdateCreatorRequestModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const CreatorRequestsDataRow = ({ request,refetch }) => {
  //   let [isOpen, setIsOpen] = useState(false);
  //   const closeModal = () => setIsOpen(false);

  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/update-role", { email: request?.email ,role:"contestCreator"});
      toast.success("Successfully Role Updated");
      refetch()
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{request?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          //   onClick={() => setIsOpen(true)}
          onClick={handleRoleUpdate}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Make Creator</span>
        </span>
        {/* Modal */}
        {/* <UpdateCreatorRequestModal
          isOpen={isOpen}
          closeModal={closeModal}
          role="customer"
        /> */}
      </td>
    </tr>
  );
};

export default CreatorRequestsDataRow;
