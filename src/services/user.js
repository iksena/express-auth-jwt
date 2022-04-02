const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  generateToken(data) {
    return jwt.sign(data, this.config.auth.privateKey, { expiresIn: 24 * 3600 });
  }

  async register(payload) {
    const { password, ...userData } = payload;
    const { username, email } = userData;
    const user = await this.usersRepository.getUser({ $or: [{ username }, { email }] });
    if (user) {
      throw new ForbiddenError('Username or email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await this.usersRepository.create({
      username,
      email,
      password: passwordHash,
    });

    this.logger.info('User is registered successfully', userId);

    return {
      userId,
      ...userData,
      accessToken: this.generateToken(payload),
    };
  }

  async login(payload) {
    const { username, password } = payload;
    const invalidError = new BaseError('Invalid username or password', 'INVALID_PASSWORD', 401);

    const user = await this.usersRepository.getUser({ username });
    if (!user) {
      throw invalidError;
    }

    const isCorrectPassword = await bcrypt.compare(password, user?.password);

    if (isCorrectPassword) {
      const { password: redactedPassword, _id, ...response } = user;
      this.logger.info('User is logged in successfully', response);

      return {
        ...response,
        userId: _id,
        accessToken: this.generateToken(user),
      };
    }

    throw invalidError;
  }
}

module.exports = User;
