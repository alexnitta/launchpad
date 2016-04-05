var userController = require('../users/userController.js');

module.exports = function (app, express) {
  app.get('/', userController.renderIndex);
};
