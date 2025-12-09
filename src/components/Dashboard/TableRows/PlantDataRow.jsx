// src/components/Dashboard/TableRows/PlantDataRow.jsx

import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import UpdatePlantModal from "../../Modal/UpdatePlantModal";

import { Link } from 'react-router'; 
import axios from "axios";
import toast from "react-hot-toast";

const PlantDataRow = ({ contest, refetch }) => {

  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Delete Modal Handlers
  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  // ---delete---
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/contests-delete/${contest._id}`
      );
      toast.success("Contest deleted!");
      refetch && refetch(); 
      closeDeleteModal(); 
    } catch (err) {
      toast.error("Failed to delete contest!");
      console.log(err);
    }
  };

  return (
    <tr>
      {/* Image */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="Contest Banner"
                src={contest.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      
      {/* Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{contest.name}</p>
      </td>
      
      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{contest.status}</p>
      </td>

      {/* 💡 Submissions Link */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link 
        contestName={contest.name}
          to={`/dashboard/contest-submissions/${contest._id}`} 
          className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
          ></span>
          <span className="relative text-blue-900 hover:text-blue-700">View Submissions</span>
        </Link>
      </td>
      
      {/* Delete Button */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={openDeleteModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          handleDelete={handleDelete}
          isOpen={isDeleteOpen}
          closeModal={closeDeleteModal}
        />
      </td>
      
      {/* Update Button */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdatePlantModal
          contest={contest}
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default PlantDataRow;