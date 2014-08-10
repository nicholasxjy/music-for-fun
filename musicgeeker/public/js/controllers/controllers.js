var app = angular.module('mGeek.controllers', ['ngDialog', 'mGeek.services', 'ui.router']);

app.controller('MainCtrl', ['$scope','ngDialog', function($scope, ngDialog) {
    $scope.showLoginModal = function() {
        ngDialog.open({
            template: 'partials/login.html',
            controller: 'LoginCtrl'
        });
    };
}]);

app.controller('LoginCtrl', ['$scope', 'ngDialog', 'Auth', '$timeout', '$state', function($scope, ngDialog, Auth, $timeout, $state){
    $scope.login = {};
    $scope.showSignupModal = function() {
        ngDialog.close('ngdialog1');
        ngDialog.open({
            template: 'partials/register.html',
            controller: 'SignupCtrl'
        });
    };
    $scope.showForgotPassModal = function() {
        ngDialog.close('ngdialog1');
        ngDialog.open({
            template: 'partials/forgetpass.html',
            controller: 'ForgotPassCtrl'
        });
    };
    $scope.loginFormSubmit = function(user) {
        var info = user;
        Auth.signin(info)
            .success(function(result) {
                if (result.status === 'fail') {
                    $scope.hasError = true;
                    $scope.login.msg = result.msg;
                } else {
                    if (result.activetip !== '') {
                        $scope.hasError = true;
                        $scope.login.msg = result.activetip;
                        $timeout(function() {
                             $state.go('home');
                        }, 2000);
                    } else {
                        $state.go('home');
                    }

                }
            })
            .error(function() {
                alert("Something goes wrong here, dear!");
            })
    }
}]);

app.controller('SignupCtrl', ['$scope', 'ngDialog', 'Auth', function($scope, ngDialog, Auth) {

    $scope.hasError = false;
    $scope.resultDone = false;
    $scope.register = {};
    $scope.register.msg = "";


    $scope.showLoginModal = function() {
        ngDialog.close('ngdialog2');
        ngDialog.open({
            template: 'partials/login.html',
            controller: 'LoginCtrl'
        });
    };

    $scope.registerFormSubmit = function(user) {
        var info = user;
        console.log(info);
        Auth.signup(info)
            .success(function(result) {
                //console.log(result);
                if (result.status === 'fail') {
                    $scope.hasError = true;
                    $scope.resultDone = true;
                    $scope.register.msg = result.msg;
                } else {
                    $scope.hasError = false;
                    $scope.resultDone = true;
                    $scope.register.msg = result.msg;
                }
            })
            .error(function(error) {
                alert("Something goes wrong here, dear!");
            })
    }
}]);

app.controller('ForgotPassCtrl', ['$scope', 'ngDialog', function($scope, ngDialog){

}]);


app.controller('HomeCtrl', ['$scope', function($scope){

}]);