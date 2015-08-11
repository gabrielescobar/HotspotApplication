/**
 * Created by GABRIEL ESCOBAR on 06/07/2015.
 */
'use strict';
angular.module('zequenzeApp.controllers-register',['ngLoadingSpinner'])
    .controller('RegisterController', function (template,localStorageService,$scope,mac,$location,$rootScope,token_configure) {

        var section = template.getTemplate();
        section.then(function(data) {
            $scope.templatepage=data[0].userprofile;
        });

        function getItem(key) {
            return localStorageService.get(key);
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;/:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log(re.test(email));
            return re.test(email);
        }

        $scope.showModal = false;

        $scope.create={};

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
        *create.emailrepeat
        * */
        $scope.create = function() {
            if($scope.create.email){
                var str = $scope.create.email, replacement = '';
                $scope.create.email = str.replace(/\//g, replacement);
                str = $scope.create.email, replacement = '';
                $scope.create.email = str.replace(/[!\^\']/, replacement);
                $scope.create.email = $scope.create.email.replace("'", '');
                $scope.create.email = $scope.create.email.replace('"', '');
                $scope.create.email = $scope.create.email.replace('$', '');
                $scope.create.email = $scope.create.email.replace('%', '');
                $scope.create.email = $scope.create.email.replace('&', '');
                $scope.create.email = $scope.create.email.replace('=', '');
                $scope.create.email = $scope.create.email.replace('?', '');
                $scope.create.email = $scope.create.email.replace('}', '');
                $scope.create.email = $scope.create.email.replace('{', '');
                $scope.create.email = $scope.create.email.replace('¡', '');
                $scope.create.email = $scope.create.email.replace('!', '');
                $scope.create.email = $scope.create.email.replace('·', '');
                $scope.create.email = $scope.create.email.replace('¬', '');
                $scope.create.email = $scope.create.email.replace('·', '');
                $scope.create.email = $scope.create.email.replace('º', '');
                $scope.create.email = $scope.create.email.replace('ª', '');
                $scope.create.email = $scope.create.email.replace('~', '');
            }
            console.log($scope.create.email);
            if($scope.create.password)
            $scope.create.password=$scope.create.password.replace(/(<([^>]+)>)/ig,"");
            if($scope.create.user)
            $scope.create.user=$scope.create.user.replace(/(<([^>]+)>)/ig,"");
            console.log( $scope.create.email);
            if( (!$scope.create.email) || (!$scope.create.emailrepeat) ||(!$scope.create.user) || (!$scope.create.password) || (!$scope.create.passwordrepeat)){
                $scope.tittle = "Error";
                $scope.message = "All (*) fields are required";
                $scope.showModal = !$scope.showModal;
            }
            else if($scope.create.email != $scope.create.emailrepeat){
                $scope.tittle = "Error";
                $scope.message = "The email needs to be the same in both fields";
                $scope.showModal = !$scope.showModal;
            }
            else if($scope.create.password != $scope.create.passwordrepeat){
                $scope.tittle = "Error";
                $scope.message = "The password needs to be the same in both fields";
                $scope.showModal = !$scope.showModal;
            }
            else if (($scope.create.email)&& (!validateEmail($scope.create.email))) {
                $scope.tittle = "Error";
                $scope.message = "The email format is not correct; Example:'user@domain.com'";
                $scope.showModal = !$scope.showModal;
            }
            else{
                    var macaddress=getItem("MAC");
                    var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "Laptop";
                    var profile="Megacable-prepaid";
                    var newuser = token_configure.create($scope.create.email,deviceType,macaddress,$scope.create.password,$scope.create.user,$scope.create.email,$scope.create.phone,$scope.create.desc,profile,false,actualDate(),
                        false,true);
                    newuser.then(function(data) {
                        if(data=='true200'){
                            $rootScope.username=$scope.create.email;
                            $rootScope.password=$scope.create.password;
                            $rootScope.type="Megacable-prepaid";
                            $rootScope.hasTime=false;
                            $scope.create={};
                            $scope.tittle = "Message";
                            $scope.message = "User Created";
                            $scope.showModal = !$scope.showModal;
                            setTimeout(
                                function() {
                                    $location.url('/purchase');
                                }, 2000);

                        }
                        else if(data=='500'){
                            $scope.tittle = "Error";
                            $scope.message = "User name already exist";
                            $scope.showModal = !$scope.showModal;

                        }
                    });


            }
        }
    })

