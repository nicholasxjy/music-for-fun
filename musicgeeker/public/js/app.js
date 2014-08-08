var app = angular.module('mGeek', ['ui.router', 'mGeek.controllers']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
    }).state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
    });
});