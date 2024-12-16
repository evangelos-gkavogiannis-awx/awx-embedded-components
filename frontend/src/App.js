import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import './App.css';
import KYCForm from './KYCForm';
import BeneficiaryForm from './BeneficiaryForm';
import WelcomePage from './WelcomePage';
import APIRequestConsole from './APIRequestConsole';
import setupAxiosInterceptor from './apiInterceptor';

function App() {

  // Ensure fetch interceptor is initialized on app load
  useEffect(() => {
    import("./fetchInterceptor");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/kyc-form" element={<KYCForm />} /> {/* KYCForm route */}
        //<Route path="/bene-form" element={<BeneficiaryForm />} /> {/* KYCForm route */}
      </Routes>
      <APIRequestConsole />
    </Router>
  );
}

export default App;
