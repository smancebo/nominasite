
var app = angular.module('fmpPortal');

app.factory('$staffService', ['$http', '$serverInfo', function ($http, $serverInfo) {
    var staffService = {};
    console.log($serverInfo);
    staffService.getAll = function (callback) {
        $http.get('/api/staff/get')
        .success(function (data) {
            callback(data);
        });
    };

    staffService.get = function (employee_code, callback) {
        $http.get('/api/staff/get/' + employee_code)
        .success(function (data) {
            callback(data);
        });
    };

    staffService.save = function (employee, callback) {
        debugger
        $http.post($serverInfo.server + '/api/staff/save', employee)
        .success(function (data) {
            callback(data);
        });
    };

    staffService.delete = function (employee_code, callback) {
        $http.post('/api/staff/delete/' + employee_code)
        .success(function (data) {
            callback(data);
        });
    };

    return staffService;
}]);