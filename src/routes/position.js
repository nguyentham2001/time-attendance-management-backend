const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const positionController = require('../controllers/position');
const {
  createPositionValidate,
  updatePositionValidate,
  getPositionValidate,
  deletePositionValidate,
  getPositionsValidate,
} = require('../validations/position');

const { auth, authAdmin } = require('../middlewares/auth');

router.get(
  '/positions',
  auth,
  getPositionsValidate,
  asyncMiddleware(positionController.getListPositions),
);

router.post(
  '/positions',
  authAdmin,
  createPositionValidate,
  asyncMiddleware(positionController.createPosition),
);

router.put(
  '/positions/:id',
  authAdmin,
  updatePositionValidate,
  asyncMiddleware(positionController.updatePosition),
);

router.get(
  '/positions/:id',
  auth,
  getPositionValidate,
  asyncMiddleware(positionController.getPosition),
);

router.delete(
  '/positions/:id',
  authAdmin,
  deletePositionValidate,
  asyncMiddleware(positionController.deletePosition),
);

module.exports = router;
