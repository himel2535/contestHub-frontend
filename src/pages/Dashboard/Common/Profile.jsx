
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/contestBanner00.jpg";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaUser, FaEnvelope, FaIdCardAlt, FaKey, FaCrown } from "react-icons/fa";

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

  const HeadingIcon = FaUser;

  return (

    <div className="flex flex-col items-center py-8 md:py-12 px-4 min-h-screen dark:bg-gray-900">
      

      <div
        className="text-center mb-10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 inline-flex items-center border-b-4 border-yellow-500 pb-2"
        >
          <HeadingIcon className="mr-2 text-yellow-600 text-2xl sm:text-3xl flex-shrink-0" />
          <span className="">
            <span>My Account Profile</span>
          </span>
        </h2>
      </div>

      {/* 💡 Profile Card with AOS Animation */}
      <div
        className="bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-700/50 rounded-2xl w-full max-w-4xl overflow-hidden"
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
        </div>

        {/* Profile Content */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 -mt-16">
          
          {/* 1. Profile Picture */}
          <div
            className="relative block"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              alt="profile"
              src={userPhoto}
              className="mx-auto object-cover rounded-full h-32 w-32 border-4 border-white dark:border-gray-800 shadow-xl"
            />
          </div>

          {/* 2. নতুন রোল ব্যাজ (ছবির নিচে) */}
          <p
            className="mt-4 p-2 px-6 text-base font-bold text-white bg-yellow-600 rounded-full shadow-lg capitalize"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <FaCrown className="inline-block mr-2 text-xl" />
            {role}
          </p>

          {/* 3. Info Grid */}
          <div className="w-full p-2 mt-8 md:mt-10 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
              
              {/* Name */}
     
              <div
                className="flex flex-col items-center md:items-start"
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                  <FaUser className="mr-2 text-yellow-600" /> Name
                </p>
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {userDisplayName}
                </span>
              </div>

              {/* Email */}

              <div
                className="flex flex-col items-center md:items-start"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                  <FaEnvelope className="mr-2 text-yellow-600" /> Email
                </p>
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {userEmail}
                </span>
              </div>

              <div
                className="flex flex-col items-center md:items-start"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                  <FaIdCardAlt className="mr-2 text-yellow-600" /> User ID
                </p>

                <span className="font-bold text-lg text-gray-900 dark:text-gray-100 break-all">
                  {user?.uid.substring(0, 15)}...
                </span>
              </div>

            </div>


            <div className="mt-6">
                 {/* This section can be used for extra information if needed, or left empty */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;