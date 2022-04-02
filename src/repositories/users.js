const BaseError = require('../errors/baseError');

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

  async create(payload) {
    this.logger.info('[DB] Creating user', payload);

    const currentDate = new Date();
    const payloadWithDate = {
      ...payload,
      createdAt: currentDate,
      modifiedAt: currentDate,
    };

    const { insertedId } = await this.collection.insertOne(payloadWithDate);

    return insertedId;
  }

  async getUser(query) {
    this.logger.info('[DB] Get user by query', query);

    try {
      const user = await this.collection.findOne(query);

      return user;
    } catch (error) {
      this.logger.error(error, '[DB] Failed to find user by query', query);

      throw new BaseError('Failed to find user');
    }
  }
}

module.exports = UsersRepository;
