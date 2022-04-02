/**
 * Handle error and return proper status code
 * @param  {object} error error psssed by previous middlewares
 * @param  {object} req the incoming HTTP request object
 * @param  {object} res the HTTP response object
 * @param  {function} next function to move to the next middleware
 * @returns {object} next action
 */
const errorMiddleware = (error, req, res, next) => {
  req.app.locals.logger.error({
    event: 'error',
  }, error);
  res.status(error.statusCode || 500).send(error);

  return next();
};

module.exports = errorMiddleware;
