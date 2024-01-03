// WelcomePage.js
import React from 'react';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-4xl font-semibold mb-4">Welcome to Your Dashboard</h2>
      <div className="flex space-x-4">
        <div className="bg-white p-4 rounded shadow-md">
          {/* Dashboard content goes here */}
          <h3 className="text-xl font-semibold mb-2">Dashboard Item 1</h3>
          <p>This is your first dashboard item.</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          {/* Another dashboard content */}
          <h3 className="text-xl font-semibold mb-2">Dashboard Item 2</h3>
          <p>This is another item in your dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
