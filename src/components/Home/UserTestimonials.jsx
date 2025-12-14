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
      "https://i.ibb.co/VWxBMgZd/oguz-yagiz-kara-MZf0m-I14-RI0-unsplash.jpg",
    rating: 5,
  },
  {
    id: 2,
    review:
      "Joining contests here connected me with creators globally. The instant payout feature is incredibly fast. Highly recommend for competitive coding enthusiasts.",
    name: "Kabir Khan",
    title: "Software Developer",
    photo:
      "https://i.ibb.co/5hX16cBz/alex-suprun-ZHv-M3-XIOHo-E-unsplash.jpg",
    rating: 5,
  },
  {
    id: 3,
    review:
      "I appreciate the secure payment process. The categories are diverse, giving every artist a chance to shine. Great platform for creative expression.",
    name: "Priya Sharma",
    title: "Photographer",
    photo:
      "https://i.ibb.co/BH7CdddG/michael-dam-m-EZ3-Po-FGs-k-unsplash.jpg",
    rating: 4,
  },
  {
    id: 4,
    review:
      "The task submission system is straightforward, and the support team is helpful. It's a fantastic place to challenge yourself and earn rewards.",
    name: "David Lee",
    title: "UI/UX Designer",
    photo: "https://i.ibb.co/CKY4Znrw/istockphoto-2207541639-612x612.jpg",
    rating: 5,
  },
];

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
    <section className="py-12 bg-white dark:bg-gray-900">
      <Container>
        {/* Heading */}
        <div
          className="text-center mb-12"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl sm:text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-white inline-block border-b-4 border-yellow-500 pb-2">
            User Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Hear directly from our participants about their experiences on our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {testimonialData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-easing="ease-in-out"
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-yellow-500 flex flex-col justify-between h-full"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-yellow-400 text-3xl mb-4" />

              {/* Review Text */}
              <p className="text-gray-700 dark:text-gray-200 italic mb-6 flex-grow">
                "{testimonial.review}"
              </p>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* User Info */}
              <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-yellow-500"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default UserTestimonials;
