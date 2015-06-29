
var app = angular.module('fmpPortal');


app.controller('employeesController', ['$scope', function ($scope) {

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


}]);


function pruebamelo() {
    console.log('probando')
}