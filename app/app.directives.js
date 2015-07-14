

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
            dateChange: '&'
        },
        link: function (scope, element, attr) {
            $(element).datetimepicker({
                locale: 'es',
                format: 'MM/DD/YYYY'
            }).on('dp.change', function (e) {
                //console.log(e.date._d);
                if (e.date._d != null) {
                    scope.$apply(function () {

                        scope.dateModel = e.date._d.formatDate();
                        
                       // scope.dateChange();
                    });
                }
            });
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
            $(element).on('blur', function () {

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
