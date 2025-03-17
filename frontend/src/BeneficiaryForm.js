import React, { useState, useEffect } from 'react';
import { init, createElement } from '@airwallex/payouts-web-sdk';

const BeneficiaryForm = () => {
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [beneficiaryComponent, setBeneficiaryComponent] = useState(null);

  const handleInitialize = async () => {
    setLoading(true);

    try {
      // Step 1: Get auth code
      const authResponse = await fetch('http://localhost:5000/api/get-auth-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: 'acct_eDWgRsz1PB2U4_TcLsKTzw' }),
      });
      const { authCode, codeVerifier } = await authResponse.json();

      // Step 2: Initialize SDK
      await init({
        langKey: 'en',
        authCode,
        codeVerifier,
        env: process.env.REACT_APP_API_ENV || 'demo',
        clientId: process.env.REACT_APP_CLIENT_ID,
      });

      console.log('SDK initialized successfully');
      setInitialized(true); // Trigger rendering of container

    } catch (error) {
      console.error('Error initializing the SDK:', error);
      alert('Failed to initialize the SDK');
    } finally {
      setLoading(false);
    }
  };

  // useEffect to mount the component after the container is rendered
  useEffect(() => {
    if (initialized) {
      const container = document.getElementById('beneficiary-form-container');
      if (container) {
        const options = {
          theme: {
            palette: {
              primary: { "50": "#925ddd" },
            },
          },
        };

        const beneficiaryForm = createElement('beneficiaryForm', options);

        if (beneficiaryForm) {
          beneficiaryForm.mount(container);
          setBeneficiaryComponent(beneficiaryForm);

          // Event listeners
          beneficiaryForm.on('ready', () => {
            console.log('Beneficiary form is ready');
            setLoading(false);
          });

          beneficiaryForm.on('error', (event) => {
            console.error('Form error:', event);
            alert('An error occurred while rendering the form.');
            setLoading(false);
          });
        } else {
          console.error('createElement returned null');
        }
      } else {
        console.error('Container does not exist in the DOM');
      }
    }
  }, [initialized]);

  const handleSubmit = async () => {
    if (beneficiaryComponent) {
      try {
        const results = await beneficiaryComponent.submit();
        console.log('Final payload:', results);

        const payload = results.values; // Extract beneficiary data

        // Call backend API to create the beneficiary
        const response = await fetch('http://localhost:5000/api/create-beneficiary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload) // Send extracted values
        });

        const responseData = await response.json();
        console.log('Beneficiary Created:', responseData);

        alert('Beneficiary created successfully!');
      } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to create the beneficiary');
      }
    }
  };


  return (
    <div className="beneficiary-form-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      <header>
        <h1>Airwallex Embedded Beneficiary Form</h1>
      </header>

      {!initialized ? (
        <button onClick={handleInitialize} disabled={loading} style={{
          backgroundColor: '#6A0DAD',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          marginTop: '20px'
        }}>
          {loading ? 'Initializing...' : 'Initialize Beneficiary Form'}
        </button>
      ) : (
        <>
          {/* Step 2: Add a container after initialization */}
          <div
            id="beneficiary-form-container"
            style={{ width: '100%', minHeight: '500px', marginTop: '20px', display: 'flex', flexDirection: 'column' }}
          ></div>

          {/* Submit Button - Moves down as form expands */}
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#6A0DAD', // Purple color
              color: 'white',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              width: 'fit-content',
              marginTop: '20px',
              display: 'block', // Ensures it stays in the natural document flow
              alignSelf: 'flex-start', // Aligns to the left
            }}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default BeneficiaryForm;
