const NotFoundError = require('../errors/notFoundError');

/**
 * Handle not found path
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const notFoundMiddleware = async (req, res, next) => {
  if (res.headersSent) {
    next();
  } else {
    next(new NotFoundError(`${req.method} ${req.url} not found`));
  }
};

module.exports = notFoundMiddleware;
