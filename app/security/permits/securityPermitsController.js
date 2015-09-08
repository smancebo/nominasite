

var app = angular.module('fmpPortal');

app.controller('securityPermitsController', ['$scope', '$screensService', function ($scope, $screensService) {

    $scope.screens = [];

    $screensService.getAllScreens(function (data) {
        
        $scope.screens = data;
    })



}]);