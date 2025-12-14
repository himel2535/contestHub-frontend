// Sidebar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import logo4 from '../../../assets/images/logo4.png';

// Icons
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';

// Menu Components
import MenuItem from './Menu/MenuItem';
import AdminMenu from './Menu/AdminMenu';
import CreatorMenu from './Menu/CreatorMenu';
import ParticipantMenu from './Menu/ParticipantMenu';

// Hooks and Shared Components
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const Sidebar = ({ currentTheme }) => { 
  const { logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [role, isRoleLoading] = useRole();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
  if (isRoleLoading) return <LoadingSpinner />;

  const handleToggle = () => setIsActive(!isActive);


  const baseBg = currentTheme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800';

  return (
    <>
      {/* 🧭 Mobile Top Bar */}
      <div className={`flex justify-between items-center md:hidden ${baseBg} shadow-md`}>
        <Link to="/" className="p-4">
          <img src={logo4} alt="logo" width="100" height="100" />
        </Link>
        <button onClick={handleToggle} className="p-4 focus:outline-none">
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/*  Sidebar */}
      <div className={`z-40 md:fixed flex flex-col justify-between ${baseBg} w-64 h-full px-3 py-4 space-y-6
        absolute inset-y-0 left-0 transform ${isActive ? '-translate-x-full' : 'translate-x-0'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>

        {/* Logo */}
        <div className="hidden md:flex justify-center items-center py-3 bg-yellow-100 dark:bg-gray-800 rounded-lg shadow">
          <Link to="/">
            <img src={logo4} alt="logo" width="100" height="100" />
          </Link>
        </div>

        {/* Menu (Role-based navigation) */}
        <nav className="flex-1 mt-6 space-y-1">
          <MenuItem 
            icon={BsGraphUp} 
            label="Statistics" 
            address="/dashboard" 
            resolvedTheme={currentTheme} 
          />
          {role === 'participant' && <ParticipantMenu resolvedTheme={currentTheme} />} 
          {role === 'contestCreator' && <CreatorMenu resolvedTheme={currentTheme} />}    
          {role === 'admin' && <AdminMenu resolvedTheme={currentTheme} />}             
        </nav>

        {/* Bottom Section (Profile and Logout) */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
          <MenuItem 
            icon={FcSettings} 
            label="Profile" 
            address="/dashboard/profile" 
            resolvedTheme={currentTheme} 
          />
          <button
            onClick={logOut}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200
              ${currentTheme === 'dark' ? 'text-gray-200 hover:bg-gray-700 hover:text-white' : 'text-gray-800 hover:bg-gray-200 hover:text-gray-900'}`}>
            <GrLogout className="w-5 h-5" />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;