'use strict';

/**
 * @ngdoc function
 * @name zequenzeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zequenzeApp
 */
angular.module('zequenzeApp.controllers-main',[])
  .controller('LandingPage', function ($scope,$rootScope,$location) {
        $scope.goLoginPrepaid = function() {
            $location.url('/login');
        };
  });
