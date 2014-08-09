var app = angular.module('mGeek.controllers', ['ngDialog']);

app.controller('MainCtrl', ['$scope','ngDialog', function($scope, ngDialog) {
    $scope.showLoginModal = function() {
        ngDialog.open({
            template: 'partials/login.html'
        });
    }
}]);

app.controller('LoginCtrl', ['$scope', function($scope){
    $scope.msg = "welcome to login page";
}]);