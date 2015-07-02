

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
			gvRows: '='
		},
		controller:['$scope','$element', function($scope, $element){

		    	    
		    $scope.$watch('gvRows', function () {
		        if($scope.gvRows.length > 0)
		        {
		            createGrid();
		        }
		    });

		    function createGrid() {
		        function parseBinding(text, rowData) {

		            var expressions = text.match(/\{\w+\}/g).sort()
                    .filter(function (e, index, array) {
                        return index == array.indexOf(e);
                    });

		            var parsedText = text;

		            expressions.forEach(function (e) {
                        
		                var field = getField(e);
		                var reg = new RegExp(e, "g");
		                parsedText = parsedText.replace(reg, rowData[field] == null ? '' : rowData[field]);
		            });

		            return parsedText;

		        }
		        function getField(expression) {
		            return expression.substring(expression.indexOf('{') + 1, expression.length - 1)
		        }

		        var dv_responsive = $("<div class='table-responsive'>")
		        var table = $("<table class='table table-striped'>");
		        var thead = $("<thead>");
		        var tbody = $("<tbody>");
		        var columns = [];

                

		        $scope.element.find('columns').children().each(function () {
		            
		            var th = $("<th>");
		            var tagname = $(this).prop('tagName').toLowerCase();
		            var column = {};
		            column.headerText = $(this).attr('header-text');
		            th.append(column.headerText);

		            switch (tagname) {
		                case "column":
		                    column.dataField = $(this).attr('data-field');
		                    column.text = $(this).attr('text');
		                    column.nullText = $(this).attr('null-text');
		                    column.counter = $(this).attr('counter');
		                    column.type = 'column';
		                    break;
		                case "templatecolumn":
		                    column.data = $(this).html();
		                    column.type = 'template';
		                    break;
		            };
		            thead.append(th);
		            columns.push(column);
		        });

		        for (var r = 0; r <= $scope.gvRows.length - 1; r++) {
		            var row = $scope.gvRows[r];
		            var tr = $('<tr>');
		            columns.forEach(function (column) {
                        
		                var td = $("<td>");
		                if (column.type == 'column') {
		                    if(column.counter)
		                    {
		                        td.append(r+1);
		                    }
		                    else if (column.dataField)
		                    {
		                        td.append(row[column.dataField] == null ? parseBinding(column.nullText, row) : row[column.dataField]);
		                    }
		                    else if(column.text)
		                    {
		                        td.append(parseBinding(column.text,row));
		                    }
		                    /*else if(column.nullText)
		                    {
		                        td.append(parseBinding(column.nullText, row));
		                    }*/
		                    else
		                    {
		                        td.append('no data');
		                    }

		                }
		                else if (column.type == 'template') {
		                    td.append(parseBinding(column.data, row));
		                }
		                tr.append(td)
		            });

		            tbody.append(tr);
		        }
                
		        table.append(thead);
		        table.append(tbody);
		        dv_responsive.append(table);

		        $scope.element.append(dv_responsive);
		        $scope.element.find('columns').remove();
		    }
		       
		}],
		
		link: function (scope, element, attr) {
		    $(element).find('columns').css('display', 'none');
		    scope.element = $(element)
		}
	}

	return obj;

});