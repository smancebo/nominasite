

var app = angular.module('fmpPortal');

app.controller('securityPermitsController', ['$scope', '$screensService', '$locationService', function ($scope, $screensService, $locationService) {

    $scope.screens = [];
    $scope.form = {
        id: '',
        screens: [],
        type:''
    }

    $screensService.getAllScreens(function (data) {
        
        $scope.screens = data;
    })

    $scope.onSelectUserGroup = function (item, model, label) {
        $scope.form.id = item.id;
        $scope.form.type = item.type;
        $screensService.getScreensUserGroup(item.id, function (screens) {

            $scope.form.screens = screens;

            console.log($scope.form.screens);

            $screensService.getScreensUserGroupAble(item.id, function (data) {
                $scope.screens = data;
            });
        });

    }

    $scope.loadUserGroup = function (name) {
        return $screensService.loadUserGroup(name)
        .then(function (data) {

            var d = data.data.map(function (item) {
                return item;
            });

            if (d.length == 0) {
                return null;
            }

            return d;
        });
        
    }


    $scope.save = function () {
        if (($scope.form.id != undefined && $scope.form.id != '') && ($scope.form.type != undefined && $scope.form.type != '')) {
            $screensService.save($scope.form);
        }
    }

    function isScreenInArray(array, screen) {
        var isin = array.filter(function (e) {
            return e.screen_code == screen.screen_code;
        });

        return isin.length == 0 ? -1 : true;
    }

    function removeScreenFromArray(array, screen) {

        var s = array.filter(function (item) {
            return item.screen_code == screen.screen_code;
        })[0];

        var index = array.indexOf(s);
        array.splice(index, 1);
    }

    $scope.toggleScreen = function (screen, parent) {
        debugger
        if (isScreenInArray($scope.form.screens,screen) != -1) {

            removeScreenFromArray($scope.form.screens, screen);
            screen.chkParent = false;
            if (parent) {

                var found = $scope.form.screens.filter(function (e) {
                    return e.parent == parent.screen_code;
                });
                
                if (isScreenInArray($scope.form.screens, parent) != -1) {
                    if (found.length == 0) {
                        removeScreenFromArray($scope.form.screens, parent);
                        parent.chkParent = false;
                    }
                }
            }
        }
        else
        {
            $scope.form.screens.push(screen);
            screen.chkParent = true;
            if(parent)
            {
                if (isScreenInArray($scope.form.screens,parent) == -1) {
                    $scope.form.screens.push(parent);
                    parent.chkParent = true;
                }
            }
        }
    }


}]);