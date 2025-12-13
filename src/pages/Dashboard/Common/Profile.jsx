

import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/cover.jpg";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaUser, FaEnvelope, FaIdCardAlt, FaEdit, FaKey } from "react-icons/fa"; 

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  // Fallback values
  const userDisplayName = user?.displayName || "N/A";
  const userEmail = user?.email || "N/A";
  const userPhoto = user?.photoURL || "https://via.placeholder.com/150";

  return (
    <div className="flex justify-center items-center py-12 md:py-20 px-4 min-h-screen">
      {/* 💡 Profile Card with AOS Animation */}
      <div
        className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* Cover Photo */}
        <div className="relative">
          <img
            alt="cover photo"
            src={coverImg}
            className="w-full h-48 md:h-64 object-cover"
          />
          {/* Role Badge on Cover */}
          <p className="absolute top-4 right-4 p-2 px-4 text-sm font-semibold text-white bg-yellow-600 rounded-full shadow-lg capitalize">
            {role}
          </p>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 -mt-16">
          {/* Profile Picture */}
          <div
            className="relative block"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              alt="profile"
              src={userPhoto}
              className="mx-auto object-cover rounded-full h-32 w-32 border-4 border-white shadow-xl"
            />
          </div>

          {/* User ID */}
          <p
            className="mt-4 text-lg font-medium text-gray-700 flex items-center"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <FaIdCardAlt className="mr-2 text-yellow-600" />
            User ID:{" "}
            <span className="font-semibold text-gray-900 ml-1">
              {user?.uid.substring(0, 15)}...
            </span>
          </p>

          {/* Info Grid */}
          <div className="w-full p-2 mt-8 md:mt-10 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm text-gray-600 border-b pb-6 mb-6">
              {/* Name */}
              <div
                className="flex flex-col items-center md:items-start"
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FaUser className="mr-2 text-yellow-600" /> Name
                </p>
                <span className="font-bold text-lg text-gray-900 ">
                  {userDisplayName}
                </span>
              </div>

              {/* Email */}
              <div
                className="flex flex-col items-center md:items-start"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FaEnvelope className="mr-2 text-yellow-600" /> Email
                </p>
                <span className="font-bold text-lg text-gray-900 ">
                  {userEmail}
                </span>
              </div>

              {/* Role (for mobile view, already on cover for desktop) */}
              <div
                className="flex flex-col items-center md:items-start md:hidden"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FaIdCardAlt className="mr-2 text-yellow-600" /> Role
                </p>
                <span className="font-bold text-lg text-gray-900 capitalize">
                  {role}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="w-full sm:w-auto bg-yellow-600 px-8 py-3 rounded-lg text-white font-semibold cursor-pointer hover:bg-yellow-700 transition duration-300 flex items-center justify-center shadow-md"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                <FaEdit className="mr-2" /> Update Profile
              </button>

              <button
                className="w-full sm:w-auto bg-gray-700 px-8 py-3 rounded-lg text-white font-semibold cursor-pointer hover:bg-gray-800 transition duration-300 flex items-center justify-center shadow-md"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                <FaKey className="mr-2" /> Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
