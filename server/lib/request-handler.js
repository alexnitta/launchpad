var request = require('request');
// var crypto = require('crypto');
var bcrypt = require('bcrypt');
var util = require('./utility');

var db = require('../config/db-config');

exports.renderIndex = function(req, res) {
  res.end('Hello from request handler');
  // res.render('index', {env: process.env.NODE_ENV}); 
};