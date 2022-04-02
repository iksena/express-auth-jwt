const { Router } = require('express');

const handler = require('./handler');
const { auth: { publicKey } } = require('../../../../config');
const authenticate = require('../../../middlewares/auth');
const withUsersDependencies = require('../../../middlewares/services/users');

const router = Router();

router.post(
  '/login',
  authenticate(publicKey),
  withUsersDependencies,
  handler,
);

module.exports = router;
