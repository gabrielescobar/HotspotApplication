'use strict';

/**
 * @ngdoc overview
 * @name zequenzeApp
 * @description
 * # zequenzeApp
 *
 * Main module of the application.
 */
angular
  .module('zequenzeApp', ['zequenzeApp.controllers-login',
                          'zequenzeApp.controllers-main',
                          'zequenzeApp.controllers-register',
                          'zequenzeApp.controllers-landing',
                          'zequenzeApp.controllers-password',
                          'zequenzeApp.controllers-purchase',
                          'zequenzeApp.controllers-error',
                          'zequenzeApp.controllers-megacable',
                          'zequenzeApp.controllers-custom',
                          'zequenzeApp.controllers-registerFree',
                          'zequenzeApp.controllers-custom-login',
                          'zequenzeApp.controllers-CustomregisterFree',
                          'zequenzeApp.controllers-customlanding',
                          'zequenzeApp.controllers-customerror',
                                                                 'zequenzeApp.service-templates',
                                                                                                 'ngRoute',
                                                                                                 'LocalStorageModule'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
            templateUrl: 'views/login/login.html'
      })
        .when('/signup', {
            templateUrl: 'views/register/register.html'
        })
        .when('/signup_free', {
            templateUrl: 'views/register_free/register.html'
        })
        .when('/login', {
            templateUrl: 'views/login/login.html'
        })
        .when('/landing', {
            templateUrl: 'views/landing_page/landing.html'
        })
        .when('/megacable', {
            templateUrl: 'views/megacable/megacable.html'
        })
        .when('/password', {
            templateUrl: 'views/change_password/password.html'
        })
        .when('/purchase', {
            templateUrl: 'views/buy_time/purchase.html'
        })
        .when('/error-free', {
            templateUrl: 'views/session_expired/errorfree.html'
        })
        .when('/error-prepaid', {
            templateUrl: 'views/session_expired/errorprepaid.html'
        })
        ///////////////////////////////
        /////// Custom Landing Page
        //////////////////////////////
        .when('/customssid', {
            templateUrl: 'views/custom/zequenze.html'
        })
        ///////////////////////////////
        /////// Custom page for free time (train)
        //////////////////////////////
        .when('/custom_login', {
            templateUrl: 'views/custom_login/login.html'
        })
        .when('/custom_register', {
            templateUrl: 'views/custom_register_free/register.html'
        })
        .when('/custom_landing', {
            templateUrl: 'views/custom_landing_page/landing.html'
        })
        .when('/custom_error', {
            templateUrl: 'views/custom_session_expired/errorfree.html'
        })
      .otherwise({
        redirectTo: '/'
      });
  })
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('zequenze')
            .setStorageType('localStorage') //sessionStorage
            .setNotify(true, true);
    })
    .run(function($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function() {
            $templateCache.removeAll();
        });
    })
    .directive('modal', function () {
        return {
            template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ tittle }}</h4>' +
            '</div>' +
            '<div class="modal-body">{{ message }}</div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:true,
            link: function postLink(scope, element, attrs) {
                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    });
