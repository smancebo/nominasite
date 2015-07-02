
var app = angular.module('fmpPortal');


app.controller('employeesController', ['$scope', '$staffService', function ($scope, $staffService) {

    $scope.dataRows = {};
    //$scope.dataRows.columns = ['Employee Code', 'Name', 'Email'];

    $staffService.getAll(function (data) {
        $scope.dataRows = data;
    })
    $scope.save = function () {
        
        debugger
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