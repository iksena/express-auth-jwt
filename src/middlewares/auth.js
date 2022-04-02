const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');

/**
 * Create auth middleware
 * @param {string} publicKey - public key
 * @returns {function} - middleware
 */
const authenticate = (publicKey) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return next(new UnauthorizedError('Authorization token is required'));

  return jwt.verify(token, publicKey, (error, user) => {
    if (error) return next(new UnauthorizedError('Invalid user authorization', error));

    res.locals.auth = { user };
    return next();
  });
};

module.exports = authenticate;
