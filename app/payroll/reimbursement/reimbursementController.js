

var app = angular.module('fmpPortal');

var indx = 0;

app.controller('modalReimbursementController', ['$scope', '$reimbursementService', '$modalInstance', 'day', 'employee', 'viewing', '$paramsValues', function ($scope, $reimbursementService, $modalInstance, day, employee, viewing, $paramsValues) {
    
    
    $scope.day = day;
    $scope.employee = employee;
    $scope.reimbursement = {};
    $scope.overtimeMultiply = $paramsValues.overtimeMultiply;

    if (viewing) {
        $scope.viewMode = true;
    }

    $scope.reimbursementsTypes = [
       { id: 1, description: 'Regular Hours', payrateMultiply: 1 },
       { id: 2, description: 'Overtime', payrateMultiply: 1.5 },
       { id: 3, description: 'Nigth Diff', payrateMultiply: 1 }
    ];


    $reimbursementService.getAll(function (data) {
        $scope.reimbursements = data
    });


    $scope.addReimbursement = function () {
        debugger
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
       
        if (day.totalReimbursementRegularHour == undefined) { day.totalReimbursementRegularHour = 0; }
        if (day.totalReimbursementOvertime == undefined) { day.totalReimbursementOvertime = 0;}
        if (day.totalReimbursementNigthDiff == undefined) { day.totalReimbursementNigthDiff = 0; }


        if ($scope.reimbursement.overtime) {
            $scope.reimbursement.rate = parseFloat($scope.employee.title.payrate * ($scope.overtimeMultiply));
        } else
        {
            $scope.reimbursement.rate = parseFloat($scope.employee.title.payrate)
        }

        /*$scope.reimbursement.rate = parseFloat($scope.reimbursement.obj.payrate * ($scope.reimbursement.type.payrateMultiply));
        if ($scope.reimbursement.type.id == 3) //Nigth Diff
        {
            $scope.reimbursement.rate = parseFloat($scope.reimbursement.obj.payrate + ($scope.employee.title.nigthdiff));
        }*/
        /*var rateByHour = ($scope.reimbursement.rate * $scope.reimbursement.hours);
        if ($scope.reimbursement.type.id == 1) //Reg Hours
        {
            day.totalReimbursementRegularHour += rateByHour;
        }
        else if($scope.reimbursement.type.id == 2) //Overtime
        {
            day.totalReimbursementOvertime += rateByHour;
        }
        else if ($scope.reimbursement.type.id == 3) //Nigth Diff
        {
            $scope.reimbursement.rate = parseFloat($scope.reimbursement.obj.payrate + ($scope.employee.title.nigthdiff));
            rateByHour = ($scope.reimbursement.rate * $scope.reimbursement.hours);
            day.totalReimbursementNigthDiff += rateByHour;
        }*/
        var re = angular.copy($scope.reimbursement.obj);
        re.index = $scope.reimbursement.index;
        re.hours = parseFloat($scope.reimbursement.hours);
        re.rate = $scope.reimbursement.rate;
        re.comment = $scope.reimbursement.comment == undefined ? '' : $scope.reimbursement.comment;
        //re.type = angular.copy($scope.reimbursement.type);
        re.type = $scope.reimbursement.overtime == true ? 2 : 1 
        
        re.obj = angular.copy($scope.reimbursement.obj);

        day.reimbursements.push(clone(re));

        $scope.reimbursement = {};
        $scope.day = day;
    }

    $scope.cancelReimbursement = function () {
        $scope.reimbursement = angular.copy({});
    }
    $scope.editReimbursement = function (index) {
        $scope.reimbursement = clone(day.reimbursements.filter(function (e) {
            return e.index == index;
        })[0]);
    }

    $scope.removeReimbursement = function (index) {
        /*var i = angular.copy(day.reimbursements.filter(function (r) {
            return r.index == index;
        })[0]);

        if (i.type.id == 1)
        {
            day.totalReimbursementRegularHour -= i.rate * i.hours;
        }
        else if(i.type.id == 2)
        {
            day.totalReimbursementOvertime -= rateByHour;
        }
        else if (i.type.id == 3)
        {
            day.totalReimbursementNigthDiff -= rateByHour;
        }*/

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
        
        var total = 0;
        if (day.reimbursements != undefined) {
            
            for (var i = 0; i <= day.reimbursements.length - 1; i++) {
               total += (parseFloat(day.reimbursements[i].hours) * parseFloat(day.reimbursements[i].rate))
            }
        }
        return total;
    }


}]);