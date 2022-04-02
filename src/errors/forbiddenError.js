const BaseError = require('./baseError');

/**
 * ForbiddenError
 *
 * @class UnauthorizedError
 * @extends {BaseError}
 */
class ForbiddenError extends BaseError {
  /**
   * Creates an instance of ForbiddenError.
   * @param {string} message - the error message
   * @param {Object} data - the error object and/or additional data.
   * @memberof ForbiddenError
   */
  constructor(message, data) {
    super(message || 'Forbidden', 'FORBIDDEN', 403, data);
  }
}

module.exports = ForbiddenError;
