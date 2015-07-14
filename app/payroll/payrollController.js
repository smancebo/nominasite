
(function(){





var app = angular.module('fmpPortal');

app.controller('payrollController', ['$scope', '$routeParams', '$staffService', function ($scope, $routeParams, $staffService) {

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

    $scope.$watch('payroll.enddate', function (oldValue, newValue) {
        if (oldValue != newValue) {
            $scope.calculateDiff()
        }
    }, true);

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
            day.diffHours = 0;
            day.regularReimbursement = 0;
            day.overtimeReimbursement = 0;
            $scope.current.days.push(day);
        }
    }

    $scope.parseInt = function (value) {
        if (value === '') {
            return 0;
        }
        return parseInt(value);
    }

    $scope.parseFloat = function (value) {
        if (value === '') {
            return 0;
        }
        return parseFloat(value);
    }

    $scope.getRegsHours = function () {
        var regularHour = 0;
        
        
        
        return regularHour;
    }

    $scope.getOvertimes = function () {
        var Overtime = 0;
        $scope.current.days.forEach(function (e) {
            Overtime += e.overtime;
        });
        return Overtime;
    }


    $("#ddlEmployees").on('change', function () {
        var emp = $scope.payroll.employees.filter(function (e) {
            return e.employee.employee_code == $scope.current.employee.employee_code
        });
        $scope.payroll.employees = emp;
        emp.push($scope.current);
        console.log($scope.payroll);
    });

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

