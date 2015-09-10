
var app = angular.module('fmpPortal');


app.controller('usersController', ['$scope', '$userService', '$routeParams', '$toast', '$route', '$locationService', '$schoolService', '$rootScope', function ($scope, $userService, $routeParams, $toast, $route, $locationService, $schoolService, $rootScope) {

    $scope.dataRows = {};
    $scope.passwordNotMath = false;
    $scope.user = {school_code : ""};
    $scope.txtConfirmPassword = "";
    $scope.txtUsername = "";
    $scope.editing = false;

    $scope.filterSchool = function (item) {

        var school_name = item.school.name;

        if (school_name.toLowerCase().indexOf($scope.txtSchool.toLowerCase()) != -1) {
            return true;
        }
        else
        {
            return false;
        }

    }
    
    $schoolService.getAll(function (data) {
        $scope.schools = data;
        console.log(data);

        if ($routeParams.userId) {

            $userService.get($routeParams.userId, function (data) {
                $scope.user = data;
                $scope.txtUsername = data.username;
                $scope.txtConfirmPassword = $scope.user.password;
                $scope.editing = true;
            });
        }
    });

    $userService.getAll(function (data) {
        $scope.dataRows = data;
    });

    $scope.save = function () {

        if ($scope.user != undefined && $scope.user.username != undefined && $scope.user.username != ""  && $scope.user.password != undefined && $scope.user.password != ""){
            $scope.passwordNotMath = false;
            if ($scope.user.password == $scope.txtConfirmPassword) {

                debugger
                $userService.save($scope.user, function (data) {
                    if (data == 1) {
                        $toast.create('success', 'User added succesfully!');
                        $locationService.changeLocation('/users');
                    }
                    else {
                        $toast.create('danger', '<b>Error:</b> ' + data);
                    }
                });
            }
            else
            {
                $rootScope.createAlert('danger', 'The password field and the confirm password field are not identical');
                $scope.passwordNotMath = true;
            }
        }
    };

    $scope.deleteUser = function (userId) {
        $userService.delete(userId, function (data) {
            if (data == 1) {
                $toast.create('success', 'User deleted successfully');
                $route.reload();
            }
            else {
                $toast.create('danger', '<b>Error: </b>' + data);
            }
        })
    }


}]);


