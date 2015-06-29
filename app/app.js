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

        .when('/employees', {
            templateUrl: 'app/mantenimientos/employees/view.html',
            resolve: resolveController('app/mantenimientos/employees/employeesController.js')
        })
        
        .when('/employees/add', {
            templateUrl: 'app/mantenimiento/employees/add.html'
        })



        .otherwise({
            redirectTo: '/'
        });
        
        

        $locationProvider.html5Mode(true);
    }]);



    var menu = [
        { text: 'Nómina', url: '/', icon: 'fa-money' },
        { text: 'Solicitud Materiales', url: '/', icon: 'fa-cube' },
        { text: 'Elaboracion Permisos', url: '/', icon: 'fa-calendar' },
        {
            text: 'Mantenimiento', url: '#', icon: 'fa-cogs', subItems: [
                { text: 'Escuelas', url: '/schools', icon: 'fa-cubes' },
                { text: 'Empleados', url: '/employees', icon: '' },

            ]
        },
        { text: 'Reporte', url: '/', icon: 'fa-clipboard' },

    ]

})();