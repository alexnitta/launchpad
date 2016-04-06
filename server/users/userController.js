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
  User.find({}, function(err, results) {
    if (err) {
      console.log('error in userController: ', err);
    }
    return res.send(results);
  });
};

exports.add = function(req, res) {
  User.create(req.body, function (err, user) {
    if (err) {
      return console.log(err);
    }  
    console.log(req.params);
    return res.send();
  });
};

// sample data importer
exports.import = function(req, res) {
  User.create(
    { username: 'bob',
      password: 'dylan' },
    { username: 'hank',
      password: 'williams' },
    { username: 'john',
      password: 'prine' },
    { username: 'townes',
      password: 'van zandt'}  
    , function(err) {
      if (err) {
        return console.log(err);
      }
      return res.send(202);
    }
  );
};

exports.findById = function(req, res) {
  var id = req.params.id;
  User.findOne({'_id': id}, function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  User.update({'_id': id}, req.body, function (err, numberAffected) {
    if (err) {
      return console.log(err);
    }  
    console.log('Updated %d users', numberAffected);
    return res.send(202);
  });
};

exports.add = function(req, res) {
  User.create(req.body, function (err, user) {
    if (err) {
      return console.log(err);
    }
    return res.send(user);
  });
};

exports.delete = function(req, res){
  var id = req.params.id;
  User.remove({'_id': id}, function(result) {
    return res.send(result);
  });
};

