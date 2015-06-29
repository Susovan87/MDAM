'use strict';

angular.module('angularRestfulAuth', [
    'ngStorage',
    'ngRoute',
    'angular-loading-bar'
])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'partials/me.html',
            controller: 'MeCtrl'
        }).
        when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'LoginController'
        }).
        when('/addUser', {
            templateUrl: 'partials/addUser.html',
            controller: 'AddUserController'
        }).
         when('/addedUser', {
            templateUrl: 'partials/addedUser.html',
        }).
        when('/addDevice', {
            templateUrl: 'partials/signup.html',
            controller: 'AddDeviceController'
        }).
        when('/me', {
            templateUrl: 'partials/me.html',
            controller: 'MeCtrl'
        }).
        when('/logout',{
            templateUrl : 'partials/logout.html',
            controller: 'LogoutController'
        }).
        when('/about',{
            templateUrl : 'partials/about.html',
        }).
        otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.url += '?access_token='+$localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/');
                    }
                    return $q.reject(response);
                }
            };
        }]);
       
    }
]);/*.
run(function($http){
    $http.defaults.headers.common.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cGlyZXMiOjE0MzYwMjI3NTYxOTN9.xx3Y_DxuC4ZK3hQ9dwBB3Pg5E3DMFYAvkxaMvIrM_Ws';
});*/