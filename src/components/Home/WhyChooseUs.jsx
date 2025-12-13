// src/components/Home/WhyChooseUs.jsx

import React from "react";
import {
  FaBalanceScale,
  FaLock,
  FaGlobe,
  FaMoneyBillAlt,
} from "react-icons/fa";
import Container from "../Shared/Container"; // Import your Container component

const highlightsData = [
  {
    icon: FaBalanceScale,
    title: "Fair Judging",
    description:
      "We ensure transparent evaluation by experienced and independent judges, guaranteeing a level playing field for every participant.",
    color: "text-blue-500",
  },
  {
    icon: FaLock,
    title: "Secure Payment",
    description:
      "All your transactions are handled through trusted gateways like Stripe, ensuring quick, safe, and hassle-free payments.",
    color: "text-green-500",
  },
  {
    icon: FaGlobe,
    title: "Global Community",
    description:
      "Connect with creative talents from around the world and showcase your work on an international stage to gain recognition.",
    color: "text-yellow-500",
  },
  {
    icon: FaMoneyBillAlt,
    title: "Instant Payout",
    description:
      "Once the winner is declared, receive your prize money quickly and seamlessly, with no delays in the payment process.",
    color: "text-red-500",
  },
];

const WhyChooseUs = () => {
  return (
    <Container>
      <section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make contest hosting and participation safe, transparent, and
            rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlightsData.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-yellow-500"
            >
              <div className={`text-5xl mb-4 ${item.color}`}>
                <item.icon className="mx-auto lg:mx-0" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default WhyChooseUs;
