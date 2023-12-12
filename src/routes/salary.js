const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const salaryController = require('../controllers/salary');

const { auth, authAdmin } = require('../middlewares/auth');
const {
  createSalaryValidate,
  updateSalaryValidate,
  getSalaryValidate,
  deleteSalaryValidate,
  activeSalaryValidate,
} = require('../validations/salary');

router.get(
  '/salaries',
  auth,
  asyncMiddleware(salaryController.getListSalaries),
);

router.post(
  '/salaries',
  authAdmin,
  createSalaryValidate,
  asyncMiddleware(salaryController.createSalary),
);

router.put(
  '/salaries/:id',
  authAdmin,
  updateSalaryValidate,
  asyncMiddleware(salaryController.updateSalary),
);

router.get(
  '/salaries/:id',
  auth,
  getSalaryValidate,
  asyncMiddleware(salaryController.getSalary),
);

router.delete(
  '/salaries/:id',
  authAdmin,
  deleteSalaryValidate,
  asyncMiddleware(salaryController.deleteSalary),
);

router.post(
  '/active-salary',
  authAdmin,
  activeSalaryValidate,
  asyncMiddleware(salaryController.activeSalary),
);

module.exports = router;
