const data = {};
data.employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
  res.json(data.employees);
}

const createEmployee = (req, res) => {
  /* const newEmployee = req.body;
  data.employees.push(newEmployee);
  res.status(201).json(newEmployee); */
  res.json({
    "id": req.body.id,
    "name": req.body.name,
    "email": req.body.email
  });
}

const updateEmployee = (req, res) => {
  /* const updatedEmployee = req.body;
  const index = data.employees.findIndex(emp => emp.id === updatedEmployee.id);
  if (index !== -1) {
    data.employees[index] = updatedEmployee;
    res.json(updatedEmployee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  } */
  res.json({
    "id": req.body.id,
    "name": req.body.name,
    "email": req.body.email
  });
}

const deleteEmployeeById = (req, res) => {
  /* const employeeId = req.body.id;
  const index = data.employees.findIndex(emp => emp.id === employeeId);
  if (index !== -1) {
    data.employees.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Employee not found' });
  } */
  res.json({ "id": req.body.id });
}

const getEmployeeById = (req, res) => {
  /* const employeeId = parseInt(req.params.id, 10);
  const employee = data.employees.find(emp => emp.id === employeeId);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  } */
  res.json({ "id": req.params.id });
}

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
  getEmployeeById
};
