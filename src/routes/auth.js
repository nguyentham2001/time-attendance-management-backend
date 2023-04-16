const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth, authAdmin } = require('../middlewares/auth');
const { loginValidate, registerValidate } = require('../validations/auth');
const authController = require('../controllers/auth');

router.post(
  '/auths/register',
  authAdmin,
  registerValidate,
  asyncMiddleware(authController.register),
);

router.post(
  '/auths/login',
  loginValidate,
  asyncMiddleware(authController.login),
);

router.get(
  '/auths/verify',
  auth,
  asyncMiddleware(authController.verifyAccessToken),
);

module.exports = router;
