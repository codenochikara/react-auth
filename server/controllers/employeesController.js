const EmployeeModel = require('../models/Employee');

// Controller functions

const getAllEmployees = async (req, res) => {
  const employees = await EmployeeModel.find().lean();
  if (!employees || !employees.length) {
    return res.status(404).json({ "message": 'No employees found.' }); // Can also use res.sendStatus(204) for no content
  }
  res.json(employees);
}

const createEmployee = async (req, res) => {
  if (!req?.body?.name || !req?.body?.email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  try {
    const newEmployee = await EmployeeModel.create({
      name: req.body.name,
      email: req.body.email
    });

    // res.status(201).json(newEmployee);

    // Fetch the updated collection of employees
    const employees = await EmployeeModel.find().lean();

    // Return the newly created employee and the entire collection
    res.status(201).json({
      message: 'Employee created successfully.',
      newEmployee,
      employees
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

const updateEmployee = async (req, res) => {
  if (!req?.body?.id || (!req?.body?.name && !req?.body?.email)) {
    return res.status(400).json({ message: 'Employee ID and one other param required to update an employee.' });
  }

  const foundEmployee = await EmployeeModel.findOne({ _id: req.body.id });
  if (!foundEmployee) {
    return res.status(404).json({ "message": `No employee found matching ID ${req.body.id}.` });
  }

  if (req.body?.name) foundEmployee.name = req.body.name;
  if (req.body?.email) foundEmployee.email = req.body.email;

  await foundEmployee.save();
  const allEmployees = await EmployeeModel.find().lean();

  res.status(201).json({
    message: `Employee with the ID ${req.body.id} updated successfully.`,
    updatedEmployee: foundEmployee,
    allEmployees
  });
}

const deleteEmployeeById = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'Employee ID required.' });
  }

  // Avoid unnecessary database query and rely on the result of deleteOne
  /* const employeeToDelete = await EmployeeModel.findOne({ _id: req.body.id });
  if (!employeeToDelete) {
    return res.status(404).json({ "message": `No employee found matching ID ${req.body.id}.` });
  } */
  // const result = await employeeToDelete.deleteOne(); // Returns the deleted document

  const result = await EmployeeModel.deleteOne({ _id: req.body.id }); // Returns the result of the deletion operation
  if (result.deletedCount === 0) {
    // If no document was deleted (i.e., no matching id)
    return res.status(404).json({ message: `No employee found matching ID ${req.body.id}.` });
  }
  const allEmployees = await EmployeeModel.find().lean();

  res.status(201).json({
    message: `Employee with the ID ${req.body.id} deleted successfully.`,
    result,
    // deletedEmployee: employeeToDelete,
    allEmployees
  });
}

const getEmployeeById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ "message": 'Employee ID required.' });
  }

  const employee = await EmployeeModel.findById(req.params.id).lean();
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
