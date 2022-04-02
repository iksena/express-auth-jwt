const { Router } = require('express');

const handler = require('./handler');
const { auth: { publicKey } } = require('../../../../config');
const withAuth = require('../../../middlewares/auth');
const withHistoriesDependencies = require('../../../middlewares/services/histories');

const router = Router();

router.post(
  '/histories',
  withAuth(publicKey),
  withHistoriesDependencies,
  handler,
);

module.exports = router;
