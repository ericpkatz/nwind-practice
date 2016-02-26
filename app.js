var Promise = require('bluebird');
var express = require('express');
var models = require('./models').models;
var Department = models.Department;
var Employee = models.Employee;
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false}));

module.exports = app;

app.get('/', function(req, res){
  res.send({
    title: 'Home'
  });
});

function departmentsAndEmployees(req, res, next){
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
    });
};

app.get('/departments', departmentsAndEmployees);
app.post('/departments', function(req, res, next){
  Department.create({name: req.body.name})
    .then(function(department){
      res.redirect('/departments'); 
    }, next);
});
app.get('/employees', departmentsAndEmployees);
app.post('/employees', function(req, res, next){
  Employee.create({name: req.body.name})
    .then(function(employee){
      res.redirect('/employees'); 
    }, next);
});