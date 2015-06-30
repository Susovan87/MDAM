'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
   .controller('HomeController', ['$rootScope', '$scope', '$location', '$localStorage', 'Main','$window', function($rootScope, $scope, $location, $localStorage, Main,$window) {
        if($localStorage.token){
            $rootScope.token = $localStorage.token;
            $rootScope.user = $localStorage.user;
            if($localStorage.user.isAdmin)
                $rootScope.isAdmin = $localStorage.user.isAdmin
        }
        
    }])
    .controller('LogoutController', ['$rootScope', '$scope', '$location', '$localStorage', 'Main','$window', function($rootScope, $scope, $location, $localStorage, Main,$window) {
        $scope.logout = function() {
          delete $localStorage.token
          delete $localStorage.user;
          $rootScope.token = $localStorage.token;
          $rootScope.user = $localStorage.user;
        };
    }])
.controller('LoginController',['$rootScope','$scope','$location','$localStorage','$window','Main',function($rootScope, $scope, $location, $localStorage,$window,Main){
    if($localStorage.token)
        $location.path('/me');
    $scope.signin = function() {
            var formData = {
                identity: $scope.identity,
                password: $scope.password
            }
            Main.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)    
                } else {
                    if(res.userName=='admin')
                        res.isAdmin = true;
                    $localStorage.token = res.token;
                    $localStorage.user = res;
                    $rootScope.user = res;
                    if(res.userName=='admin')
                        res.isAdmin = true;
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
     if($localStorage.token){
        $scope.name = $localStorage.user.name;
        $scope.email = $localStorage.user.email;
        $scope.id = $localStorage.user.id;
        $scope.userName = $localStorage.user.userName;
        
    }
    else{
        $location.path('/signin');
    }
}])
.controller('UserListController', ['$rootScope', '$scope', '$location','$localStorage','$http','Main', function($rootScope, $scope, $location,$localStorage ,$http,Main) {
     $scope.users = [{name:"User1",email:"emal1",userName:"userName1",id:"1"},{name:"User2",email:"emal2",userName:"userName2",id:"2"},{name:"User3",email:"emal3",userName:"userName3",id:"3"}]
     $scope.editUser = function(person){
        console.log(person.id);
     }
     $scope.deleteUser = function(person){
        console.log(person.id);
     }
}])
.controller('AddUserController', ['$rootScope', '$scope', '$location','$localStorage','$http','Main', function($rootScope, $scope, $location,$localStorage ,$http,Main) {
    $scope.addUser = function() {
            var formData = {
                name: $scope.name,
                userName: $scope.userName,
                email: $scope.email,
                password: $scope.password
            }

            Main.addUser(formData, function(res) {
                $rootScope.addedUser = res;
                $location.path('/addedUser');
            }, function(err) {
                $scope.error = 'Failed to addUser ' + err;
                console.error($scope.error);
            })
    };
}])    