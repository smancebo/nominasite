
var app = angular.module('fmpPortal');


app.controller('schoolsController', ['$scope', '$schoolService', '$routeParams', '$staffService', '$modal', '$toast', '$route','$locationService', function ($scope, $schoolService, $routeParams, $staffService, $modal, $toast, $route,$locationService) {

    
    $scope.school = {};
    $scope.schools = {};
    $scope.charges = {};
    $scope.supervisors = {};
    $scope.school.employees = [];
 

    $scope.managerFilter = function (item) {

        var employee_manager = item.employee_manager.name;
        
        if (employee_manager.toLocaleLowerCase().indexOf($scope.txtManager.toLocaleLowerCase()) != -1) {
            return true;
        }
        else
        {
            return false;
        }
    }

    $scope.supervisorFilter = function (item) {
        if (item.supervisor.name.toLocaleLowerCase().indexOf($scope.txtSupervisor.toLocaleLowerCase()) != -1) {
            return true;
        }
        else
        {
            return false;
        }
    }


    if ($routeParams.schoolId) {
        $schoolService.get($routeParams.schoolId, function (data) {
            
            if (!data.employees)
            {
                data.employees = [];
            }
            
            $scope.school = data;
        });
    }

    $staffService.getAll(function (data) {
        $scope.charges = data;
        $staffService.getSupervisors(function (sups) {
            $scope.supervisors = sups
        });

    });

    $schoolService.getAll(function (data) {
        $scope.schools = data;
    });

    $scope.deleteSchool = function (schoolId) {

        $schoolService.delete(schoolId, function (data) {
            
            if (data == 1) {
                $toast.create('success', 'School deleted succesfully');
                $route.reload();
            }
            else {
                $toast.create('danger', '<b>Error:</b> ' + data);
            }
        })

    }


    $scope.removeEmployee = function (employee) {

        var filtered = $scope.school.employees.filter(function (e) {
            return e.employee_code != employee.employee_code
        });

        $scope.school.employees = filtered;
        $scope.txtFilter = "";
    }


    $scope.openEmployees = function () {

        var modalInstance = $modal.open({
            templateUrl: "/app/shared/components/addEmployees/add-employee-tpl.html",
            controller: 'modalAddEmployeesController',
            size: 'lg',
            animation: true,
            resolve: {
                employees: function () {
                    debugger
                    return $scope.school.employees;
                }
            }

        });

        modalInstance.result.then(function () {

        });

    }


    $scope.save = function () {

        debugger
        if ($scope.school != undefined) {

            $schoolService.save($scope.school, function (data) {
                if (data == 1) {
                    $toast.create('success', 'School added succesfully!');
                    $locationService.changeLocation('/schools');
                }
                else{
                    $toast.create('danger', '<b>Error:</b> ' + data);
                }
            });
        }
    }


}]);

