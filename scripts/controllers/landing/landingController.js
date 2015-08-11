/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-landing',['ngLoadingSpinner'])
    .controller('LandingController', function (template,$scope,$rootScope,mac,$location,token_configure) {
        $scope.name=$rootScope.username;
        $scope.type=$rootScope.type;//="Megacable-prepaid";
        console.log($rootScope.username);
        $rootScope.inpage=true;
        if(!$rootScope.fromLogin)
            $location.url('/task');

        $scope.purchase = function() {
            $location.url('/purchase');
            $rootScope.hasTime=true;
        };
        $scope.landing = function() {
            $location.url('/');
            $rootScope.inpage=false;
        };
        var clock = $('.your-clock').FlipClock($rootScope.timeremaining,{
            countdown: true,
            clockFace: 'DailyCounter',
            callbacks: {
                stop: function () {
                    if($rootScope.type == "Megacable-Trial" && $rootScope.inpage)
                        window.location.replace("#/error-free");
                    else if($rootScope.inpage)
                        window.location.replace("#/error-prepaid");
                }
            }
        });

        clock.start();


        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].landing;
        });

        $scope.create={};
        $scope.showModal = false;
        $scope.buttonClicked = "";


        /*
        * Create function
        * This function is executed when the Sign up button is pressed
        *
        * */
        $scope.create = function() {

            if( (!$scope.create.username) || (!$scope.create.user) || (!$scope.create.password) || (!$scope.create.passwordrepeat)){
                $scope.tittle = "Error";
                $scope.message = "All (*) fields are required";
                $scope.showModal = !$scope.showModal;
            }
            else if($scope.create.password != $scope.create.passwordrepeat){
                $scope.tittle = "Error";
                $scope.message = "The password need to be the same in both fields";
                $scope.showModal = !$scope.showModal;
            }
            else{
                var result = mac.getMAC();
                result.then(function(data) {
                    var macaddress=data;
                    var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "Laptop";
                    var profile="Megacable-prepaid";
                    var newuser = token_configure.create($scope.create.username,deviceType,macaddress,$scope.create.password,$scope.create.user,$scope.create.email,$scope.create.phone,$scope.create.desc,profile,false,'',
                        false,true);
                    newuser.then(function(data) {
                        if(data=='true200'){
                            $scope.tittle = "Message";
                            $scope.message = "User Created";
                            $scope.showModal = !$scope.showModal;
                        }
                        else if(data=='500'){
                            $scope.tittle = "Error";
                            $scope.message = "User name already exist";
                            $scope.showModal = !$scope.showModal;

                        }
                    });
                });

            }
        }
    })

