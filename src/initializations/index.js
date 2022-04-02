const mongodb = require('mongodb');

const connectDb = require('./connectDb');
const config = require('../../config');

/**
 * database initialization
 * @param {object} app - app
 */
const dbInitialization = async (app) => {
  const mongo = await connectDb(mongodb, config.resources.db, app.locals.logger);

  Object.assign(app.locals, { mongo });
};

module.exports = [
  dbInitialization,
];
