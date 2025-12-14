// MenuItem.jsx
import { NavLink } from 'react-router';

// eslint-disable-next-line no-unused-vars
const MenuItem = ({ label, address, icon: Icon, resolvedTheme }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) => `
        flex items-center px-4 py-2 my-2 rounded-lg transition-colors duration-300
        ${isActive
          ? resolvedTheme === 'dark'
            ? 'bg-gray-700 text-white'
            : 'bg-gray-300 text-gray-900'
          : resolvedTheme === 'dark'
            ? 'text-gray-200 hover:bg-gray-700 hover:text-white'
            : 'text-gray-800 hover:bg-gray-200 hover:text-gray-900'
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-3 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
