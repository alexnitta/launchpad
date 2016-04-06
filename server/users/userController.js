var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var util = require('../lib/utility');

var db = require('../config/db-config');

var passport = require ('../config/passport');

exports.renderIndex = function(req, res) {
  res.render('index', {pwd: process.env.PWD}); 
};

exports.signup = function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please enter a username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successfully created new user.'});
    });
  }
};

exports.import = function(req, res) {
  
}
