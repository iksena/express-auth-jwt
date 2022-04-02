const login = require('./login');
const register = require('./register');
const histories = require('./histories');

module.exports = [
  ...login,
  ...register,
  ...histories,
];
