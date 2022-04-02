const { ObjectId } = require('mongodb');

/**
 * Represents service for handling History
 */
class History {
  /**
   * Constructor of user service
   *
   * @param {object} options -  options
   * @property {object} options.logger - bunyan logger module
   * @property {object} options.config - config object
   * @property {object} options.historiesRepository - users collection repository
   */
  constructor(options) {
    Object.assign(this, options);
  }

  async getHistories(user) {
    const { username } = user;
    return this.historiesRepository.getHistories({ username });
  }

  async getHistory(user, historyId) {
    const { username } = user;
    return this.historiesRepository.getHistory({ username, _id: ObjectId(historyId) });
  }

  async createHistory(user, payload) {
    const { username } = user;
    return this.historiesRepository.create({ username, ...payload });
  }
}

module.exports = History;
