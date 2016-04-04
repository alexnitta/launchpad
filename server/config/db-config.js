var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/family-ledger');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error: '));
db.once('open', function() {
  console.log('Success! Connected to Mongoose DB');
});

module.exports = db;
