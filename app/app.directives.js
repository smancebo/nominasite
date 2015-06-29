

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
app.directive('gridView', function () {

	var obj = {
		restrict: 'E',
		scope: {
			gvAddUrl: '=',
			gvEditUrl: '=',
			gvDeleteUrl:'=',
			gvKey: '=',
			gvData:'='
		},
		templateUrl: 'app/shared/partials/gridView.html',
		
	}

	return obj;

});