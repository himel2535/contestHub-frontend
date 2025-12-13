import React, { useState } from "react";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const ContactUs = () => {
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState(null);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Sending message...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        data
      );

      toast.success(res.data.message, { id: loadingToast });

      setLastSubmittedMessage({
        name: data.name,
        message: data.message,
        photo: user?.photoURL || "https://i.ibb.co/CBy14B5/default-user.jpg",
        time: new Date().toLocaleString(),
      });

      reset();
    } catch (error) {
      console.error("Contact Form Submission Error:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to send message. Please try again.";
      toast.error(errorMessage, { id: loadingToast });
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Container>
      <div className="py-16 sm:py-24">
        {/* Header Section */}
        <div className="text-center mb-12" data-aos="fade-down">
          <Heading
            title="Get In Touch"
            subtitle="We'd love to hear from you. Send us a message!"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-yellow-500">
          {/* Left Side: Contact Information */}
          <div
            className="lg:w-1/3 space-y-8 p-6 bg-gray-50 rounded-lg shadow-inner"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
              Contact Info
            </h3>

            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-3xl text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-700">Our Location</h4>
                <p className="text-gray-500">
                  123 Contest St, Innovation City, CA 90001
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-3xl text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-700">Email Us</h4>
                <p className="text-gray-500">support@contesthub.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhone className="text-3xl text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-700">Call Us</h4>
                <p className="text-gray-500">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form OR Submission Summary */}
          <div className="lg:w-2/3 p-6" data-aos="fade-left">
            {lastSubmittedMessage ? (
              <div className="space-y-6">
                <div className="text-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md">
                  <FaCheckCircle className="text-6xl text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-yellow-800">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Here is a summary of your sent message.
                  </p>
                </div>

                <div className="border border-gray-300 rounded-lg p-6 shadow-xl bg-white">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                    <img
                      src={lastSubmittedMessage.photo}
                      alt={lastSubmittedMessage.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {lastSubmittedMessage.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Sent at: {lastSubmittedMessage.time}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    <span className="font-semibold block mb-2">
                      Your Message:
                    </span>
                    {lastSubmittedMessage.message}
                  </p>
                </div>

                <button
                  onClick={() => setLastSubmittedMessage(null)}
                  className="w-full text-center py-3 bg-yellow-100 text-yellow-800 font-semibold rounded-lg hover:bg-yellow-200 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      defaultValue={user?.displayName || ""}
                      readOnly={!!user?.displayName}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      defaultValue={user?.email || ""}
                      readOnly={!!user?.email}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="
                    cursor-pointer
                    w-full flex justify-center items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                  >
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
