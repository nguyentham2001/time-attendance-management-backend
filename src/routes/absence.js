const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const absenceController = require('../controllers/absence');
const {
  createAbsenceValidate,
  updateAbsenceValidate,
  getAbsenceValidate,
  deleteAbsenceValidate,
  getAbsencesValidate,
} = require('../validations/absence');

const { auth, authAdmin } = require('../middlewares/auth');

router.get(
  '/absences',
  auth,
  getAbsencesValidate,
  asyncMiddleware(absenceController.getListAbsences),
);

router.post(
  '/absences',
  authAdmin,
  createAbsenceValidate,
  asyncMiddleware(absenceController.createAbsence),
);

router.put(
  '/absences/:id',
  authAdmin,
  updateAbsenceValidate,
  asyncMiddleware(absenceController.updateAbsence),
);

router.get(
  '/absences/:id',
  auth,
  getAbsenceValidate,
  asyncMiddleware(absenceController.getAbsence),
);

router.delete(
  '/absences/:id',
  authAdmin,
  deleteAbsenceValidate,
  asyncMiddleware(absenceController.deleteAbsence),
);

module.exports = router;
