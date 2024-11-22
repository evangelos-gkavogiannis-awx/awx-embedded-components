import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Optional: Add custom styles for the HomePage

function WelcomePage() {
  return (
    <div className="home-page">
      <h1 className="text-3xl font-bold text-center my-10">
        Welcome to Airwallex Portal
      </h1>
      <div className="flex justify-center">
        <Link to="/kyc-form">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Create a Connected Account & Launch KYC
          </button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
