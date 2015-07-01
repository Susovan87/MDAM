'use strict';

angular.module('angularRestfulAuth')
    .factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "http://localhost:3000";
         var devices = [{
                                    id : '1',
                                    identifier : 'Butter',
                                    os : 'Android',
                                    version : '4.1',
                                    IMEI : '213123',
                                    model : 'Asus Zenfone'
                                },{
                                    id : '2',
                                    identifier : 'Milk',
                                    os : 'Android',
                                    version : '4.3',
                                    IMEI : '24343541',
                                    model : 'Samsung galaxy Y'
                                },{
                                    id : '3',
                                    identifier : 'Honey',
                                    os : 'iOS',
                                    version : '8',
                                    IMEI : '23344256',
                                    model : 'iPhone 6'
                                },{
                                    id : '4',
                                    identifier : 'Sugar',
                                    os : 'iOS',
                                    version : '7.1',
                                    IMEI : '213123',
                                    model : 'iPhone 5s'
                                }];
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
            getDevices: function(success,error){
               
                success(devices);
            },
            deleteDevice: function(id,success,error){
                success("success");
            },
            addDevice: function(data, success, error){
                success(data);
            },
            editUser : function(id,data,success,error){
                $http.put(baseUrl + '/api/users/'+id.data).success(success).error(error)
            }
        };
    }
]);