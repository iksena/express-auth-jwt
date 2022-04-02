const Server = require('./server');
const config = require('../config');
const initializations = require('./initializations');
const deinitializations = require('./deinitializations');
const routes = require('./routes');

/**
 * Stop the server
 *
 * @param {object} service - server
 * @returns {object} - aggregated deinitialization result
 */
const stop = async (service) => async () => {
  await service.stop();

  process.exit(0);
};

/**
 * Start the server
 *
 * @param {object} service - investment service
 * @returns {promise<object>} - service
 */
const start = (service) => service.listen();

/**
 * Main function to initialize server
 */
const main = async () => {
  const server = new Server({
    config,
    initializations,
    deinitializations,
    routes,
  });

  start(server);

  process.on('SIGINT', await stop(server));
  process.on('SIGTERM', await stop(server));
};

main();
