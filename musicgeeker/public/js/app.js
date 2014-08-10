var app = angular.module('mGeek', ['ui.router', 'mGeek.controllers', 'mGeek.services']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
    })
    .state('home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    });
});