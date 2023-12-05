const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const absenceRequestController = require('../controllers/absenceRequest');
const {
  createAbsenceRequestValidate,
  updateAbsenceRequestValidate,
  getAbsenceRequestValidate,
  deleteAbsenceRequestValidate,
  getAbsenceRequestsValidate,
} = require('../validations/absenceRequest');

const { auth } = require('../middlewares/auth');

router.get(
  '/absence-requests',
  auth,
  getAbsenceRequestsValidate,
  asyncMiddleware(absenceRequestController.getListAbsenceRequests),
);

router.post(
  '/absence-requests',
  auth,
  createAbsenceRequestValidate,
  asyncMiddleware(absenceRequestController.createAbsenceRequest),
);

router.put(
  '/absence-requests/:id',
  auth,
  updateAbsenceRequestValidate,
  asyncMiddleware(absenceRequestController.updateAbsenceRequest),
);

router.get(
  '/absence-requests/:id',
  auth,
  getAbsenceRequestValidate,
  asyncMiddleware(absenceRequestController.getAbsenceRequest),
);

router.delete(
  '/absence-requests/:id',
  auth,
  deleteAbsenceRequestValidate,
  asyncMiddleware(absenceRequestController.deleteAbsenceRequest),
);

module.exports = router;
