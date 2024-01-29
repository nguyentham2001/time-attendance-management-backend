const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const salaryController = require('../controllers/salary');

const { auth, authAdmin } = require('../middlewares/auth');
const {
  createSalaryValidate,
  updateSalaryValidate,
  getSalaryValidate,
  deleteSalaryValidate,
} = require('../validations/salary');

router.get('/salary', auth, asyncMiddleware(salaryController.getListSalary));

router.post(
  '/salary',
  authAdmin,
  createSalaryValidate,
  asyncMiddleware(salaryController.createSalary),
);

router.put(
  '/salary/:id',
  authAdmin,
  updateSalaryValidate,
  asyncMiddleware(salaryController.updateSalary),
);

router.get(
  '/salary/:id',
  auth,
  getSalaryValidate,
  asyncMiddleware(salaryController.getSalary),
);

router.delete(
  '/salary/:id',
  authAdmin,
  deleteSalaryValidate,
  asyncMiddleware(salaryController.deleteSalary),
);

module.exports = router;
