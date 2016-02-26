var expect = require('chai').expect;
var app = require('supertest')(require('../app'));
describe('Routes', function(){
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
});