// src/components/Home/UserTestimonials.jsx

import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Container from "../Shared/Container";

const testimonialData = [
  {
    id: 1,
    review:
      "The platform's fair judging process is truly commendable. I felt completely confident that my work was evaluated impartially. Winning my first contest here was an amazing experience!",
    name: "Abdur Rahman",
    title: "Digital Artist",
    photo:
      "https://i.ibb.co.com/VWxBMgZd/oguz-yagiz-kara-MZf0m-I14-RI0-unsplash.jpg",
    rating: 5,
  },
  {
    id: 2,
    review:
      "Joining contests here connected me with creators globally. The instant payout feature is incredibly fast. Highly recommend for competitive coding enthusiasts.",
    name: "Kabir Khan",
    title: "Software Developer",
    photo:
      "https://i.ibb.co.com/5hX16cBz/alex-suprun-ZHv-M3-XIOHo-E-unsplash.jpg",
    rating: 5,
  },
  {
    id: 3,
    review:
      "I appreciate the secure payment process. The categories are diverse, giving every artist a chance to shine. Great platform for creative expression.",
    name: "Priya Sharma",
    title: "Photographer",
    photo:
      "https://i.ibb.co.com/BH7CdddG/michael-dam-m-EZ3-Po-FGs-k-unsplash.jpg",
    rating: 4,
  },
  {
    id: 4,
    review:
      "The task submission system is straightforward, and the support team is helpful. It's a fantastic place to challenge yourself and earn rewards.",
    name: "David Lee",
    title: "UI/UX Designer",
    photo: "https://i.ibb.co.com/CKY4Znrw/istockphoto-2207541639-612x612.jpg",
    rating: 5,
  },
];

// Rating Star Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${i < rating ? "opacity-100" : "opacity-30"}`}
        />
      ))}
    </div>
  );
};

const UserTestimonials = () => {
  return (
    <Container>
      <section className="py-16 ">
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            User Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear what our contestants have to say about their experience on our
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {testimonialData.map((testimonial,index) => (
            <div
              key={testimonial.id}
              data-aos="fade-zoom-in" 
              data-aos-delay={index * 150} 
              data-aos-easing="ease-in-out"
              className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-yellow-500 flex flex-col justify-between h-full"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-yellow-400 text-3xl mb-4" />

              {/* Review Text */}
              <p className="text-gray-700 italic mb-6 flex-grow">
                "{testimonial.review}"
              </p>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* User Info */}
              <div className="flex items-center pt-4 border-t border-gray-100">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-yellow-500"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default UserTestimonials;
