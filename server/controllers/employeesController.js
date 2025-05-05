const { v4: uuid } = require('uuid');

const data = {
  employees: require('../models/employees.json'),
  setEmployees: function (data) {
    this.employees = data;
  }
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
}

const createEmployee = (req, res) => {
  // const newEmployee = req.body;
  const newEmployee = {
    // "id": data.employees[data.employees.length - 1].id + 1 || 1,
    "id": uuid(),
    "name": req.body.name,
    "email": req.body.email
  };

  if (!newEmployee.name || !newEmployee.email) {
    return res.status(400).json({ "message": 'Name and email are required.' });
  }

  // data.employees.push(newEmployee);
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
  // res.status(201).json(newEmployee);
  /* res.json({
    "id": req.body.id,
    "name": req.body.name,
    "email": req.body.email
  }); */
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
  /* res.json({
    "id": req.body.id,
    "name": req.body.name,
    "email": req.body.email
  }); */
  const employee = data.employees.find(emp => emp.id === req.body.id);
  if (!employee) {
    return res.status(400).json({ "message": `Employee ID ${req.body.id} not found.` });
  }
  if (req.body.name) employee.name = req.body.name;
  if (req.body.email) employee.email = req.body.email;
  const filteredArray = data.employees.filter(emp => emp.id !== req.body.id);
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.json(data.employees);
}

const deleteEmployeeById = (req, res) => {
  /* const employeeId = parseInt(req.body.id);
  const index = data.employees.findIndex(emp => emp.id === employeeId);
  if (index !== -1) {
    data.employees.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Employee not found' });
  } */
  // res.json({ "id": req.body.id });
  const employee = data.employees.find(emp => emp.id === req.body.id);
  if (!employee) {
    return res.status(400).json({ "message": `Employee ID ${req.body.id} not found.` });
  }
  const filteredArray = data.employees.filter(emp => emp.id !== req.body.id);
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
}

const getEmployeeById = (req, res) => {
  /* const employeeId = parseInt(req.params.id, 10);
  const employee = data.employees.find(emp => emp.id === employeeId);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  } */
  // res.json({ "id": req.params.id });
  const employee = data.employees.find(emp => emp.id === req.params.id);
  if (!employee) {
    return res.status(400).json({ "message": `Employee ID ${req.params.id} not found.` });
  }
  res.json(employee);
}

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
  getEmployeeById
};
