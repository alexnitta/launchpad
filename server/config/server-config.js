var express = require('express');
var partials = require('express-partials');
var utility = require('../lib/utility');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var ejs = require('ejs');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../../client/views');
app.use(partials());
app.use(bodyParser());
app.use(express.static(__dirname + '/../../client'));
app.use(cookieParser('oh wow, you really have a good secret'));
app.use(session());
app.use(morgan('dev'));

require('./routes.js')(app, express);

module.exports = app;
