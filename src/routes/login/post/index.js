const { Router } = require('express');

const handler = require('./handler');
const withUsersDependencies = require('../../../middlewares/services/users');

const router = Router();

router.post(
  '/login',
  withUsersDependencies,
  handler,
);

module.exports = router;
