const { Base64 } = require('js-base64');

// Helper to convert decimal to hex
const dec2hex = (dec) => ('0' + dec.toString(16)).slice(-2);

// Generate code_verifier
const generateCodeVerifier = () => {
  const length = Math.floor(Math.random() * (128 - 43) + 43);
  const array = new Uint32Array(length / 2);
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
};

// SHA-256 hashing function
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
};

// Convert hashed data to base64url format
const base64urlencode = (hashed) => {
  const bytes = new Uint8Array(hashed);
  return Base64.fromUint8Array(bytes, true);
};

// Generate code_challenge from code_verifier
const generateCodeChallengeFromVerifier = async (codeVerifier) => {
  const hashed = await sha256(codeVerifier);
  return base64urlencode(hashed);
};

module.exports = {
  generateCodeVerifier,
  generateCodeChallengeFromVerifier
};
