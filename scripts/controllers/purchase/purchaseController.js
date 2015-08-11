/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-purchase',['ngLoadingSpinner'])
    .controller('PurchaseController', function (template,localStorageService,$rootScope,ip,token_get_info,$scope,mac,$location,token_configure) {

        if(!$rootScope.fromLogin)
            $location.url('/task');

        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].payment;
        });

        $scope.time=$rootScope.hasTime;

        function getItem(key) {
            return localStorageService.get(key);
        }

        $scope.goLogin = function() {
            $location.url('/task');
        };

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

        function diffDates(dat1,dat2){
            var date1 = new Date(dat1.replace(/-/g, '/'));
            var date2 = new Date(dat2.replace(/-/g, '/'));
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            console.log(timeDiff)
            var diffDays = Math.ceil(timeDiff / (1000));
            console.log(diffDays);
            return diffDays;
        }

        function sumsec(dat1,min){
            var d = new Date(dat1.replace(/-/g, '/'));
            d.setSeconds(d.getSeconds() + ((min+30)*60));
            var dd = d.getDate();
            var mm = d.getMonth()+1; //January is 0!
            var yyyy = d.getFullYear();
            var hour = d.getHours() ;
            var min = d.getMinutes();
            if(dd<10) {
                dd='0'+dd
            }
            if(mm<10) {
                mm='0'+mm
            }
            d = yyyy+"-"+mm+"-"+dd+" "+hour+":"+min;
            return d;

        }

        function hasTime(dat1,dat2){
            var date1 = new Date(dat1.replace(/-/g, '/'));
            var date2 = new Date(dat2.replace(/-/g, '/'));
            var diffDays=false;
            if (date2>date1)
                diffDays=true;
            return diffDays;
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
        $scope.buy = function(time) {
            console.log(time);
            var timeRemaining = token_get_info.validate($rootScope.username);
            timeRemaining.then(function(data) {
                var userExpirationDate = data.expirationd+" "+data.expirationh+":"+data.expirationm;
                var currentDate=actualDate();
                var difference= hasTime(currentDate,userExpirationDate);
                if (difference){
                    var update= sumsec(userExpirationDate,time);
                    console.log(update);
                }
                else{
                    var update= sumsec(currentDate,time);
                    console.log(update);
                }

                   var macaddress=getItem("MAC");
                    //obtain the ip address of the device
                var ipaddress=getItem("IP");
                console.log($rootScope.password);
                console.log($rootScope.username);
                        var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "Laptop";
                        var updateuser = token_configure.create($rootScope.username, deviceType, macaddress, $rootScope.password, data.name, data.email, data.phone, data.description, "Megacable-prepaid", false, update,
                            false, false);
                        updateuser.then(function (data1) {
                            console.log(data1);
                            $rootScope.timeremaining=diffDates(update,currentDate);
                            window.location.replace("#/landing");
                        })


            });
        };
    })

