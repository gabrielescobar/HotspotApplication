/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-password',['ngLoadingSpinner'])
    .controller('PasswordController', function (template,token_get_info,$location,$rootScope,$scope,change_password) {

        if(!$rootScope.fromLogin)
            $location.url('/task');

        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].change;
        });

        $scope.showModal = false;
        $scope.change={};
        $scope.buttonClicked = "";

        function diffDates(dat1,dat2){
            var date1 = new Date(dat1.replace(/-/g, '/'));
            var date2 = new Date(dat2.replace(/-/g, '/'));
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            console.log(timeDiff)
            var diffDays = Math.ceil(timeDiff / (1000));
            console.log(diffDays);
            return diffDays;
        }

        function actualDate(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var hour = today.getHours() ;
            var min = today.getMinutes();
            if(dd<10) {
                dd='0'+dd
            }
            if(mm<10) {
                mm='0'+mm
            }
            today = yyyy+"-"+mm+"-"+dd+" "+hour+":"+min;
            return today;
        }

        $scope.remainingTime = function(){
            var timeRemaining = token_get_info.validate($rootScope.username);
            timeRemaining.then(function(data) {
                var userExpirationDate = data.expirationd + " " + data.expirationh + ":" + data.expirationm;
                var currentDate = actualDate();
                $rootScope.timeremaining=diffDates(userExpirationDate,currentDate);
                window.location.replace("#/landing")
            })
        }

        /*
        * Create function
        * This function is executed when the Sign up button is pressed
        *
        * */
        $scope.changef = function() {

            if( (!$scope.change.oldpassword) || (!$scope.change.newpassword) || (!$scope.change.passwordrepeat)){
                $scope.tittle = "Error";
                $scope.message = "All (*) fields are required";
                $scope.showModal = !$scope.showModal;
            }
            else if($scope.change.newpassword != $scope.change.passwordrepeat){
                $scope.tittle = "Error";
                $scope.message = "The new password needs to be the same in both fields";
                $scope.showModal = !$scope.showModal;
            }
            else{
                    var newPassword = change_password.change($rootScope.username,$scope.change.oldpassword,$scope.change.newpassword);
                newPassword.then(function(data) {
                        if(data=='true200'){
                            $scope.tittle = "Message";
                            $scope.message = "Password changed";
                            $scope.showModal = !$scope.showModal;
                            $rootScope.password=$scope.change.newpassword;
                            var timeRemaining = token_get_info.validate($rootScope.username);
                            timeRemaining.then(function(data) {
                                var userExpirationDate = data.expirationd + " " + data.expirationh + ":" + data.expirationm;
                                var currentDate = actualDate();
                                $rootScope.timeremaining=diffDates(userExpirationDate,currentDate);
                            setTimeout(
                                function() {
                                    $location.url('/landing');
                                }, 2000);
                            console.log($rootScope.password);
                            $scope.change={};
                                });
                        }
                        else if(data=='404'){
                            $scope.tittle = "Error";
                            $scope.message = "The current password do not match";
                            $scope.showModal = !$scope.showModal;

                        }
                    });


            }
        }
    })

