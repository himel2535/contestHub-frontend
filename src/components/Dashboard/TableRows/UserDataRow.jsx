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
      // 💡 ডার্ক মোড হোভার ফিক্স
      className="hover:bg-yellow-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* 1. Image */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center"
      >
        <div className="flex items-center justify-center">
          <img
            alt={user?.name}
            src={user?.image}
            // 💡 ডার্ক মোড বর্ডার
            className="object-cover rounded-full h-10 w-10 border border-gray-200 dark:border-gray-600 shadow-sm"
          />
        </div>
      </td>

      {/* 2. Name */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড, বর্ডার এবং টেক্সট
        className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <p className="text-gray-900 dark:text-gray-100 font-medium">{user?.name}</p>
      </td>

      {/* 3. Email */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড, বর্ডার এবং টেক্সট
        className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <p className="text-gray-600 dark:text-gray-400 font-light">{user?.email}</p>
      </td>

      {/* 4. Role */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      >
        <p
          // 💡 ডার্ক মোড রোলের জন্য টেক্সট কালার ফিক্স
          className={`font-semibold capitalize ${
            isCurrentUserAdmin 
              ? "text-red-600 dark:text-red-400" 
              : "text-yellow-600 dark:text-yellow-400"
          }`}
        >
          {user?.role}
        </p>
      </td>

      {/* 5. Action */}
      <td 
        // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড এবং বর্ডার
        className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center"
      >
        <span
          onClick={() => setIsOpen(true)}
          // 💡 ডার্ক মোড টেক্সট এবং হোভারের জন্য ফিক্স
          className="relative cursor-pointer inline-flex items-center px-3 py-1 font-semibold text-yellow-900 dark:text-yellow-200 leading-tight transition duration-150 transform hover:scale-105"
        >
          <span
            aria-hidden="true"
            // 💡 ডার্ক মোড ব্যাকগ্রাউন্ড ফিক্স
            className="absolute inset-0 bg-yellow-200 dark:bg-yellow-700 opacity-50 rounded-full shadow-md"
          ></span>
          <span className="relative flex items-center">
            <FaEdit className="mr-1 text-sm" /> Update Role
          </span>
        </span>

        {/* Modal (Modal content should be fixed in UpdateUserRoleModal component) */}
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