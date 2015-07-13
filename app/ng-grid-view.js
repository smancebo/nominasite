

var ng = angular.module('ngGridView',[]);

ng.directive('gridView', ['$compile',function ($compile) {
    var obj = {
        restrict: 'E',
        scope: {
            gvRows: '='
        },
        controller: '@' || ['$scope',function ($scope) { }],
        name: 'gvController',
        link: function (scope, element, attr) {
            $(element).find('columns').css('display', 'none');
            scope.$watch('gvRows', function (newValue, oldValue) {
                if (newValue) {
                    if (scope.gvRows.length > 0) {
                        createGrid();
                    }
                }
            }, true);
            function createGrid() {
                function parseBinding(text, rowData) {
                    if (text == null) {
                        return '';
                    }
                    else {
                        try {
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
                        catch (e) {
                            return text
                        }
                    }

                }
                function getField(expression) {
                    return expression.substring(expression.indexOf('{') + 1, expression.length - 1)
                }
                function disposeGrid() {
                    element.find('.ng-grid-view').remove();
                }
                function getObjValue(obj, values) {
                    var props = values.split('.');
                    var arr = '';
                    props.forEach(function (e, i) {
                        arr += '[\'' + e + '\']';
                    });

                    var fn = new Function('obj', 'return obj' + arr);
                    return fn(obj);
                }
              

                disposeGrid();
                var dv_responsive = $("<div class='ng-grid-view table-responsive'>")
                var table = $("<table class='table table-striped'>");
                var thead = $("<thead>");
                var tbody = $("<tbody>");
                var columns = [];


                element.find('columns').children().each(function () {

                    var th = $("<th>");
                    var tagname = $(this).prop('tagName').toLowerCase();
                    var column = {};
                    column.headerText = $(this).attr('header-text') == undefined ? '' : $(this).attr('header-text');
                    th.append(column.headerText);
                    if ($(this).attr('header-align')) {
                        th.css('text-align', $(this).attr('header-align'));
                    }

                    switch (tagname) {
                        case "column":
                            column.dataField = $(this).attr('data-field');
                            column.text = $(this).attr('text');
                            column.nullText = $(this).attr('null-text');
                            column.counter = $(this).attr('counter');
                            column.columnAlign = $(this).attr('column-align');
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

                for (var r = 0; r <= scope.gvRows.length - 1; r++) {
                    var row = scope.gvRows[r];
                    var tr = $('<tr>');
                    columns.forEach(function (column) {

                        var td = $("<td>");
                        if (column.columnAlign) td.css('text-align', column.columnAlign);

                        if (column.type == 'column') {
                            if (column.counter) {
                                td.append(r + 1);
                            }
                            else if (column.dataField) {
                                td.append(getObjValue(row, column.dataField) == null ? parseBinding(column.nullText, row) : getObjValue(row, column.dataField));
                            }
                            else if (column.text) {
                                td.append(parseBinding(column.text, row));
                            }
                            else {
                                td.append('no data');
                            }

                        }
                        else if (column.type == 'template') {
                            var htmlParsed = parseBinding(column.data, row);
                            td.append(htmlParsed);
                        }
                        tr.append(td)
                    });

                    tbody.append(tr);
                }

                table.append(thead);
                table.append(tbody);
                dv_responsive.append(table);
                var compiled = angular.element($compile(dv_responsive)(scope));

                element.append(compiled);
            }
        }
    }

    return obj;

}]);