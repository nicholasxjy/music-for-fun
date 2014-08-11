var app = angular.module('mGeek', ['ui.router', 'angular-loading-bar', 'ngAnimate', 'mGeek.controllers', 'mGeek.services']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
    })
    .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    });
});