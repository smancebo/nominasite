

var app = angular.module('fmpPortal');

app.controller('securityGroupsController', ['$scope', '$routeParams', '$screensService', '$locationService', '$userService', function ($scope, $routeParams, $screensService, $locationService, $userService) {


    $scope.group = {};
    $scope.group.security_groups_users = [];
    $scope.modeClass = 'panel-default';
    $scope.title = "Add new Group ";
    $scope.form = {};
    

    if ($routeParams.Id) {
        $screensService.getGroup($routeParams.Id, function (data) {
            $scope.group = data;
            $scope.group.security_groups_users = [];
            $scope.modeClass = 'panel-warning';
            $scope.title = "Editing Group \"" + data.description + "\"";
        });
    }

    $screensService.getGroups(function (data) {
        $scope.dataRows = data;
    });

    $scope.onSelectUser = function (item, model, label) {
        
        $userService.getUser(item.id, function (user) {
            
            $scope.form.user = user;
            console.log($scope.form.user);
        });

    }

    $scope.loadUsers = function (name) {
        return $userService.loadUsers(name)
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

    $scope.addUserToGroup = function () {
        
        if (!$scope.userInGroup($scope.form.userGrp)) {

            $scope.group.security_groups_users.push({
                group_code: $scope.group.group_code,
                username: $scope.form.userGrp
            });

            $scope.users.push($scope.form.user);
        }
        else {
            alert('the selected user is already in group');
        }
    };

    $scope.removeUserFromGroup = function (user) {
        var foundUser = $scope.group.security_groups_users.filter(function (item) {
            return item.username == user.username;
        });

        var index = $scope.group.security_groups_users.indexOf(foundUser);
        var indexUser = $scope.group.users.indexOf(user);

        $scope.group.security_groups_users.splice(index, 1);
        $scope.group.users.splice(indexUser, 1);
    }

     $scope.userInGroup = function(username) {
        
        var user = $scope.group.security_groups_users.filter(function (item) {
            return item.username == username;
        });

        return user.length == 0 ? false : true;
    }

    $scope.save = function () {
        if ($scope.group != undefined && $scope.group.group_code != '' && $scope.group.description != '') {
            $screensService.saveGroup($scope.group, function (data) {
                if (data == 1) {
                    $locationService.changeLocation('security/groups');
                }
            });
        }
    }

    $scope.delete = function (id) {
        $screensService.deleteGroup(id, function (data) {
            if (data == 1) {
                $locationService.changeLocation('security/groups');
            }
        })
    }


}]);