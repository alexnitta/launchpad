var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var util = require('../lib/utility');

var db = require('../config/db-config');

exports.renderIndex = function(req, res) {
  console.log('process.env.PWD in userController: ', process.env.PWD);
  res.render('index', {pwd: process.env.PWD}); 
};
