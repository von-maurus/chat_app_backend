const secretKey = process.env.JWT_SECRET_KEY;
const expiresIn = '12h'; // Token expiration time
const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user
 * @param {Object} uid - The id of the user
 * @returns {string} - The generated JWT token
 */
const generateToken = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    return jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
      if (error) {
        console.error(error);
        return reject('Could not generate token')
      }
      return resolve(token);
    });
  });
}

const verifyToken = (token) => {
  return jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.error(error);
      return { ok: false, msg: 'Invalid token' };
    }
    const { uid } = decoded
    return { ok: true, uid };
  });
};


module.exports = {
  generateToken, verifyToken
};