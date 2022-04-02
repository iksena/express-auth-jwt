const { Histories } = require('../../repositories');
const { History } = require('../../services');

/**
 * Middleware for history service
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 * @returns {promise} next function execution
 */
const withHistoriesDependencies = (req, res, next) => {
  const { mongo: { db }, config, logger } = req.app.locals;

  const historiesRepository = new Histories({
    logger,
    collection: db.collection(config.resources.db.collections.histories),
  });

  res.locals.historyService = new History({
    logger,
    config,
    historiesRepository,
  });

  return next();
};

module.exports = withHistoriesDependencies;
