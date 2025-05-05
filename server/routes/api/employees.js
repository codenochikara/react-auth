const express = require('express');
const router = express.Router();
const path = require('path');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployeeById, getEmployeeById } = require('../../controllers/employeesController');

// Routes

router.route('/')
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployeeById);

router.route('/:id')
  .get(getEmployeeById)

module.exports = { employeesRouter: router };
