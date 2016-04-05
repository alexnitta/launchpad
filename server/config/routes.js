var handler = require('../lib/request-handler');

module.exports = function (app, express) {
  app.get('/', handler.renderIndex);
};
