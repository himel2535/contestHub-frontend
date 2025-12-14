// src/components/Home/WhyChooseUs.jsx

import React from "react";
import {
  FaBalanceScale,
  FaLock,
  FaGlobe,
  FaMoneyBillAlt,
} from "react-icons/fa";
import Container from "../Shared/Container";

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
    <section className="py-12 bg-white dark:bg-gray-900">
      <Container>
        <section className="">
          {/* Header */}
          <div
            className="text-center mb-12"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h2 className="text-2xl sm:text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-3 inline-block border-b-4 border-yellow-500 pb-2">
              Why Choose Us?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We make contest hosting and participation safe, transparent, and
              rewarding. Experience a platform that celebrates talent and
              ensures fairness every step of the way.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlightsData.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-yellow-500"
              >
                <div className={`text-5xl mb-4 ${item.color}`}>
                  <item.icon className="mx-auto lg:mx-0" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
