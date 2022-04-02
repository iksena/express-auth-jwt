const BaseError = require('./baseError');

/**
 * UnauthorizedError
 *
 * Is thrown if the requester is not authorized to access the resource.
 * This is similar to 403 but is used in cases where authentication is
 * expected but has failed or has not been provided. This will lead to
 * an HTTP 401 (unauthorized) status code.
 *
 * @class UnauthorizedError
 * @extends {BaseError}
 */
class UnauthorizedError extends BaseError {
  /**
   * Creates an instance of UnauthorizedError.
   * @param {string} message - the error message
   * @param {Object} data - the error object and/or additional data.
   * @memberof UnauthorizedError
   */
  constructor(message, data) {
    super(message || 'Unauthorized', 'UNAUTHORIZED', 401, data);
  }
}

module.exports = UnauthorizedError;
