
var app = angular.module('fmpPortal');


app.controller('reimbursementController', ['$scope', '$routeParams', '$reimbursementService', function ($scope, $routeParams, $reimbursementService) {

    $scope.reimbursements = {};
    
    if ($routeParams.Id) {
        $reimbursementService.get($routeParams.Id, function (data) {
            $scope.reimbursement = data;
        });
    }

    $reimbursementService.getAll(function (data) {
        $scope.reimbursements = data;
    })
    $scope.save = function () {


        if ($scope.reimbursement != undefined) {

            $reimbursementService.save($scope.reimbursement, function (data) {
                console.log(data);
            });
        }
    }

}]);


