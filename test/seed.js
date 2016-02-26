var Employee = require('../models').models.Employee;
var Department = require('../models').models.Department;
var db = require('../models');

module.exports = function(){
    var larry, hr, curly;
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
      .then(function(_larry){
        larry = _larry;
        return Employee.create({ name: 'Curly' });
      })
      .then(function(_curly){
        curly = _curly;
        return Department.create({ name: 'HR' });
      })
      .then(function(_hr){
        hr = _hr;
        return Department.create({ name: 'Legal' });
      })
      .then(function(){
        return Department.create({ name: 'Engineering' });
      })
      .then(function(){
        //Larry manages HR
         return hr.setManager(larry);
      })
      .then(function(){
        //curly is in HR
        return curly.setDepartment(hr);
      });
};
