require('dotenv').config();
const { readFileSync, existsSync } = require('fs');

const pkg = require('../package.json');

let publicKey;
let privateKey;
const publicKeyPath = process.env.AUTH_PUBLICKEY_PATH;
const privateKeyPath = process.env.AUTH_PRIVATEKEY_PATH;

if (existsSync(process.env.AUTH_PUBLICKEY_PATH)) {
  publicKey = readFileSync(publicKeyPath, 'utf-8');
}
if (existsSync(process.env.AUTH_PRIVATEKEY_PATH)) {
  privateKey = readFileSync(privateKeyPath, 'utf-8');
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
    privateKeyPath,
    privateKey,
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
        histories: process.env.DB_COLLECTION_HISTORIES,
      },
    },
  },
};

module.exports = config;
