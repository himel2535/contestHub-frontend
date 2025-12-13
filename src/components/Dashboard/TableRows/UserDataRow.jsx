// src/components/Dashboard/TableRows/UserDataRow.jsx

import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import { FaEdit } from "react-icons/fa"; 

const UserDataRow = ({ user, refetch, delay }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  // Current user's role is highlighted differently
  const isCurrentUserAdmin = user?.role === "admin";

  return (
    <tr
      className="hover:bg-yellow-50 transition duration-150 ease-in-out"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* 1. Image */}
      <td className="px-5 py-3 border-b border-gray-100 bg-white text-sm text-center">
        <div className="flex items-center justify-center">
          <img
            alt={user?.name}
            src={user?.image}
            className="object-cover rounded-full h-10 w-10 border border-gray-200 shadow-sm"
          />
        </div>
      </td>

      {/* 2. Name */}
      <td className="px-5 py-3 border-b border-gray-100 bg-white text-sm">
        <p className="text-gray-900 font-medium">{user?.name}</p>
      </td>

      {/* 3. Email */}
      <td className="px-5 py-3 border-b border-gray-100 bg-white text-sm">
        <p className="text-gray-600 font-light">{user?.email}</p>
      </td>

      {/* 4. Role */}
      <td className="px-5 py-3 border-b border-gray-100 bg-white text-sm">
        <p
          className={`font-semibold capitalize ${
            isCurrentUserAdmin ? "text-red-600" : "text-yellow-600"
          }`}
        >
          {user?.role}
        </p>
      </td>

      {/* 5. Action */}
      <td className="px-5 py-3 border-b border-gray-100 bg-white text-sm text-center">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-flex items-center px-3 py-1 font-semibold text-yellow-900 leading-tight transition duration-150 transform hover:scale-105"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full shadow-md"
          ></span>
          <span className="relative flex items-center">
            <FaEdit className="mr-1 text-sm" /> Update Role
          </span>
        </span>

        {/* Modal */}
        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
