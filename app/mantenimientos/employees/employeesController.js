
var app = angular.module('fmpPortal');


app.controllerProvider.register('employeesController', ['$scope', function ($scope) {

    $scope.variable = 9;

}]);


function pruebamelo() {
    console.log('probando')
}