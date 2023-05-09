const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');

const departmentController = require('../controllers/department');
const {
  createDepartmentValidate,
  updateDepartmentValidate,
  getDepartmentValidate,
  deleteDepartmentValidate,
  getDepartmentsValidate,
} = require('../validations/department');

const { auth, authAdmin } = require('../middlewares/auth');

router.get(
  '/departments',
  auth,
  getDepartmentsValidate,
  asyncMiddleware(departmentController.getListDepartments),
);

router.post(
  '/departments',
  authAdmin,
  createDepartmentValidate,
  asyncMiddleware(departmentController.createDepartment),
);

router.put(
  '/departments/:id',
  authAdmin,
  updateDepartmentValidate,
  asyncMiddleware(departmentController.updateDepartment),
);

router.get(
  '/departments/:id',
  auth,
  getDepartmentValidate,
  asyncMiddleware(departmentController.getDepartment),
);

router.delete(
  '/departments/:id',
  authAdmin,
  deleteDepartmentValidate,
  asyncMiddleware(departmentController.deleteDepartment),
);

module.exports = router;
