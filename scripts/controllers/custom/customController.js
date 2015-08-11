/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-custom',['ngLoadingSpinner'])
    .controller('CustomController', function (template,$rootScope,$scope,$location) {
        var section = template.getTemplate();

        section.then(function(data) {
            $scope.templatepage=data[0].customssid;
        });

        $scope.open = function() {
            alert("button pressed");
        };
    })


