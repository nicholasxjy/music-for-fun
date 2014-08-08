var app = angular.module('mGeek.controllers', []);

app.controller('MainCtrl', ['$scope', function($scope) {
    $scope.msg = "Welcome to main page";
}]);

app.controller('LoginCtrl', ['$scope', function($scope){
    $scope.msg = "welcome to login page";
}]);