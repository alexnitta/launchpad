angular.module('ledger', [
  'ledger.auth'
])
.controller('ledgerController', function($scope) {
  $scope.message = 'The app routing is working!';
});
