(function () {
    var app = angular.module('fmpPortal');
    app.controller('contractorController', ['$scope', '$window', '$routeParams', '$modal', '$rootScope', '$permitService', 'ngToast', function ($scope, $window, $routeParams, $modal, $rootScope, $permitService, ngToast) {

        var mode = $routeParams.mode;
        var id = $routeParams.id;

        $scope.contractorPeriodData = [];

        //Get All Contract Permit
        $permitService.getAll(function (data) {
            $scope.dataRows = data;
        });

        //Load Initial Data
        if (mode != undefined && id != undefined) {
            $permitService.getByNumberRegistered(id, function (result) {
                if (result != undefined) {
                    $scope.permit = result;

                    if (result.pp != undefined) {

                        //Load Periods
                        $scope.contractorPeriodData = result.pp;
                        $scope.permit.total_hours = 0;
                        $scope.permit.total_hours_worked = 0;
                        $scope.contractorPeriodData.forEach(function (item) {
                            $scope.permit.total_hours += item.hours;
                        });

                        //Load Hours Worked
                        if (result.pp != undefined) {
                            $scope.apply = result.pp.hw;
                            result.pp.forEach(function (item) {
                                if (item.hw != undefined) {
                                    $scope.permit.total_hours_worked += item.hw.total_hours_worked;
                                }
                            });
                        }
                    }
                }
            });
        }

        $scope.refreshInitialData = function () {
            $permitService.getByNumberRegistered(id, function (result) {
                if (result != undefined) {
                    $scope.permit = result;

                    if (result.pp != undefined) {

                        //Load Periods
                        $scope.contractorPeriodData = result.pp;
                        $scope.permit.total_hours = 0;
                        $scope.permit.total_hours_worked = 0;
                        $scope.contractorPeriodData.forEach(function (item) {
                            $scope.permit.total_hours += item.hours;
                        });

                        //Load Hours Worked
                        if (result.pp != undefined) {
                            $scope.apply = result.pp.hw;
                            result.pp.forEach(function (item) {
                                if (item.hw != undefined) {
                                    $scope.permit.total_hours_worked += item.hw.total_hours_worked;
                                }
                            });
                        }
                    }
                }
            });
        }



        if (mode != undefined) {
            switch (mode) {
                case "add":
                    $scope.mode = "Add";
                    $scope.modeColor = "success";
                    $scope.modeAdd = true;
                    break;

                case "view":
                    $scope.mode = "View";
                    $scope.modeColor = "info";
                    $scope.modeView = true;
                    break;

                case "edit":
                    $scope.mode = "Edit";
                    $scope.modeColor = "warning";
                    $scope.modeEdit = true;
                    break;

                case "delete":
                    $scope.mode = "Delete";
                    $scope.modeColor = "danger";
                    $scope.modeDelete = true;
                    break;
            }
        }

        //GUID generator
        $scope.guid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }


        //Refresh All Data
        $scope.refreshAllData = function () {
            var arrContractorPeriodData = $scope.contractorPeriodData;

            if (arrContractorPeriodData.length > 0) {

                $scope.permit.total_hours = 0;
                $scope.permit.total_hours_worked = 0;

                //Load Contract Period
                $scope.contractorPeriodData.forEach(function (item) {
                    $scope.permit.total_hours += item.hours;
                });

                //Load Hours Worked
                arrContractorPeriodData.forEach(function (item) {
                    if (item.hw != undefined) {
                        $scope.permit.total_hours_worked += item.hw.total_hours_worked;
                    }
                });
            } else {
                $scope.permit.total_hours = 0;
                $scope.permit.total_hours_worked = 0;
            }
        };


        //Save New Permit Contractor
        $scope.savePermit = function () {
            var contractPermitData = $scope.permit;
            var contractPeriodData = $scope.contractorPeriodData;

            if ($scope.permit.number_registered != undefined || $scope.permit.number_registered != "") {
                $permitService.savePermit(contractPermitData, function (result1) {
                    if (result1 != "") {
                        if (result1 == "EXIST") {
                            ngToast.danger({
                                content: '<div>A record already exists with <br> this Number Registered: <b>' + $scope.permit.number_registered + '</b> </div>'
                            });
                        } else {
                            if (contractPeriodData.length > 0) {
                                $permitService.savePermitPeriods(contractPeriodData.number_registered, contractPeriodData, function (result2) {
                                    if (result2 != "") {
                                        for (var i = 0; i < contractPeriodData.length; i++) {
                                            var contractPeriodHoursWorkedData = contractPeriodData[i].hw;
                                            var contractPeriodGuid = contractPeriodData[i].guid;
                                            $permitService.updatePermitPeriodsHoursWorked(contractPeriodGuid, contractPeriodHoursWorkedData, function (result3) {
                                                ngToast.create('Data save successfully!');
                                                $window.location.href = "/permits/contractor";
                                            });
                                        }
                                    }
                                });
                            } else {
                                ngToast.create('Data save successfully!');
                                $window.location.href = "/permits/contractor";
                            }
                        }
                    }
                });
            } else {
                ngToast.danger({
                    content: '<div>Please enter the <b> Number Registered </b> </div>'
                });
            }

        }


        //Update Permit Contractor
        $scope.updatePermit = function () {
            var contractPermitData = $scope.permit;
            var contractPeriodData = $scope.permit.pp;
            if ($routeParams.id) {
                var number_registered = contractPermitData.number_registered;
                $permitService.updatePermit(number_registered, contractPermitData, function (result1) {
                    if (result1 != "") {
                        $permitService.savePermitPeriods(number_registered, contractPeriodData, function (result2) {
                            if (result2 != "") {
                                if (contractPeriodData.length > 0) {
                                    debugger
                                    for (var i = 0; i < contractPeriodData.length; i++) {
                                        var contractPeriodHoursWorkedData = contractPeriodData[i].hw;
                                        var contractPeriodGuid = contractPeriodData[i].guid;
                                        $permitService.updatePermitPeriodsHoursWorked(contractPeriodGuid, contractPeriodHoursWorkedData, function (result3) {
                                            $scope.refreshInitialData();
                                        });
                                    }
                                } else {
                                }
                            }
                        });
                    }
                });
                ngToast.create('Data save successfully!');
            }
        }


        //Delete Contract Permit
        $scope.deleteContractPermit = function () {
            var id = $routeParams.id;
            if (id != undefined) {
                $permitService.deleteContractPermit(id, function (result1) { //Delete Principal
                    if (result1 != "") {
                        $permitService.deleteContractPermitPeriods(id, function (result2) { //Delete Dependencies
                            ngToast.create('Data save successfully!');
                            $window.location.href = "/permits/contractor";
                        });
                    }
                });
            }
        }


        //Delete Period Contractor Item
        $scope.contractorPeriodDelete = function (guid) {
            var arr = $scope.contractorPeriodData;
            if (guid != undefined) {
                for (var i = 0; i < arr.length; i++) {
                    if (guid == arr[i].guid) {
                        arr.splice(i, 1);
                        $scope.refreshAllData();
                        break;
                    }
                }
            }
        }

        //Open Dialog Hours Worked
        $scope.hoursWorkedPopover = {
            title: 'Apply Hours Worked',
            templateUrl: 'apply_hours_worked.html',
            applyHours: function () {
                alert("dddd");
            }
        };


        //Open Dialog AddPeriod
        $scope.openAddPeriod = function (edit) {
            var modalInstance = $modal.open({
                templateUrl: '../app/permits/contractor/addPeriod.html',
                size: 'md',
                controller: ['$scope', '$rootScope', '$modalInstance', function ($innerScope, $rootScope, $modalInstance) {

                    if (edit != undefined) {
                        $innerScope.modeEdit = true;
                    } else {
                        $innerScope.modeAdd = true;
                    }


                    $innerScope.period = { guid: $scope.guid(), week_days: undefined, start_date: undefined, end_time: undefined, start_time: undefined, end_time: undefined, hours: undefined };
                    $innerScope.total = { days: 0, hours: 0, totalDaysHours: 0 };
                    $innerScope.daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    $innerScope.selectedWeekDay = [];

                    // toggle selection for a given day by name
                    $innerScope.toggleSelection = function toggleSelection(day) {
                        var idx = $innerScope.selectedWeekDay.indexOf(day);

                        // is currently selected
                        if (idx > -1) {
                            $innerScope.selectedWeekDay.splice(idx, 1);
                        }
                            // is newly selected
                        else {
                            $innerScope.selectedWeekDay.push(day);
                        }
                    };


                    // $innerScope.periods = [];

                    //Watchs
                    $innerScope.$watch("period.start_date", function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            $innerScope.calculateDayDiff();
                            $innerScope.calculateTimeDiff();
                        }
                    });

                    $innerScope.$watch("period.end_date", function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            $innerScope.calculateDayDiff();
                            $innerScope.calculateTimeDiff();
                        }
                    });

                    $innerScope.$watch("period.start_time", function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            $innerScope.calculateTimeDiff();
                            $innerScope.calculateDayDiff();
                        }
                    });

                    $innerScope.$watch("period.end_time", function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            $innerScope.calculateTimeDiff();
                            $innerScope.calculateDayDiff();
                        }
                    });


                    //Calculate Day Diff
                    $innerScope.calculateDayDiff = function () {
                        var fromDate = $innerScope.period.start_date;
                        var toDate = $innerScope.period.end_date;
                        if (fromDate != undefined && toDate != undefined) {
                            var dateB = moment(toDate, "MM/DD/YYYY").add('days', 1);
                            var dateA = moment(fromDate, "MM/DD/YYYY");
                            var totalDay = dateB.diff(dateA, 'days');
                            if (totalDay != undefined) {
                                $innerScope.total.days = totalDay;
                                $innerScope.calculateTotalHours();
                            }
                        }
                    };

                    //Calculate Time Diff
                    $innerScope.calculateTimeDiff = function () {
                        var timeFrom = $innerScope.period.start_time;
                        var timeTo = $innerScope.period.end_time;

                        if (timeFrom != undefined && timeTo != undefined) {

                            timeFrom = timeFrom.replace("AM", "").trim();
                            timeTo = timeTo.replace("AM", "").trim();
                            timeFrom = timeFrom.replace("PM", "").trim();
                            timeTo = timeTo.replace("PM", "").trim();

                            var totalHour = $innerScope.timeDiff(timeFrom, timeTo);

                            if (totalHour.indexOf("0-") > -1) {
                                $innerScope.total.hours = parseInt(totalHour.replace("0-", "").trim());
                                $innerScope.calculateTotalHours();
                            } else {
                                $innerScope.total.hours = parseInt(totalHour);
                                $innerScope.calculateTotalHours();
                            }
                        }
                    }

                    //Time Diff Function
                    $innerScope.timeDiff = function (start, end) {
                        start = start.split(":");
                        end = end.split(":");
                        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
                        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
                        var diff = endDate.getTime() - startDate.getTime();
                        var hours = Math.floor(diff / 1000 / 60 / 60);
                        diff -= hours * 1000 * 60 * 60;
                        var minutes = Math.floor(diff / 1000 / 60);
                        return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
                    }


                    //Calculate Total
                    $innerScope.calculateTotalHours = function () {
                        var days = $innerScope.total.days;
                        var hours = $innerScope.total.hours;
                        if (days > 0 && hours > 0) {
                            $innerScope.total.totalDaysHours = days * hours;
                        }
                    }

                    //Add Contractor Period
                    $innerScope.addContractorPeriod = function (period) {
                        period.week_days = $innerScope.selectedWeekDay.toString();
                        if (period.guid != undefined && edit != undefined) { //Update
                            var arrContractorPeriodData = $scope.contractorPeriodData;
                            if (arrContractorPeriodData.length > 0) {
                                for (var i = 0; i < arrContractorPeriodData.length; i++) {
                                    if (arrContractorPeriodData[i].guid == period.guid) {
                                        arrContractorPeriodData[i].week_days = period.week_days;
                                        arrContractorPeriodData[i].start_date = period.start_date;
                                        arrContractorPeriodData[i].end_date = period.end_date;
                                        arrContractorPeriodData[i].start_time = period.start_time;
                                        arrContractorPeriodData[i].end_time = period.end_time;
                                        arrContractorPeriodData[i].hours = $innerScope.total.totalDaysHours;
                                        ngToast.create('Item update successfully!');
                                        $innerScope.close();
                                        break;
                                    }
                                }
                            }
                        } else { //Add New
                            if ($innerScope.selectedWeekDay.length > 0 && period.start_date != undefined && period.start_date != "" && period.end_date != undefined && period.end_date != "" && period.start_time != undefined && period.start_time != "" && period.end_time != undefined && period.end_time != "") {
                                period.week_days = $innerScope.selectedWeekDay.toString();
                                period.hours = $innerScope.total.totalDaysHours;
                                period.number_registered = $scope.permit.number_registered;
                                $scope.contractorPeriodData.push(period);
                                $innerScope.close();
                            } else {
                                ngToast.danger({
                                    content: '<div class="text-left"><b>Fields Required</b><ul><li>Mark the days</li><li>Select From - To date</li><li>Select From - To time</li></ul></div>'
                                });
                            }
                        }
                    };

                    //Refresh Data
                    $innerScope.refreshAllData = function () {
                        $scope.permit.total_hours = 0;
                        var arrContractorPeriodData = $scope.contractorPeriodData;
                        var total = 0;
                        if (arrContractorPeriodData != undefined) {
                            for (var i = 0; i < arrContractorPeriodData.length; i++) {
                                total += parseInt(arrContractorPeriodData[i].hours);
                            }
                        }
                        $scope.permit.total_hours = total;
                    };

                    //Clear PeriodData
                    $innerScope.clearPeriodData = function () {
                        $innerScope.period = { start_date: undefined, end_time: undefined, start_time: undefined, end_time: undefined };
                        $innerScope.selectedWeekDay = [];
                    }

                    //Close AddPeriod Dialog
                    $innerScope.close = function () {
                        $modalInstance.dismiss('cancel');
                    };


                    //Edit Period
                    if (edit != undefined) {
                        var currentElement;
                        var arrContractorPeriodData = $scope.contractorPeriodData;
                        if (arrContractorPeriodData != undefined) {
                            for (var i = 0; i < arrContractorPeriodData.length; i++) {
                                if (arrContractorPeriodData[i].guid == edit) {
                                    currentElement = arrContractorPeriodData[i];

                                    //Load Selected Week Days
                                    if (currentElement.week_days != undefined) {
                                        var arrWeeksDays = currentElement.week_days.split(',');
                                        arrWeeksDays.forEach(function (item) {
                                            $innerScope.selectedWeekDay.push(item);
                                        });
                                    }
                                    break;
                                }
                            }
                        }

                        if (currentElement != undefined) {
                            $innerScope.period = currentElement;
                            $innerScope.calculateDayDiff();
                            $innerScope.calculateTimeDiff();
                        }
                    }

                }]
            });

            modalInstance.result.then(function ($scope, $modalInstance, period) {
                $scope.period = period;
            });
        }
    }]);
}())