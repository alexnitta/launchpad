var express = require('express');
var partials = require('express-partials');
var utility = require('../lib/utility');
var handler = require('../lib/request-handler');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();


// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser());
app.use(express.static(__dirname + '../client/index.html'));
app.use(cookieParser('shhhh, very secret'));
app.use(session());

app.get('/', handler.renderIndex);

module.exports = app;
