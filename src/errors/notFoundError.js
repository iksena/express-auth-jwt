const BaseError = require('./baseError');

/**
 * NotFoundError
 *
 * Is thrown if the resource could not be found. This is often used
 * as a catch-all for all invalid URIs requested of the server.
 * This will lead to an HTTP 404 (not found) status code.
 *
 * @class NotFoundError
 * @extends {BaseError}
 */
class NotFoundError extends BaseError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} message - the error message
   * @param {Object} data - the error object and/or additional data.
   * @memberof NotFoundError
   */
  constructor(message, data) {
    super(message || 'Not Found', 'NOT_FOUND', 404, data);
  }
}

module.exports = NotFoundError;
