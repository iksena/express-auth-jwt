const { Users } = require('../../repositories');
const { User } = require('../../services');

/**
 * Middleware for user service
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 * @returns {promise} next function execution
 */
const withUsersDependencies = (req, res, next) => {
  const { mongo: { db }, config } = req.app.locals;
  const { logger } = res.locals;

  const usersRepository = new Users({
    logger,
    collection: db.collection('users'),
  });

  res.locals.userService = new User({
    logger,
    config,
    usersRepository,
  });

  return next();
};

module.exports = withUsersDependencies;
