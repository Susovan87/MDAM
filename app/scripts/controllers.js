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
                    $rootScope.isAdmin = res.isAdmin;

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
.controller('UserListController', ['$route','$rootScope', '$scope', '$location','$localStorage','$http','Main', function($route,$rootScope, $scope, $location,$localStorage ,$http,Main) {
     //$rootScope.users = [{name:"User1",email:"emal1",userName:"userName1",id:"1"},{name:"User2",email:"emal2",userName:"userName2",id:"2"},{name:"User3",email:"emal3",userName:"userName3",id:"3"}]
     Main.getUsers(function(res) {
         $scope.users = res;
         console.log(res);
     },function(err){
          console.error(err);
     });
     $scope.editUser = function(person){
        console.log(person.id);
        $rootScope.editUser = person;
        $location.path('/editUser');
     }
     $scope.deleteUser = function(person){
        console.log(person.id);
        Main.deleteUser(person.id,function(res){
            console.log(res);
            $route.reload();
        },function(err){
            console.log(err);
        });
     }
}])
.controller('EditUserController', ['$route','$rootScope', '$scope', '$location','$localStorage','$http','Main', function($route,$rootScope, $scope, $location,$localStorage ,$http,Main) {
    var pass = $scope.password=='DummyValue'?null:$scope.password;
     var id = $rootScope.editUser.id;
    
    $scope.save = function() {
        var formData = {
            name: $scope.name,
            userName: $scope.userName,
            email: $scope.email,
            password: pass
        };
        Main.editUser(id,editedUser,function(res) {
            if($rootScope.user.id == $rootScope.editUser.id){
                $rootScope.user = $rootScope.editUser;
                $location.path('/me');
            }
            else{
                $location.path('/userList');
            }
        },function(err){
          $scope.error = err;
        });
    }
    $scope.editUser = function(person){
        console.log(person.id);
        $rootScope.editUser = person;
        $location.path('/editUser');
    }
    $scope.deleteUser = function(person){
        console.log(person.id);
        Main.deleteUser(person.id,function(res){
            console.log(res);
            $route.reload();
        },function(err){
            console.log(err);
        });
    }
}])
.controller('DeviceListController', ['$route','$rootScope', '$scope', '$location','$localStorage','$http','Main', function($route,$rootScope, $scope, $location,$localStorage ,$http,Main) {
     //$rootScope.users = [{name:"User1",email:"emal1",userName:"userName1",id:"1"},{name:"User2",email:"emal2",userName:"userName2",id:"2"},{name:"User3",email:"emal3",userName:"userName3",id:"3"}]
     Main.getDevices(function(res) {
         $scope.devices = res;
         console.log(res);
     },function(err){
          console.error(err);
     });
     $scope.editDevice = function(device){
        console.log(device.id);
     }
     $scope.deleteDevice = function(device){
        console.log(device.id);
        Main.deleteDevice(device.id,function(res){
            console.log(res);
            $route.reload();
        },function(err){
            console.log(err);
        });
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
                $scope.error = 'Failed to add User ' + err;
                console.error($scope.error);
            })
    };
}])
.controller('AddDeviceController', ['$rootScope', '$scope', '$location','$localStorage','$http','Main', function($rootScope, $scope, $location,$localStorage ,$http,Main) {
    $scope.addDevice = function() {
            var formData = {
                identifier: $scope.identifier,
                model: $scope.model,
                os: $scope.os,
                version: $scope.version,
                IMEI : $scope.IMEI
            }

            Main.addDevice(formData, function(res) {
                $rootScope.addedDevice = res;
                $location.path('/addedDevice');
            }, function(err) {
                $scope.error = 'Failed to add Device' + err;
                console.error($scope.error);
            })
    };
}]);    