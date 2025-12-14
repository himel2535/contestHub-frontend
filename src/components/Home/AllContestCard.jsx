import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const AllContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { _id, name, image, description, participantsCount, category } =
    contest;

  const shortDesc =
    description?.length > 40
      ? description.slice(0, 40) + "..."
      : description;

  const handleDetails = () => {
    if (!user) return navigate("/login");
    navigate(`/contest/${_id}`);
  };

  return (
    <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 ">
      
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 text-gray-800 dark:text-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">{name}</h2>

        <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
          {category}
        </p>

        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Participants: {participantsCount}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {shortDesc}
        </p>

        <button
          onClick={handleDetails}
          className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition font-semibold"
        >
          Details →
        </button>
      </div>
    </div>
  );
};

export default AllContestCard;
