/**
 * database close connection
 * @param {object} app - app
 */
const dbDeinitialization = async (app) => {
  await app.locals.mongo.client.close();
};

module.exports = [
  dbDeinitialization,
];
