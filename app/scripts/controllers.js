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
.controller('SignupController',['$rootScope','$scope','$location','$localStorage','$window','Main',function($rootScope, $scope, $location, $localStorage,$window,Main){
   $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            Main.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/"    
                }
            }, function(err) {
                $rootScope.error = 'Failed to signup ' + err;
            })
        };
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location','$localStorage','$http','Main', function($rootScope, $scope, $location,$localStorage ,$http,Main) {
        Main.me(function(res) {
            $scope.user = res;
            if(!$scope.email)
                $scope.email = '-';
        }, function(err) {
            $rootScope.error = 'Failed to fetch details';
            console.error(err)
        })
}]);