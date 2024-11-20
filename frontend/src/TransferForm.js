import React, { useEffect, useState } from 'react';
import { init, createElement } from '@airwallex/components-sdk';
import './TransferForm.css';

const TransferForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeTransferComponent = async () => {
    setLoading(true);
    setError(null);

    try {
      const { authCode, codeVerifier } = await fetchAuthCode(); // Fetch a fresh auth code
      await initializeSdk(authCode, codeVerifier); // Initialize the SDK with the auth code

      // Step 3: Create the Transfer component with `await`
      const transferComponent = await createElement('payoutForm', { hideHeader: true, hideNav: true });

      // Check if the DOM element exists, if not, delay mounting
      setTimeout(() => {
        const container = document.getElementById('transfer-form-container');
        if (container) {
          transferComponent.mount('transfer-form-container');

          transferComponent.on('ready', () => {
            console.log('Transfer component is ready');
            setLoading(false);
          });

          transferComponent.on('error', async (event) => {
            console.error('Transfer component error:', event);
            if (event.code === 'TOKEN_EXPIRED') {
              const newAuthCode = await fetchAuthCode();
              await initializeSdk(newAuthCode, codeVerifier);
              transferComponent.mount('transfer-form-container'); // Remount with refreshed authCode
            } else {
              setError('An error occurred in the transfer component.');
            }
          });
        } else {
          console.error('Container element not found for mounting the transfer component.');
        }
      }, 100); // Delay of 100ms to ensure container exists in the DOM

    } catch (error) {
      console.error('Error initializing SDK or mounting Transfer component:', error);
      setError(error.message || 'Failed to initialize the Transfer component');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthCode = async () => {
    const response = await fetch('http://localhost:5000/api/get-auth-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId: 'acct_eDWgRsz1PB2U4_TcLsKTzw' }), // Replace with actual account ID
    });

    if (!response.ok) throw new Error('Failed to fetch auth code');
    return response.json();
  };

  const initializeSdk = async (authCode, codeVerifier) => {
    await init({
      authCode,
      codeVerifier,
      env: process.env.REACT_APP_API_ENV || 'demo',
      clientId: process.env.REACT_APP_CLIENT_ID,
      langKey: 'en',
    });
  };

  useEffect(() => {
    initializeTransferComponent();
  }, []);

  return (
    <div className="transfer-form-container">
      <h1>Airwallex Embedded Transfer Component</h1>
      {loading && <p>Loading Transfer Component...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div
        id="transfer-form-container"
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      />
    </div>
  );
};

export default TransferForm;
