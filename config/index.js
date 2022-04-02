require('dotenv').config();
const { readFileSync, existsSync } = require('fs');

const pkg = require('../package.json');

let publicKey;
const publicKeyPath = process.env.AUTH_PUBLICKEY_PATH;

if (existsSync(process.env.AUTH_PUBLICKEY_PATH)) {
  publicKey = readFileSync(publicKeyPath, 'utf-8');
}

const config = {
  name: pkg.name,
  description: pkg.description,
  host: process.env.HOST,
  port: process.env.PORT,
  timezone: process.env.TZ,
  auth: {
    publicKeyPath,
    publicKey,
  },
  api: {
    version: pkg.version,
  },
  docs: {
    path: '/docs',
  },
  logger: {
    name: pkg.name,
    level: process.env.LOG_LEVEL,
  },
  resources: {
    db: {
      instances: process.env.DB_INSTANCES,
      options: process.env.DB_OPTIONS,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      collections: {
        users: process.env.DB_COLLECTION_USERS,
      },
    },
  },
};

module.exports = config;
