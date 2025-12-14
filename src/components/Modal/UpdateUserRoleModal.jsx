import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

import toast from "react-hot-toast";
import { FaUserShield, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateUserRoleModal = ({ isOpen, closeModal, refetch, user }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role);

  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: user?.email,
        role: updatedRole,
      });
      toast.success("Successfully Role Updated");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update role");
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={closeModal}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl dark:shadow-gray-700/50 border-t-4 border-yellow-500"
              data-aos="zoom-in"
            >
              <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <FaUserShield className="text-3xl text-yellow-600 mr-3" />
                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Update User Role
                  </DialogTitle>
                </div>
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="p-1 text-gray-400 dark:text-gray-400 hover:text-red-600 transition"
                >
                  <FaTimes />
                </button>
              </div>

              <form className="mt-4">
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select New Role for{" "}
                    <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                      {user?.name}
                    </span>
                    :
                  </label>
                  <select
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 dark:text-gray-100 shadow-sm transition duration-150"
                    name="role"
                    id="role"
                  >
                    <option className="dark:bg-gray-800" value="participant">
                      Participant
                    </option>
                    <option className="dark:bg-gray-800" value="contestCreator">
                      Contest Creator
                    </option>
                    <option className="dark:bg-gray-800" value="admin">
                      Admin
                    </option>
                  </select>
                </div>

                <div className="flex mt-6 justify-end space-x-3">
                  {/* Update Button (Yellow Theme - remains bright) */}
                  <button
                    onClick={handleRoleUpdate}
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 transition duration-150"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition duration-150"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateUserRoleModal;
