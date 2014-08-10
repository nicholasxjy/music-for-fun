var app = angular.module('mGeek.services', []);

app.factory('Auth', ['$http', function($http){
    return {
        signup: function(info) {
            return $http.post('/api/user/signup', {data: info});
        },
        signin: function(info) {
            return $http.post('/api/user/signin', {data: info});
        },
        logout: function() {
            return $http.get('/api/user/logout');
        }
    }
}]);