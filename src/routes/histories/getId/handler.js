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
    const response = await historyService.getHistory(auth.user, req.params.id);
    res.send(response);
    next();
  } catch (error) {
    logger.error(error, 'Failed to get histories by id');

    next(error);
  }
};

module.exports = handler;
