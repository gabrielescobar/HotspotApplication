/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-registerFree',['ngLoadingSpinner'])
    .controller('RegisterFreeController', function (template,$routeParams,login,$rootScope,localStorageService,$scope,mac,$location,token_configure) {

        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].userfree;
        });

        var macaddress = getItem("MAC");
        var ipaddress = getItem("IP");

        console.log(macaddress);
        console.log(ipaddress);

        function getItem(key) {
            return localStorageService.get(key);
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log(re.test(email));
            return re.test(email);
        }

        $scope.showModal = false;

        $scope.free={};

        var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "PC";


        $scope.showModal = false;
        $scope.buttonClicked = "";

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

        /*
         * Create function
         * This function is executed when the Sign up button is pressed
         *
         * */
        $scope.create = function() {
            if($scope.free.email){
                var str = $scope.free.email, replacement = '';
                $scope.free.email = str.replace(/\//g, replacement);
                str = $scope.free.email, replacement = '';
                $scope.free.email = str.replace(/[!\^\']/, replacement);
                $scope.free.email = $scope.free.email.replace("'", '');
                $scope.free.email = $scope.free.email.replace('"', '');
                $scope.free.email = $scope.free.email.replace('$', '');
                $scope.free.email = $scope.free.email.replace('%', '');
                $scope.free.email = $scope.free.email.replace('&', '');
                $scope.free.email = $scope.free.email.replace('=', '');
            }
            if($scope.free.user)
                $scope.free.user=$scope.free.user.replace(/(<([^>]+)>)/ig,"");
            if( (!$scope.free.user)){
                $scope.tittle = "Error";
                $scope.message = "All (*) fields are required";
                $scope.showModal = !$scope.showModal;
            }
            else if (($scope.free.email)&& (!validateEmail($scope.free.email))) {
                $scope.tittle = "Error";
                $scope.message = "The email format is not correct; Example:'user@domain.com'";
                $scope.showModal = !$scope.showModal;
            }
            else{
                //obtain the mac address of the device
                var macaddress = getItem("MAC");
                //obtain the ip address of the device
                var ipaddress = getItem("IP");
                var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "Laptop";
                //create a free user account with the mac address as the user name and 10 minutes of session
                var today = new Date();
                today = new Date(today.getTime() + 40*60000);
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
                var free = yyyy+"-"+mm+"-"+dd+" "+hour+":"+min;

                var newuser = token_configure.create(macaddress, deviceType, macaddress, "secure", $scope.free.user, $scope.free.email, $scope.free.phone,$scope.free.desc+";"+$scope.free.city, "Megacable-Trial", false, free,
                    false, true);
                newuser.then(function (data) {

                    if (data == 'true200' || data == '500') {

                        var freelogin = login.login(macaddress, "secure",ipaddress,macaddress);
                        freelogin.then(function (data2) {

                            if (data2 != "error") {
                                $rootScope.timeremaining=data2[1]["Session-Timeout"];
                                $rootScope.username = macaddress;
                                $rootScope.type = "Megacable-Trial";
                                window.location.replace("#/landing");
                            }
                            else{
                                window.location.replace("#/error-free");
                            }
                        });
                    }
                });
            }
        }
    })

