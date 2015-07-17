

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
        link: function (scope, element, attr) {
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
        }
    };


    return obj;
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
