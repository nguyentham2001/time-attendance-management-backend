const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { authAdmin, auth } = require('../middlewares/auth');
const userController = require('../controllers/user');
const {
  getUsersValidate,
  updateUserValidate,
  deleteUserValidate,
} = require('../validations/user');

router.get('/me', auth, asyncMiddleware(userController.getUser));
router.put('/me', auth, asyncMiddleware(userController.updateProfile));
router.get(
  '/users',
  authAdmin,
  getUsersValidate,
  asyncMiddleware(userController.getListUsers),
);
router.put(
  '/users/:id',
  authAdmin,
  updateUserValidate,
  asyncMiddleware(userController.updateUser),
);
router.delete(
  '/users/:id',
  authAdmin,
  deleteUserValidate,
  asyncMiddleware(userController.deleteUser),
);

module.exports = router;
