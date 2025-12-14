// ParticipantMenu.jsx (আপডেট করা কোড)
import { BsFillPersonCheckFill, BsTrophyFill, BsPerson } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import MenuItem from './MenuItem';
import { useState, useEffect } from 'react';
import BecomeCreatorModal from '../../../Modal/BecomeCreatorModal';

const ParticipantMenu = ({ resolvedTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <MenuItem icon={BsFillPersonCheckFill} label="My Participated Contests" address="my-participated-contests" resolvedTheme={resolvedTheme} />
      <MenuItem icon={BsTrophyFill} label="My Winning Contests" address="my-winning-contests" resolvedTheme={resolvedTheme} />
      <MenuItem icon={BsPerson} label="My Profile" address="my-profile" resolvedTheme={resolvedTheme} />

      <div
        onClick={() => setIsOpen(true)}
       
        className={`flex items-center px-4 py-2 mt-5 rounded-md transition-colors duration-300 cursor-pointer
          ${resolvedTheme === 'dark' 
            ? ' text-gray-200  hover:text-white' 
            : ' text-gray-800  hover:text-white'
          }`}
      >
        <GrUserAdmin className="w-5 h-5" />
        <span className="ml-3 font-medium">Become A Contest Creator</span>
      </div>

      <BecomeCreatorModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default ParticipantMenu;