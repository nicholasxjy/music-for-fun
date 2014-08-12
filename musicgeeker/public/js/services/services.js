var app = angular.module('mGeek.services', []);

app.factory('Auth', ['$http', function($http){
    return {
        signup: function(info) {
            return $http.post('/api/user/signup', {data: info});
        },
        signin: function(info) {
            return $http.post('/api/user/signin', {data: info});
        },
        forgotPass: function(info) {
            return $http.post('/api/user/forgotpass', {data: info});
        },
        logout: function() {
            return $http.get('/api/user/logout');
        }
    }
}]);

app.factory('API', ['$http', function($http){
    return {
        getUser: function() {
            return $http.get('/api/getuser');
        },
        getSongs: function() {
            return $http.get('/api/getsongs/');
        },
        checkSong: function(audio) {
            return $http.post('/api/checksong', {data: audio});
        }
    }
}]);