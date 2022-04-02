/**
 * Authenticate user
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 *
 * @returns {promise<object>} login response
 */
const handler = async (req, res, next) => {
  const { logger } = req.app.locals;
  const { userService } = res.locals;
  const { body: payload } = req;

  try {
    const response = await userService.register(payload);
    res.send(response);
    next();
  } catch (error) {
    logger.error(error, 'Failed to login');

    next(error);
  }
};

module.exports = handler;
