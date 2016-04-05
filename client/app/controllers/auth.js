angular.module('ledger.auth', [])
.constant('API', 'http://test-routes.herokuapp.com')
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.controller('AuthController', function(user, auth) {
  var self = this;
  self.isAuthed = auth.isAuthed;
  self.logout = auth.logout;
  var handleRequest = function (res) {
    var token = res.data ? res.data.token : null;
    if (token) {
      console.log('JWT: ', token);
    }
    self.message = res.data.message;
  };
  self.login = function() {
    user.login(self.username, self.password)
    .then(handleRequest, handleRequest);
  };
  self.register = function() {
    user.register(self.username, self.password)
    .then(handleRequest, handleRequest);
  };
  self.getQuote = function() {
    user.getQuote()
      .then(handleRequest, handleRequest);
  };
  self.logout = function() {
    auth.logout && auth.logout();
  };
  self.isAuthed = function() {
    return auth.isAuthed ? auth.isAuthed() : false;
  };
})
.factory('authInterceptor', function authInterceptor(API, auth) {
  return {
    request: function(config) {
      var token = auth.getToken();
      if (config.url.indexOf(API) === 0 && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function(res) {
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        auth.saveToken(res.data.token);
      }
      return res;
    },
    responseError: function(res) {
      if (res.status === 401) {
        $window.location.href = API + '/auth/login';
      }
      return res;
    }
  };
})
.service('user', function userService($http, API, auth) {
  var self = this;
  self.getQuote = function() {
    return $http.get(API + '/auth/quote');
  };
  self.register = function(username, password) {
    return $http.post(API + '/auth/register', {
      username: username,
      password: password
    });
  };
  self.login = function(username, password) {
    return $http.post(API + '/auth/login', {
      username: username,
      password: password
    });
  };
})
.service('auth', function authService($window) {
  var self = this;
  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  };
  self.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  };
  self.getToken = function() {
    return $window.localStorage['jwtToken'];
  };
  self.isAuthed = function() {
    var token = self.getToken();
    if (token) {
      var params = self.parseJwt(token);
      return (
        Math.round(new Date().getTime() / 1000) <= params.exp
      );
    } else {
      return false;
    }  
  };
  self.logout = function() {
    $window.localStorage.removeItem('jwtToken');
  };
});
