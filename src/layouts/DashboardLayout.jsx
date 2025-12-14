// DashboardLayout.jsx
import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DashboardLayout = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen md:flex
      ${resolvedTheme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <Sidebar resolvedTheme={resolvedTheme} />
      <div className='flex-1 md:ml-64'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
