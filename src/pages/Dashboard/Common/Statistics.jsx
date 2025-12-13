import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import CreatorStatistics from "../../../components/Dashboard/Statistics/CreatorStatistics";
import ParticipantStatistics from "../../../components/Dashboard/Statistics/ParticipantStatistics";

import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";
const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      {role === "admin" && <AdminStatistics />}
      {role === "contestCreator" && <CreatorStatistics />}
      {role === "participant" && <ParticipantStatistics />}
    </div>
  );
};

export default Statistics;
