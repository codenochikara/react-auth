const express = require('express');
const router = express.Router();
const path = require('path');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployeeById, getEmployeeById } = require('../../controllers/employeesController');

const data = {};
data.employees = require('../../model/employees.json');

router.route('/')
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployeeById);

router.route('/:id')
  .get(getEmployeeById)

module.exports = { employeesRouter: router };
