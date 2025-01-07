// import React from 'react';
// import { Link } from 'react-router-dom';
// import './WelcomePage.css'; // Optional: Add custom styles for the HomePage

// function WelcomePage() {
//   return (
//     <div className="home-page">
//       <h1 className="text-3xl font-bold text-center my-10">
//         Welcome to Airwallex Portal
//       </h1>
//       <div className="flex justify-center">
//         <Link to="/transfer-form">
//           <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
//             Create a Connected Account & Launch KYC
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default WelcomePage;


import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Ensure the updated CSS file is imported

function WelcomePage() {
  return (
    <div className="welcome-container">
      {/* Header Section */}
      <div className="welcome-header">
        <h1>Welcome to Airwallex Portal</h1>
        <p>Select a component to get started</p>
      </div>

      {/* Component Selection Buttons */}
      <div className="categories-container">
        <h3>Select an Embedded Component</h3>
        <div className="categories">
          {/* KYC Form Button */}
          <Link to="/kyc-form" className="category">
            KYC Embedded Component
          </Link>

          {/* Beneficiary Form Button */}
          <Link to="/bene-form" className="category">
            Beneficiary Embedded Component
          </Link>

          {/* Transfer Form Button */}
          <Link to="/transfer-form" className="category">
            Transfer Embedded Component
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <div className="welcome-footer">
        <div className="terms-container">
          <p>
            By proceeding, you agree to our{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;

