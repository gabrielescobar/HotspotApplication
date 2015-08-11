/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-error',['ngLoadingSpinner'])
    .controller('ErrorFreeController', function (template,$rootScope,$scope,$location) {
        var section = template.getTemplate();

        section.then(function(data) {
            $scope.templatepage=data[0].errorfree;
        });

        if(!$rootScope.fromLogin)
            $location.url('/task');

        $scope.goSignUp = function() {
            $location.url('/signup');
        };
    })
    .controller('ErrorPrepaidController', function (template,$rootScope,$scope,$location) {
        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].errorprepaid;
        });
        $scope.goSignUp = function() {
            $rootScope.type="Megacable-prepaid";
            $rootScope.hasTime=false;
            window.location.replace("#/purchase");
        };

        if(!$rootScope.fromLogin)
            $location.url('/task');
    })

