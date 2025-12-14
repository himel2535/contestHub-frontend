import React from "react";
import { FaTrophy, FaHandshake, FaBullseye, FaCode } from "react-icons/fa";
import Container from "../../components/Shared/Container";

const AboutUs = () => {
  return (
    <Container>
      <div className="py-8 overflow-hidden">

        {/* --- Page Heading --- */}
        <div className="text-center mb-16" data-aos="fade-down">
          <div className="inline-block border-b-4 border-yellow-500 pb-2">
            {/* Small devices: icon above */}
            <div className="block md:hidden mb-2">
              <FaTrophy className="text-yellow-500 text-4xl mx-auto" />
            </div>
            <h2 className="text-3xl  md:text-4xl font-extrabold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-3 md:flex-row flex-col">
              {/* Large devices: icon inline */}
              <span className="hidden md:flex">
                <FaTrophy className="text-yellow-500 text-4xl mr-3" />
              </span>
              Discover Our Mission
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Learn about the platform dedicated to skill, challenge, and creativity.
          </p>
        </div>

        {/* --- Core Value Proposition --- */}
        <div
          className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border-t-4 border-yellow-500 mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-xl  md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-center gap-2 md:gap-3">
  
            Contest Hub: Where Talent Meets Opportunity
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg text-center max-w-4xl mx-auto leading-relaxed">
            Our platform is designed to be the ultimate arena for creative professionals and passionate enthusiasts. We connect talented participants with visionary creators, fostering a dynamic ecosystem where skills are honed, innovative ideas are born, and success is rewarded.
          </p>
        </div>

        {/* --- Mission, Vision, Core Values --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center mb-16">
          {/* Mission */}
          <div
            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <FaBullseye className="text-5xl sm:text-6xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              To provide a fair, transparent, and exciting platform that challenges skills across various categories and rewards the best talent globally.
            </p>
          </div>

          {/* Vision */}
          <div
            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <FaHandshake className="text-5xl sm:text-6xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              To become the world's leading community for contest creation and participation, driving innovation through competition.
            </p>
          </div>

          {/* Core Values */}
          <div
            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <FaCode className="text-5xl sm:text-6xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Core Values
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Fairness, Transparency, Innovation, and Community Spirit guide every contest and every interaction on our platform.
            </p>
          </div>
        </div>

        {/* --- Contest Participants & Creators Benefits --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Participants */}
          <div
            className="p-6 md:p-8 bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-lg border-l-8 border-yellow-500 dark:border-yellow-400"
            data-aos="fade-right"
          >
            <h4 className="text-2xl sm:text-3xl font-extrabold text-yellow-700 dark:text-yellow-300 mb-4">
              For Participants: Grow Your Skill
            </h4>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc pl-5 text-base sm:text-lg leading-relaxed">
              <li>Diverse Challenges: Access contests across categories like coding, design, photography, and writing.</li>
              <li>Real Prizes: Win substantial monetary rewards and recognition.</li>
              <li>Portfolio Builder: Showcase your victories to boost your professional portfolio.</li>
              <li>Skill Mastery: Learn and improve by competing against the best in the community.</li>
            </ul>
          </div>

          {/* Creators */}
          <div
            className="p-6 md:p-8 bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-lg border-l-8 border-yellow-500 dark:border-yellow-400"
            data-aos="fade-left"
          >
            <h4 className="text-2xl sm:text-3xl font-extrabold text-yellow-700 dark:text-yellow-300 mb-4">
              For Creators: Find Your Solution
            </h4>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc pl-5 text-base sm:text-lg leading-relaxed">
              <li>Global Talent Pool: Tap into a worldwide network of skilled competitors.</li>
              <li>Cost-Effective Solutions: Get unique, high-quality results without hiring a full-time team.</li>
              <li>Dedicated Management: Tools to easily manage submissions, select winners, and manage payments.</li>
              <li>Quick Turnaround: Efficient contest lifecycle ensures you get results fast.</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
