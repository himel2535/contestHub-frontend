import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router'; 
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const BANNER_IMAGE = 'https://i.ibb.co.com/TqmycGR8/IMG-20251215-WA0002.jpg'; 


const textContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05, // প্রতি অক্ষরের মধ্যে ব্যবধান
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

// 2. কন্টেন্টের অন্যান্য আইটেমের জন্য ফেড-ইন ভ্যারিয়েন্ট (ডিলে যুক্ত)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.5, // অক্ষরের অ্যানিমেশন শেষ হওয়ার পর শুরু হবে
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

// লেখাটিকে অক্ষরের অ্যারেতে ভাগ করার ফাংশন
const splitText = (text) => text.split("").map((char, index) => (
  <motion.span key={index} variants={textItemVariants}>
    {char === ' ' ? '\u00A0' : char} {/* ফাঁকা স্থানগুলির জন্য নন-ব্রেকিং স্পেস */}
  </motion.span>
));


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
  
  const tags = ['Design', 'Programming', 'Writing', 'Gaming'];

  return (
    <div className="relative -mt-16 h-[60vh] md:h-[75vh] w-full overflow-hidden z-0 "> 
      
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out hover:scale-105 "
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      >  
        {/* ব্ল্যাক ওভারলে (ইমেজ পরিষ্কার না থাকলে বা ডার্ক ইফেক্টের জন্য) */}
        <div className="absolute inset-0 bg-black opacity-60"></div> 
      </div>


      {/* কন্টেন্ট যা অ্যানিমেট হবে */}
      <div className="relative flex flex-col items-center justify-center h-full text-white px-4"> 
        
        {/* 1. মেইন হেডিং (লেটার-বাই-লেটার) */}
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold text-center mb-4 text-white leading-tight flex flex-wrap justify-center overflow-hidden"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {splitText('Unleash Your ')}
          <span className="text-yellow-400 inline-block">
            {splitText('Creativity')}
          </span>
        </motion.h1>
        
        {/* 2. অন্যান্য কন্টেন্ট (একসাথে ফেড-ইন হবে) */}
        <motion.div
          className="flex flex-col items-center justify-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            {/* সাব-হেডিং */}
            <motion.p 
                className="text-lg md:text-xl text-center max-w-2xl mb-10 font-light opacity-80"
                variants={itemVariants}
            >
                Find and participate in the world's most exciting contests. Coding, Tech, Design, and more.
            </motion.p>

            {/* সার্চ ফর্ম (গোল্ডেন আউটলাইন ইফেক্ট) */}
            <motion.form onSubmit={handleSearch} className="w-full max-w-xl" variants={itemVariants}>
              <div 
                className="relative flex items-center bg-white rounded-full p-1 shadow-2xl transition-all duration-300"
                // উজ্জ্বল গোল্ডেন আউটলাইন ইফেক্ট যুক্ত করা হলো
                style={{ 
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 215, 0, 0.7)' // সাদা ও গোল্ডেন গ্লো
                }}
              >

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
            </motion.form>
            

            {/* ট্যাগ বাটন (গোল্ডেন আউটলাইন ইফেক্ট) */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
                {tags.map((tag, index) => (
                    <motion.span 
                      key={index}
                      onClick={() => handleTagSearch(tag)} 
                      className="text-sm font-semibold px-4 py-2 bg-black/30 text-yellow-200 rounded-full cursor-pointer transition"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)' }} 
                      whileTap={{ scale: 0.95 }}
                  
                      style={{ 
                          border: '1px solid rgba(255, 215, 0, 0.5)',
                          textShadow: '0 0 5px rgba(255, 215, 0, 0.8)', 
                          boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)'
                      }}
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default ContestBanner;