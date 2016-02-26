var Employee = require('../models').models.Employee;
var Department = require('../models').models.Department;
var db = require('../models');

module.exports = function(){
    return db.connect()
      .then(function(){
        return db.sync();
      })
      .then(function(){
        return Employee.create({ name: 'Moe' });
      })
      .then(function(){
        return Employee.create({ name: 'Larry' });
      })
      .then(function(){
        return Employee.create({ name: 'Curly' });
      })
      .then(function(){
        return Department.create({ name: 'HR' });
      })
      .then(function(){
        return Department.create({ name: 'Legal' });
      })
      .then(function(){
        return Department.create({ name: 'Engineering' });
      });
};
