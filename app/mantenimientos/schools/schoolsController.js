
var app = angular.module('fmpPortal');


app.controller('schoolsController', ['$scope', '$schoolService', '$routeParams', '$staffService', function ($scope, $schoolService, $routeParams, $staffService) {

    $scope.schools = {};
    $scope.charges = {};
    $scope.supervisors = {};



    if ($routeParams.schoolId) {
        $schoolService.get($routeParams.schoolId, function (data) {
            $scope.school = data;
        });
    }

    $staffService.getAll(function (data) {
        $scope.charges = data;
        $staffService.getSupervisors(function (sups) {
            $scope.supervisors = sups
        });

    });

    $schoolService.getAll(function (data) {
        $scope.schools = data;
    })
    $scope.save = function () {


        if ($scope.school != undefined) {

            $schoolService.save($scope.school, function (data) {
                console.log(data);
            });
        }
    }


}]);

