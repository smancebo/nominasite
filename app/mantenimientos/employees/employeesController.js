
var app = angular.module('fmpPortal');


app.controller('employeesController', ['$scope', '$staffService', '$routeParams', function ($scope, $staffService, $routeParams) {

    $scope.dataRows = {};
    //$scope.dataRows.columns = ['Employee Code', 'Name', 'Email'];
    if ($routeParams.employeeCode)
    {
        $staffService.get($routeParams.employeeCode, function (data) {
            $scope.employee = data;
        });
    }

    $staffService.getAll(function (data) {
        $scope.dataRows = data;
    })
    $scope.save = function () {
        
        
        if ($scope.employee != undefined) {
            
            $staffService.save($scope.employee, function (data) {
                console.log(data);
            });
        }
    }


}]);


function pruebamelo() {
    console.log('probando')
}