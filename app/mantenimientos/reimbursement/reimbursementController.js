
var app = angular.module('fmpPortal');


app.controller('reimbursementController', ['$scope', '$routeParams', '$reimbursementService', '$toast', '$route', '$locationService', function ($scope, $routeParams, $reimbursementService, $toast, $route, $locationService) {

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
                if (data == 1) {
                    $toast.create('success', 'Reimbursement added succesfully!');
                    $locationService.changeLocation('/reimbursements');
                }
                else {
                    $toast.create('danger', '<b>Error:</b> ' + data);
                }
            });
        }
    }

    $scope.deleteReimbursement = function (reimbursementId) {
        $reimbursementService.delete(reimbursementId, function (data) {
            if (data == 1) {
                $toast.create('success', 'Reimbursement deleted successfully');
                $route.reload();
            }
            else {
                $toast.create('danger', '<b>Error: </b>' + data);
            }
        })
    }

}]);


