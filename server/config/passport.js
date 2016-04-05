var JwtStrategy = require('passport-jwt').Strategy;

var User = require('../users/userController');
var config = require('./database');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    User.findOne({id: jwtPayload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
