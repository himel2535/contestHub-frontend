import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { useSearchParams } from 'react-router'; 


// const BANNER_IMAGE = 'https://i.ibb.co.com/xKVrfWmg/Screen-Shot-2025-12-15-at-4-11-38-AM.png'; 

const BANNER_IMAGE = 'https://i.ibb.co.com/TqmycGR8/IMG-20251215-WA0002.jpg'; 

const ContestBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      searchParams.set('type', trimmedQuery);
      setSearchParams(searchParams); 
      setSearchQuery(''); 
    }
  };

  const handleTagSearch = (tag) => {
    searchParams.set('type', tag);
    setSearchParams(searchParams);
  };

  
  return (

    <div className="relative -mt-16 h-[60vh] md:h-[75vh] w-full overflow-hidden z-0 "> 
      
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out hover:scale-105 "
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> 
      </div>


      <div className="relative flex flex-col items-center justify-center h-full text-white px-4"> 
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 text-white leading-tight">
          Unleash Your <span className="text-yellow-400">Creativity</span>
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl mb-10 font-light opacity-80">
          Find and participate in the world's most exciting contests. Coding, Tech, Design, and more.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-xl">
          <div className="relative flex items-center bg-white rounded-full p-1 shadow-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-yellow-500/50">

            <input
              type="text"
              placeholder="Search by Contest Type (e.g., Photography, Coding, Design)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          
              className="w-full py-3 pl-6 pr-14 text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none text-base md:text-lg"
              aria-label="Search contests"
            />
            
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
              aria-label="Start search"
            >
              <FaSearch className="text-xl" />
            </button>
          </div>
        </form>
        

        <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span 
              onClick={() => handleTagSearch('Design')} 
              className="text-xs font-semibold px-3 py-1 bg-yellow-500/30 text-yellow-200 rounded-full cursor-pointer hover:bg-yellow-500/50 transition"
            >Design</span>
            <span 
              onClick={() => handleTagSearch('Programming')} 
              className="text-xs font-semibold px-3 py-1 bg-yellow-500/30 text-yellow-200 rounded-full cursor-pointer hover:bg-yellow-500/50 transition"
            >Programming</span>
            <span 
              onClick={() => handleTagSearch('Writing')} 
              className="text-xs font-semibold px-3 py-1 bg-yellow-500/30 text-yellow-200 rounded-full cursor-pointer hover:bg-yellow-500/50 transition"
            >Writing</span>
            <span 
              onClick={() => handleTagSearch('Gaming')} 
              className="text-xs font-semibold px-3 py-1 bg-yellow-500/30 text-yellow-200 rounded-full cursor-pointer hover:bg-yellow-500/50 transition"
            >Gaming</span>
        </div>
        
      </div>
    </div>
  );
};

export default ContestBanner;