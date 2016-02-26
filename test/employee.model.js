var expect = require('chai').expect;
var Employee = require('../models').models.Employee;
var Department = require('../models').models.Department;
var seed = require('./seed');
var Promise = require('bluebird');

describe('Employee', function(){
  beforeEach(function(done){
    seed()
      .then(function(){
        done();
      });
  });
  var employees;

  beforeEach(function(done){
    Employee.findEmployees()
      .then(function(_employees){
        employees = _employees;
        done();
      });
  });

  it('There are three employees', function(){
    expect(employees.length).to.equal(3);
    expect(employees[0].name).to.equal('Curly');
  });

  describe('setting a department', function(){
    var curly;
    beforeEach(function(done){
      Promise.all([
          Employee.findOne({where: {name: 'Curly'}}),
          Department.findOne({where: {name: 'Legal'}})
      ])
      .spread(function(_curly, legal){
        return _curly.setDepartment(legal);
      })
      .then(function(){
        return Employee
          .findOne({ 
                where: {name: 'Curly'},
                include: [ Department ]
          });
      })
      .then(function(_curly){
        curly = _curly;
        done();
      }, done);
    });

    it('Curly is in Legal', function(){
      expect(curly.department.name).to.equal('Legal');
    });
  
  });

});
