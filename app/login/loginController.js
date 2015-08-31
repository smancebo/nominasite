

var app = angular.module('fmpPortal');



app.controller('loginController', ['$scope', '$userService','$location', function ($scope, $userService,$location) {

    $scope.cancel = function () {
        $scope.$dismiss();
        $location.path('/');
    }
    $scope.msgLabel = '';
    $scope.loading = false;

    $scope.submit = function (credentials) {
        $scope.msgLabel = '';
        if (credentials != undefined && credentials.username != '' && credentials.password != '') {
            $scope.loading = true;
            $userService.login(credentials.username, credentials.password, function (user) {
                
                $scope.loading = false;
                if (user != '' &&  user!= undefined)
                {
                   
                    $scope.$close(user);
                }
                else {
                    $scope.msgLabel = "Invalid Username or Password";
                }

            });
        }
    };

    



}]);