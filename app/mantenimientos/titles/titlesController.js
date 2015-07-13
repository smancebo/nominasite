
var app = angular.module('fmpPortal');


app.controller('titlesController', ['$scope', '$titlesService','$routeParams', function ($scope, $titlesService, $routeParams) {

    $scope.dataRows = {};

    
    if ($routeParams.titleId)
    {
        
        $titlesService.get($routeParams.titleId, function (data) {
            $scope.title = data;
        });
    }

    $titlesService.getAll(function (data) {
        $scope.dataRows = data;
    });

    $scope.save = function () {

        if ($scope.title != undefined) {
            $titlesService.save($scope.title, function (data) {
                console.log(data);
            });
        }
    };


}]);


