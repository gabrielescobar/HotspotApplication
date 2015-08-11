/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-login',['ngLoadingSpinner'])
    .controller('LoginController', function (template,$routeParams,localStorageService,login,mac,ip,token_configure,token_get_info,$scope,$rootScope,$location) {
        /*
         Megacable-local
         Megacable-prepaid
         Megacable-free
         Megacable-ZonaYoo

         https://sip1-tor-ca.zequenze.com/
         User: test@teravision.com
         Password: abc@123!!


         http://localhost/prueba/zequenze/#/login?IP=192.168.10.73&MAC=ab:cd:ef:gh:ij
         */
        function submit(key, val) {
            return localStorageService.set(key, val);
        }

        function getItem(key) {
            return localStorageService.get(key);
        }

        if(localStorageService.isSupported) {
            var ipaddress;
            var macaddress;
            var ipbool;
            var macbool;
            if(!$routeParams.IP || !$routeParams.MAC){
                ipaddress = getItem("IP");
                macaddress = getItem("MAC");
                console.log("no estan");
            }
            else{
                ipbool = submit("IP",$routeParams.IP);
                macbool = submit("MAC",$routeParams.MAC);
                ipaddress=$routeParams.IP;
                macaddress=$routeParams.MAC;
                console.log("estan");
            }
            console.log(ipaddress);
            console.log(macaddress);
        }

        $rootScope.fromLogin=true;
        $scope.goSignUp = function() {
            $location.url('/signup');
        };
        ///////////////////////////////////guardar hora actual
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

        function hasTime(dat1,dat2){
            var date1 = new Date(dat1.replace(/-/g, '/'));
            var date2 = new Date(dat2.replace(/-/g, '/'));
            var diffDays=false;
            if (date2>date1)
                diffDays=true;
            return diffDays;
        }

        function diffDates(dat1,dat2){
            var date1 = new Date(dat1.replace(/-/g, '/'));
            var date2 = new Date(dat2.replace(/-/g, '/'));
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            console.log(timeDiff);
            var diffDays = Math.ceil(timeDiff / (1000));
            console.log(diffDays);
            return diffDays;
        }

        $scope.checked=false;
        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].login;
        });

        $scope.user = {};
        $scope.option="megacable";

        $scope.$watch('option', function(newValue, oldValue) {
            // access new and old value here
            if (newValue=="free"){
                $scope.user = {};
                $scope.checked=true;
            }
            else{
                $scope.checked=false;
            }
        });

        $scope.showModal = false;
        $scope.buttonClicked = "";

        $scope.zonayoo = function(){
            window.open("http://www.zonayoo.com/");
        }

        /*
         * Login function
         * This function is executed when the Sign In button is pressed
         *
         * */
        $scope.login = function(usr, pwd) {

            // validate that the user and password inputs are not empty if the realm is different of free user
            if ((!$scope.user.name || !$scope.user.password) && ($scope.option!="free")){
                $scope.tittle = "Error";
                $scope.message = "Username and Password are Required!!";
                $scope.showModal = !$scope.showModal;

            }
            //validate if there is a network connection
            else if (!navigator.onLine){
                $scope.tittle = "Error";
                $scope.message = "There is a problem connecting to te server";
                $scope.showModal = !$scope.showModal;
            }
            //if you are login with free user the system has to create an artificial account and then make the authentification
            else if (($scope.option=="free")){
                ////obtain the mac address of the device
                //
                //    var macaddress = getItem("MAC");
                //    //obtain the ip address of the device
                //
                //        var ipaddress = getItem("IP");
                //        var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "Laptop";
                //        //create a free user account with the mac address as the user name and 10 minutes of session
                //        var today = new Date();
                //        today = new Date(today.getTime() + 40*60000);
                //        var dd = today.getDate();
                //        var mm = today.getMonth()+1; //January is 0!
                //        var yyyy = today.getFullYear();
                //        var hour = today.getHours() ;
                //        var min = today.getMinutes();
                //
                //        if(dd<10) {
                //            dd='0'+dd
                //        }
                //
                //        if(mm<10) {
                //            mm='0'+mm
                //        }
                //        var free = yyyy+"-"+mm+"-"+dd+" "+hour+":"+min;
                //
                //        var newuser = token_configure.create(macaddress, deviceType, macaddress, "secure", macaddress, "freeuser@zequenze.com", "", "Megacable-Trial", "Megacable-Trial", false, free,
                //            false, true);
                //        newuser.then(function (data) {
                //
                //            if (data == 'true200' || data == '500') {
                //
                //                var freelogin = login.login(macaddress, "secure",ipaddress,macaddress);
                //                freelogin.then(function (data2) {
                //
                //                    if (data2 != "error") {
                //                        $rootScope.timeremaining=data2[1]["Session-Timeout"];
                //                        $rootScope.username = macaddress;
                //                        $rootScope.type = "Megacable-Trial";
                //                        window.location.replace("#/landing");
                //                    }
                //                    else{
                //                        window.location.replace("#/error-free");
                //                    }
                //                });
                //            }
                //        });
                var macaddress = getItem("MAC");
                var timeRemaining = token_get_info.validate(macaddress);
                timeRemaining.then(function(data) {
                    console.log(data);
                    if(data=="error"){
                        window.location.replace("#/signup_free");
                    }
                    else{
                        var userExpirationDate = data.expirationd+" "+data.expirationh+":"+data.expirationm;
                        var currentDate=actualDate();
                        console.log(currentDate);
                        console.log(userExpirationDate);
                        var difference= hasTime(currentDate,userExpirationDate);
                        //si es true logue con tiempo restante
                        if(difference){
                            var macaddress = getItem("MAC");
                            var ipaddress = getItem("IP");
                            var result = login.login(macaddress, "secure",ipaddress,macaddress);
                            result.then(function(data) {
                                console.log(data[0]);
                                if(data[0]=='Access accepted'){
                                        $rootScope.timeremaining=diffDates(userExpirationDate,currentDate);
                                                            $rootScope.username = macaddress;
                                                            $rootScope.type = "Megacable-Trial";
                                                            window.location.replace("#/landing");

                                }
                                else {
                                    console.log("sin tiempo");
                                    window.location.replace("#/error-free");
                                }
                                $scope.user={}
                            })


                        }
                        else {
                            console.log("sin tiempo");
                            window.location.replace("#/error-free");
                        }
                        //si es false redirigjo a comprar tiempo
                    }
                })
            }
            else if (($scope.option=="megacable")){
                window.location.replace("#/megacable");
            }
            else{
                var timeRemaining = token_get_info.validate(usr);
                timeRemaining.then(function(data) {
                    console.log(data);
                    if(data=="error"){
                        $scope.tittle = "Error";
                        $scope.message = "Access denied, UserName or Password doesn't match";
                        $scope.showModal = !$scope.showModal;
                    }
                    else{
                        var userExpirationDate = data.expirationd+" "+data.expirationh+":"+data.expirationm;
                        var currentDate=actualDate();
                        console.log(currentDate);
                        console.log(userExpirationDate);
                        var difference= hasTime(currentDate,userExpirationDate);
                        //si es true logue con tiempo restante
                        if(difference){
                            var macaddress = getItem("MAC");
                            var ipaddress = getItem("IP");
                            var result = login.login(usr, pwd,ipaddress,macaddress);
                            result.then(function(data) {
                                console.log(data[0]);
                                if(data[0]=='Access accepted'){
                                    /*if ($scope.option=="megacable")
                                     window.location.replace("#/megacable");
                                     else*/ if ($scope.option=="prepaid"){
                                        $rootScope.username=usr;
                                        $rootScope.password=pwd;
                                        $rootScope.timeremaining=diffDates(userExpirationDate,currentDate);
                                        $rootScope.type="Megacable-prepaid";
                                        window.location.replace("#/landing");
                                    }
                                }
                                $scope.user={}
                            })
                        }
                        else {
                            console.log("sin tiempo");
                            $rootScope.username=usr;
                            $rootScope.password=pwd;
                            $rootScope.type="Megacable-prepaid";
                            $rootScope.hasTime=false;
                            window.location.replace("#/purchase");
                        }
                        //si es false redirigjo a comprar tiempo
                    }

                });


            }
            $scope.user={};
        }
    })

;