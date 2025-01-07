

# Airwallex KYC, Beneficiary and Transfer Embedded Components Implementation

This is an implementation of the:
- Airwallex KYC component as documented in the [Airwallex Documentation](https://www.airwallex.com/docs/global-treasury__kyc-and-onboarding__embedded-kyc-component).
- Airwallex Beneficiary component as documented in the [Airwallex Documentation](https://www.airwallex.com/docs/payouts__embedded-beneficiary-component).
- Airwallex Transfer component as documented in the [Airwallex Documentation](https://www.airwallex.com/docs/payouts__embedded-transfer-component).

---

# Implementations:

KYC component: [KYCForm.js](https://github.com/evangelos-gkavogiannis-awx/awx-embedded-components/blob/main/frontend/src/KYCForm.js)
Beneficiary embedded component: [BeneficiaryForm.js](https://github.com/evangelos-gkavogiannis-awx/awx-embedded-components/blob/main/frontend/src/BeneficiaryForm.js)
Transfer embedded component: [TransferForm.js](https://github.com/evangelos-gkavogiannis-awx/awx-embedded-components/blob/main/frontend/src/TransferForm.js)

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
1. Open a browser and go to `http://localhost:3000`
2. Click on the `Create a Connected Account & Launch KYC`
3. Enter `email` and `ISO2 country code` and click Create Account: This will call Airwallex `/accounts/create`, it will create a connected account and trigger the KYC emdedded component

### Access the Beneficiary component
1. Open a browser and go to `http://localhost:3000`
2. Click on the `Beneficiary Embedded Component`

### Access the Beneficiary component
1. Open a browser and go to `http://localhost:3000`
2. Click on the `Transfer Embedded Component`






   
