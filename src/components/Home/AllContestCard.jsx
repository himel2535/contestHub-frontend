import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const AllContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { _id, name, image, description, participantsCount, category } =
    contest;

  const shortDesc = description.slice(0, 20) + "...";

  const handleDetails = () => {
    if (!user) return navigate("/login");
    navigate(`/contest/${_id}`);
  };

  return (
    <div className="rounded-xl shadow-xl hover:shadow-2xl transition bg-white overflow-hidden">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 duration-300"
        />
      </div>

      <div className="p-4 space-y-2">

        <h2 className="text-xl font-bold">{name}</h2>

        <p className="text-sm font-semibold text-lime-600">{category}</p>
        
        <p className="text-sm font-semibold">
          Participants: {participantsCount}
        </p>

        <p className="text-sm text-gray-600">{shortDesc}</p>

        <button
          onClick={handleDetails}
          className="w-full mt-3 bg-lime-500 cursor-pointer hover:bg-lime-600 text-white py-2 rounded-lg transition"
        >
          Details →
        </button>
      </div>
    </div>
  );
};

export default AllContestCard;
