(function () {


    //alert('loaded');



    var app = angular.module('fmpPortal', ['ngRoute']);


    app.controller('indexController', ['$scope', function ($scope) {
        $scope.menu = menu;
        $scope.showHideSubMenu = function (item) {
            
            if (item.showMenu)
            {
                if(item.showMenu == true)
                {
                    item.showMenu = false;
                }
                else
                {
                    item.showMenu = true;
                }

            }
            else
            {
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

   

    app.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider, $controllerProvider) {

        app.controllerProvider = $controllerProvider;

        $routeProvider
        .when('/', {
            templateUrl: 'app/shared/default.html',
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

        //</titles>

        //<employees>
        .when('/employees', {
            templateUrl: 'app/mantenimientos/employees/view.html',
            controller: 'employeesController',
        })
        
        .when('/employees/add', {
            templateUrl: 'app/mantenimientos/employees/add.html',
            controller: 'employeesController',
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
        //</reimbursement>


        .otherwise({
            redirectTo: '/'
        });
        
        

        $locationProvider.html5Mode(true);
    }]);



    var menu = [
        { text: 'Payroll', url: '/', icon: 'fa-money' },
        { text: 'Solicitud Materiales', url: '/', icon: 'fa-cube' },
        { text: 'Elaboracion Permisos', url: '/', icon: 'fa-calendar' },
        {
            text: 'Maintenance', url: '#', icon: 'fa-cogs', subItems: [
                { text: 'Employees', url: '/employees', icon: '' },
                { text: 'Reimbursement Types', url: '/reimbursements', icon: '' },
                { text: 'Schools', url: '/schools', icon: '' },
                { text: 'Titles', url: '/titles', icon: '' },

            ]
        },
        { text: 'Reports', url: '/', icon: 'fa-clipboard' },

    ]

})();