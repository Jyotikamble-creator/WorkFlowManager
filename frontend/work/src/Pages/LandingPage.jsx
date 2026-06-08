import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 flex flex-col justify-center items-center text-white px-4">
      {/* Hero Content */}
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Workflow Manager</span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform to streamline your team's tasks, enhance collaboration, and drive productivity across your entire organization.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-900 text-lg font-bold rounded-full shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-100 text-lg font-bold rounded-full hover:bg-blue-800 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Create an Account
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="text-4xl mb-4">👨‍💼</div>
          <h3 className="text-xl font-bold mb-2">Admin Control</h3>
          <p className="text-blue-200 text-sm">Complete oversight of all users, tasks, and system activities.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="text-4xl mb-4">👔</div>
          <h3 className="text-xl font-bold mb-2">Manager Tools</h3>
          <p className="text-blue-200 text-sm">Easily assign tasks to employees and track progress in real-time.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="text-4xl mb-4">👷</div>
          <h3 className="text-xl font-bold mb-2">Employee Focus</h3>
          <p className="text-blue-200 text-sm">Clear task visibility, status updates, and inline commenting.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
