
(function(){





var app = angular.module('fmpPortal');

app.controller('payrollController', ['$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.payrollform = {};
    $scope.payroll = {
        startdate: '',
        enddate: '',
        username:''
    }
    
    $scope.checkOvertime = function(day)
    {
        if(day.regularHours > 8)
        {
            day.regularHours = 8;
            day.overtime = day.regularHours - 8;
        }
    }

    $scope.calculateDiff = function () {
        
        var dateFrom = new Date($scope.payroll.startdate);
        var dateTo = new Date($scope.payroll.enddate);
        $scope.payrollform.days = [];
        debugger
        var totalDays = dateTo.getDate() - dateFrom.getDate();
        for (var i = 0; i <= totalDays ; i++) {
            var day = new Object();
            var currentDate = new Date();
            currentDate.setDate(dateFrom.getDate() + i);
            day.day = weekDays[currentDate.getDay()];
            day.regularHours = 0;
            day.overtime = 0;
            $scope.payrollform.days.push(day);
        }

        console.log($scope.payrollform.days);

        
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

