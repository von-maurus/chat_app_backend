const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token provided'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body['uid'] = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    });
  }
};

module.exports = { validateJWT };