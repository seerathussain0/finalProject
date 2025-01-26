import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const NoPage = () => {
  // State to handle dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode based on the state
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Sync dark mode with system preferences
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-6">
          404
        </h1>
        <p className="text-2xl mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-xl mb-6">
          You can go back to the homepage or contact support for assistance.
        </p>

        {/* Back to Home Button */}
        <Link to={'/'} className={`inline-block py-2 px-6 rounded-lg text-white ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} font-semibold`}>
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NoPage;
