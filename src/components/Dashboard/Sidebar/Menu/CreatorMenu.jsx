import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";

// 💡 ফিক্স: resolvedTheme প্রপস গ্রহণ করা হচ্ছে
const CreatorMenu = ({ resolvedTheme }) => { 
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Contest"
        address="add-contest"
        resolvedTheme={resolvedTheme} // 💡 MenuItem এ পাস করা হলো
      />
      <MenuItem 
        icon={MdHomeWork} 
        label="My Inventory" 
        address="my-inventory" 
        resolvedTheme={resolvedTheme} // 💡 MenuItem এ পাস করা হলো
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Submissions"
        address="manage-submissions"
        resolvedTheme={resolvedTheme} 
      />
    </>
  );
};

export default CreatorMenu;