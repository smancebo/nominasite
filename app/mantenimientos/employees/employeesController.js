
var app = angular.module('fmpPortal');


app.controller('employeesController', ['$scope', '$staffService', function ($scope, $staffService) {

    $scope.dataRows = {};
    $scope.dataRows = [
        { 'Employee Code': '25002144', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002145', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002146', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002144', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002145', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002146', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002144', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002145', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002146', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002144', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002145', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002146', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002144', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002145', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002146', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' },
        { 'Employee Code': '25002147', 'Name': 'Samuel J Mancebo', 'Email': 'sjmancebo@gmail.com' }
    ];
    $scope.dataRows.columns = ['Employee Code', 'Name', 'Email'];
    console.log($staffService);

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