import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa'; // Added FaGithub and FaEnvelope
import logo from "../../../assets/images/Screen_Shot_2025-12-15_at_3.48.31_PM-removebg-preview.png"

const Footer = () => {
  // Define all social and contact links for mapping
  const contactLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/' }, // Replace with actual links
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/' }, // Replace with actual links
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/yourusername' }, // Added GitHub
    { name: 'Email', icon: FaEnvelope, href: 'mailto:info@contesthub.com' }, // Added Email (using mailto)
  ];

  return (
    <footer className=' py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 '>
      <div className='max-w-7xl mx-auto'>
        
        {/* Top Row: Logo/Name on Left, Social/Contact Links on Right */}
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0'>

          {/* 1. Logo and Website Name (Images are usually vertically centered by 'items-center') */}
          <div className='flex items-center space-x-3'>

            {/* <svg
              className="w-8 h-8 text-yellow-500"
              // ... SVG code
            </svg> */}
            {/* <span className='text-2xl font-bold tracking-wider text-gray-900 dark:text-white'>
              ContestHub
            </span> */}
            
            {/* --- FIX APPLIED HERE: Adjusting Logo Size for better Alignment --- */}
            {/* 'h-12' (3rem) একটি স্ট্যান্ডার্ড ফুটার লোগোর উচ্চতা, 'w-auto' Aspect Ratio ঠিক রাখবে */}
            <img 
              src={logo} 
              alt="ContestHub Logo" 
              className="h-16 -mt-3 w-auto" 
            /> 
            {/* --- END FIX --- */}
            
          </div>

          {/* 2. Social & Contact Links */}
          <div className='flex items-center space-x-6'>
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                target={link.name !== 'Email' ? "_blank" : "_self"} 
                rel={link.name !== 'Email' ? "noopener noreferrer" : undefined}
                className='text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200'
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

        </div>

        {/* Horizontal Rule/Separator */}
        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        {/* 3. Copyright Info */}
        <div className='text-sm text-center text-gray-500 dark:text-gray-400'>
          &copy; 2025 ContestHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;