var express = require('express');

var app = express();

module.exports = app;

app.get('/', function(req, res){
  res.send({
    title: 'Home'
  });
});