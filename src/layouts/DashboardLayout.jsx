// DashboardLayout.jsx
import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme'; // আপনার কাস্টম হুক

const DashboardLayout = () => {
  // কাস্টম হুক থেকে থিম স্টেট নিন
  const { theme } = useTheme(); 
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen md:flex
      ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      

      <Sidebar currentTheme={theme} /> 
      
      <div className='flex-1 md:ml-64'>
        <div className='p-2 md:p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;