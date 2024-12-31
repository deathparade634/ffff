import React, { useState } from 'react';
import { Instagram, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    sendCopy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ajoutez votre logique de soumission du formulaire ici
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-16 lg:py-16">
        {/* Left Column */}
        <div className="text-white space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold sm:text-5xl text-gray-800">Hello,</h1>
            <h2 className="text-3xl font-medium text-blue-700 sm:text-4xl">
              Contact <span className="text-black">Us</span>
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-blue-900">Have questions or need assistance?</p>
            <p className="text-gray-800">
              Fill out the form below, and we'll get in touch with you shortly.
            </p>
            <div className="space-y-2">
              <p className="text-gray-800">Reach out to Us at:</p>
              <div className="flex gap-4">
                <a href="#" className="text-black hover:text-gray-700 transition duration-300" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-black hover:text-gray-700 transition duration-300" aria-label="GitHub">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-black hover:text-gray-700 transition duration-300" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="space-y-6">
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white/80 p-3 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Email and Phone Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white/80 p-3 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white/80 p-3 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[150px] w-full rounded-md bg-white/80 p-3 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-blue-400"
                  required
                ></textarea>
              </div>

              {/* Checkbox - Send Copy */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sendCopy"
                  name="sendCopy"
                  checked={formData.sendCopy}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="sendCopy" className="text-sm font-medium text-gray-800">
                  Send me a copy of this message
                </label>
              </div>

              {/* Submit Button with Enhanced Styling */}
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] p-3 text-white transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 hover:ring-4 hover:ring-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
