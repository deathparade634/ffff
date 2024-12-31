import React from 'react';
import photo_coti from "./images/ph.png"

function Hero() {
  return (
    <section className="flex items-center justify-between p-10 bg-gray-100">
      <div className="hero-content max-w-lg">
        <h1 className="text-4xl font-semibold text-gray-800">
          Welcome to <span className="text-blue-500">Taskly!</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Your go-to tool for smarter task management. Plan with our calendar, 
          track progress through analytics, add and remove tasks effortlessly, 
          and manage your profile with ease. Sign up and get started today, 
          where our special slogan will inspire you to turn tasks into triumphs!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Sign up
        </button>
      </div>
      
      <div className="hero-image max-w-xs">
        <img src={photo_coti} alt="Task management" className="w-full h-auto rounded-lg shadow-lg" />
      </div>
    </section>
  );
}

export default Hero;
