const bcrypt = require('bcrypt');

const BaseError = require('../errors/baseError');
const ForbiddenError = require('../errors/forbiddenError');

/**
 * Represents service for handling user
 */
class User {
  /**
   * Constructor of user service
   *
   * @param {object} options -  options
   * @property {object} options.logger - bunyan logger module
   * @property {object} options.config - config object
   * @property {object} options.usersRepository - users collection repository
   */
  constructor(options) {
    Object.assign(this, options);
  }

  async register(payload) {
    const { username, email, password } = payload;
    const user = await this.usersRepository.getUser({ username });
    if (user) {
      throw new ForbiddenError('Username already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return this.usersRepository.create({
      username,
      email,
      password: passwordHash,
    });
  }

  async login(payload) {
    const { username, password } = payload;
    const user = await this.usersRepository.getUser({ username });
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      return user;
    }

    throw new BaseError('Invalid username or password', 'INVALID_PASSWORD', 401);
  }
}

module.exports = User;
