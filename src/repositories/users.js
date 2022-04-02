/**
 * Represents a connection to users collection
 */
class UsersRepository {
  /**
   * Constructor of user service
   *
   * @param {object} options -  options
   * @property {object} options.logger - bunyan logger module
   * @property {object} options.collection - bunyan logger module
   */
  constructor(options) {
    Object.assign(this, options);
  }
}

module.exports = UsersRepository;
