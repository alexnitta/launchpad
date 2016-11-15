'use strict';

require ('dotenv').config();
const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/test/', function (req, res) {
  res.json({
    message: 'Welcome to prairie-dice!'
  });
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 3001;
  app.listen(port);

});
