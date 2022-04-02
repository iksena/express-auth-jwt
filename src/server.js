const express = require('express');
const { createLogger } = require('bunyan');
const bodyParser = require('body-parser');

const notFoundMiddleware = require('./middlewares/notFound');
const errorMiddleware = require('./middlewares/error');

/**
 * Represents a server
 */
class Server {
  /**
   * Server constructor
   * @param {object} options object containing necessary parameters
   * @param {object} options.config config to be used by the server
   * @param {array} options.initializations array of initializations function, will be run on start
   * @param {array} options.routes array containing router or middlewares for handling routes
   * @param {array} options.deinitializations array of deinitialization methods
   */
  constructor(options) {
    Object.assign(this, options);
    this.app = express();
    this.app.locals.config = this.config;

    this.logger = createLogger({
      ...this.config.logger,
    });
    this.app.locals.logger = this.logger;
    this.logger.info({ event: 'config', config: this.config });

    this.app.use(bodyParser.json());
    if (this.routes && this.routes.length) {
      this.routes.forEach((route) => this.app.use(route));
    }
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  /**
   * Set the server to listen depends on the config given
   * @returns {promise<object>} return the server itself
   */
  async listen() {
    if (this.initializations && this.initializations.length) {
      try {
        await this.initializations.reduce(
          (promise, initFunction) => promise.then(() => initFunction(this.app)),
          Promise.resolve(),
        );
      } catch (error) {
        this.logger.error({ error }, 'Initializations failed');
        throw error;
      }
    }

    return new Promise((resolve) => {
      this.server = this.app.listen(this.config.port, () => {
        this.logger.info(`${this.config.name} is listening on ${this.config.host}:${this.config.port}`);
        return resolve();
      });
    });
  }

  /**
   * method to stop the server
   * @param  {string} signal signal given
   */
  async stop(signal) {
    this.logger.info({ event: 'shutdown', signal });
    if (this.deinitializations && this.deinitializations.length) {
      await this.deinitializations.reduce((promise, stopFunction) => promise.then(async () => {
        try {
          await stopFunction(this.app);
        } catch (error) {
          this.logger.error({ error }, 'Deinitializations failed');
        }
      }), Promise.resolve());
    }
    this.server.close();
  }
}

module.exports = Server;
