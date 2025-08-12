const jwt = require('jsonwebtoken');

// A secret key for signing the JWT. Keep this a secret!
const secret = 'your-super-secret-key'; 

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };