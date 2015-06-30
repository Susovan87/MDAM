'use strict';

angular.module('angularRestfulAuth')
    .factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "http://localhost:3000";
        return {
           addUser: function(data, success, error) {
                $http.post(baseUrl + '/api/users', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            getUsers: function(success, error) {
                $http.get(baseUrl + '/api/users').success(success).error(error)
            },
            deleteUser: function(id, success, error) {
                $http.delete(baseUrl + '/api/users/'+id).success(success).error(error)
            },
        };
    }
]);