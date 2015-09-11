(function () {


    //alert('loaded');



    var app = angular.module('fmpPortal', ['ngRoute', 'ngGridView', 'ui.bootstrap', 'ngToast', 'ngStorage', 'popoverToggle', 'matchMedia', 'ngAnimate']);
    app.constant('$serverInfo', {
        server: "http://10.172.0.170:85/api"
        //server: "http://10.0.0.5:85/api"
    });

    app.controller('indexController', ['$scope', '$sessionStorage', '$rootScope', 'screenSize', function ($scope, $sessionStorage, $rootScope, screenSize) {
        //$scope.menu = menu;

        if ($sessionStorage.menu != undefined) {
            $rootScope.menu = $sessionStorage.menu
        }
        if ($sessionStorage.currentUser != undefined) {
            $rootScope.currentUser = JSON.parse($sessionStorage.currentUser);
        }


        screenSize.on('xs, sm', function () {
            
            $scope.mobile = true;
            $scope.menuClosed = true;
        });

        $scope.menuClosed = false;
        $scope.mobile = false;
        $scope.container = 'col-md-10';

        
        screenSize.when('xs, sm', function () {
            $scope.mobile = true;
            $scope.menuClosed = true;
        });
        screenSize.when('md, lg', function () {
            $scope.mobile = false;
            $scope.menuClosed = false;
        });



        $scope.toggleMenu = function () {

            $scope.menuClosed = !$scope.menuClosed;
        }

        $scope.isopen = function () {
            return $scope.menuClosed;
        }

        $scope.containerWidth = function () {
            if ($scope.menuClosed) {
                return 'col-md-12';
            }
            else
            {
                return 'col-md-10';
            }
        }

        $scope.showHideSubMenu = function (item) {

            if (item.showMenu) {
                if (item.showMenu == true) {
                    item.showMenu = false;
                }
                else {
                    item.showMenu = true;
                }

            }
            else {
                item.showMenu = true;
            }
        }
    }]);


    function resolveController(controller) {
        return {
            load: function () {
                $.getScript(controller);
            }
        }
    }

    app.run(['$rootScope', '$location', '$loginModal', '$route', '$timeout', '$userService', function ($rootScope, $location, $loginModal, $route, $timeout, $userService) {

        $rootScope.alerts = [];

        $rootScope.logOff = function () {
            $userService.logOff();
            $rootScope.$evalAsync(function () {
                $location.path('/');
            });
        }

        $rootScope.createAlert = function (type, msg) {
            var alert = new Object();
            alert.type = type;
            alert.msg = msg;

            $rootScope.alerts.push(alert);
        }

        $rootScope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        }

        $rootScope.ajaxLoading = false;
         
        $rootScope.$on('$routeChangeStart', function (event, next) {
            
            if (!next.unsecure) {

                if (typeof $rootScope.currentUser === 'undefined') {
                    event.preventDefault();
                    $loginModal(function () {
                        var timer = $timeout(function () {

                            $timeout.cancel(timer);
                            if (next.$$route.originalPath == '/login') {
                                defaultPath($rootScope, $location);
                                return;
                            }

                            if ($route.current != undefined) {

                                if ($route.current.originalPath == '/') {
                                    $rootScope.$evalAsync(function () {
                                        $location.path(next.$$route.originalPath)
                                    });
                                } else if ($route.current.originalPath == '/sessionexpired') {

                                    defaultPath($rootScope, $location);
                                } 
                                else {
                                    $route.reload();
                                }
                            }
                            else
                            {
                                $route.reload();
                            }
                        }, 200);
                    });
                } else {
                    if (!isExpirated($rootScope.currentUser)) {
                        $rootScope.currentUser.timeStamp = expirationDate();
                    }
                    else {
                        event.preventDefault();
                        $userService.logOff();
                        
                        $rootScope.$evalAsync(function () {
                            $location.path('/sessionexpired');
                        });
                       
                    }
                }
            }
        })

    }]);


    function defaultPath($rootScope, $location)
    {
        $rootScope.$evalAsync(function () {
            $location.path('/');
        });
    }

    function login($loginModal, $timeout, $route, $rootScope, $location)
    {
        $loginModal(function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                            
                if ($route.current.originalPath == '/')
                {
                    $rootScope.$evalAsync(function () {
                        console.log(next);
                        $location.path(next.$$route.originalPath)
                    });
                }
                else
                {
                    $route.reload();
                }
            }, 200);
        })
    }



    app.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$httpProvider', '$tooltipProvider', function ($routeProvider, $locationProvider, $controllerProvider, $httpProvider, $tooltipProvider) {

        $httpProvider.interceptors.push('$authorizationInterceptor');
       

        app.controllerProvider = $controllerProvider;

        $routeProvider
        .when('/', {
            templateUrl: 'app/shared/default.html',
            unsecure:true
        })

        .when('/sessionexpired', {
            templateUrl: 'app/shared/nologin.html',
            unsecure:true
        })

        //<Titles>

        .when('/titles', {
            templateUrl: 'app/mantenimientos/titles/view.html',
            controller: 'titlesController',
        })

        .when('/titles/add', {
            templateUrl: 'app/mantenimientos/titles/add.html',
            controller: 'titlesController',
        })

        .when('/titles/edit/:titleId', {
            templateUrl: 'app/mantenimientos/titles/add.html',
            controller: 'titlesController'
        })
        .when('/titles/view/:titleId', {
            templateUrl: 'app/mantenimientos/titles/add.html',
            controller: ['$scope', '$routeParams', '$titlesService', function ($scope, $routeParams, $titlesService) {
                $scope.viewMode = true;

                $titlesService.get($routeParams.titleId, function (data) {
                    $scope.title = data;
                });
            }]
        })

        //</titles>

        //<users>
         .when('/users', {
             templateUrl: 'app/mantenimientos/users/view.html',
             controller: 'usersController',
         })

        .when('/users/add', {
            templateUrl: 'app/mantenimientos/users/add.html',
            controller: 'usersController',
        })

        .when('/users/edit/:userId', {
            templateUrl: 'app/mantenimientos/users/add.html',
            controller: 'usersController'
        })
        .when('/users/view/:userId', {
            templateUrl: 'app/mantenimientos/users/add.html',
            controller: ['$scope', '$routeParams', '$userService', function ($scope, $routeParams, $userService) {
                $scope.viewMode = true;
                $scope.editing = true;
                $userService.get($routeParams.userId, function (data) {
                    $scope.user = data;
                    $scope.txtUsername = data.username;
                    console.log(data);
                });
            }]
        })
        //</users>

        //<employees>
        .when('/employees', {
            templateUrl: 'app/mantenimientos/employees/view.html',
            controller: 'employeesController',
        })

        .when('/employees/add', {
            templateUrl: 'app/mantenimientos/employees/add.html',
            controller: 'employeesController',
        })

        .when('/employees/edit/:employeeCode', {
            templateUrl: 'app/mantenimientos/employees/add.html',
            controller: 'employeesController',
        })

        .when('/employees/view/:employeeCode', {
            templateUrl: 'app/mantenimientos/employees/add.html',
            controller: ['$scope', '$staffService', '$routeParams', '$titlesService', function ($scope, $staffService, $routeParams, $titlesService) {
                $scope.viewMode = true;
                $titlesService.getAll(function (data) {
                    $scope.titles = data;

                    $staffService.get($routeParams.employeeCode, function (data) {
                        $scope.employee = data;
                    });
                });



            }]
        })
        //</employees>

        //<schools>
        .when('/schools', {
            templateUrl: 'app/mantenimientos/schools/view.html',
            controller: 'schoolsController',
        })

        .when('/schools/add', {
            templateUrl: 'app/mantenimientos/schools/add.html',
            controller: 'schoolsController',
        })

        .when('/schools/edit/:schoolId', {
            templateUrl: 'app/mantenimientos/schools/add.html',
            controller: 'schoolsController'
        })

        

        .when('/schools/view/:schoolId', {
            templateUrl: 'app/mantenimientos/schools/add.html',
            controller: ['$scope', '$schoolService', '$routeParams', '$staffService', function ($scope, $schoolService, $routeParams, $staffService) {
                $scope.viewMode = true;

                $staffService.getAll(function (data) {
                    $scope.charges = data;
                    $staffService.getSupervisors(function (sups) {
                        $scope.supervisors = sups
                    });

                });

                $schoolService.get($routeParams.schoolId, function (data) {
                    $scope.school = data;
                })
            }]
        })
        //</schools>

        //<reimbursement>
        .when('/reimbursements', {
            templateUrl: 'app/mantenimientos/reimbursement/view.html',
            controller: 'reimbursementController',
        })

        .when('/reimbursements/add', {
            templateUrl: 'app/mantenimientos/reimbursement/add.html',
            controller: 'reimbursementController',
        })

         .when('/reimbursements/edit/:Id', {
             templateUrl: 'app/mantenimientos/reimbursement/add.html',
             controller: 'reimbursementController'
         })

        .when('/reimbursements/view/:Id', {
            templateUrl: 'app/mantenimientos/reimbursement/add.html',
            controller: ['$scope', '$reimbursementService', '$routeParams', function ($scope, $reimbursementService, $routeParams) {
                $scope.viewMode = true;

                $reimbursementService.get($routeParams.Id, function (data) {
                    $scope.reimbursement = data;
                })
            }]
        })
        //</reimbursement>

        .when('/payroll', {
            templateUrl: 'app/payroll/view.html',
            controller: 'payrollController'
        })

        .when('/payroll/add', {
            templateUrl: 'app/payroll/payroll.html',
            controller: 'payrollController'
        })

        .when('/payroll/edit/:Id', {
            templateUrl: 'app/payroll/payroll.html',
            controller: 'payrollController'
        })

        .when('/payroll/view/:Id', {
            templateUrl: 'app/payroll/payroll.html',
            controller: 'payrollController',
            viewing: true
        })

         .when('/payroll/print/:Id', {
             templateUrl: 'app/reports/payroll/rpt-payroll.html',
             controller: 'payrollPrintController'
         })

        .when('/login', {
            
        })


        //<contractor>
          //<contractor>
             .when('/permits/contractor', {
                 templateUrl: 'app/permits/contractor/list.html',
                 controller: 'contractorController'
             })

            .when('/permits/contractor/:mode', {
                templateUrl: 'app/permits/contractor/add.html',
                controller: 'contractorController'
            })
             .when('/permits/contractor/:mode/:id', {
                 templateUrl: 'app/permits/contractor/add.html',
                 controller: 'contractorController'
             })

            .when('/permits/contractor/:mode/:id', {
                templateUrl: 'app/permits/contractor/add.html',
                controller: 'contractorController'
            })

            .when('/permits/contractor/:mode/:id', {
                templateUrl: 'app/permits/contractor/add.html',
                controller: 'contractorController'
            })
        //</contractor>

        //<reports>

        .when('/reports/income-expense', {
            templateUrl: 'app/reports/income_expense/generator.html',
            controller: ''
        })

        //</reports>

        //<security>

        .when('/security/permits', {
            templateUrl: 'app/security/permits/permits.html',
            controller:'securityPermitsController'
        })

        .when('/security/screens', {
            templateUrl: 'app/security/screens/view.html',
            controller: 'securityScreensController'
        })

        .when('/security/screens/add', {
            templateUrl: 'app/security/screens/add.html',
            controller: 'securityScreensController'
        })


        .when('/security/screens/edit/:Id', {
            templateUrl: 'app/security/screens/add.html',
            controller: 'securityScreensController'
        })

         .when('/security/screens/view/:Id', {
             templateUrl: 'app/security/screens/add.html',
             controller: ['$scope', '$routeParams', '$screensService', function ($scope, $routeParams, $screensService) {

                 $scope.viewMode = true;
                 if ($routeParams.Id) {
                     $screensService.getScreen($routeParams.Id, function (result) {
                         $scope.screen = result;
                     });
                 }

             }]
         })

        .when('/security/groups', {
            templateUrl: 'app/security/groups/view.html',
            controller: 'securityGroupsController'
        })
        .when('/security/groups/add', {
            templateUrl: 'app/security/groups/add.html',
            controller: 'securityGroupsController'
        })
        .when('/security/groups/view/:Id', {
            templateUrl: 'app/security/groups/add.html',
            controller: ['$scope', '$routeParams', '$screensService', function ($scope, $routeParams, $screenService) {

                $scope.viewMode = true;
                
                $scope.modeClass = 'panel-info';
                if($routeParams.Id)
                {
                    $screenService.getGroup($routeParams.Id, function (data) {
                        $scope.title = "Viewing Group \"" + data.description + "\"";
                        $scope.group = data;
                    });
                }
            }]
        })

        .when('/security/groups/edit/:Id', {
            templateUrl: 'app/security/groups/add.html',
            controller: 'securityGroupsController'
        })


        //</security>




        .otherwise({
            redirectTo: '/'
        });



        $locationProvider.html5Mode(true);
    }]);



    var menu = [
        { text: 'Payroll', url: '/payroll', icon: 'fa-money' },
        { text: 'Solicitud Materiales', url: '/', icon: 'fa-cube' },
        {
            text: 'Permits Creation', url: '#', icon: 'fa-calendar', subItems: [
                { text: 'Contractors', url: '/permits/contractor', icon: 'fa-users' },
                { text: 'Areas', url: '/permits/areas/view', icon: 'fa-users' }
            ]
        }

        ,
        {
            text: 'Maintenance', url: '#', icon: 'fa-cogs', subItems: [
                { text: 'Employees', url: '/employees', icon: '' },
                { text: 'Reimbursement Types', url: '/reimbursements', icon: '' },
                { text: 'Schools', url: '/schools', icon: '' },
                { text: 'Titles', url: '/titles', icon: '' },
                { text: 'Users', url: '/users', icon: '' }

            ]
        },
        {
            text: 'Reports', url: '/', icon: 'fa-clipboard', subItems: [
                { text: 'Income and Expense', url:'/reports/income-expense' }
            ]
        }

    ]

    Date.prototype.formatDate = function formatDate() {
        var date = this;
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm };
        return (mm + '/' + dd + '/' + yyyy);
    }

    Date.prototype.formatDateSql = function formatDate() {
        var date = this;
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm };
        return (yyyy + '-' + mm + '-' + dd);
    }

    


    function clone(obj) {
        if (obj == null || typeof (obj) != 'object')
            return obj;

        var temp = new obj.constructor();
        for (var key in obj)
            temp[key] = clone(obj[key]);

        return temp;
    }

})();