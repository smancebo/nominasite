
var app = angular.module('fmpPortal');



app.factory('$titlesService', ['$http', '$serverInfo', function ($http, $serverInfo) {

    var titlesService = {};

    var serviceBaseAddress = $serverInfo.server + '/api/titles';

    titlesService.getAll = function (callback) {
        $http.get(serviceBaseAddress + '/get')
        .success(function (data) {
            callback(data);
        });
    };

    titlesService.get = function (title_code, callback) {
        $http.get(serviceBaseAddress + '/get/' + title_code)
        .success(function (data) {
            callback(data);
        });
    };

    titlesService.save = function (title, callback) {
        $http.post(serviceBaseAddress + '/save', title)
        .success(function (data) {
            callback(data);
        });
    };

    titlesService.delete = function (title_code, callback) {
        $http.post(serviceBaseAddress + '/delete', title_code)
        .success(function (data) {
            callback(data);
        });
    };

    return titlesService;

}]);


app.factory('$schoolService', ['$http', '$serverInfo', function ($http, $serverInfo) {

    var schoolService = {};

    var serviceBaseAddress = $serverInfo.server + '/api/schools';
    
    schoolService.getAll = function (callback) {
        $http.get(serviceBaseAddress + '/get')
        .success(function (data) {
            callback(data);
        });
    };

    schoolService.get = function (school_code, callback) {
        $http.get(serviceBaseAddress + '/get/' + school_code)
        .success(function (data) {
            callback(data);
        });
    };

    schoolService.save = function (school, callback) {
        $http.post(serviceBaseAddress + '/save', school)
        .success(function (data) {
            callback(data);
        });
    };

    schoolService.delete = function (school_code, callback) {
        $http.post(serviceBaseAddress + '/delete', school_code)
        .success(function (data) {
            callback(data);
        });
    };

    return schoolService;

}]);

app.factory('$staffService', ['$http', '$serverInfo', function ($http, $serverInfo) {
    var staffService = {};
    
    staffService.getAll = function (callback) {
        $http.get($serverInfo.server + '/api/staff/get')
        .success(function (data) {
            callback(data);
        });
    };

    staffService.get = function (employee_code, callback) {
        $http.get($serverInfo.server + '/api/staff/get/' + employee_code)
        .success(function (data) {
            callback(data);
        });
    };

    staffService.save = function (employee, callback) {
        $http.post($serverInfo.server + '/api/staff/save', employee)
        .success(function (data) {
            callback(data);
        });
    };

    staffService.delete = function (employee_code, callback) {
        $http.post($serverInfo.server + '/api/staff/delete/' + employee_code)
        .success(function (data) {
            callback(data);
        });
    };

    return staffService;
}]);