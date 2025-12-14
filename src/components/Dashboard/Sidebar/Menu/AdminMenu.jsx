import { FaUserCog, FaUserTag } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = ({ resolvedTheme }) => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label="Manage Users"
        address="manage-users"
        resolvedTheme={resolvedTheme}
      />
      <MenuItem
        icon={FaUserTag}
        label="Manage Contests"
        address="manage-contests"
        resolvedTheme={resolvedTheme}
      />
      <MenuItem
        icon={FaUserTag}
        label="Creator Requests"
        address="creator-requests"
        resolvedTheme={resolvedTheme}
      />
      <MenuItem
        icon={FaUserTag}
        label="Contact Messages"
        address="contact-messages"
        resolvedTheme={resolvedTheme}
      />
    </>
  );
};

export default AdminMenu;
