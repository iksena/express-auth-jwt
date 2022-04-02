const BaseError = require('../errors/baseError');

/**
 * Represents a connection to histories collection
 */
class HistoriesRepository {
  /**
   * Constructor of histories service
   *
   * @param {object} options -  options
   * @property {object} options.logger - bunyan logger module
   * @property {object} options.collection - bunyan logger module
   */
  constructor(options) {
    Object.assign(this, options);
  }

  async create(payload) {
    this.logger.info('[DB] Creating history', payload);

    const currentDate = new Date();
    const payloadWithDate = {
      ...payload,
      createdAt: currentDate,
      modifiedAt: currentDate,
    };

    const { insertedId } = await this.collection.insertOne(payloadWithDate);

    return insertedId;
  }

  async getHistories(query) {
    this.logger.info('[DB] Get histories by query', query);

    try {
      const histories = await this.collection.find(query).toArray();

      return histories;
    } catch (error) {
      this.logger.error(error, '[DB] Failed to find histories by query', query);

      throw new BaseError('Failed to find histories');
    }
  }

  async getHistory(query) {
    this.logger.info('[DB] Get history by query', query);

    try {
      const history = await this.collection.findOne(query);

      return history;
    } catch (error) {
      this.logger.error(error, '[DB] Failed to find history by query', query);

      throw new BaseError('Failed to find history');
    }
  }
}

module.exports = HistoriesRepository;
