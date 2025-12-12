import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const ParticipantRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "participant") return children;
  return <Navigate to="/" replace="true" />;
};

export default ParticipantRoute;
