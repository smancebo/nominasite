

var app = angular.module('fmpPortal');




app.directive('addForm', function(){
   
    var obj = {
        scope: {
            baseObj: '='
        }
    }
    
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
app.directive('gridView', function () {

	var obj = {
		restrict: 'E',
		scope: {
			addUrl: '=',
			editUrl: '=',
			deleteUrl:'=',
            viewUrl: '=',
			gvRowKey: '=',
			gvRows: '='
		},
		templateUrl: 'app/shared/partials/gridView.html',
		link: function (scope, element, attr) {
            
		}
		
	}

	return obj;

});