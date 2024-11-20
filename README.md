

# Airwallex KYC Component Implementation

This is an implementation of the Airwallex KYC component as documented in the [Airwallex Documentation](https://www.airwallex.com/docs/global-treasury__kyc-and-onboarding__embedded-kyc-component).

---

## Steps to Run the Application

### Backend Setup
1. Navigate to the `backend` folder.
2. Create a `.env` file and add the following:
   ```plaintext
   API_CLIENT_ID=your_client_id
   API_KEY=your_access_token
Notes:
To create an access token, use your pair of access keys and call the [Authentication API](https://www.airwallex.com/docs/api#/Authentication/API_Access/_api_v1_authentication_login/post)

3. Install dependencies and start the backend server
   ```plaintext
   npm install
   node backed/index.js   
### Frontend Setup
1. Navigate to the `frontend` folder.
2. Create a `.env` file and add the following:
   ```plaintext
   REACT_APP_API_ENV=demo
   REACT_APP_CLIENT_ID=your_client_id
3. Install dependencies and start the frontend server
   ```plaintext
   npm install
   npm start
### Access the KYC
1. Open a browser and go to `http://localhost:3000/kyc-form`
2. Enter email and ISO2 country code and click Create Account: This will call Airwallec /accounts/create, it will create a connected account and trigger the KYC emdedded component








   
