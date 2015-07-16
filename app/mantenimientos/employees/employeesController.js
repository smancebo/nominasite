
var app = angular.module('fmpPortal');


app.controller('employeesController', ['$scope', '$staffService', '$routeParams', '$titlesService', function ($scope, $staffService, $routeParams, $titlesService) {

    $scope.dataRows = {};
    $scope.titles = {};
    //$scope.dataRows.columns = ['Employee Code', 'Name', 'Email'];

    $titlesService.getAll(function (data) {
        debugger
        $scope.titles = data;

        if ($routeParams.employeeCode) {
            $staffService.get($routeParams.employeeCode, function (data) {
                $scope.employee = data;
            });
        }

    });



    $staffService.getAll(function (data) {
        $scope.dataRows = data;
    })
    $scope.save = function () {
        
        
        if ($scope.employee != undefined) {
            debugger
            $staffService.save($scope.employee, function (data) {
                console.log(data);
            });
        }
    }


}]);


function pruebamelo() {
    console.log('probando')
}