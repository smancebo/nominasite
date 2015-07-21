
(function(){





    var app = angular.module('fmpPortal');


    app.controller('payrollController', ['$scope', '$routeParams', '$staffService', '$modal', '$reimbursementService', '$payrollService', function ($scope, $routeParams, $staffService, $modal, $reimbursementService, $payrollService) {
   
    
    $scope.disableDaysFrom = [0, 2, 3, 4, 5, 6];
    $scope.day = {};
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
            $scope.calculateEndDate();
            $scope.calculateDiff();
        }
    }, true);

    $scope.$watch('payroll.enddate', function (newValue, oldValue) {
        if (oldValue != newValue) {
            $scope.calculateDiff();
        }
    }, true);

    $scope.$watch('current.employee', function (newValue, oldValue) {
        if (newValue != oldValue) {
            if (newValue != undefined)
            {
                debugger
                var isin = $scope.employeeInPayroll(newValue.employee_code);

                if (isin == true) {
                    $scope.editEmployee(newValue.employee_code);
                }
            }
        }
    },true);

    $scope.calculateEndDate = function () {
        var date = new Date($scope.payroll.startdate);
        var dateTo = new Date();
        dateTo.setDate(date.getDate() + 6);
        $scope.payroll.enddate = dateTo.formatDate();
        $('.date-end').val(dateTo.formatDate());
    }

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
        $scope.cancelEmployee();
        console.log($scope.payroll.employees);
    }

    $scope.removeEmployee = function (employee_code) {
        $scope.payroll.employees = $scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code != employee_code;
        });
    }

    $scope.cancelEmployee = function () {

        $scope.current = {
            employee: {},
            days: []
        };
        $scope.calculateDiff();
    }

    $scope.editEmployee = function (employee_code) {
       
        $scope.current = $scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code == employee_code;
        })[0];
        $scope.tabs[0].active = true;
    }

    $scope.employeeInPayroll = function (employee_code) {

        var isin = $scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code == employee_code;
        });

        return isin.length == 0 ? false : true;
    }


    $scope.getReimbursementHours = function(day, type)
    {
        var totalHours = 0;
        if (day != undefined && day.reimbursements != undefined) {

            var rRegular = day.reimbursements.filter(function (r) {
                return r.type.id == type
            });

            for (var i = 0; i <= rRegular.length - 1; i++) {
                totalHours += parseFloat(day.reimbursements[i].hours);
            }
        }

        return totalHours;
    }

    $scope.getReimbursementRate = function (days, type) {

        var totalRate = 0;
        if (days != undefined) {

            days.forEach(function (day) {
                if (day != undefined && day.reimbursements != undefined) {
                    var rRegular = day.reimbursements.filter(function (r) {
                        return r.type.id == type
                    });

                    for (var i = 0; i <= rRegular.length - 1; i++) {
                        totalRate += (parseFloat(day.reimbursements[i].hours) * parseFloat(day.reimbursements[i].rate))
                    }
                }
            })
        }

        return totalRate;
    }

    
    $scope.savePayroll = function () {

        $payrollService.save($scope.payroll, function (data) {
            console.log(data);
        });

        //
    }

    /*Reimbursement Methods*/


    $scope.openReimbursement = function (day) {
        
        if ($scope.current.employee.employee_code != undefined) {


            $scope.day = day;
            var modalInstance = $modal.open({
                templateUrl: "/app/payroll/reimbursement/reimbursement-tpl.html",
                controller: 'modalReimbursementController',
                size: 'lg',
                animation: true,
                resolve: {
                    day: function () {
                        return day;
                    },
                    employee: function () {
                        return $scope.current.employee;
                    }
                }
            });

            modalInstance.result.then(function () {

            });
        }
        else
        {
            alert('Choose an employee first!')
        }
    }



}]);





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

