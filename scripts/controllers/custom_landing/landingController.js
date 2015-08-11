/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-customlanding',['ngLoadingSpinner'])
    .controller('CustomLandingController', function (template,$scope,$rootScope,mac,$location,token_configure) {
        $scope.name=$rootScope.username;
        $scope.type=$rootScope.type;//="Megacable-prepaid";
        console.log($rootScope.username);

        if(!$rootScope.fromLogin)
            window.location.replace("#/custom_login");


        var clock = $('.your-clock').FlipClock($rootScope.timeremaining,{
            countdown: true,
            clockFace: 'DailyCounter',
            callbacks: {
                stop: function () {
                    if($rootScope.type == "Megacable-Free")
                        window.location.replace("#/custom_error");
                }
            }
        });

        clock.start();


        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].customlanding;
        });



    })

