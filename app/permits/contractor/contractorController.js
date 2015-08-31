(function () {
    var app = angular.module('fmpPortal');
    app.controller('contractorController', ['$scope', '$window', '$routeParams', '$modal', '$rootScope', '$permitService', 'ngToast', function ($scope, $window, $routeParams, $modal, $rootScope, $permitService, ngToast) {

        var contractorPeriodData = [];
        var periodResult = {};
        var total = {
            totalHour: 0
        };


        //Get By ID
        if ($routeParams.id) {
            $permitService.getById($routeParams.id, function (result1) {
                $scope.permit = result1;
                $permitService.getPeriodsById(result1.number_registered, function (result2) {
                    contractorPeriodData = result2;
                    $scope.contractorPeriodData = result2;
                    $scope.total = { totalHour: result1.total_hours };
                });
            });
        }


        //Get All
        $permitService.getAll(function (data) {
            $scope.dataRows = data;
        })


        //Open Dialog AddPeriod
        $scope.openAddPeriod = function (period) {
            var scope = $rootScope.$new();
            var modalInstance = $modal.open({
                templateUrl: '../app/permits/contractor/addPeriod.html',
                controller: 'contractorController',
                size: 'md',
                scope: scope,
                resolve: {
                    period: function () {
                        return $rootScope.period = period;
                    }
                }
            });

            modalInstance.result.then(function ($scope, $modalInstance, period) {
                $scope.period = period;
            });
        }

        //Add Contract period to Table
        var idCount = 0;
        $scope.addContractorPeriod = function () {

            var arrDays = [];
            $("input[name=chkPeriodDays]:checked").each(function () { arrDays.push($(this).val()); });

            var week_days = arrDays.toString();
            var start_date = $("#periodDateFrom").val();
            var end_date = $("#periodDateTo").val();
            var start_time = $("#periodTimeFrom").val();
            var end_time = $("#periodTimeTo").val();
            var hours = $("#resultHours").text();
            var number_registered = $("#number_registered").val();

            if (week_days != "" && start_date != "" && end_date != "" && start_time!="" && end_time!="" && number_registered!="") {
                var periodResult = {

                    id: idCount += 1,
                    number_registered: number_registered,
                    week_days: week_days,
                    start_date: start_date,
                    end_date: end_date,
                    start_time: start_time,
                    end_time: end_time,
                    hours: hours
                };

                if (periodResult != undefined) {
                    addContractPeriodRow(periodResult);
                    calculateAll();
                }
            } else {
                ngToast.danger({
                    content: '<div class="text-left"><b>Fields Required</b><ul><li>Mark the days</li><li>Select From - To date</li><li>Select From - To time</li></ul></div>'
                });
            }
        }

        //Clear Fields
        function addContractPeriodClearFields() {
            $("input[name=chkPeriodDays").prop("checked", false);
            $("#periodDateFrom").val('');
            $("#periodDateTo").val("");
            $("#periodTimeFrom").val("");
            $("#periodTimeTo").val("");
            $("#totalDay").text("0");
            $("#totalHour").text("0");
            $("#resultHours").text("0");
        }

        //Add Contract Period Row
        function addContractPeriodRow(periodResult) {
            contractorPeriodData.push(periodResult);
            contractPeriodRefresh(); //Refresh Data

            ngToast.create('Period add successfully!');
            addContractPeriodClearFields();
        }

        //Refresh
        function contractPeriodRefresh() {
            $rootScope.contractorPeriodData = contractorPeriodData;
            $rootScope.total = total;
        }

        //Calculate All
        function calculateAll() {
            total.totalHour = 0;
            if (contractorPeriodData.length > 0) {
                for (var i = 0; i < contractorPeriodData.length; i++) {
                    total.totalHour += parseInt(contractorPeriodData[i].hours);
                }
            }
        }


        //Delete Item
        $scope.contractorPeriodDelete = function (id) {
            if (id != undefined) {
                for (var i = 0; i < contractorPeriodData.length; i++) {
                    if (id == contractorPeriodData[i].id) {
                        contractorPeriodData.slice(i, i);
                        break;
                    }
                }
            }
            contractPeriodRefresh();
        }


        //Save Permit Contractor
        $scope.savePermit = function (permit) {
            var data_permit = permit;
            var periods_permit = $rootScope.contractorPeriodData;
            var total = $rootScope.total.totalHour;

            if (data_permit != undefined) {
                if (data_permit.number_registered == undefined) { 
                    return ngToast.danger({ content: 'Please enter a <b>Number Registered</b>!' }); 
                }
                else {
                    data_permit.total_hours = total;
                    $permitService.savePermit(data_permit, function (result1) {
                        if (result1 != "") {
                            $permitService.savePermitPeriods(periods_permit, function (result2) {
                                ngToast.create('Data save successfully!');
                                $window.location.href = "/permits/contractor";
                            });
                        }
                    });
                }
            } else {
                return ngToast.danger({ content: 'Please complete all the fields!' });
            }


            if (periods_permit == undefined) {
                return ngToast.danger({ content: 'Please <b>Add Period</b>!' });
            }
        }
    }]);
}())