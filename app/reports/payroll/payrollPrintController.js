

var app = angular.module('fmpPortal');

app.controller('payrollPrintController', ['$rootScope', '$payrollService', '$routeParams', '$scope', function ($rootScope, $payrollService, $routeParams, $scope) {
    $rootScope.reportMode = undefined;
    $scope.parseInt = function (number) {
        return parseInt(number);
    }

    $scope.parseFloat = function (number) {
        return parseFloat(number);
    }
    $scope.getReimbursementHours = function (day, type) {
        var totalHours = 0;
        if (day != undefined && day.reimbursements != undefined) {

            var rRegular = day.reimbursements.filter(function (r) {
                return r.type == type
            });

            for (var i = 0; i <= rRegular.length - 1; i++) {
                totalHours += parseFloat(day.reimbursements[i].hours);
            }
        }

        return totalHours;
    }


    $scope.getReimbursementComments = function (day, type) {
        var comments = '';
        debugger
        if (day != undefined && day.reimbursements != undefined) {

            var rRegular = day.reimbursements.filter(function (r) {
                return r.type == type
            });

            for (var i = 0; i <= rRegular.length - 1; i++) {
                debugger
                comments += day.reimbursements[i].obj.abbreviation;
                if (i != rRegular.length - 1) {
                    (comments) += '|';
                }
            }
        }

        return comments == '|' ? '' : comments;
    }

    $scope.getReimbursementRate = function (days, type) {

        var totalRate = 0;
        if (days != undefined) {

            days.forEach(function (day) {
                if (day != undefined && day.reimbursements != undefined) {
                    var rRegular = day.reimbursements.filter(function (r) {
                        return r.type == type
                    });

                    for (var i = 0; i <= rRegular.length - 1; i++) {
                        totalRate += (parseFloat(day.reimbursements[i].hours) * parseFloat(day.reimbursements[i].rate))
                    }
                }
            })
        }

        return totalRate;
    }

    $scope.getRegularRate= function (employee) {
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

    if ($routeParams.Id) {

        $payrollService.get($routeParams.Id, function (data) {
            $scope.payroll = data;
            console.log(data);
        })

    }

}])