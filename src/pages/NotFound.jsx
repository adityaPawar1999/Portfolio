import React from 'react';
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        
        <h1 className="text-9xl font-extrabold text-gray-900 tracking-wider">
          404
        </h1>

        <h2 className="mt-[-8px] text-3xl font-semibold text-gray-700">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500 text-lg leading-relaxed">
          The page you are looking for may have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block bg-gray-900 text-white px-8 py-3 rounded-xl 
                     text-base font-medium shadow-md hover:bg-gray-800
                     transition-all duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
