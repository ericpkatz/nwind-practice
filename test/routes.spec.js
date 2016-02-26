var expect = require('chai').expect;
var app = require('supertest')(require('../app'));
var seed = require('./seed');
describe('Routes', function(){
  beforeEach(function(done){
    seed()
      .then(function(){
        done();
      });
  });
  describe('/', function(){
    it('has a title of home', function(done){
      app.get('/')
        .expect(200)
        .end(function(err, resp){
          if(err)
            return done(err);
          expect(resp.body.title).to.equal('Home');
          done();
        });
    });
  });
  describe('/departments', function(){
    it('there are three departments', function(done){
      app.get('/departments')
        .expect(200)
        .end(function(err, resp){
          if(err)
            return done(err);
          var departments = resp.body.departments;
          console.log(resp.body);
          var hr = departments.filter(function(department){
            return department.name === 'HR';
          })[0];
          console.log(hr);
          expect(hr.manager.name).to.equal('Larry');
          var employees = resp.body.employees;
          var curly = employees.filter(function(employee){
            return employee.name === 'Curly';
          })[0];
          expect(curly.department.name).to.equal('HR');
          done();
          
        });
      
    });
    
  });
});