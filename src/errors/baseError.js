/**
 * BaseError
 *
 * The BaseError is the base class for all errors
 *
 * @class BaseError
 * @extends {ExtendableError}
 */
class BaseError extends Error {
  /**
   * Creates an instance of BaseError.
   *
   * All Base Errors have a message an a code
   * @param {string} message - the error message
   * @param {string} code - the error code
   * @param {number} statusCode - the HTTP status code
   * @param {Object} data - the error object and/or additional data.
   * @memberof BaseError
   */
  constructor(message = 'An error occurred', code = 'ERROR', statusCode = 500, data = {}) {
    super(message);
    this.code = code;
    this.description = message;
    this.statusCode = statusCode;
    this.data = data;
    this.serviceError = true;
  }
}

module.exports = BaseError;
