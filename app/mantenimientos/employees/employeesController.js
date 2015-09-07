
var app = angular.module('fmpPortal');


app.controller('employeesController', ['$scope', '$staffService', '$routeParams', '$titlesService', '$toast', '$route', '$locationService', function ($scope, $staffService, $routeParams, $titlesService, $toast, $route, $locationService) {

    $scope.dataRows = {};
    $scope.titles = {};

    $scope.nameFilter = function(employee)
    {
        var name = employee.name + ' ' + (employee.middle_name ==  null ? '' : employee.middle_name) + ' ' + employee.last_name;
        if (name.toLocaleLowerCase().indexOf($scope.txtName.toLocaleLowerCase()) != -1)
        {
            return true;
        }
        else {
            return false
        }
    }

    $titlesService.getAll(function (data) {
        
        $scope.titles = data;

        if ($routeParams.employeeCode) {
            $staffService.get($routeParams.employeeCode, function (data) {
                $scope.employee = data;
                console.log($scope.employee);
            });
        }

    });

    $staffService.getAll(function (data) {
        $scope.dataRows = data;
    });

    $scope.save = function () {
        if ($scope.employee != undefined) {
            
            $staffService.save($scope.employee, function (data) {
                if (data == 1) {
                    $toast.create('success', 'Employee added succesfully!');
                    $locationService.changeLocation('/employees');
                }
                else {
                    $toast.create('danger', '<b>Error:</b> ' + data);
                }
            });
        }
    }

    $scope.deleteEmployee = function(employee_id)
    {
        $staffService.delete(employee_id, function (data) {
            if (data == 1) {
                $toast.create('success', 'Employee deleted successfully');
                $route.reload();
            }
            else
            {
                $toast.create('danger', '<b>Error: </b>' + data);
            }
        })
    }
}]);

