/**
 * Represents service for handling user
 */
class User {
  /**
   * Constructor of user service
   *
   * @param {object} options -  options
   * @property {object} options.logger - bunyan logger module
   * @property {object} options.config - bunyan logger module
   * @property {object} options.usersRepository - users collection repository
   */
  constructor(options) {
    Object.assign(this, options);
  }
}

module.exports = User;
