/**
 * connect to MongoDB
 * @param {object} mongodb - logger
 * @param {object} config - configuration
 * @param {object} logger - logger
 * @returns {object} client
 */
const connectDb = async (mongodb, config, logger) => {
  const {
    instances,
    database,
    username,
    password,
  } = config;
  const { MongoClient } = mongodb;
  const encodedPassword = encodeURIComponent(password);
  const creds = `${username}:${encodedPassword}`;
  const connectionString = `mongodb://${creds}@${instances}/${database}`;

  logger.info(`connecting to: ${connectionString}`);

  const client = await MongoClient.connect(connectionString, { useNewUrlParser: true });

  return {
    db: client.db(config.database),
    client,
  };
};

module.exports = connectDb;
