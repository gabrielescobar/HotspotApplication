/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-customerror',['ngLoadingSpinner'])
    .controller('CustomErrorFreeController', function (template,$rootScope,$scope,$location) {
        var section = template.getTemplate();

        section.then(function(data) {
            $scope.templatepage=data[0].customerrorfree;
        });

        if(!$rootScope.fromLogin)
            window.location.replace("#/custom_login");


    })


