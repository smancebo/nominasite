

var app = angular.module('fmpPortal');

app.controller('modalAddEmployeesController', ['$scope', '$modalInstance', '$staffService', 'employees', 'ngToast', function ($scope, $modalInstance, $staffService, employees, ngToast) {
    

  

    $scope.employees = [];
    $scope.schoolEmployees = employees;

    $staffService.getAll(function (data) {
        $scope.employees = data;
    })

    

    $scope.addEmployee = function(employee)
    {
        

        var isIn = $scope.schoolEmployees.filter(function (e) {
            return e.employee_code == employee.employee_code;
        });
        

        if (isIn.length == 0)
        {
            $scope.schoolEmployees.push(employee);
        }
        else
        {
            ngToast.create({
                className: 'danger',
                content: 'Can\'t add, Employee already exists'
            });
        }

    }

    $scope.ok = function () {
        $modalInstance.close();
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }


}]);