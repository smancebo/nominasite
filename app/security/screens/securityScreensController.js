

var app = angular.module('fmpPortal');


app.controller('securityScreensController', ['$scope', '$screensService', '$locationService', '$routeParams', function ($scope, $screensService, $locationService, $routeParams) {

   
    $screensService.getAllScreensView(function (data) {
        $scope.dataRows = data;
    })

    if ($routeParams.Id) {
        $screensService.getScreen($routeParams.Id, function (data) {
            $scope.screen = data;
        })
    }


    $scope.delete = function (id) {
        $screensService.deleteScreen(id, function (data) {
            if (data == 1) {
                $locationService.changeLocation('/security/screens');
            }
        });
    }

    $scope.save = function () {
        if ($scope.screen != undefined) {
            $screensService.saveScreen($scope.screen);
        }
    }


}]);