import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const PopularContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { _id, image, name, participantsCount, description } = contest;

  // description short
  const shortDesc = description.slice(0, 20) + "...";

  const handleDetails = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate(`/contest/${_id}`);
  };

  return (
    <div className="rounded-xl shadow-xl hover:shadow-2xl transition bg-white overflow-hidden">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 duration-300"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{name}</h3>

        <p className="text-gray-600 text-sm">{shortDesc}</p>

        <p className="font-semibold mt-1 text-yellow-600">
          Participants: {participantsCount}
        </p>

        <button
          onClick={handleDetails}
          className="mt-3 w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white py-2 rounded-lg transition"
        >
          Details →
        </button>
      </div>
    </div>
  );
};

export default PopularContestCard;
