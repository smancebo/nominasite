
(function(){





var app = angular.module('fmpPortal');

app.controller('payrollController', ['$scope', '$routeParams', '$staffService', function ($scope, $routeParams, $staffService) {

    
    $scope.tabs = [{ active: true }, { active: false }];
    $scope.payrollform = {};
    $scope.current = {
        employee: {},
        days:[]
    };
    $scope.payroll = {
        startdate: '',
        enddate: '',
        username: '',
        employees: []
    }

    $scope.$watch('payroll.startdate', function (newValue, oldValue) {
        if (oldValue != newValue) {
            $scope.calculateDiff()
        }
    }, true);

    $scope.$watch('payroll.enddate', function (newValue, oldValue) {
        if (oldValue != newValue) {
            $scope.calculateDiff()
        }
    }, true);

   /* $scope.$watch('current', function (newValue, oldValue) {
        if (oldValue.employee.employee_code != undefined) {

            var emp = $scope.payroll.employees.filter(function (e) {
                return e.employee.employee_code != oldValue.employee.employee_code
            });
            emp.push(oldValue);
            $scope.payroll.employees = emp;
            console.log($scope.payroll);
        }
    },true)*/

    $staffService.getAll(function (data) {
        $scope.employees = data;
    });
    
    $scope.checkOvertime = function(day)
    {
       
        if(parseInt(day.regularHours) > 0)
        {
            if (day.day == 'Sunday' || day.day == 'Saturday') {
                day.overtime = day.regularHours;
                day.regularHours = 0;
            }
            else {
                if (parseInt(day.regularHours) > 8) {

                    day.overtime = day.regularHours - 8;
                    day.regularHours = 8;
                }
                else if (parseInt(day.regularHours) <= 8) {
                    day.overtime = 0;
                }
            }
        }
    }

    $scope.calculateDiff = function () {
        
        var dateFrom = new Date($scope.payroll.startdate);
        var dateTo = new Date($scope.payroll.enddate);
        $scope.current.days = [];
        
        var totalDays = dateTo.getDate() - dateFrom.getDate();
        for (var i = 0; i <= totalDays ; i++) {
            var day = new Object();
            var currentDate = new Date();
            currentDate.setDate(dateFrom.getDate() + i);
            day.day = weekDays[currentDate.getDay()];
            day.regularHours = 0;
            day.overtime = 0;
            day.nigthDiff = 0;
            day.regularReimbursement = 0;
            day.overtimeReimbursement = 0;
            $scope.current.days.push(day);
        }
    }

    $scope.parseInt = function (value) {
        if (value == undefined) {
            return 0;
        }
        return parseInt(value);
    }

    $scope.parseFloat = function (value) {
        if (value == undefined) {
            return 0;
        }
        return parseFloat(value);
    }

    $scope.getField = function (field) {
        var value = $('[' + field + ']').html().trim().replace(/\,/g,'').replace(/\$/g,'');
        value = parseFloat(value);
        return value;
    }

    $scope.getOvertimes = function () {
        var Overtime = 0;
        $scope.current.days.forEach(function (e) {
            Overtime += e.overtime;
        });
        return Overtime;
    }

    $scope.addToPayroll = function () {
        
        $scope.payroll.employees = $scope.payroll.employees.filter(function (e) {
            
            return e.employee.employee_code != $scope.current.employee.employee_code
        });
        
        $scope.current.totalRegHours = $scope.getField('data-total-reg-hours');
        $scope.current.totalOvertimeHours = $scope.getField('data-total-overtime-hours');
        $scope.current.totalNigthDiff = $scope.getField('data-total-nigthdiff-hours');

        $scope.payroll.employees.push(clone($scope.current));
        $scope.current = {
            employee: {},
            days: []
        };
        $scope.calculateDiff();
        console.log($scope.payroll.employees);
    }

    $scope.removeEmployee = function (employee_code) {
        $scope.payroll.employees = $scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code != employee_code;
        });
    }

    $scope.editEmployee = function (employee_code) {
       
        //$scope.payroll.employees.push(clone($scope.current));
     //   console.log($scope.current);
        $scope.current = $scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code == employee_code;
        })[0];
        $scope.tabs[0].active = true;
    }



}]);



function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;

    var temp = new obj.constructor();
    for (var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}

function DateDiff(date1, date2) {
    return date1.getTime() - date2.getTime();
}



var weekDays = {
    0 : 'Sunday',
    1 : 'Monday',
    2 : 'Tuesday',
    3 : 'Wednesday',
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Saturday'
}


}())

