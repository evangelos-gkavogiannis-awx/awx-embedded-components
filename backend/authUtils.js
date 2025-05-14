const crypto = require('crypto');
const { Base64 } = require('js-base64');

// Generate a code_verifier (43–128 characters)
const generateCodeVerifier = () => {
  const length = Math.floor(Math.random() * (128 - 43) + 43);
  return crypto.randomBytes(length).toString('base64url');
};

// Generate SHA-256 hash of the code_verifier
const sha256 = (plain) => {
  return crypto.createHash('sha256').update(plain).digest();
};

// Convert buffer to base64url
const base64urlencode = (buffer) => {
  return Base64.fromUint8Array(buffer, true);
};

// Generate code_challenge from code_verifier
const generateCodeChallengeFromVerifier = async (codeVerifier) => {
  const hashed = sha256(codeVerifier);
  return base64urlencode(new Uint8Array(hashed));
};

module.exports = {
  generateCodeVerifier,
  generateCodeChallengeFromVerifier
};

