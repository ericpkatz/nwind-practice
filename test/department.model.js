var expect = require('chai').expect;
var db = require('../models');
var Department = require('../models').models.Department;
var Employee = require('../models').models.Employee;
var seed = require('./seed');
var Promise = require('bluebird');

describe('Department', function(){
  beforeEach(function(done){
    seed()
      .then(function(){
        done();
      });
  });
  var departments;

  beforeEach(function(done){
    Department.findDepartments()
      .then(function(_departments){
        departments = _departments;
        done();
      });
  });

  it('There are three departments', function(){
    expect(departments.length).to.equal(3);
    expect(departments[0].name).to.equal('Engineering');
  });

  describe('setting a manager', function(){
    describe('Make curly the manager of engineering', function(){
      var engineering;
      beforeEach(function(done){
        var promises = [
          Employee.findByName('Curly'),
          Department.findByName('Engineering'),
        ];
        Promise.all(promises)
          .spread(function(_curly, _engineering){
            _engineering.setManager(_curly);
          })
          .then(function(eng){
            return Department.findByName('Engineering');
          })
          .then(function(_engineering){
            engineering = _engineering;
            done();
          });
      });
      it('curly is the manager of engineering', function(){
        expect(engineering.manager.name).to.equal('Curly');
      });
    });
  });
});
