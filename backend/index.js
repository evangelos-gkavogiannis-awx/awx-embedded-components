// require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const { generateCodeVerifier, generateCodeChallengeFromVerifier } = require('./authUtils');


const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Axios request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log('[REQUEST]', JSON.stringify({
      method: config.method.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: config.data,
    }, null, 2));
    return config;
  },
  (error) => {
    console.error('[REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// Axios response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log('[RESPONSE]', JSON.stringify({
      url: response.config.url,
      data: response.data,
      status: response.status,
    }, null, 2));
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('[RESPONSE ERROR]', JSON.stringify({
        url: error.response.config.url,
        data: error.response.data,
        status: error.response.status,
      }, null, 2));
    } else {
      console.error('[ERROR MESSAGE]', error.message);
    }
    return Promise.reject(error);
  }
);

// API endpoint to create an account
app.post('/api/create-account', async (req, res) => {
  const { email, countryCode, terms, dataUsage } = req.body;

  // Log the request payload to Airwallex
  const accountPayload = {
    primary_contact: { email },
    account_details: {
      business_details: { registration_address: { country_code: countryCode } }
    },
    customer_agreements: {
      agreed_to_terms_and_conditions: terms,
      agreed_to_data_usage: dataUsage
    }
  };
  
  console.log('Request Payload:', JSON.stringify(accountPayload, null, 2));
  console.log("Auth key", `Bearer ${process.env.API_KEY}`)

  try {
    const response = await axios.post(
      'https://api-demo.airwallex.com/api/v1/accounts/create',
      accountPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          'Content-Type': 'application/json',
          'x-client-id': process.env.API_CLIENT_ID
        }
      }
    );

    // Log the response data from Airwallex
    console.log('Response Data:', JSON.stringify(response.data, null, 2));

    res.json({ accountId: response.data.id });
  } catch (error) {
    // Log the error response or error message
    if (error.response) {
      console.error('Error Response Data:', JSON.stringify(error.response.data, null, 2));
      res.status(500).json({ message: 'Failed to create account', error: error.response.data });
    } else {
      console.error('Error Message:', error.message);
      res.status(500).json({ message: 'Failed to create account', error: error.message });
    }
  }
});

// API endpoint to get authorization code
app.post('/api/get-auth-code', async (req, res) => {
    const { accountId } = req.body;
  
    console.log('Received request to get authorization code for accountId:', accountId);
  
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
  
      console.log('Generated codeVerifier:', codeVerifier);
      console.log('Generated codeChallenge:', codeChallenge);
  
      const authPayload = {
        scope: ['w:awx_action:onboarding'],  // Updated to an array format
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
      };
  
      console.log('Authorization Payload:', JSON.stringify(authPayload, null, 2));
  
      // Updated the endpoint to the correct one
      const response = await axios.post(
        'https://api-demo.airwallex.com/api/v1/authentication/authorize',
        authPayload,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json',
            'x-client-id': process.env.API_CLIENT_ID,
            'x-on-behalf-of': accountId
          }
        }
      );
  
      console.log('Received response from Airwallex:', JSON.stringify(response.data, null, 2));
  
      res.json({ authCode: response.data.authorization_code, codeVerifier });
    } catch (error) {
      if (error.response) {
        console.error('Error Response Data:', JSON.stringify(error.response.data, null, 2));
        res.status(500).json({ message: 'Failed to get authorization code', error: error.response.data });
      } else {
        console.error('Error Message:', error.message);
        res.status(500).json({ message: 'Failed to get authorization code', error: error.message });
      }
    }
  });
  
  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
