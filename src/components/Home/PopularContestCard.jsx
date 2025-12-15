import { useNavigate } from "react-router"; // Assumed fix for react-router-dom
import useAuth from "../../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 

const PopularContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { _id, image, name, participantsCount, description } = contest;

  const shortDesc =
    description?.length > 40
      ? description.slice(0, 40) + "..."
      : description;

  const handleDetails = () => {
    if (!user) return navigate("/login");
    navigate(`/contest/${_id}`);
  };

  return (

    <div 
      className="rounded-2xl shadow-lg shadow-tag-glow hover:shadow-golden-glow transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 text-gray-800 dark:text-gray-200">
        

        <div className="h-14 overflow-hidden">
            <h3 
                className="text-lg sm:text-xl font-semibold text-shadow-sm dark:text-yellow-400 line-clamp-2"
                title={name}
            >
                {name}
            </h3>
        </div>
        
        {/* FIX 2: Description - নির্দিষ্ট হাইট (h-10) সেট করা হলো যেন কার্ডের মোট উচ্চতা ঠিক থাকে */}
        <div className="h-10 overflow-hidden text-sm text-gray-600 dark:text-gray-400">
            <p>
              {shortDesc}
            </p>
        </div>


        <p className="font-semibold mt-1 text-yellow-500 dark:text-yellow-400 text-shadow-golden">
          Participants: {participantsCount}
        </p>

        <button
          onClick={handleDetails}
          className="mt-3 w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition font-semibold shadow-tag-glow hover:shadow-golden-glow"
        >
          Details →
        </button>
      </div>
    </div>
  );
};

export default PopularContestCard;