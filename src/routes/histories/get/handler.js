/**
 * Get histories
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 *
 * @returns {promise<object>} login response
 */
const handler = async (req, res, next) => {
  const { logger } = req.app.locals;
  const { historyService, auth } = res.locals;

  try {
    const response = await historyService.getHistories(auth.user);
    res.send(response);
    next();
  } catch (error) {
    logger.error(error, 'Failed to get histories');

    next(error);
  }
};

module.exports = handler;
