angular.module('ledger', [
  'ledger.auth',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/signin.ejs',
    controller: 'AuthController'
  })
  .when('/signin', {
    templateUrl: 'app/views/signin.ejs',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: 'app/views/signup.ejs',
    controller: 'AuthController'
  });
});


