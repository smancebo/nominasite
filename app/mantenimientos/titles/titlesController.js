
var app = angular.module('fmpPortal');


app.controller('titlesController', ['$scope', '$titlesService', '$routeParams', '$toast', '$route', '$locationService', function ($scope, $titlesService, $routeParams, $toast, $route, $locationService) {

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
                if (data == 1) {
                    $toast.create('success', 'Title added succesfully!');
                    $locationService.changeLocation('/titles');
                }
                else {
                    $toast.create('danger', '<b>Error:</b> ' + data);
                }
            });
        }
    };

    $scope.deleteTitle = function (titleId) {
        $titlesService.delete(titleId, function (data) {
            if (data == 1) {
                $toast.create('success', 'Title deleted successfully');
                $route.reload();
            }
            else {
                $toast.create('danger', '<b>Error: </b>' + data);
            }
        })
    }


}]);


