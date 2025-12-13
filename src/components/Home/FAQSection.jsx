// src/components/Home/FAQSection.jsx

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Container from "../Shared/Container"; // Import your Container component

const faqData = [
  {
    question: "What is the process for participating in a contest?",
    answer:
      "First, select your preferred contest. Then, pay the registration fee and submit your task from your user dashboard before the deadline.",
  },
  {
    question: "How can I ensure the judging process is fair?",
    answer:
      "Our panel consists of experienced, independent judges. The entire process is managed transparently, and all contest status updates are publicly available.",
  },
  {
    question: "When will I receive my prize money if I win?",
    answer:
      "We utilize 'Instant Payout' functionality through Stripe to swiftly transfer the prize money to your linked account immediately after the winner declaration.",
  },
  {
    question:
      "Am I allowed to participate in multiple contests simultaneously?",
    answer:
      "Yes, you can participate in as many contests as you like, provided you meet the entry requirements and pay the separate registration fee for each one.",
  },
];

// --- Sub-Component: FAQ Item (Accordion) ---
const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg text-gray-700 hover:text-yellow-600 transition duration-150"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        {faq.question}
        {isOpen ? (
          <FaChevronUp className="w-4 h-4 text-yellow-500" />
        ) : (
          <FaChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {/* Conditional rendering and simple animation for the answer */}
      {isOpen && (
        <div className="pb-4 pt-2 text-gray-600 text-base leading-relaxed transition-all duration-300 ease-in-out">
          {/* Note: Tailwind doesn't have a direct 'animate-fadeIn'. You'd typically use CSS keyframes or transition group library for smooth height/opacity changes in a production app. */}
          {faq.answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    // Toggles the item open/closed
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to the most common questions about our platform.
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                toggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FAQSection;
