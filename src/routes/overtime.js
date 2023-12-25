const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const overtimeController = require('../controllers/overtime');
const {
  getOvertimesValidate,
  createOvertimeValidate,
  updateOvertimeValidate,
  getOvertimeValidate,
  deleteOvertimeValidate,
} = require('../validations/overtime');

const { auth } = require('../middlewares/auth');

router.get(
  '/overtimes',
  auth,
  getOvertimesValidate,
  asyncMiddleware(overtimeController.getListOvertimes),
);

router.post(
  '/overtimes',
  auth,
  createOvertimeValidate,
  asyncMiddleware(overtimeController.createOvertime),
);

router.put(
  '/overtimes/:id',
  auth,
  updateOvertimeValidate,
  asyncMiddleware(overtimeController.updateOvertime),
);

router.get(
  '/overtimes/:id',
  auth,
  getOvertimeValidate,
  asyncMiddleware(overtimeController.getOvertime),
);

router.delete(
  '/overtimes/:id',
  auth,
  deleteOvertimeValidate,
  asyncMiddleware(overtimeController.deleteOvertime),
);

module.exports = router;
