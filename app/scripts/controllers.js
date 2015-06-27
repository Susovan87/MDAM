'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main','$window', function($rootScope, $scope, $location, $localStorage, Main,$window) {
        $scope.logout = function() {
          delete $localStorage.token
          $rootScope.token = $localStorage.token
        };
    }])
.controller('LoginController',['$rootScope','$scope','$location','$localStorage','$window','Main',function($rootScope, $scope, $location, $localStorage,$window,Main){
    $scope.signin = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }
            Main.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)    
                } else {
                    $localStorage.token = res.token;
                    $rootScope.token = $localStorage.token
                   $location.path('/me');    
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };
    }])
.controller('MeCtrl', ['$rootScope', '$scope', '$location','$localStorage','$http','Main', function($rootScope, $scope, $location,$localStorage ,$http,Main) {
        Main.me(function(res) {
            console.log(res+"Hellllloooooo");
        }, function() {
            $rootScope.error = 'Failed to fetch details';
            console.log("Dhurrrrrrrrrrrrrrrrrrrrrrrr paglaaaaa");
        })
}]);