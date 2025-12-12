import { FaUserCog,FaUserTag  } from 'react-icons/fa'
import MenuItem from './MenuItem'



const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserTag} label='Manage Contests' address='manage-contests' />
      <MenuItem icon={FaUserTag} label='Creator Requests' address='creator-requests' />
    </>
  )
}

export default AdminMenu
