

var app = angular.module('fmpPortal');




app.directive('addForm', function(){
   
    var obj = {
        scope: {
            baseObj: '='
        }
    }
    
    return obj;
    
});

app.directive('datePicker', function () {

    var d = {
        restrict: 'A',
        scope: {
            dateModel: '=',
            dateChange: '&',
            daysDisabled: '=?'
        },
        link: function (scope, element, attr) {
            if (!scope.daysDisabled) { scope.daysDisabled = []; }

            var el = $(element).datetimepicker({
                locale: 'es',
                format: 'MM/DD/YYYY',
                useCurrent: false,
                daysOfWeekDisabled: scope.daysDisabled
            }).on('dp.change', function (e) {
                //console.log(e.date._d);
                if (e.date._d != null) {
                    scope.$apply(function () {

                        scope.dateModel = e.date._d.formatDate();
                        
                       // scope.dateChange();
                    });
                }
            });
            /*scope.$watch('dateModel', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    var d = new Date(newValue);
                    el.data('DateTimePicker').date(d);
                }
            });*/
            //console.log(el);
        }
    }


    return d;

});


app.directive('eventHandler', function () {
    var obj = {
        restrict: 'A',
        scope:{
            onBlur: '&'
        },
        link: function (scope, element, attrs) {
            $(element).on('focus', function () {
                $(this).select().mouseup(function (e) {
                    e.preventDefault();
                    $(this).unbind("mouseup");
                });
            });
            $(element).on('blur', function () {
                scope.$apply(function () {
                    scope.onBlur();
                });
            });

            $(element).on('keydown', function (event) {

                if (event.which == 13) {
                    scope.$apply(function () {
                        debugger
                        var index = parseInt(attrs.tabIndex);
                        index++;
                        if (index == 7) {
                            index = 0;
                        }
                        scope.onBlur();
                        $('[tab-index=' + index + ']').focus();
                    })
                }

            })

        }
    };


    return obj;
});



app.directive('format', ['$filter', function ($filter) {

    return {
        restrict:'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$formatters.push(function toView() {
                return $filter(attrs.format)(ctrl.$modelValue,'');
            })
        }
    }

}])

app.directive('addPeriod', function () {
    return {
        restrict: 'EA',
        templateUrl: "../app/shared/partials/addPeriod.html",
        controller: 'contractorController',
        scope: {
            period:"="
        },
        link: function (scope) {
            $('#addPeriodDateFrom').datetimepicker({ locale: 'en', format: 'L' });
            $('#addPeriodDateTo').datetimepicker({ locale: 'en', format: 'L' });

            $('#addPeriodTimeFrom').datetimepicker({ locale: 'en', format: 'LT' });
            $('#addPeriodTimeTo').datetimepicker({ locale: 'en', format: 'LT' });
        }
    }
});




/*Grid View*/
app.controller('gridViewController', ['$scope', function ($scope) {


}]);

app.directive('backBtn', function () {
    var obj = {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('click', function () {
                window.history.back();
            });
        }
    }

    return obj;
});

app.directive('phoneNumbers', function () {

    var obj = {
        restrict: 'E',
        scope: {
            phones: '=',
            readOnly: '='
        },
        controller: ['$scope', function ($scope) {

            $scope.currentPhone;
            $scope.isPopOpen = false;

            $scope.dPopover = {
                templateUrl: 'phoneTypes.html',
                title: 'Select Phone type',
                placement:'right'
            };

            $scope.phoneTypes = [
                { description: 'Phone', icon: 'fa-phone' },
                { description: 'Home', icon: 'fa-home' },
                { description: 'Mobile', icon: 'fa-mobile-phone' },
                { description: 'Android', icon: 'fa-android' },
                { description: 'iPhone', icon: 'fa-apple' },
                { description: 'Whatsapp', icon: 'fa-whatsapp' },
                { description: 'Work', icon: 'fa-building' },
                { description: 'Fax', icon: 'fa-fax' }

            ];

            $scope.remove = function (index) {
                $scope.phones.splice(index, 1);
            };

            $scope.add = function () {
                if (!$scope.phones instanceof Array || $scope.phones == undefined) {
                    $scope.phones = [];
                }
                $scope.phones.push({ number: null, phone_type: 'fa-phone', isOpen:false });
            };

            $scope.openPopOver = function (index) {
                if (!$scope.readOnly) {

                    $scope.currentPhone = $scope.phones[index];
                    $scope.currentPhone.isOpen = !$scope.currentPhone.isOpen;
                }
            };

            $scope.closePopOver = function () {
                $scope.currentPhone.isOpen  = false;
            }

            $scope.onPhoneTypeSelected = function (icon) {
                $scope.currentPhone.phone_type = icon;
                $scope.closePopOver();

            }
        }],
        templateUrl: '/app/shared/partials/phones.html'
       
    }
    return obj;

});
