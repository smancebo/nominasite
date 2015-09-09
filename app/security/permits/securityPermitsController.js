

var app = angular.module('fmpPortal');

app.controller('securityPermitsController', ['$scope', '$screensService', function ($scope, $screensService) {

    $scope.screens = [];
    $scope.form = {
        id: '',
        screens: [],
        type:''
    }

    $screensService.getAllScreens(function (data) {
        
        $scope.screens = data;
    })


    $scope.toggleScreen = function (screen, parent) {
        debugger
        if ($scope.form.screens.indexOf(screen) != -1) {
            var index = $scope.form.screens.indexOf(screen);
            var parentIndex = $scope.form.screens.indexOf(parent);
            $scope.form.screens.splice(index, 1);
            if (parent) {

                var found = $scope.form.screens.filter(function (e) {
                    return e.parent == parent.screen_code;
                });
                
                if (parentIndex != -1) {
                    if (found.length == 0) {
                        $scope.form.screens.splice($scope.form.screens.indexOf(parent), 1);
                        parent.chkParent = false;
                    }
                }
            }
        }
        else
        {
            $scope.form.screens.push(screen);
            if(parent)
            {
                var parentIndex = $scope.form.screens.indexOf(parent);
                if (parentIndex == -1) {
                    $scope.form.screens.push(parent);
                    parent.chkParent = true;
                }
            }
        }
    }


}]);