const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const userController = require('../controllers/user');

router.get(
  '/supervisors',
  auth,
  asyncMiddleware(userController.getListSupervisors),
);

module.exports = router;
