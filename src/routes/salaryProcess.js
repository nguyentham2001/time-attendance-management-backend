const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const salaryProcessController = require('../controllers/salaryProcess');

const { auth, authAdmin } = require('../middlewares/auth');
const {
  createSalaryProcessValidate,
  updateSalaryProcessValidate,
  getSalaryProcessValidate,
  deleteSalaryProcessValidate,
  activeSalaryProcessValidate,
} = require('../validations/salaryProcess');

router.get(
  '/salary-process',
  auth,
  asyncMiddleware(salaryProcessController.getListSalaryProcess),
);

router.post(
  '/salary-process',
  authAdmin,
  createSalaryProcessValidate,
  asyncMiddleware(salaryProcessController.createSalaryProcess),
);

router.put(
  '/salary-process/:id',
  authAdmin,
  updateSalaryProcessValidate,
  asyncMiddleware(salaryProcessController.updateSalaryProcess),
);

router.get(
  '/salary-process/:id',
  auth,
  getSalaryProcessValidate,
  asyncMiddleware(salaryProcessController.getSalaryProcess),
);

router.delete(
  '/salary-process/:id',
  authAdmin,
  deleteSalaryProcessValidate,
  asyncMiddleware(salaryProcessController.deleteSalaryProcess),
);

router.post(
  '/active-salary-process',
  authAdmin,
  activeSalaryProcessValidate,
  asyncMiddleware(salaryProcessController.activeSalaryProcess),
);

module.exports = router;
