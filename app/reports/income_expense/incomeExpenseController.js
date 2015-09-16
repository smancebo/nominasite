

var app = angular.module('fmpPortal');


app.controller('incomeExpenseController', ['$scope', '$session', '$locationService', function ($scope, $session, $locationService) {
    

    if ($session.params.from != undefined && $session.params.to != undefined) {
        //print
        debugger
        console.log('printing mode');
    }

    $scope.print = function () {
        debugger
        $session.params.from = $scope.form.startdate;
        $session.params.to = $scope.form.enddate;
        $locationService.changeLocation('/reports/income-expense/print')
    }



}])