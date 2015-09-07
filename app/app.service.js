
var app = angular.module('fmpPortal');

app.factory('$toast', ['ngToast', function (ngToast) {

    var toast = {
        create: function (type, message) {
            ngToast.create({
                className: type,
                content: message
            });
        }
    }
    return toast;

}]);

app.factory('$locationService', ['$rootScope', '$location', function ($rootScope, $location) {

    var path = {

        changeLocation: function(url){
            $rootScope.$evalAsync(function () {
                $location.path(url);
            });
        }

    }

    return path;

}]);

app.factory('$payrollService', ['$http', '$serverInfo', function ($http, $serverInfo) {

    var payrollService = {};

    var serviceBaseAddress = $serverInfo.server + '/api/payroll';

    payrollService.save = function (employees, callback) {
        $http.post(serviceBaseAddress + '/save', employees)
        .success(function (data) {
            callback(data);
        })
    }
    
    payrollService.get = function (payroll_id, callback) {
        $http.get(serviceBaseAddress + '/get/' + payroll_id)
         .success(function (data) {
             callback(data);
         });
    }


    payrollService.getAll = function (callback) {
        $http.get(serviceBaseAddress + '/get')
        .success(function (data) {
            callback(data);
        });

    }

    payrollService.apply = function (payroll_id, callback) {
        $http.post(serviceBaseAddress + '/apply', payroll_id)
        .success(function (data) {
            callback(data);
        })
    }

    payrollService.delete = function (payroll_id, callback) {
        if (confirm('Are you sure you want to delete the selected payroll?')) {
            $http.post(serviceBaseAddress + '/delete', payroll_id)
            .success(function (data) {
                callback(data);
            })
        }
    }


    return payrollService;


}]);

app.factory('$titlesService', ['$http', '$serverInfo', function ($http, $serverInfo) {

    var titlesService = {};

    var serviceBaseAddress = $serverInfo.server + '/api/titles';

    titlesService.getAll = function (callback) {
        $http.get(serviceBaseAddress + '/get')
        .success(function (data) {
            callback(data);
        });
    };

    titlesService.getByEmployee = function (employee_code, callback) {
        $http.get(serviceBaseAddress + '/get-by-employee/' + employee_code)
        .success(function (data) {
            callback(data);
        })
    }

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
        if (confirm('Are you sure yo want to delete the selected title?')) {
            $http.post(serviceBaseAddress + '/delete', title_code)
            .success(function (data) {
                callback(data);
            });
        }
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
        if (confirm('Are you sure yo want to delete the selected school?')) {
            $http.post(serviceBaseAddress + '/delete', school_code)
            .success(function (data) {
                callback(data);
            });
        }
    };

    return schoolService;

}]);
app.factory('$staffService', ['$http', '$serverInfo', function ($http, $serverInfo) {
    var staffService = {};

    var serviceBaseAddress = $serverInfo.server + '/api/staff';
    
    staffService.getAll = function (callback) {
        $http.get(serviceBaseAddress + '/get')
        .success(function (data) {
            callback(data);
        });
    };

    staffService.getSupervisors = function (callback) {
        $http.get(serviceBaseAddress + '/supervisors')
        .success(function (data) {
            callback(data);
        })
    };

    staffService.getSupervisors = function (callback) {
        $http.get(serviceBaseAddress + '/supervisors')
        .success(function (data) {
            callback(data);
        })
    };

    staffService.getBySchool = function (callback) {
        $http.get(serviceBaseAddress + '/getBySchool')
        .success(function (data) {
            callback(data);
        })
    };


    staffService.get = function (employee_code, callback) {
        $http.get(serviceBaseAddress + '/get/' + employee_code)
        .success(function (data) {
            callback(data);
        });
    };

    staffService.save = function (employee, callback) {
        $http.post(serviceBaseAddress + '/save', employee)
        .success(function (data) {
            callback(data);
        });
    };

    staffService.delete = function (employee_code, callback) {
        if (confirm('Are you sure yo want to delete the selected employee?')) {
            $http.post(serviceBaseAddress + '/delete', employee_code)
            .success(function (data) {
                callback(data);
            });
        }
    };

    return staffService;
}]);
app.factory('$reimbursementService', ['$http', '$serverInfo', function ($http, $serverInfo) {
    var reimbursementService = {};

    var serviceBaseAddress = $serverInfo.server + '/api/reimbursement';

    reimbursementService.getAll = function (callback) {
        $http.get($serverInfo.server + '/api/reimbursement/get')
        .success(function (data) {
            callback(data);
        });
    };

    reimbursementService.get = function (code, callback) {
        $http.get($serverInfo.server + '/api/reimbursement/get/' + code)
        .success(function (data) {
            callback(data);
        });
    };

    reimbursementService.save = function (reimbursement, callback) {
        $http.post($serverInfo.server + '/api/reimbursement/save', reimbursement)
        .success(function (data) {
            callback(data);
        });
    };

    reimbursementService.delete = function (code, callback) {
        if (confirm('Are you sure yo want to delete the selected reimbursement?')) {
            $http.post(serviceBaseAddress + '/delete', code)
            .success(function (data) {
                callback(data);
            });
        }
    };

    return reimbursementService;
}]);



//Contract Permit
app.factory('$permitService', ['$http', '$serverInfo', function ($http, $serverInfo) {
    var permitService = {};

    permitService.getAll = function (callback) {
        $http.get($serverInfo.server + '/api/permit/get')
        .success(function (data) {
            callback(data);
        });
    };

    permitService.getById = function (code, callback) {
        $http.get($serverInfo.server + '/api/permit/get/' + code)
        .success(function (data) {
            callback(data[0]);
        });
    };


    permitService.savePermit = function (permit, callback) {
        $http.post($serverInfo.server + '/api/permit/savePermit', permit)
        .success(function (data) {
            callback(data);
        });
    };

    permitService.savePermitPeriods = function (permit, callback) {
        $http.post($serverInfo.server + '/api/permit/savePermitPeriods', permit)
        .success(function (data) {
            callback(data);
        });
    };

    return permitService;

}]);

app.factory('$userService', ['$http', '$serverInfo', '$window', '$sessionStorage','$rootScope', function ($http, $serverInfo, $window, $sessionStorage,$rootScope) {

    var userService = {};
    
    var serviceBaseAddress = $serverInfo.server + '/api/users';

    userService.getAll = function (callback) {
        $http.get(serviceBaseAddress + '/get')
        .success(function (data) {
            callback(data);
        });
    };

    userService.get = function (userId, callback) {
        $http.get(serviceBaseAddress + '/get/' + userId)
        .success(function (data) {
            callback(data);
        });
    };

    userService.save = function (user, callback) {
        $http.post(serviceBaseAddress + '/save', user)
        .success(function (data) {
            callback(data);
        });
    };

    userService.delete = function (username, callback) {
        if (confirm('Are you sure yo want to delete the selected user?')) {
            $http.post(serviceBaseAddress + '/delete', userId)
            .success(function (data) {
                callback(data);
            });
        }
    };


    userService.login = function (username, password, callback) {
        
        var credentials = {};
        credentials.username = username;
        credentials.password = password;
        $http.post(serviceBaseAddress + '/login', credentials).success(function (user, status) {
            
            if (status == 200)
            {
                user.timeStamp = expirationDate();
                $sessionStorage.currentUser = JSON.stringify(user);
                $sessionStorage.menu = user.screens
                $rootScope.menu = user.screens;
                callback(user);
            }
            else
            {
                $sessionStorage.currentUser = undefined;
                $sessionStorage.menu = undefined;
                callback(undefined);
            }
        });
    }

    userService.logOff = function (callback) {
        $sessionStorage.currentUser = undefined;
        $rootScope.currentUser = undefined;
        $rootScope.menu = undefined
    }


    return userService;

}]);

app.factory('$authorizationInterceptor', ['$rootScope', function ($rootScope) {

    return {
        request: function ($config) {
            $rootScope.ajaxLoading = true;
            if (typeof $rootScope.currentUser != 'undefined') {

                $config.headers['logusr'] = $rootScope.currentUser.username;
                $config.headers['token'] = $rootScope.currentUser.token;
            }
            return $config;
        },
        response: function ($response) {
            $rootScope.ajaxLoading = false;
            return $response;
        }
    }

}]);


app.service('$loginModal', ['$modal', '$rootScope', '$window', '$sessionStorage', function ($modal, $rootScope, $window, $sessionStorage) {

    function assignCurrentUser(user) {
        $rootScope.currentUser = user;
        return user;
    }

    return function (callback) {
        
        if (!$sessionStorage.currentUser) {

            var instance = $modal.open({
                templateUrl: 'app/login/login.html',
                controller: 'loginController'

            })
            instance.result.then(function (result) {
                
                assignCurrentUser(result);
                if (callback) {
                    callback();
                }
            });
        }
        else
        {
            assignCurrentUser(JSON.parse($sessionStorage.currentUser));
            if (callback) {
                callback();
            }
        }
        
    }

}]);

//Contract Permit
app.factory('$permitService', ['$http', '$serverInfo', function ($http, $serverInfo) {
    var permitService = {};

    permitService.getAll = function (callback) {
        $http.get($serverInfo.server + '/api/permit/get')
        .success(function (data) {
            callback(data);
        });
    };

    permitService.getById = function (code, callback) {
        $http.get($serverInfo.server + '/api/permit/get/' + code)
        .success(function (data) {
            callback(data[0]);
        });
    };

    permitService.getPeriodsById = function (code, callback) {
        $http.get($serverInfo.server + '/api/permit/getPeriodsById/' + code)
        .success(function (data) {
            callback(data);
        });
    };

    permitService.savePermit = function (permit, callback) {
        $http.post($serverInfo.server + '/api/permit/savePermit', permit)
        .success(function (data) {
            callback(data);
        });
    };

    permitService.savePermitPeriods = function (permit, callback) {
        $http.post($serverInfo.server + '/api/permit/savePermitPeriods', permit)
        .success(function (data) {
            callback(data);
        });
    };

    return permitService;

}]);