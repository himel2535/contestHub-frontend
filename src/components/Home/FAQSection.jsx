import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Container from "../Shared/Container";

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "What is the process for participating in a contest?",
    answer:
      "First, select your preferred contest. Then, pay the registration fee and submit your task from your user dashboard before the deadline.",
  },
  {
    id: 2,
    question: "How can I ensure the judging process is fair?",
    answer:
      "Our panel consists of experienced, independent judges. The entire process is managed transparently, and all contest status updates are publicly available.",
  },
  {
    id: 3,
    question: "When will I receive my prize money if I win?",
    answer:
      "We utilize 'Instant Payout' functionality through Stripe to swiftly transfer the prize money to your linked account immediately after the winner declaration.",
  },
  {
    id: 4,
    question: "Am I allowed to participate in multiple contests simultaneously?",
    answer:
      "Yes, you can participate in as many contests as you like, provided you meet the entry requirements and pay the separate registration fee for each one.",
  },
];

// Sub Component: FAQ Item
const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg text-gray-700 hover:text-yellow-600 transition duration-150"
      >
        {faq.question}
        {isOpen ? (
          <FaChevronUp className="w-4 h-4 text-yellow-500" />
        ) : (
          <FaChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="pb-4 pt-2 text-gray-600 text-base leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Container>
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div
            className="text-center mb-12"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to the most common questions about our platform.
            </p>
          </div>

          {/* FAQ List */}
          <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl">
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-easing="ease-in-out"
              >
                <FAQItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  toggle={() => toggle(faq.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FAQSection;
