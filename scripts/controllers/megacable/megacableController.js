/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-megacable',['ngLoadingSpinner'])
    .controller('MegacableController', function (template,$scope,$location) {
        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].megacable;
        });

        $scope.goLogin = function() {
            $location.url('/task');
        };

    });

