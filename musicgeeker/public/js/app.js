var app = angular.module('mGeek', ['ui.router', 'angular-loading-bar', 'ngAnimate', 'mGeek.controllers', 'mGeek.services', 'mGeek.directives']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
    })
    .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
    });
});