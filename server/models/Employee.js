const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const EmployeeModel = mongoose.model('employees', employeeSchema);

module.exports = EmployeeModel;
