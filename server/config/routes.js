var userController = require('../users/userController.js');

module.exports = function (app, express) {
  app.get('/', userController.renderIndex);
  app.get('/users', userController.findAll);
  app.get('/users/import', userController.import);
  app.get('/users/:id', userController.findById);
  app.put('/users/:id', userController.update);
  app.delete('/users/:id', userController.delete);
};
