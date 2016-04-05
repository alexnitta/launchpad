var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var util = require('../lib/utility');
var db = require('../config/db-config');

var User = require('./userModel');

exports.renderIndex = function(req, res) {
  console.log('process.env.PWD in userController: ', process.env.PWD);
  res.render('index', {pwd: process.env.PWD}); 
};

exports.findAll = function(req, res) {
  // res.send([{
  //   username: 'default',
  //   password: 'default'
  // }]);
  User.find({}, function(err, results) {
    if (err) {
      console.log('error in userController: ', err);
    }
    return res.send(results);
  });
};


