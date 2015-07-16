

var app = angular.module('fmpPortal');

var indx = 0;

app.controller('modalReimbursementController', ['$scope', '$reimbursementService', '$modalInstance','day', function ($scope, $reimbursementService, $modalInstance, day) {
    console.log($modalInstance);
    console.log(day);
    $scope.day = day;
    $scope.reimbursement = {};

    $scope.reimbursementsTypes = [
       { id: 1, description: 'Regular Hours', payrateMultiply: 1 },
       { id: 2, description: 'Overtime', payrateMultiply: 1.5 }
    ];


    $reimbursementService.getAll(function (data) {
        $scope.reimbursements = data
    });


    $scope.addReimbursement = function () {
        
        if (day.reimbursements == undefined) {
            day.reimbursements = [];
        }
        else
        {
            if($scope.reimbursement.index != undefined) // Editing
            {
                day.reimbursements = day.reimbursements.filter(function (r) {
                    return r.index != $scope.reimbursement.index;
                });
            }
        }
        $scope.reimbursement.index = indx++;
        day.reimbursements.push(clone($scope.reimbursement));
        $scope.reimbursement = {};
        $scope.day = day;
    }

    $scope.cancelReimbursement = function () {
        $scope.reimbursement = {};
    }
    $scope.editReimbursement = function (index) {
        $scope.reimbursement = clone(day.reimbursements.filter(function (e) {
            return e.index == index;
        })[0]);
    }

    $scope.removeReimbursement = function (index) {
        day.reimbursements = day.reimbursements.filter(function (r) {
            return r.index != index;
        });
        $scope.day = day;
    }

    $scope.ok = function () {
        $modalInstance.close(day);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

    $scope.sumPayrate = function () {
        debugger
        var total = 0;
        for (var i = 0; i < day.reimbursements.length - 1; i++) {
            total += day.reimbursements[i].hours * day.reimbursements[i].payrate
        }
        return total;
    }


}]);