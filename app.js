var Promise = require('bluebird');
var express = require('express');
var models = require('./models').models;
var Department = models.Department;
var Employee = models.Employee;

var app = express();

module.exports = app;

app.get('/', function(req, res){
  res.send({
    title: 'Home'
  });
});

app.get('/departments', function(req, res){
  var promises = Promise.all([
      Department.findAll({
        include: [{ model: Employee, as: 'manager'}]
      }),
      Employee.findAll({
        include: [{ model: Department, as: 'department'}]
      })
    ]);
    promises
    .spread(function(departments, employees){
      res.send({
        departments: departments,
        employees: employees 
      });
    })
});