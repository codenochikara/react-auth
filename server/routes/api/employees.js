const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployeeById, getEmployeeById } = require('../../controllers/employeesController');
const ROLES_LIST = require('../../utils/constants/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

// Routes

router.route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), createEmployee)
  .put(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.admin), deleteEmployeeById);

router.route('/:id')
  .get(getEmployeeById)

module.exports = { employeesRouter: router };
