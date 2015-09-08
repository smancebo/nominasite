
(function(){





    var app = angular.module('fmpPortal');


    app.controller('payrollController', ['$scope',
        '$routeParams',
        '$staffService',
        '$modal',
        '$reimbursementService',
        '$payrollService',
        'ngToast',
        '$toast',
        '$locationService',
        '$route',
        '$window',
        function ($scope,
            $routeParams,
            $staffService,
            $modal,
            $reimbursementService,
            $payrollService,
            ngToast,
            $toast,
            $locationService,
            $route,
            $window) {
   
    $scope.employeeIndex = 0;
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

    $scope.payrollStatus = [{ id: true, description: 'Applied' }, { id: false, description: 'Not Applied' }];
    $scope.isCollapse = true;
   

    if ($route.current.$$route.viewing)
    {
        $scope.viewMode = true;
    }

    if ($routeParams.Id) {
        $payrollService.get($routeParams.Id, function (data) {
            $scope.payroll = data;
            $scope.current.employee = angular.copy($scope.employees[0]);
            if (!$scope.viewMode) {
                $scope.editing = true;
            }
            console.log(data);
        });
    }

    $payrollService.getAll(function (data) {
        $scope.dataRows = data;
    })
   

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
                
                var isin = $scope.employeeInPayroll(newValue.employee_code);

                if (isin == true) {
                    $scope.editEmployee(newValue.employee_code);
                }
                else
                {
                    $scope.calculateDiff();
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

    $staffService.getBySchool(function (data) {
        $scope.employees = data;
        if (!$routeParams.Id) {
            $scope.current.employee = angular.copy(data[0]);

        }

        //$scope.payroll.employees = data;
        //console.log($scope.payroll)
    });
    

    $scope.nextEmployee = function () {
        $scope.employeeIndex++;
        
        if ($scope.employeeIndex >= $scope.employees.length)
        {
            $scope.employeeIndex = 0;
        }
        $scope.current.employee = angular.copy($scope.employees[$scope.employeeIndex]);
    }

    $scope.prevEmployee = function () {
        
        $scope.employeeIndex--;
        if ($scope.employeeIndex < 0) {
            $scope.employeeIndex = 0;
        }
        $scope.current.employee = angular.copy($scope.employees[$scope.employeeIndex]);
    }

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
            day.date = currentDate.formatDateSql();
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

        $scope.payroll.employees.push(angular.copy($scope.current));
        $scope.cancelEmployee();
        $scope.nextEmployee();
        $toast.create('success','Employee added to payroll')
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
       
        $scope.current = angular.copy($scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code == employee_code;
        })[0]);
        $scope.tabs[0].active = true;
    }

    $scope.employeeInPayroll = function (employee_code) {

        var isin = $scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code == employee_code;
        });

        return isin.length == 0 ? false : true;
    }


    $scope.getRegularRate = function (employee) {
        var rate = ((parseInt(employee.days[0].regularHours) +
                     parseInt(employee.days[1].regularHours) +
                     parseInt(employee.days[2].regularHours) +
                     parseInt(employee.days[3].regularHours) +
                     parseInt(employee.days[4].regularHours) +
                     parseInt(employee.days[5].regularHours) +
                     parseInt(employee.days[6].regularHours)) * (parseFloat(employee.employee.title.payrate)));

        return rate;
    }

    $scope.getOvertimeRate = function (employee) {
        var rate = ((parseInt(employee.days[0].overtime) +
                     parseInt(employee.days[1].overtime) +
                     parseInt(employee.days[2].overtime) +
                     parseInt(employee.days[3].overtime) +
                     parseInt(employee.days[4].overtime) +
                     parseInt(employee.days[5].overtime) +
                     parseInt(employee.days[6].overtime)) * (parseFloat(employee.employee.title.payrate)) * 1.5);

        return rate;
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


    $scope.applyPayroll = function () {
        if(confirm('Once you apply the payroll you will not be able to modify it, want to proceed?'))
        {
            $payrollService.apply($scope.payroll.payment_id, function (data) {
                if (data == 1) {
                    $toast.create('success', 'Payroll applied succesfully!');
                    $locationService.changeLocation('/payroll');
                }
                else {
                    $toast.create('danger', '<b>Error:</b> ' + data);
                }
            })
        }
    }

    $scope.savePayroll = function () {

        $payrollService.save($scope.payroll, function (data) {
           
            var className = '';
            var toast = '';
            
            if(data == '1')
            {

                toast = ngToast.create({
                    className:'success',
                    content: 'Payroll Saved Successfully!'
                })
            }
            else
            {
                toast = ngToast.create({

                    className: 'danger',

                    content: '<b>Error occurred:</b> ' + data.Message
                });
            }

            //ngToast.dismiss(toast);

        });

        //
    }

            /*Reimbursement Methods*/


    $scope.deletePayroll = function (payment_id) {
        $payrollService.delete(payment_id, function (data) {
            if (data == 1) {
                $toast.create('success', 'Payroll deleted successfully');
                $route.reload();
            }
            else {
                $toast.create('danger', '<b>Error: </b>' + data);
            }
        });
    }


    $scope.printPayroll = function (payment_id) {

        $locationService.changeLocation('/payroll/print/' + payment_id);

    }

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
                    },
                    viewing: function () {
                        return $scope.viewMode
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

